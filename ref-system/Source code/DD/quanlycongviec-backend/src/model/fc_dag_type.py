# -*- coding: utf-8 -*-
# Copyright 2020 TOAN
# Author: PHAM NHU TOAN
# import datetime
import json
import random
import networkx as nx
from common import utils as ut
import mysql.connector
from global_def import *
from collections import deque
import copy
from flask_mail import Message
sender = 'phamnhutoanuser1@gmail.com'

has_graphviz = 1
try:
    import graphviz
except:
    print("Graphviz NOT FOUND")
    has_graphviz = 0
# log để lưu lại nhưng input, output, error trong quá trình xử lý dữ liệu
logger_task = ut.get_logger("task", level=logging.INFO)

DATETIME_FORMAT4 = '%d/%m/%Y %H:%M:%S'
def datetime_from_str(date_str):
    return datetime.strptime(date_str, DATETIME_FORMAT4)

def str_from_datetime(date):
    return date.strftime(DATETIME_FORMAT4)

def create_simple_task(id, level=0):
    d = fc_task(id=id, level=level)
    return d.to_dict_task()

def time_progress_cal(t_assigned, deadline, te="N/A", fname=""):
    t_assigned = datetime_from_str(t_assigned)
    deadline = datetime_from_str(deadline)
    if te != "N/A":
        current_date = datetime_from_str(te)
    else:
        current_date = get_current_datetime()
    p = -1
    # print(t_assigned)
    # print(dateline)
    try:
        if deadline >= current_date:
            task_duration = deadline - t_assigned
            # print(task_duration)
            current_processing_time = current_date - t_assigned
            # print(current_processing_time)
            p = round(current_processing_time / task_duration, 2) * 100
        else:
            p = -2
    except Exception as e:
        logger_task.info("{} Error time_progress_cal: {}".format(fname, e))
    return p

def info_detail_email(cnx, email, fname=""):
    dict_info = {}
    try:
        query = "SELECT * FROM " + MYSQL_EMP_TB + " WHERE email = \"{}\" limit 1".format(email)
        result = ut.emp_checkin_exec_query(cnx, query, fname)
        if len(result) == 1:
            dict_info["email"] = str(email).lower()
            dict_info["emp_name"] = str(result[0].get("emp_name", "")).title()
            dict_info["child_depart"] = str(result[0].get("child_depart", "")).upper()
    except Exception as e:
        logger_task.info("Error info_detail_email {}: {}".format(fname, e))
    return dict_info

# def set_color(content, color, text_color="#FFFFFF"):
#     return {"content": content, "color": color, "text_color": text_color}
def set_color(content, color, text_color="#FFFFFF", key_col=0):
    return {"content": content, "color": color, "text_color": text_color, "key_col": key_col}

def check_intersection(lst1, lst2):
    ok = False
    if len(list(set(lst1) & set(lst2))) > 0:
        ok = True
    return ok


class tag_table:
    col_chua_lam = "Chưa làm"
    col_chua_phan_cong = "Chưa phân công"
    col_dang_lam = "Đang làm"
    col_danh_gia = "Đánh giá"
    col_cho_danh_gia = "Chờ đánh giá"
    col_hoan_thanh = "Hoàn thành"
    col_qua_han = "Quá hạn"
    col_con_han = "Còn hạn"
    col_cv_du_an = "CV của dự án"

    list_tag = [col_chua_lam, col_chua_phan_cong, col_dang_lam, col_danh_gia, col_cho_danh_gia, col_hoan_thanh,
                col_qua_han, col_con_han, col_cv_du_an]

    set_chua_lam = set_color(content=col_chua_lam, color="#616161", text_color="#FFFFFF", key_col=1) # xám
    set_chua_phan_cong = set_color(content=col_chua_phan_cong, color="#AEEA00", text_color="#FFFFFF", key_col=1) # vàng
    set_dang_lam = set_color(content=col_dang_lam, color="#0277BD", text_color="#FFFFFF", key_col=1)  # xanh da trời
    set_danh_gia = set_color(content=col_danh_gia, color="#AA00FF", text_color="#FFFFFF", key_col=1)  # tím
    set_cho_danh_gia = set_color(content=col_cho_danh_gia, color="#DD2C00", text_color="#FFFFFF", key_col=1)  # cam
    set_hoan_thanh = set_color(content=col_hoan_thanh, color="#2E7D32", text_color="#FFFFFF", key_col=1)  # xanh lá
    set_qua_han = set_color(content=col_qua_han, color="#B71C1C", text_color="#FFFFFF", key_col=2)  # đỏ
    set_con_han = set_color(content=col_con_han, color="#304FFE", text_color="#FFFFFF", key_col=2)  # xanh biển
    set_cv_du_an = set_color(content=col_cv_du_an, color="#795548", text_color="#FFFFFF", key_col=3)  # màu nâu

    list_content_tag = [set_chua_lam, set_chua_phan_cong, set_dang_lam, set_danh_gia, set_cho_danh_gia, set_hoan_thanh,
                        set_qua_han, set_con_han, set_cv_du_an]


class emp_info:
    def __init__(self):
        self.fullname = "NGUYEN Van A"
        self.position = "TPKT"
        self.email = "test@abcd.com"
        self.emp_id = "12132123"

    def to_dict(self):
        return {
            "fullname": self.fullname,
            "position": self.position,
            "email": self.email,
            "emp_id": self.emp_id
        }

    def to_json(self):
        return json.dump(self.to_dict(), indent=4,sort_keys=True)


