import datetime
import json
import random
from collections import deque

import networkx as nx
import graphviz

class emp_info:
    def __init__(self, data=None):
        self.fullname = "NGUYEN Van A"
        self.position = "TPKT"
        self.email = "test@abcd.com"
        self.emp_id = "12132123"
        if data is not None:
            self.fullname = data.get("fullname", "")
            self.position = data.get("position", "")
            self.email = data.get("email", "")
            self.emp_id = data.get("emp_id", "")

    def to_dict(self):
        return {
            "fullname": self.fullname,
            "position": self.position,
            "email": self.email,
            "emp_id": self.emp_id
        }

    def to_json(self):
        return json.dump(self.to_dict(), indent=4,sort_keys=True)

DATETIME_FORMAT4 = '%d/%m/%Y %H:%M:%S'
def datetime_from_str(date_str):
    return datetime.datetime.strptime(date_str, DATETIME_FORMAT4)

def str_from_datetime(date):
    return date.strftime(DATETIME_FORMAT4)


class fc_msg:
    def __init__(self, id=0, level=0, description="", msg_data=None):
        self.id = id
        self.level = level
        self.owner = emp_info()
        self.title = "chua biet"
        self.topic = 1234
        self.description = description
        self.status = 'OK'
        self.submitted_date = datetime_from_str('15/03/2021 10:30:00')
        self.reviewed_date = datetime_from_str('16/03/2021 09:30:00')
        self.public_date = datetime_from_str('16/03/2021 09:30:00')
        self.comments = []
        self.comments_ptr = []
        self.msg_data = {}
        if msg_data is not None:
            self.msg_data = msg_data

            self.id = msg_data.get("id", 0)
            self.level = msg_data.get("level", 0)
            self.owner = emp_info(msg_data.get("owner", None))
            self.topic = msg_data.get("topic", None)
            self.title = msg_data.get("title", "")
            self.description = msg_data.get("description", "")
            self.status = msg_data.get("status", "")
            self.submitted_date = datetime_from_str(msg_data.get("submitted_date", ""))
            self.reviewed_date = datetime_from_str(msg_data.get("reviewed_date", ""))
            self.public_date = datetime_from_str(msg_data.get("public_date", ""))


    def get_msg_data(self):
        self.msg_data = {
            'owner': self.owner.to_dict(),
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'topic': self.topic,
            'submitted_date': str_from_datetime(self.submitted_date),
            'reviewed_date': str_from_datetime(self.reviewed_date),
            'public_date': str_from_datetime(self.public_date),
            'id': self.id,
            'level': self.level
        }
        return self.msg_data

    def to_json(self):
        return json.dump(self.get_msg_data(), indent=4, sort_keys=True)

    def add_comment(self, msg_id, msg_ptr=None):
        self.comments.append(msg_id)
        if msg_ptr is not None:
            self.comments_ptr.append(msg_ptr)

    def get_comments(self):
        return self.comments

    def get_comments_ptr(self):
        return self.comments_ptr


def create_simple_msg(id, level=0, description=""):
    d = fc_msg(id=id, level=level, description=description)
    return d


