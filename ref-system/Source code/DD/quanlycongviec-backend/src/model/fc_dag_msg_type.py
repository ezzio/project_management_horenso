import json
import random
import networkx as nx
from common import utils as ut
import mysql.connector
from global_def import *
from collections import deque
import copy

has_graphviz = 1
try:
    import graphviz
except:
    print("Graphviz NOT FOUND")
    has_graphviz = 0

logger_msg = ut.get_logger("message", level=logging.INFO)

DATETIME_FORMAT4 = '%d/%m/%Y %H:%M:%S'

def datetime_from_str(date_str):
    return datetime.strptime(date_str, DATETIME_FORMAT4)

def str_from_datetime(date):
    return date.strftime(DATETIME_FORMAT4)

class fc_msg:
    def __init__(self, id, email= ""):
        self.id = id
        self.email = email
        self.parent = None
        self.msg = ""
        self.id_tree = None
        self.t_create = None
        self.type = 0
        self.level = 0

        self.db_table_name = "xe_cai_tien_history_msg_tb"

        self.col_id = "id"
        self.col_email = "email"
        self.col_parent = "parent"
        self.col_msg = "msg"
        self.col_id_tree = "id_tree"
        self.col_t_create = "t_create"
        self.col_type = "type"
        self.col_level = "level"

    def to_dict_msg(self):
        return {
                    self.col_id : self.id,
                    self.col_email : self.email,
                    self.col_parent : self.parent,
                    self.col_msg : self.msg,
                    self.col_id_tree : self.id_tree,
                    self.col_t_create : self.t_create,
                    self.col_type: self.type,
                    self.col_level: self.level
                }

    def to_json(self):
        return json.dump(self.to_dict_msg, indent=4, sort_keys=True)

    def insert_db(self, cnx, fname = ""):
        ok = False
        try:
            cursor = cnx.cursor(buffered=True)
            dict_data = self.to_dict_msg()
            for k, v in dict_data.copy().items():
                if v is None:
                    del dict_data[k]
            qr_insert = ut.get_query_insert_update_fr_dict(dict_data, self.db_table_name, fname)
            # print(qr_insert)
            cursor.execute(qr_insert)
            cnx.commit()
            ok = True
        except Exception as e:
            logger_msg.info("Error insert_db {}: {}".format(fname, e))
        return ok