class fc_cmt:
    def __init__(self, id_task):
        self.id_index = None
        self.id_task = id_task
        self.email = 0
        self.name = None
        self.date_cmt = get_current_datetime().strftime(DATETIME_FORMAT)
        self.cmt = None

        self.db_table_name = "binh_luan"

        self.col_id_index = "id_index"
        self.col_id_task = "id_task"
        self.col_email = "email"
        self.col_name = "name"
        self.col_date_cmt = "date_cmt"
        self.col_cmt = "cmt"

    def insert_db(self, cnx, fname = ""):
        ok = False
        try:
            cursor = cnx.cursor(buffered=True)
            dict_data = self.to_dict_cmt()
            # print(dict_data)
            for k, v in dict_data.copy().items():
                if v is None:
                    del dict_data[k]
            qr_insert = ut.get_query_insert_update_fr_dict(dict_data, self.db_table_name, fname)
            # print(qr_insert)
            cursor.execute(qr_insert)
            cnx.commit()
            ok = True
        except Exception as e:
            logger_task.info("Error insert {}: {}".format(fname, e))
        return ok

    def to_dict_cmt(self):
        return {
                    self.col_id_task: self.id_task,
                    self.col_email: self.email,
                    self.col_name: self.name,
                    self.col_date_cmt: self.date_cmt,
                    self.col_cmt: self.cmt
                }