class fc_msg_dag():
    def __init__(self):
        self.dag = nx.DiGraph()
        self.msg_dict = {}
        self.msg_level_dict = {}

    def generate_successive(self):

        self.dag = nx.DiGraph()
        root_id = 1234
        self.add_msg(root_id, create_simple_msg(id=root_id, description="This is the Root Message"))

        # level 1
        child11 = 11
        self.add_comment(root_id, child11, create_simple_msg(id=child11, description="First comment of root message"))

        child12 = 12
        self.add_comment(root_id, child12, create_simple_msg(id=child12, description="Second Comment of root message"))

        # level 2
        child21 = 21
        self.add_comment(child11, child21, create_simple_msg(id=child21, description="Comment of First Comment"))

        child22 = 22
        self.add_comment(child11, child22, create_simple_msg(id=child22, description="Comment of Second Comment"))

        # self.view_graph()

        return self.dag

    def view_graph(self):
        d = graphviz.Digraph("Simple")
        for id in self.msg_dict.keys():
            name = "{}".format(id)
            label = "Msg{}".format(id)
            d.node(name, label)

        edges = self.dag.edges()
        for e in edges:
            parent_id = e[0]
            child_id = e[1]
            tail_name = "{}".format(parent_id)
            head_name = "{}".format(child_id)
            label = ""
            d.edge(tail_name, head_name, label)
        d.view()

    def add_msg(self, id, msg=None):
        if not msg:
            self.dag.add_node(id)
            self.msg_dict[id] = msg
        else:
            self.dag.add_node(id)
            self.msg_dict[id] = create_simple_msg(id)
        self.msg_level_dict[id] = 0

    def add_comment(self, msg_id, comment_id, comment_msg):
        # add node to the predecessor node
        if not self.dag.has_predecessor(msg_id, comment_id):
            self.dag.add_node(comment_id)
            self.dag.add_edge(msg_id, comment_id)
            self.msg_dict[comment_id] = comment_msg
            self.msg_level_dict[comment_id] = self.msg_level_dict[msg_id] + 1

    def find_root_id(self):
        # root of DAG is the node doesn't have predecessor
        root_list = []
        root_id = -1
        for node in self.dag.nodes():
            p = self.dag.predecessors(node)
            if not next(p, None):
                root_list.append(node)
        if len(root_list) == 0:
            print("ERROR: no root found")
        elif len(root_list) > 1:
            print("ERROR: DAG cannot have more than one root")
        else:
            root_id = root_list[0]

        return root_id

    def find_leaves(self):
        leave_list = []
        for node in self.dag.nodes():
            s = self.dag.successors(node)
            if not next(s, None):
                leave_list.append(node)

        return leave_list

    def bfs_level_cal(self, source):
        G = self.dag
        neighbors = G.neighbors
        visited = {source}
        queue = deque([(source, neighbors(source))])
        self.msg_level_dict = {source:0}
        while queue:
            parent, children = queue[0] # start with source and its neighbors
            try:
                child = next(children)
                if child not in visited:
                    self.msg_level_dict[child] = self.msg_level_dict[parent] + 1
                    visited.add(child)
                    queue.append((child, neighbors(child)))
            except StopIteration:
                queue.popleft()
        return self.msg_level_dict

    def get_level_max(self):
        self.bfs_level_cal(self.find_root_id())
        l = max(self.msg_level_dict.values())
        return l

    def get_task_fr_id(self, task_id): #type: (int) -> fc_msg
        return self.msg_dict[task_id]

    def get_all_successors_fr(self, source):
        s = list(nx.bfs_successors(self.dag, source).values())
        if source in s:
            s.remove(source)
        return s

    def get_all_predecessors_fr(self, source):
        return nx.bfs_predecessors(self.dag, source)

    def dump_to_json(self, filename):
        # Add parent-child relationships
        edges_list = []
        i = 0
        for edge in self.dag.edges():
            e = {
                'id': i,
                'source': str(edge[0]),
                'target': str(edge[1])
            }
            edges_list.append(e)
            i = i +1

        nodes_list = []
        for node in self.msg_dict.keys():
            nodes_list.append(self.msg_dict[node].get_msg_data())

        # print(nodes_list)
        _dag = {
            "edges": edges_list,
            "messages": nodes_list
        }
        _dag_json = json.dumps(_dag, indent=4,sort_keys=True)

        with open(filename, 'w+') as f:
            f.write(_dag_json)
        # print(_dag_json)

    def load_from_json(self, filename):
        self.dag = nx.DiGraph()
        with open(filename) as json_file:
            d = json.load(json_file)
            if "edges" in d:
                edges_list = d["edges"]
                for e in edges_list:
                    u = int(e['source'])
                    v = int(e['target'])
                    self.dag.add_edge(u,v)

            if "messages" in d:
                _nodes = d["messages"]
                for node in _nodes:
                    nid = node['id']
                    self.dag.add_node(nid)
                    self.msg_dict[nid] = fc_msg(msg_data=node)
        return self.dag

    def load_from_db(self):
        print("Load From DB here")

    def dumps_to_db(self):
        print("Dump to DB here")


if __name__ == '__main__':

    f = fc_msg_dag()
    f.generate_successive()
    f.dump_to_json("msg.json")
    f.load_from_json("msg.json")
    f.dump_to_json("msg2.json")
    f.view_graph()