class fc_dag_msg():
    def __init__(self):
        self.dag = nx.DiGraph()
        self.msg_dict = {}
        self.msg_level_dict = {}

        self.col_id = "id"
        self.col_parent = "parent"
        self.col_msg = "msg"
        self.col_id_tree = "id_tree"
        self.col_email = "email"
        self.col_t_create = "t_create"
        self.col_type = "type"
        self.col_level = "level"

        self.col_data_root = "data_root"
        self.db_table_name = "xe_cai_tien_history_msg_tb"

    # Hàm tiền xử lý trước khi vào dB và từ dB xuất ra
    def output_dB_convert_datetime_to_str(self, dict_data={}, fname=""):
        for k, v in dict_data.items():
            if v is None:
                dict_data[k] = "N/A"
            elif isinstance(v, datetime):
                dict_data[k] = ut.convert_datetimeDb(v, fname)
        return dict_data

    def input_dB_insert_convert_str_to_datetime(self, dict_data={}, fname=""):
        for k, v in dict_data.copy().items():
            if v is None or v == "N/A":
                del dict_data[k]
            elif k in [self.col_t_create]:
                dict_data[k] = ut.convert_ngay_gio_import_Db(v, fname)
            elif k in [self.col_email]:
                dict_data[k] = str(v).lower()
            elif k in [self.col_data_root]:
                del dict_data[k]
        return dict_data

    def input_dB_update_convert_str_to_datetime(self, dict_data={}, fname=""):
        for k, v in dict_data.copy().items():
            if v == "N/A":
                dict_data[k] = None
            elif k in [self.col_t_create]:
                dict_data[k] = ut.convert_ngay_gio_import_Db(v, fname)
            elif k in [self.col_email]:
                dict_data[k] = str(v).lower()
            elif k in [self.col_data_root]:
                del dict_data[k]
        return dict_data

    def load_from_db(self, cnx, id_tree, fname=""):
        # print("Load From DB here")
        cursor = cnx.cursor(buffered=True)
        query = ''' SELECT parent,id FROM xe_cai_tien_history_msg_tb WHERE id_tree = \"{}\" '''.format(id_tree)
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            #remove edges have id = parent (is project "type=1" or person woking "type"=2)
            if i[0] == i[1] and len(empRows) > 1:
                empRows.remove(i)
        self.dag = nx.DiGraph()
        # add edges in a tree
        self.dag.add_edges_from(empRows)
        for node in self.dag.nodes():
            # print(node)
            qr = "SELECT * FROM " + self.db_table_name + " WHERE id = \"{}\"".format(node)
            a = ut.emp_checkin_exec_query(cnx, qr, "")
            if len(a) != 0:
                nid = a[0].get(self.col_id)
                # convert datetime to dd/mm/yyyy HH:MM:SS
                self.output_dB_convert_datetime_to_str(dict_data=a[0], fname=fname)
                # add info
                self.msg_dict[nid] = a[0]
                self.msg_dict[nid][self.col_data_root] = self.get_data_root_fr_id(cnx, id_tree, fname)
        # print(self.task_dict)
        return self.dag

    def dumps_to_db(self, cnx, fname=""):
        # print("Dump to DB here")
        ok = False
        try:
            cursor = cnx.cursor(buffered=True)
            _nodes = self.dag.nodes()
            for id in _nodes:
                data = self.msg_dict[id]
                # print(data)
                if self.check_id_node(cnx, id) == 1:
                    data = self.input_dB_insert_convert_str_to_datetime(dict_data=data, fname=fname)
                    qr_insert = ut.get_query_insert_update_fr_dict(data, self.db_table_name, fname)
                    print(qr_insert)
                    cursor.execute(qr_insert)
                else:
                    data = self.input_dB_update_convert_str_to_datetime(dict_data=data, fname=fname)
                    qr_where = " id = \"{}\"".format(id)
                    qr_update = ut.get_query_update_fr_dict(data, qr_where, self.db_table_name, fname)
                    print(id, qr_update)
                    cursor.execute(qr_update)
                ok = True
            print("OK ROI")
            if ok:
                cnx.commit()
        except Exception as e:
            ok = False
            logger_msg.info("Error dumps_to_db {}: {}".format(fname, e))
        return ok

    def dump_to_dict(self):
        _dag = {}
        try:
        # Add parent-child relationships
            edges_list = []
            i = 0
            for edge in self.dag.edges():
                e = {
                    'id': i,
                    'source': str(edge[0]),
                    'target': str(edge[1]),
                }
                edges_list.append(e)
                i = i +1

            nodes_list = []
            _nodes = self.dag.nodes()
            for node in _nodes:
                dict_t = self.msg_dict[node]
                dict_t["sum_cmt"] = len(self.dfs_list_node(node)) - 1
                nodes_list.append(dict_t)

            _dag = {
                        "edges": edges_list,
                        "tasks": nodes_list
                    }
        except Exception as e:
            logger_msg.info("Error {}".format(e))
        return _dag

    def dfs_list_node(self, source):
        list_node = []
        dict_t = self.dfs_level_cal(source)
        for k, v in dict_t.items():
            list_node.append(k)
        return list_node

    def dfs_level_cal(self, source):
        G = self.dag
        nodes = [source]
        visited = set()
        self.msg_level_dict = {source:0}
        for start in nodes:
            if start in visited:
                continue
            visited.add(start)
            stack = [(start, iter(G[start]))]
            while stack:
                parent, children = stack[-1]
                try:
                    child = next(children)
                    if child not in visited:
                        self.msg_level_dict[child] = self.msg_level_dict[parent] + 1
                        visited.add(child)
                        stack.append((child, iter(G[child])))
                except StopIteration:
                    stack.pop()
        return self.msg_level_dict

    # Get info task
    def get_data_root_fr_id(self, cnx, id_root, fname=""):
        dict_data = {}
        try:
            query = "SELECT * FROM " + self.db_table_name + " WHERE id = \"{}\" ".format(id_root)
            result = ut.emp_checkin_exec_query(cnx, query)
            if len(result) == 1:
                dict_data = copy.deepcopy(result[0])
                self.output_dB_convert_datetime_to_str(dict_data=dict_data, fname=fname)
        except Exception as e:
            logger_msg.info("Error: {}".format(e))
        return dict_data

    def check_id_node(self, cnx, id):
        ok = -1
        try:
            query = "SELECT * FROM " + self.db_table_name + " WHERE id = \"{}\" ".format(id)
            result = ut.emp_checkin_exec_query(cnx, query)
            if len(result) != 0:
                ok = 0
            else:
                ok = 1
        except Exception as e:
            print("Error {}".format(e))
        return ok

    def add_child(self, pred_id, node_id, node_data):
        # add node to the predecessor node
        # print(pred_id, node_id, node_data)
        if not self.dag.has_predecessor(pred_id, node_id):
            self.dag.add_edge(pred_id, node_id)
            self.msg_dict[node_id] = node_data

    #--------------------GET---------------------------
    def get_level(self, node):
        return self.msg_dict[node][self.col_level]

    #--------------------SET---------------------------
    def set_level(self, tid, level):
        self.msg_dict[tid][self.col_level] = level


if __name__ == '__main__':
    cnx = mysql.connector.connect(user='pdx', password='pdx@12345',
                                  host='192.168.1.19',
                                  database='myTin_pnc')

    f = fc_dag_msg()
    f.load_from_db(cnx, 145)
    # print(f.msg_dict)
    print(f.dump_to_dict())