class fc_task:
    def __init__(self, id, level = 0):
        self.id = id
        self.parent = None
        self.level = 0
        self.owner = None
        self.assigned = None
        self.title = None
        self.description = None
        self.state = 0
        self.priority = 3
        self.type = 0
        self.ts = None
        self.te = None
        self.deadline = None
        self.t_assigned = None
        self.kpi_time = 0
        self.kpi_quality = 0
        self.progression = 0
        self.problem = None
        self.id_tree = None
        self.t_create = None
        self.uuid = None
        self.weight = 0
        self.weight_normalized = 0
        self.reviewer = None
        self.completion = 0
        self.t_duration = 0  # số giờ
        self.child_depart = None
        self.reject = 0

        self.db_table_name = "cong_viec"

        self.col_id = "id"
        self.col_parent = "parent"
        self.col_level = "level"
        self.col_owner = "owner"
        self.col_assigned = "assigned"
        self.col_title = "title"
        self.col_description = "description"
        self.col_state = "state"
        self.col_priority = "priority"
        self.col_type = "type"
        self.col_ts = "ts"
        self.col_te = "te"
        self.col_deadline = "deadline"
        self.col_t_assigned = "t_assigned"
        self.col_kpi_time = "kpi_time"
        self.col_kpi_quality = "kpi_quality"
        self.col_progression = "progression"
        self.col_problem = "problem"
        self.col_id_tree = "id_tree"
        self.col_t_create = "t_create"
        self.col_uuid = "uuid"
        self.col_weight = "weight"
        self.col_weight_normalized = "weight_normalized"
        self.col_reviewer = "reviewer"
        self.col_completion = "completion"
        self.col_t_duration = "t_duration"
        self.col_child_depart = "child_depart"
        self.col_reject = "reject"

    def to_dict_task(self):
        return {
                    self.col_id: self.id,
                    self.col_parent: self.parent,
                    self.col_level: self.level,
                    self.col_owner: self.owner,
                    self.col_assigned: self.assigned,
                    self.col_title: self.title,
                    self.col_description: self.description,
                    self.col_state: self.state,
                    self.col_priority: self.priority,
                    self.col_type: self.type,
                    self.col_ts: self.ts,
                    self.col_te: self.te,
                    self.col_deadline: self.deadline,
                    self.col_t_assigned: self.t_assigned,
                    self.col_kpi_time: self.kpi_time,
                    self.col_kpi_quality: self.kpi_quality,
                    self.col_progression: self.progression,
                    self.col_problem: self.problem,
                    self.col_id_tree: self.id_tree,
                    self.col_t_create: self.t_create,
                    self.col_uuid: self.uuid,
                    self.col_weight: self.weight,
                    self.col_weight_normalized: self.weight_normalized,
                    self.col_reviewer: self.reviewer,
                    self.col_completion: self.completion,
                    self.col_t_duration: self.t_duration,
                    self.col_child_depart: self.child_depart,
                    self.col_reject: self.reject
        }

    def to_json(self):
        return json.dump(self.to_dict_task(), indent=4, sort_keys=True)

    def insert_db(self, cnx, fname = ""):
        ok = False
        try:
            cursor = cnx.cursor(buffered=True)
            dict_data = self.to_dict_task()
            # print(dict_data)
            for k, v in dict_data.copy().items():
                if v is None:
                    del dict_data[k]
                elif k in [self.col_owner, self.col_assigned, self.col_reviewer]:
                    dict_data[k] = str(v).lower()
            qr_insert = ut.get_query_insert_update_fr_dict(dict_data, self.db_table_name, fname)
            # print(qr_insert)
            cursor.execute(qr_insert)
            cnx.commit()
            ok = True
        except Exception as e:
            logger_task.info("Error insert_db {}: {}".format(fname, e))
        return ok

    def get_list_root_and_assigned_task(self, cnx, email, fname=""):
        list_task = []
        try:
            query = "SELECT id, title, id_tree FROM " + self.db_table_name + " WHERE {} = \"{}\" or ({} = \"{}\" and type = 1)".format(
                                                                    self.col_assigned, email,
                                                                    self.col_owner, email)
            list_task = ut.emp_checkin_exec_query(cnx, query, fname)
            if len(list_task) != 0:
                for i in list_task:
                    id_tree = i[self.col_id_tree]
                    i["title_root"] = self.get_title_root_fr_id(cnx, id_tree, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_list_root_task(self, cnx, email, fname=""):
        list_task = []
        try:
            query = "SELECT id, title FROM " + self.db_table_name + " WHERE type = 1 AND reject = 0 AND owner = \"{}\"".format(email)
            list_task = ut.emp_checkin_exec_query(cnx, query, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_list_following_task_fr_email(self, cnx, email, fname=""):
        list_task = []
        try:
            query = "SELECT * FROM " + self.db_table_name + " WHERE owner = \"{}\" OR " \
                                                            " assigned = \"{}\" OR " \
                                                            " reviewer = \"{}\" ".format(email, email, email)
            list_task = ut.emp_checkin_exec_query(cnx, query, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_list_root_and_personal_work_task(self, cnx, email, fname=""):
        list_task = []
        try:
            query = "SELECT id, title FROM " + self.db_table_name + " WHERE {} in (1,2)".format(self.col_type)
            list_task = ut.emp_checkin_exec_query(cnx, query, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_list_owner_task(self, cnx, email, fname=""):
        list_task = []
        try:
            query = "SELECT * FROM " + self.db_table_name + " WHERE {} = \"{}\" or ({} = \"{}\" AND state = 2) " \
                                                            " ORDER BY deadline ASC".format(self.col_owner, email, self.col_reviewer, email)
            list_task = ut.emp_checkin_exec_query(cnx, query, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_list_root_task_fr_email_assigned(self, cnx, email_assigned, fname=""):
        list_task = []
        try:
            query = "SELECT id_tree FROM " + self.db_table_name + " WHERE {} = \"{}\" and reject = 0".format(self.col_assigned, email_assigned)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            if len(result) != 0:
                for i in result:
                    id_tree = i[self.col_id_tree]
                    if id_tree not in list_task:
                        list_task.append(id_tree)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_task

    def get_title_root_fr_id(self, cnx, id, fname=""):
        title = "N/A"
        try:
            query = "SELECT title FROM " + self.db_table_name + " WHERE {} = \"{}\"".format(self.col_id, id)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            if len(result) == 1:
                title = result[0][self.col_title]
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return title

    def get_list_email_can_assigned(self, cnx, email, fname=""):
        list_email = []
        try:
            query = "SELECT email,name,phong_ban,level_task FROM level_employees WHERE email = \"{}\" limit 1".format(email)
            # print(query)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            level_task = result[0].get("level_task", -1)
            phong_ban = result[0].get("phong_ban", "")
            # print(level_task)
            if level_task >= 0:
                qr =  "SELECT email,name,phong_ban,level_task FROM level_employees WHERE "
                if level_task == 0:
                    qr = qr + " level_task in (1)"
                elif level_task == 1:
                    qr = qr + " level_task in (2,3) and phong_ban = \"{}\"".format(phong_ban)
                else:
                    qr = qr + " level_task = \"{}\" and phong_ban = \"{}\"".format(level_task + 1, phong_ban)
                qr = qr + " ORDER BY phong_ban DESC"
                # print(qr)
                list_email = ut.emp_checkin_exec_query(cnx, qr, fname)
                list_email.append(result[0])
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_email

    def get_list_email_can_reviewer(self, cnx, email, fname=""):
        list_email = []
        try:
            query = "SELECT email,name,phong_ban,level_task FROM level_employees WHERE email = \"{}\" limit 1".format(email)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            level_task = result[0].get("level_task", -1)
            if level_task >= 0:
                qr = "SELECT email,name,phong_ban,level_task FROM level_employees WHERE level_task = \"{}\"".format(level_task)
                list_email = ut.emp_checkin_exec_query(cnx, qr, fname)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_email

    def get_list_id_tree_fr_email_assigned_owner(self, cnx, email, _type, fname=""): # type=1 là dự án, =2 là công việc riêng
        list_id_tree = []
        try:
            query = "SELECT id_tree FROM " + self.db_table_name + " WHERE (assigned = \"{}\" and type = 0 and reject = 0) OR (owner = \"{}\" and type = 1 and reject = 0)".format(
                                                                    email, email)
            # print(query)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            # print(result)
            if len(result) != 0:
                for i in result:
                    id_tree = i[self.col_id_tree]
                    if id_tree not in list_id_tree:
                        list_id_tree.append(id_tree)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_id_tree

    def get_list_id_tree_fr_date(self, cnx, from_date, to_date, _type, fname=""):
        list_id_tree = []
        try:
            type_split = _type.split(',')
            _type = ",".join(type_split)
            from_date = ut.convert_datetime_import_Db(from_date, fname)
            to_date = ut.convert_datetime_import_Db(to_date, fname)
            query = "SELECT id_tree FROM " + self.db_table_name + " WHERE t_create >= \"{} 00:00:00\" AND t_create <= \"{} 23:59:59\"" \
                                                                  " AND type in ({}) AND reject = 0".format(from_date, to_date, _type)
            print(query)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            if len(result) != 0:
                for i in result:
                    id_tree = i[self.col_id_tree]
                    if id_tree not in list_id_tree:
                        list_id_tree.append(id_tree)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_id_tree

    def get_list_id_tree_fr_email(self, cnx, email, _type, fname=""):
        list_id_tree = []
        try:
            query = ""
            if _type == "following_task":
                query = "SELECT id_tree, title FROM " + self.db_table_name + " WHERE owner = \"{}\" OR " \
                                                                         " assigned = \"{}\" OR " \
                                                                         " reviewer = \"{}\"".format(email, email, email)
            elif _type == "project":
                query = "SELECT id_tree, title FROM " + self.db_table_name + " WHERE owner = \"{}\" AND type = 1".format(email)
            # print(query)
            if query != "":
                result = ut.emp_checkin_exec_query(cnx, query, fname)
                if len(result) != 0:
                    for i in result:
                        id_tree = i[self.col_id_tree]
                        if id_tree not in list_id_tree:
                            list_id_tree.append(id_tree)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return list_id_tree

    def get_dict_child_depart(self, cnx, email, fname=""):
        list_child_depart = []
        dict_info = {}
        try:
            # branch = ut.get_branch_fr_email(cnx, email, fname)
            # if branch == "PNC":
            qr = "SELECT child_depart FROM " +MYSQL_DEPARTMENT_TB
            list_child_depart1 = ut.emp_checkin_exec_query(cnx, qr)
            list_child_depart = []
            for i in list_child_depart1:
                child_depart = i["child_depart"]
                list_child_depart.append(child_depart)
                qr1 = "SELECT a.email, a.emp_name, b.child_depart FROM " + MYSQL_EMP_TB + " a INNER JOIN " + MYSQL_DEPARTMENT_TB + " b on a.child_depart = b.child_depart where b.child_depart = \"{}\"".format(child_depart)
                dict_info[child_depart] = ut.emp_checkin_exec_query(cnx, qr1)
        except Exception as e:
            logger_task.info("{}: {}".format(fname, e))
        return {"list_child_depart": list(set(list_child_depart)),"dict_info": dict_info}


    def get_dict_child_depart_(self, cnx, email, fname=""):
        list_child_depart = []
        if email is not None:
            try:
                qr = "SELECT * FROM " + MYSQL_DEPARTMENT_TB
                list_child_depart1 = ut.emp_checkin_exec_query(cnx, qr)
                for i in list_child_depart1:
                    child_depart = i["child_depart"]
                    list_child_depart.append(child_depart)
                print("123",list_child_depart)
            except Exception as e:
                logger_task.info("{}: {}".format(fname, e))
        return {"list_child_depart": list(set(list_child_depart))}
class fc_dag():
    def __init__(self):
        self.dag = nx.DiGraph()
        self.task_dict = {}
        self.task_level_dict = {}
        self.task_clone_list = []
        self.task_cmt_list = []

        self.col_id = "id"
        self.col_parent = "parent"
        self.col_level = "level"
        self.col_owner = "owner"
        self.col_assigned = "assigned"
        self.col_title = "title"
        self.col_description = "description"
        self.col_state = "state"
        self.col_priority = "priority"
        self.col_type = "type"
        self.col_ts = "ts"
        self.col_te = "te"
        self.col_deadline = "deadline"
        self.col_t_assigned = "t_assigned"
        self.col_kpi_time = "kpi_time"
        self.col_kpi_quality = "kpi_quality"
        self.col_progression = "progression"
        self.col_problem = "problem"
        self.col_id_tree = "id_tree"
        self.col_t_create = "t_create"
        self.col_uuid = "uuid"
        self.col_weight = "weight"
        self.col_weight_normalized = "weight_normalized"
        self.col_reviewer = "reviewer"
        self.col_completion = "completion"
        self.col_report_daily = "report_daily"
        self.col_report_daily = "report_daily"
        self.col_t_duration = "t_duration"
        self.col_child_depart = "child_depart"
        self.col_reject = "reject"

        # Các trường thêm không có trong dB task
        self.col_data_root = "data_root"
        self.col_data_cmt = "data_cmt"
        self.col_color_check = "color_check"
        self.col_info_owner = "info_owner"
        self.col_info_assigned = "info_assigned"
        self.col_info_reviewer = "info_reviewer"
        self.col_example_title = "example_title"

        # Các str thêm khi gửi data đi không nằm trong task (có thêm email vào task)
        self.col_data_task = "data_task"
        self.col_permission = "permission"
        self.col_list_content = "list_content"
        self.col_update_time = "update_time"

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
            elif k in [self.col_ts, self.col_te, self.col_deadline, self.col_t_assigned, self.col_t_create, self.col_update_time]:
                dict_data[k] = ut.convert_ngay_gio_import_Db(v, fname)
            elif k in [self.col_owner, self.col_assigned, self.col_reviewer]:
                dict_data[k] = str(v).lower()
            elif k in [self.col_data_root, self.col_data_cmt, self.col_color_check, self.col_info_owner,
                       self.col_info_assigned, self.col_info_reviewer, self.col_example_title]:
                del dict_data[k]
        return dict_data

    def input_dB_update_convert_str_to_datetime(self, dict_data={}, fname=""):
        for k, v in dict_data.copy().items():
            if v == "N/A":
                dict_data[k] = None
            elif k in [self.col_ts, self.col_te, self.col_deadline, self.col_t_assigned, self.col_t_create, self.col_update_time]:
                dict_data[k] = ut.convert_ngay_gio_import_Db(v, fname)
            elif k in [self.col_owner, self.col_assigned, self.col_reviewer]:
                dict_data[k] = str(v).lower()
            elif k in [self.col_data_root, self.col_data_cmt, self.col_color_check, self.col_info_owner,
                       self.col_info_assigned, self.col_info_reviewer, self.col_example_title]:
                del dict_data[k]
        return dict_data

    def load_from_db(self, cnx, id_tree, fname=""):
        # print("Load From DB here")
        cursor = cnx.cursor(buffered=True)
        query = ''' SELECT parent,id FROM cong_viec WHERE id_tree = \"{}\" AND reject = 0'''.format(id_tree)
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
            qr = "SELECT * FROM cong_viec where id = \"{}\"".format(node)
            a = ut.emp_checkin_exec_query(cnx, qr, "")
            if len(a) != 0:
                nid = a[0].get(self.col_id)

                # convert datetime to dd/mm/yyyy HH:MM:SS
                # ut.convert_dict_none_datetime_to_str(a[0])
                self.output_dB_convert_datetime_to_str(dict_data=a[0], fname=fname)

                t_assigned = a[0].get(self.col_t_assigned)
                deadline = a[0].get(self.col_deadline)
                completion = a[0].get(self.col_completion)
                te = a[0].get(self.col_te)
                owner = a[0].get(self.col_owner)
                assigned = a[0].get(self.col_assigned)
                reviewer = a[0].get(self.col_reviewer)

                # add info
                self.task_dict[nid] = a[0]
                self.task_dict[nid][self.col_data_root] = self.get_data_root_fr_id(cnx, id_tree)
                self.task_dict[nid][self.col_data_cmt] = self.get_data_cmt_fr_id_task(cnx, nid)
                self.task_dict[nid][self.col_color_check] = self.color_check(t_assigned, deadline, completion, te)
                self.task_dict[nid][self.col_info_owner] = info_detail_email(cnx, owner, "load_from_db")
                self.task_dict[nid][self.col_info_assigned] = info_detail_email(cnx, assigned, "load_from_db")
                self.task_dict[nid][self.col_info_reviewer] = info_detail_email(cnx, reviewer, "load_from_db")
                self.task_dict[nid][self.col_example_title] = self.random_title_child_fr_task(self.task_dict[nid])
        # print(self.task_dict)
        return self.dag

    def dumps_to_db(self, cnx, fname=""):
        # print("Dump to DB here")
        ok = False
        try:
            cursor = cnx.cursor(buffered=True)
            _nodes = self.dag.nodes()
            for id in _nodes:
                data = self.task_dict[id]
                # print(data)
                if self.check_id_node(cnx, id) == 1:
                    data = self.input_dB_insert_convert_str_to_datetime(dict_data=data, fname=fname)
                    qr_insert = ut.get_query_insert_update_fr_dict(data, "cong_viec")
                    # print(qr_insert)
                    cursor.execute(qr_insert)
                else:
                    data = self.input_dB_update_convert_str_to_datetime(dict_data=data, fname=fname)
                    qr_where = " id = \"{}\"".format(id)
                    qr_update = ut.get_query_update_fr_dict(data, qr_where, "cong_viec")
                    print(id, qr_update)
                    cursor.execute(qr_update)
                ok = True

            print("OK ROI")
            if ok:
                for clone in self.task_clone_list:
                    clone[self.col_update_time] = get_current_datetime().strftime(DATETIME_FORMAT4)
                    # clone = ut.convert_dict_str_to_datetime(clone)
                    clone = self.input_dB_insert_convert_str_to_datetime(dict_data=clone, fname=fname)
                    qr_clone = ut.get_query_insert_update_fr_dict(clone, "cong_viec_clone")
                    # print(qr_clone)
                    cursor.execute(qr_clone)
            if ok:
                cnx.commit()
        except Exception as e:
            ok = False
            logger_task.info("Error dumps_to_db {}: {}".format(fname, e))
        return ok

    def get_list_tag_fr_task(self, email, node, fname=""):
        # print(self.task_dict[node])
        list_content = []
        list_key_content = []
        try:
            email = str(email).lower()
            assigned = str(self.get_assigned(node)).lower()
            reviewer = str(self.get_reviewer(node)).lower()
            state = self.get_state(node)
            _type = self.get_type(node)
            te = str(self.get_te(node)).lower()
            deadline = self.get_deadline(node)

            if state == 0:
                list_content.append(tag_table.set_chua_lam)
            elif state == 1:
                if (assigned == "n/a" or assigned == "") and (_type != 1):
                    list_content.append(tag_table.set_chua_phan_cong)  # Vàng
                else:
                    list_content.append(tag_table.set_dang_lam)  # Xanh da trời
            elif state == 2:
                if email == reviewer:
                    list_content.append(tag_table.set_danh_gia)  # Tím
                else:
                    list_content.append(tag_table.set_cho_danh_gia)  # Cam
            else:
                list_content.append(tag_table.set_hoan_thanh)  # Xanh lá

            if te == "n/a":
                deadline = datetime_from_str(deadline)
                if get_current_datetime() > deadline:
                    list_content.append(tag_table.set_qua_han)  # Đỏ
                else:
                    list_content.append(tag_table.set_con_han)  # Xanh biển

            if _type == 0:
                list_content.append(tag_table.set_cv_du_an)

            for content in list_content:
                for k,v in content.items():
                    if k == "content":
                        list_key_content.append(v)
        except Exception as e:
            logger_task.info("Error get_list_content_fr_task {}: {}".format(fname, e))
        data = {
            "list_content": list_content,
            "list_key_content": list_key_content
        }
        return data

    def random_title_child_fr_task(self, data_task = {}, fname = ""):
        title_child = ""
        try:
            id_parent = data_task[self.col_id]
            title_parent = data_task[self.col_title]
            random_str = f'{random.randrange(1, 10 ** 6)}'.zfill(6)
            title_child = "TASK{}-{}-{}".format(id_parent, random_str, title_parent)
        except Exception as e:
            logger_task.info("Error random_title_child_fr_task {}: {}".format(fname, e))
        return title_child

    def generate_successive(self):

        self.dag = nx.DiGraph()
        root_id = 1234
        self.add_root(root_id, create_simple_task(root_id))

        # level 1
        child11 = 11
        self.add_child(root_id, child11, create_simple_task(child11))

        child12 = 12
        self.add_child(root_id, child12, create_simple_task(child12))

        # level 2
        child21 = 21
        self.add_child(child11, child21, create_simple_task(child21))

        child22 = 22
        self.add_child(child11, child22, create_simple_task(child22))

        child23 = 23
        self.add_child(child12, child23, create_simple_task(child23))

        child24 = 24
        self.add_child(child12, child24, create_simple_task(child24))

        # level 3
        child31 = 31
        self.add_child(child22, child31, create_simple_task(child31))

        child32 = 32
        self.add_child(child22, child32, create_simple_task(child32))

        child33 = 33
        self.add_child(child23, child33, create_simple_task(child33))

        child34 = 34
        self.add_child(child23, child34, create_simple_task(child34))

        # level 4
        child41 = 41
        self.add_child(child32, child41, create_simple_task(child41))

        return self.dag

    # Find info
    def find_root_id(self):
        # root of DAG is the node doesn't have predecessor
        root_list = []
        root_id = -1
        for node in self.dag.nodes():
            # print(list(self.dag.predecessors(node)))
            # p = self.dag.predecessors(node)
            # if not next(p, None):
            #     root_list.append(node)
            # if len(list(self.dag.predecessors(node))) == 0:
            if len(list(self.dag.predecessors(node))) == 0:
                root_list.append(node)
        if len(root_list) == 0:
            print("ERROR: no root found")
        elif len(root_list) > 1:
            print("ERROR: DAG cannot have more than one root")
        else:
            root_id = root_list[0]
        # print(root_id)
        return root_id

    def find_title(self):
        title_list = []
        for node in self.dag.nodes():
            title_list.append(self.task_dict[node][self.col_title])
        return title_list

    def check_title_in_tree(self, title):
        ok = False
        title = " ".join(title.upper().split())
        title_list = []
        for node in self.dag.nodes():
            title_t = self.task_dict[node][self.col_title]
            title_list.append(" ".join(title_t.upper().split()))
        print(title, title_list)
        if title not in title_list:
            ok = True
        return ok

    def find_leaves(self):
        leave_list = []
        for node in self.dag.nodes():
            if len(list(self.dag.successors(node))) == 0:
                leave_list.append(node)
        return leave_list

    def find_leaves_task(self):
        leave_list = []
        for node in self.dag.nodes():
            if len(list(self.dag.successors(node))) == 0: # self.dag.successors(node) return object
                leave_list.append(self.task_dict[node])
            # s = self.dag.successors(node)
            # if not next(s, None):
            #     leave_list.append(self.task_dict[node])
        return leave_list

    def find_not_leaves_task(self):
        not_leave_list = []
        for node in self.dag.nodes():
            if len(list(self.dag.successors(node))) != 0:
                not_leave_list.append(self.task_dict[node])
            # s = self.dag.successors(node)
            # if not next(s, None):
            #     leave_list.append(self.task_dict[node])
        return not_leave_list

    def find_all_task(self):
        all_list = []
        for node in self.dag.nodes():
            all_list.append(self.task_dict[node])
        return all_list

    def find_siblings(self, node_id):
        list_sibling = []
        pre = list(self.dag.predecessors(node_id))
        if len(pre) != 0:
            list_sibling = list(self.dag.successors(pre[0]))
        return list_sibling

    def view_graph(self):
        d = graphviz.Digraph("Simple")
        for id in self.task_dict.keys():
            c = self.get_completion(id)
            name = "{}".format(id)
            label = "T{}\n{}%".format(id,c)
            d.node(name, label)

        edges = self.dag.edges()
        for e in edges:
            parent_id = e[0]
            child_id = e[1]
            tail_name = "{}".format(parent_id)
            head_name = "{}".format(child_id)
            w = self.get_weight(child_id)
            label = "{}".format(w)
            d.edge(tail_name, head_name, label)
        d.view()

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
        _nodes = self.dag.nodes()
        for node in _nodes:
            nodes_list.append(self.task_dict[node])

        # print(nodes_list)
        _dag = {
            "edges": edges_list,
            "tasks": nodes_list
        }
        _dag_json = json.dumps(_dag, indent=4,sort_keys=True)

        with open(filename, 'w+') as f:
            f.write(_dag_json)
        print(filename)

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
                    'label': round(self.task_dict[edge[1]][self.col_weight_normalized], 2)
                }
                edges_list.append(e)
                i = i +1

            nodes_list = []
            _nodes = self.dag.nodes()
            for node in _nodes:
                dict_t = self.task_dict[node]
                for k, v in dict_t.items():
                    if v != "N/A" and k in ["weight_process"]:
                        dict_t[k] = round(v, 2)
                nodes_list.append(dict_t)

            _dag = {
                        "edges": edges_list,
                        "tasks": nodes_list
                    }
        except Exception as e:
            logger_task.info("Error {}".format(e))
        return _dag

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

            if "tasks" in d:
                _nodes = d["tasks"]
                for node in _nodes:
                    nid = node['id']
                    self.dag.add_node(nid)
                    self.task_dict[nid] = node
        return self.dag

    def check_id_node(self, cnx, id):
        ok = -1
        try:
            query = "SELECT * FROM cong_viec WHERE id = \"{}\" ".format(id)
            result = ut.emp_checkin_exec_query(cnx, query)
            if len(result) != 0:
                ok = 0
            else:
                ok = 1
        except Exception as e:
            print("Error {}".format(e))
        return ok

    # Add info
    def add_root(self, id, task = None):
        if not task:
            self.dag.add_node(id)
            self.task_dict[id] = task
        else:
            self.dag.add_node(id)
            self.task_dict[id] = create_simple_task(id)

    def add_child(self, pred_id, node_id, node_data):
        # add node to the predecessor node
        # print(pred_id, node_id, node_data)
        if not self.dag.has_predecessor(pred_id, node_id):
            # self.dag.add_node(node_id, node_data)
            # self.dag.add_node(node_id)
            self.dag.add_edge(pred_id, node_id)
            self.task_dict[node_id] = node_data

    def bfs_level_cal(self, source):
        G = self.dag
        neighbors = G.neighbors
        visited = {source}
        queue = deque([(source, neighbors(source))])
        self.task_level_dict = {source:0}
        while queue:
            parent, children = queue[0] # start with source and its neighbors
            try:
                child = next(children)
                if child not in visited:
                    self.task_level_dict[child] = self.task_level_dict[parent] + 1
                    visited.add(child)
                    queue.append((child, neighbors(child)))
            except StopIteration:
                queue.popleft()
        return self.task_level_dict

    def dfs_level_cal(self, source):
        G = self.dag
        nodes = [source]
        visited = set()
        self.task_level_dict = {source:0}
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
                        self.task_level_dict[child] = self.task_level_dict[parent] + 1
                        visited.add(child)
                        stack.append((child, iter(G[child])))
                except StopIteration:
                    stack.pop()
        return self.task_level_dict

    def dfs_list_node(self, source):
        list_node = []
        dict_t = self.dfs_level_cal(source)
        for k, v in dict_t.items():
            list_node.append(k)
        return list_node

    def bfs_list_node(self, source):
        list_node = []
        dict_t = self.bfs_level_cal(source)
        # print(dict_t)
        for k, v in dict_t.items():
            list_node.append(k)
        return list_node

    # Update info
    def update_node(self, node):
        print("toto")

    def update_weight_siblings(self, node_id):
        sum_weight = 0
        list_node_sibling = self.find_siblings(node_id)
        # print("list node: {}".format(list_node_sibling))
        for node in list_node_sibling:
            weight = self.task_dict[node][self.col_weight]
            # print(weight)
            sum_weight = sum_weight + weight
        # print(sum_weight)
        if sum_weight > 0:
            for node in list_node_sibling:
                # print(self.task_dict[node])
                self.task_dict[node][self.col_weight_normalized] = (self.task_dict[node][self.col_weight] / sum_weight) * 100

    def completion_cal(self):
        # update completion of child task backward to all it's parents tasks
        # completion of task is the mean of all children's completion
        lm = self.get_level_max()
        # print(lm)
        for i in range(0, lm + 1):
            l = lm - i
            # print("level {}".format(l))
            # print(self.task_level_dict)
            for tid in self.task_level_dict:
                if l == self.task_level_dict[tid]:
                    p = 0.
                    w = 0.
                    ss = list(self.dag.successors(tid))
                    # for s in ss:
                    #     t = self.task_dict[s]
                    #     w = w + t["weight_normalize"]
                    print("ss",ss)
                    list_state = []
                    sum_state = 0

                    for s in ss:
                        t = self.task_dict[s]
                        p = p + t[self.col_completion] * t[self.col_weight_normalized] / 100

                        sum_state = sum_state + t[self.col_state]
                        list_state.append(t[self.col_state])

                    if len(ss) > 0:
                        p = round(p, 2)
                        self.set_completion(tid, p)

                        # if sum_state == 3*len(ss):
                        #     state = 3
                        #     self.set_te(tid, get_current_datetime().strftime(DATETIME_FORMAT4))
                        if sum_state >= 3*len(ss) and all([x >= 3 for x in list_state]):
                            if self.get_te(tid) == "N/A":
                                state = 2
                            else:
                                state = 3
                        elif sum_state >= 1:
                            state = 1
                            if self.get_ts(tid) == "N/A":
                                self.set_ts(tid, get_current_datetime().strftime(DATETIME_FORMAT4))
                        else:
                            state = 0

                        self.set_state(tid, state)

                    print("tid {} completion: {}".format(tid, self.task_dict[tid][self.col_completion]), self.task_dict[tid][self.col_state])

    def update_parent_id_tree(self, id_tree, id_parent):
        id_root = self.find_root_id()
        if id_root != -1:
            self.set_parent(id_root, id_parent)
        for node in self.dag.nodes():
            self.set_id_tree(node, id_tree)


    def color_check(self, t_assigned, deadline, completion, te):
        p = time_progress_cal(t_assigned, deadline, te, fname = "")
        # logger_task.info("t_as: {} and deadline {}: {} %p".format(t_assigned, deadline, p))
        p = int(p)
        completion = int(completion)
        if p == -2: # khi thời gian hiện tại > deadline
            color_check = "#DD2C00"
        elif completion >= p:
            color_check = "#76FF03"
        elif completion < p:
            color_check = "#FFEE58"
        else:
            color_check = "#ECEFF1"
        return color_check

    def list_permission(self, email, data_task={}, fname=""):
        list_permission = []
        email = str(email).lower()
        owner = str(data_task[self.col_owner]).lower()
        reviewer = str(data_task[self.col_reviewer]).lower()
        assigned = str(data_task[self.col_assigned]).lower()
        kpi_quality = int(data_task[self.col_kpi_quality])
        state = int(data_task[self.col_state])
        _type = int(data_task[self.col_type])
        if _type == 1:
            if owner == email and state in [0,1]:
                list_permission.append("add")
                list_permission.append("edit")
                list_permission.append("cancel")
            elif reviewer == email and state == 2:
                list_permission.append("review")
        else:
            if email in [owner, assigned, reviewer]:
                if state == 2 and email == reviewer and kpi_quality == 0:
                    list_permission.append("review")
                elif state in [0,1]:
                    if email == owner:
                        list_permission.append("edit")
                        list_permission.append("cancel")
                    if email == assigned:
                        list_permission.append("add")
        return list_permission

    def list_bfs_task_gantt(self, source):
        list_task = []
        list_dfs = self.bfs_list_node(source)
        for node in list_dfs:
            list_task.append(self.task_dict[node])
        return list_task

    # Get info task
    def get_data_root_fr_id(self, cnx, id_root):
        dict_data = {}
        try:
            query = "SELECT * FROM cong_viec WHERE id = \"{}\" ".format(id_root)
            result = ut.emp_checkin_exec_query(cnx, query)
            if len(result) == 1:
                dict_data = copy.deepcopy(result[0])
                ut.convert_dict_none_datetime_to_str(dict_data)
        except Exception as e:
            logger_task.info("Error: {}".format(e))
        return dict_data

    def get_data_cmt_fr_id_task(self, cnx, id_task):
        list_cmt = []
        try:
            query = "SELECT * FROM binh_luan WHERE id_task = \"{}\" ".format(id_task)
            result = ut.emp_checkin_exec_query(cnx, query)
            for cmt in result:
                dict_t = copy.deepcopy(cmt)
                list_cmt.append(ut.convert_dict_none_datetime_to_str(dict_t))
        except Exception as e:
            logger_task.info("Error: {}".format(e))
        return list_cmt

    def get_level_max(self):
        self.bfs_level_cal(self.find_root_id())
        l = max(self.task_level_dict.values())
        return l

    #--------------------GET---------------------------

    def get_owner(self, tid):
        return self.task_dict[tid][self.col_owner]

    def get_assigned(self, tid):
        return self.task_dict[tid][self.col_assigned]

    def get_title(self, tid):
        return self.task_dict[tid][self.col_title]

    def get_description(self, tid):
        return self.task_dict[tid][self.col_description]

    def get_state(self, tid):
        return self.task_dict[tid][self.col_state]

    def get_priority(self, tid):
        return self.task_dict[tid][self.col_priority]

    def get_kpi_quality(self, tid):
        return self.task_dict[tid][self.col_kpi_quality]

    def get_completion(self, tid):
        return self.task_dict[tid][self.col_completion]

    def get_ts(self, tid):
        return self.task_dict[tid][self.col_ts]

    def get_te(self, tid):
        return self.task_dict[tid][self.col_te]

    def get_t_assigned(self, tid):
        return self.task_dict[tid][self.col_t_assigned]

    def get_deadline(self, tid):
        return self.task_dict[tid][self.col_deadline]

    def get_type(self, tid):
        return self.task_dict[tid][self.col_type]

    def get_problem(self, tid):
        return self.task_dict[tid][self.col_problem]

    def get_id_tree(self, tid):
        return self.task_dict[tid][self.col_id_tree]

    def get_t_create(self, tid):
        return self.task_dict[tid][self.col_t_create]

    def get_weight(self, tid):
        return self.task_dict[tid][self.col_weight]

    def get_weight_normalized(self, tid):
        return self.task_dict[tid][self.col_weight_normalized]

    def get_reviewer(self, tid):
        return self.task_dict[tid][self.col_reviewer]

    def get_t_duration(self, tid):
        return self.task_dict[tid][self.col_t_duration]

    def get_dict_all_info_of_node_fr_email(self, email, node, fname=""):
        data_task = {}
        list_content = []
        try:
            data_task = self.task_dict[node]
            data_task[self.col_permission] = self.list_permission(email=email, data_task=data_task, fname=fname)
            list_content = self.get_list_tag_fr_task(email=email, node=node, fname=fname)[self.col_list_content]
        except Exception as e:
            logger_task.info("Error get_dict_all_info_of_node_fr_email {}: {}".format(fname, e))
        dict_t = {
            "data_task": data_task,
            "list_content": list_content
        }
        return dict_t

    #--------------------SET---------------------------
    def set_completion(self, tid, completion):
        self.task_dict[tid][self.col_completion] = completion

    def set_weight(self, tid, weight):
        self.task_dict[tid][self.col_weight] = weight

    def set_reject(self, tid, reject):
        self.task_dict[tid][self.col_reject] = reject

    def set_state(self, tid, state):
        self.task_dict[tid][self.col_state] = state

    def set_t_assigned(self, tid, t_assigned):
        self.task_dict[tid][self.col_t_assigned] = t_assigned

    def set_ts(self, tid, ts):
        self.task_dict[tid][self.col_ts] = ts

    def set_te(self, tid, te):
        self.task_dict[tid][self.col_te] = te

    def set_deadline(self, tid, deadline):
        self.task_dict[tid][self.col_deadline] = deadline

    def set_problem(self, tid, problem):
        self.task_dict[tid][self.col_problem] = problem

    def set_kpi_quality(self, tid, kpi_quality):
        self.task_dict[tid][self.col_kpi_quality] = kpi_quality

    def set_assigned(self, tid, assigned):
        self.task_dict[tid][self.col_assigned] = assigned

    def set_title(self, tid, title):
        self.task_dict[tid][self.col_title] = title

    def set_description(self, tid, description):
        self.task_dict[tid][self.col_description] = description

    def set_priority(self, tid, priority):
        self.task_dict[tid][self.col_priority] = priority

    def set_reviewer(self, tid, reviewer):
        self.task_dict[tid][self.col_reviewer] = reviewer

    def set_id_tree(self, tid, id_tree):
        self.task_dict[tid][self.col_id_tree] = id_tree

    def set_parent(self, tid, parent):
        self.task_dict[tid][self.col_parent] = parent

    def set_t_duration(self, tid, t_duration):
        self.task_dict[tid][self.col_t_duration] = t_duration

    def set_type(self, tid, _type):
        self.task_dict[tid][self.col_type] = _type

if __name__ == '__main__':

    _filename = "graph.json"
    cnx = mysql.connector.connect(user='root', password='12345678',
                                  host='localhost',
                                  database='quanlycongviec')
    # f = fc_dag()
    # f.generate_successive()
    #
    # f.dump_to_json(_filename)
    #
    # f.load_from_json(_filename)
    #
    # _filename = "graph2.json"
    #
    # f.dump_to_json(_filename)
    #
    # f.set_completion(41, 100)
    # f.set_weight(31, 60)
    #
    # f.completion_cal()
    #
    # if has_graphviz:
    #     f.view_graph()
    f = fc_dag()
    task_base = fc_task(None)
    # id = 447
    f.load_from_db(cnx, 1)
    print(f.task_dict)
    # if len(f.dag.nodes()) > 1:
    #     id_root = f.find_root_id()
    #     if id_root != -1 and f.task_dict[id_root][f.col_type] == 2:
    #         for node in f.dag.nodes():
    #             if node != id:
    #                 print("node", node)
    #                 f.set_type(node, 3)
    # f.dumps_to_db(cnx)
    # print()
    # f.dumps_to_db(cnx)
    # print(f.task_dict)
    # f.dumps_to_db(cnx)
    # f.dfs_level_cal(f.find_root_id())
    # print(f.bfs_list_node(259))
    # print(f.check_title_in_tree("demo giao viêc"))

    # print(f.task_dict)
    # f1 = fc_dag()
    # f1.load_from_db(cnx, 289)

    # f.task_clone_list.append(copy.deepcopy(f.task_dict[181]))
    # f.set_state(181, 1)
    # print(f.task_dict)
    # print(f.dumps_to_db(cnx))
    # a = len(f.dag.nodes())
    # print(a)
    # a = f.find_title()
    # print(a)
    # print(f.task_dict)
    # f.set_completion(129, 100)
    # f.completion_cal()
    # f.dumps_to_db(cnx)
    # p =time_progress_cal("01/04/2021 12:00:00", "16/04/2021 00:00:00", "")
    # print(p)


