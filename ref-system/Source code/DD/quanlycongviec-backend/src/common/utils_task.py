from global_def import *
from common import utils as ut
import json
import pyotp
from flask_mail import Message, Mail
from model import fc_dag_type
from model import fc_task_random_id as random_id
import uuid
import re
from common import utils_check_parameter as ut_check
import copy
import flask
logger = ut.get_logger("utils_task", level=logging.INFO)
from model import file_send_email as fse

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def api_login(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    fname = "api_login"
    status = 0
    msg = "Đăng nhập thất bại, vui lòng kiểm tra tài khoản và mật khẩu!"
    ok = False
    _user = []
    dict_info = {
        "status": status,
        "msg": msg,
        "data": ""
    }
    user_ = res.get("user", None)
    pass_ = str(res.get("password", None))

    if user_ is not None and len(user_) != 0:
        if pass_ is not None and 8 <= len(pass_) <= 16:
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    if ut_check.check_email(user_):
                        query = "SELECT * FROM " + MYSQL_ACCOUNT_TB + " WHERE email = \"{}\"".format(user_)
                        result = ut.emp_checkin_exec_query(cnx, query)
                        if result is not None and len(result) != 0:
                            for i in result:
                                if user_ == i["email"] and pass_ == i["password"]:
                                    status = 1
                                    # _user.append(i["email"])
                                    msg = "Login thành công"
                                    ok = True
                        else:
                            msg = "Login không thành công, vui lòng kiểm tra lại thông tin"
                    else:
                        query = "SELECT * FROM " + MYSQL_ACCOUNT_TB + " WHERE username = \"{}\"".format(user_)
                        result = ut.emp_checkin_exec_query(cnx, query)
                        if result is not None and len(result) != 0:
                            for i in result:
                                if user_ == i["username"] and pass_ == i["password"]:
                                    status = 1
                                    msg = "Login thành công"
                                    ok = True
                        else:
                            msg = "Login không thành công, vui lòng kiểm tra lại thông tin"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dB"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Mật khẩu phải từ 8-16 ký tự!"
    else:
        msg = "Vui lòng kiểm tra lại tên tài khoản!"
    if ok:
        dict_info = {
            "status": status,
            "msg": msg,
            "data": i["email"]
        }
    return dict_info

def api_register(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    fname = "api_register"
    status = 0
    msg = "Đăng ký thất bại! Vui lòng thử lại sau."
    ok = False
    account = res.get("account", None)
    # email = res.get("email", None)
    user_ = res.get("user", None)
    pass_ = str(res.get("password", None))
    list_ = [account,pass_]

    if account is not None and len(account) != 0 and password is not None and len(password) != 0:
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    if "@" in account:
                        email = account
                        if ut_check.check_email(email):
                            cursor = cnx.cursor(buffered=True)
                            if pass_ is not None and len(pass_)!= 0:
                                qr_check = "SELECT email, username, password FROM " + MYSQL_ACCOUNT_TB
                                result = ut.emp_checkin_exec_query(cnx, qr_check)
                                if result is not None and len(result):
                                    for i in result:
                                        if i["email"] not in list_:
                                            qr = "INSERT INTO " + MYSQL_ACCOUNT_TB + "( email, username, password ) VALUES " + " ( \"{}\", \"{}\", \"{}\" ) ".format(email,user_,pass_)
                                            print(qr)
                                            cursor.execute(qr)
                                            cnx.commit()
                                            status = 1
                                            msg = "Đăng ký thành công"
                                        else:
                                            msg = "Thông tin đăng ký đã có trong hệ thống,vui lòng thử lại"
                            else:
                                msg = "Không được bỏ trống dữ liệu bắt buộc"

                        else:
                            msg = "Không đúng định dạng email, kiểm tra lại"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dB"
                logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Thiếu thông tin!"
    dict_info = {
        "status" : status,
        "msg": msg
    }
    return dict_info

def api_create_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    status = 0
    msg = "Cập nhật công việc thất bại"
    ok = False
    owner = res.get("owner", "")
    _type = str(res.get("type", ""))
    title = str(res.get("title", ""))
    assigned = res.get("assigned", "")
    list_id = {}
    if ut_check.check_email(owner):
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                # random id_task
                task_id = random_id.random_info()
                id = task_id.get_task_id(cnx, caller)
                if id != -1:
                    project = fc_dag_type.fc_task(id)
                    project.owner = res.get("owner", None)
                    project.assigned = res.get("assigned", None)
                    project.title = " ".join(title.split())
                    project.description = res.get("description", None)
                    project.priority = res.get("priority", None)
                    project.problem = res.get("problem", None)
                    project.t_assigned = res.get("t_assigned", None)
                    project.deadline = res.get("deadline", None)
                    project.t_create = get_current_datetime().strftime(DATETIME_FORMAT4)
                    project.reviewer = res.get("reviewer", None)
                    project.t_duration = res.get("t_duration", 0)
                    if _type != "0": # is project or person working
                        project.child_depart = ut.get_child_depart_fr_email_tb(cnx, project.owner, caller)
                        project.t_assigned = ut.convert_ngay_gio_import_Db(project.t_assigned, caller)
                        project.deadline = ut.convert_ngay_gio_import_Db(project.deadline, caller)
                        project.t_create = ut.convert_ngay_gio_import_Db(project.t_create, caller)
                        project.reviewer = project.owner
                        project.parent = id
                        project.id_tree = id
                        project.weight = 0
                        project.type = int(_type)
                        insert = project.insert_db(cnx, caller)
                        if insert:
                            msg = "OK"
                            status = 1
                            list_id["id_parent"] = id
                            list_id["id_tree"] = id

                    elif _type == "0":
                        project.child_depart = ut.get_child_depart_fr_email_tb(cnx, project.assigned, caller)

                        project.parent = int(res.get("parent", None))
                        project.id_tree = int(res.get("id_tree", None))
                        project.weight = float(res.get("weight", 10))
                        project.completion = float(res.get("completion", 0))
                        if project.parent is not None:
                            f = fc_dag_type.fc_dag()
                            # View 1 tree from id_tree
                            f.load_from_db(cnx, project.id_tree, caller)
                            # print(f.task_dict)
                            # rule: In a tree, only one title
                            if f.check_title_in_tree(project.title): # kiểm tra tiêu đề có trùng trong 1 cây không?
                                if len(f.dag.nodes()) == 1:
                                    id_root = list(f.dag.nodes())[0]
                                else:
                                    id_root = f.find_root_id()
                                f.add_child(project.parent, id, project.to_dict_task())
                                if f.get_type(id_root) == 2 and id_root != -1: # = -1 không tìm được root
                                    f.set_type(id, 3)  ## con của công việc riêng
                                f.update_weight_siblings(id)
                                # f.completion_cal()
                                dumps_db = f.dumps_to_db(cnx, caller)
                                if dumps_db:
                                    msg = "OK"
                                    status = 1
                            else:
                                msg = "Tiêu đề đã tồn tại"

                if msg == "OK":
                    # email_send = "phamnhutoan03041998@gmail.com"
                    email_send = assigned
                    # title = "Python is Good"
                    link_task = "http://localhost:4200/"
                    body = 'Bạn đã nhận được công việc mới: {}, vui lòng kiểm tra trên hệ thống. Kiểm tra tại {}'.format(
                        title, link_task)
                    ut.send_email(str(email_send), str(body))


            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"
    dict_info = {
        "status" : status,
        "msg": msg,
        "data_id": list_id
    }
    return dict_info

def api_list_id_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "type" : "current"  # "root"
    # }
    print(res)
    status = 0
    create_new = 0
    msg = "Lấy danh sách thất bại"
    list_task = []
    list_project = []
    dict_info_project = {}
    ok = False

    email = res.get("email", "N/A")
    _type = res.get("type", "")
    if ut_check.check_email(email) and _type != "":
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                print(_type)
                email = str(email).lower()
                task_info = fc_dag_type.fc_task(None)
                if _type == "current":
                    create_new = 1
                    list_task = task_info.get_list_root_and_assigned_task(cnx, email, caller)
                    ok = True

                elif _type == "root":
                    list_task = task_info.get_list_root_task(cnx, email, caller)
                    for i in list_task:
                        dag = fc_dag_type.fc_dag()
                        node_id = i["id"]
                        dag.load_from_db(cnx, node_id)
                        if len(dag.dag.nodes()) == 1:
                            list_task.remove(i)
                    ok = True

                elif _type == "project":
                    create_new = 1
                    list_id_tree = task_info.get_list_id_tree_fr_email_assigned_owner(cnx, email, 1, caller)
                    # print(list_id_tree)
                    for id_tree in list_id_tree:
                        dag = fc_dag_type.fc_dag()
                        dag.load_from_db(cnx, id_tree)
                        task_project = dag.task_dict[id_tree]
                        type_of_id_tree = dag.task_dict[id_tree][dag.col_type]
                        # print("task_project", task_project)
                        if type_of_id_tree == 1: # only sreach in tree is project (type = 1)
                            task_project["permission"] = dag.list_permission(email, task_project)
                            list_project.append(task_project)

                            list_assigned_task = []
                            # print(id_tree, dag.dag.nodes())
                            if len(dag.dag.nodes()) > 1:
                                list_t = []
                                for node in dag.dag.nodes():
                                    if node != dag.find_root_id():
                                        list_t.append(dag.task_dict[node])
                                # print("list_t",list_t)
                                for task in list_t:
                                    if email == str(task[dag.col_assigned]).lower():
                                        list_assigned_task.append(task)
                            # print("list_assigned_task", list_assigned_task)
                            dict_info_project[str(id_tree)] = list_assigned_task
                    ok = True
                if ok:
                    status = 1
                    msg = "OK"
                else:
                    list_task = []
                    list_project = []
                    dict_info_project = {}
            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"
    dict_info = {
        "status" : status,
        "msg": msg,
        "list_task": list_task,
        "create_new" : create_new,
        "list_project": list_project,
        "dict_info_project": dict_info_project
    }
    return dict_info

def api_tree_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "id_tree": "12",
    #     "type": "gantt"
    # }
    print(res)
    status = 0
    msg = "Lấy danh sách tất cả công việc thất bại"
    dict_data = {}
    ok = False

    email = res.get("email", "N/A")
    id_tree = int(res.get("id_tree", 0))
    view = res.get("view", "tree")
    if ut_check.check_email(email) and id_tree != 0:
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                dag = fc_dag_type.fc_dag()
                dag.load_from_db(cnx, id_tree)
                if len(dag.dag.nodes()) > 1:
                    if view == "gantt":
                        dict_t = dag.list_bfs_task_gantt(id_tree)
                    else:
                        dict_t = dag.dump_to_dict()
                    if dict_t != {}:
                        status = 1
                        msg = "OK"
                        dict_data = dict_t
                else:
                    status = 2
                    msg = "Dự án chưa có công việc con nên không có thông tin biểu đồ"
            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"
    dict_info = {
        "status" : status,
        "msg": msg,
        "dict_data": dict_data
    }
    return dict_info

def api_view_kanban(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # {
    #     "email": "phuongnam.nipt@fpt.net";
    # }
    print(res)
    status = 0
    msg = "Có lỗi xảy ra vui lòng thử lại sau ít phút"
    list_to_do = []
    list_doing = []
    list_waiting = []
    list_done = []
    ok = False

    email = res.get("email", "N/A")
    if ut_check.check_email(email):
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                email = str(email).lower()
                info_task = fc_dag_type.fc_task(None)

                # Find list id_tree email is assigned
                list_id_tree = info_task.get_list_root_task_fr_email_assigned(cnx, email, caller)
                # print("id tree",list_id_tree)
                if len(list_id_tree) != 0:
                    for id in list_id_tree:
                        dag = fc_dag_type.fc_dag()
                        dag.load_from_db(cnx, id)
                        # list_leadves = dag.find_leaves_task()
                        list_node_leadves = dag.find_leaves()
                        if len(dag.dag.nodes()) == 1:
                            list_node_leadves.append(id)
                        for leadves in list_node_leadves:
                            assigned = str(dag.get_assigned(leadves)).lower()
                            state = dag.get_state(leadves)
                            if assigned == email:
                                dict_t = dag.get_dict_all_info_of_node_fr_email(email=email, node=leadves, fname=caller)
                                if state == 3:
                                    list_done.append(dict_t)
                                elif state == 2:
                                    list_waiting.append(dict_t)
                                elif state == 1:
                                    list_doing.append(dict_t)
                                elif state == 0:
                                    list_to_do.append(dict_t)
                        # sort list deadline
                        # list_dung = sorted(result_dung, key=lambda i: i['time_answer'], reverse=False)
                        msg = "OK"
                        status = 1
                else:
                    status = 1
                    msg = "Bạn đang rảnh không có việc làm :)"
            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"
    dict_info = {
        "status" : status,
        "msg": msg,
        "list_to_do": list_to_do,
        "list_doing": list_doing,
        "list_waiting": list_waiting,
        "list_done": list_done
    }
    return dict_info

def api_edit_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller="", database=MYSQL_DATABASE_DB):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "data_task": {},
    #     "action": "todo_doing" # "cancel"
    # }
    print(res)
    status = 0
    msg = "Có lỗi xảy ra vui lòng thử lại sau ít phút"
    ok = False
    data_new = {}

    email = res.get("email", "N/A")
    data_task = res.get("data_task", "0")
    action = res.get("action", "")
    source_res = res.get("source_res", "")

    if isinstance(data_task, str) and source_res == "mobile":
        data_task = eval(data_task)
    try:
        if ut_check.check_email(email):
            id_tree = data_task["id_tree"]
            # id_parent = data_task["parent"]

            id_task = int(data_task["id"])
            state = int(data_task["state"])
            completion_task = float(data_task["completion"])
            kpi_quality = float(data_task["kpi_quality"])
            assigned = data_task["assigned"]
            problem = data_task.get("problem", "N/A")
            note = data_task.get("note", "N/A")

            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    id_tree = int(id_tree)
                    dag = fc_dag_type.fc_dag()
                    dag.load_from_db(cnx, id_tree)
                    # print(dag.task_dict)
                    # print(action)
                    if action == "todo_doing" and state == 0:
                        dag.set_ts(id_task, get_current_datetime().strftime(DATETIME_FORMAT4))
                        dag.set_state(id_task, 1)
                        ok = True

                    elif action == "edit":
                        assinged_old = dag.get_assigned(id_task)
                        title = " ".join(str(data_task["title"]).split())
                        if assinged_old != data_task["assigned"]:
                            dag.task_clone_list.append(copy.deepcopy(dag.task_dict[id_task]))
                        dag.set_assigned(id_task, data_task["assigned"])
                        dag.set_title(id_task, str(title))
                        dag.set_description(id_task, data_task["description"])
                        dag.set_priority(id_task, data_task["priority"])
                        dag.set_t_assigned(id_task, data_task["t_assigned"])
                        dag.set_deadline(id_task, data_task["deadline"])
                        dag.set_reviewer(id_task, data_task["reviewer"])
                        dag.set_t_duration(id_task, data_task["t_duration"])
                        dag.set_weight(id_task, data_task["weight"])
                        dag.update_weight_siblings(id_task)
                        ok = True

                    elif action == "cancel":
                        list_node_cancel = dag.dfs_list_node(id_task)
                        print(list_node_cancel)
                        for node_cancel in list_node_cancel:
                            dag.set_reject(node_cancel, 1)
                        dag.set_weight(id_task, 0)
                        dag.update_weight_siblings(id_task)
                        ok = True

                    else:
                        dag.set_completion(id_task, completion_task)
                        dag.set_problem(id_task, problem)

                        if action == "doing" and state == 1:
                            if int(completion_task) == 100:
                                dag.set_state(id_task, 2)
                            ok = True

                        elif action == "doing_reviewer" and state == 1:
                            dag.set_state(id_task, 2)
                            ok = True

                        elif action == "reviewer_done" and state == 2:
                            # print(id_task)
                            dag.set_kpi_quality(id_task, kpi_quality)
                            dag.set_state(id_task, 3)
                            dag.set_te(id_task, get_current_datetime().strftime(DATETIME_FORMAT4))
                            ok = True

                        elif action == "reviewer_doing" and state == 2:
                            dag.task_clone_list.append(copy.deepcopy(dag.task_dict[id_task]))
                            dag.set_assigned(id_task, assigned)
                            dag.set_state(id_task, 1)
                            dag.set_completion(id_task, 0)
                            # dag.set_note(id_task, note)
                            ok = True

                        elif action == "reviewer_todo" and state == 2:
                            dag.task_clone_list.append(copy.deepcopy(dag.task_dict[id_task]))
                            dag.set_assigned(id_task, assigned)
                            dag.set_deadline(id_task, data_task["deadline"])
                            dag.set_state(id_task, 0)
                            dag.set_completion(id_task, 0)
                            ok = True

                    if ok:
                        # update change tree
                        print("update change tree")
                        print(dag.task_dict[id_task][dag.col_state])
                        listtmp = list(dag.dag.nodes())
                        # print(listtmp)
                        if len(listtmp) > 1:# 1 tree phải có từ 2 nút trở lên
                            if id_task != dag.find_root_id():
                                dag.completion_cal()
                        # print(dag.task_dict[id_task])
                        dict_t = copy.deepcopy(dag.task_dict[id_task])
                        # print(dag.task_dict)
                        dumps_db = dag.dumps_to_db(cnx)
                        if dumps_db:
                            msg = "OK"
                            status = 1
                            data_new = dict_t

                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút {}".format(ex)
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status": status,
        "msg": msg,
        "data_new": data_new
    }
    print(dict_info)
    return dict_info

def api_view_owner(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    # }
    print(res)
    status = 0
    msg = "Có lỗi xảy ra vui lòng thử lại sau ít phút"
    ok = False

    email = res.get("email", "N/A")
    list_none_tree = []
    list_project = []
    list_child_task = []
    list_reviewer = []
    try:
        if ut_check.check_email(email):
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    email = str(email).lower()
                    info_task = fc_dag_type.fc_task(None)
                    f = fc_dag_type.fc_dag()
                    list_owner = info_task.get_list_owner_task(cnx, email, caller)
                    print(list_owner)
                    for i in list_owner:
                        dict_t = {}
                        dict_t["data_task"] = {}
                        list_content = []

                        if i[info_task.col_state] == 0:
                            list_content.append({"content": "Chưa làm", "color": "#616161"}) # Xám
                        elif i[info_task.col_state] == 1:
                            if i[info_task.col_assigned] is None and i[info_task.col_type] != 1:
                                list_content.append({"content": "Chưa phân công", "color": "#AEEA00"})  # Vàng
                            else:
                                list_content.append({"content": "Đang làm", "color": "#0277BD"}) # Xanh da trời
                        elif i[info_task.col_state] == 2:
                            if str(email).lower() == i[info_task.col_reviewer]:
                                list_content.append({"content": "Đánh giá", "color": "#AA00FF"}) # Tím
                            else:
                                list_content.append({"content": "Chờ đánh giá", "color": "#DD2C00"}) # Cam
                        else:
                            list_content.append({"content": "Hoàn thành", "color": "#2E7D32"}) # Xanh lá

                        if get_current_datetime() > i[info_task.col_deadline]:
                            list_content.append({"content": "Quá hạn", "color": "#B71C1C"}) # Đỏ
                        else:
                            list_content.append({"content": "Còn hạn", "color": "#304FFE"}) # Xanh biển

                        # dict_t["data_task"] = ut.convert_dict_none_datetime_to_str(i)
                        dict_t["data_task"] = f.output_dB_convert_datetime_to_str(dict_data=i, fname=caller)
                        dict_t["data_task"]["data_cmt"] = f.get_data_cmt_fr_id_task(cnx, i[f.col_id])
                        dict_t["data_task"]["data_root"] = f.get_data_root_fr_id(cnx, i[f.col_id_tree])
                        dict_t["list_content"] = list_content

                        if i[f.col_type] == 2:
                            list_none_tree.append(dict_t)
                        elif i[f.col_type] == 1:
                            list_project.append(dict_t)
                        else:
                            list_child_task.append(dict_t)
                    status = 1
                    msg = "OK"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_none_tree": list_none_tree,
        "list_project": list_project,
        "list_child_task": list_child_task
    }
    return dict_info

def api_list_email_available(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "type_of": "create_task"
    # }
    print(res)
    status = 0
    msg = "Không có nhân viên để giao việc"
    ok = False

    email = res.get("email", "N/A")
    type_of = res.get("type_of", "")
    list_can_assigned = []
    list_can_reviewer = []
    try:
        if ut_check.check_email(email):
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    info_task = fc_dag_type.fc_task(None)
                    if type_of == "create_task":
                        list_can_assigned = info_task.get_list_email_can_assigned(cnx, email, caller)
                        # print(list_can_assigned)
                        list_can_reviewer = info_task.get_list_email_can_reviewer(cnx, email, caller)
                        # print(list_can_reviewer)
                        status = 1
                        msg = "OK"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_can_assigned": list_can_assigned,
        "list_can_reviewer": list_can_reviewer
    }
    print(dict_info)
    return dict_info

def api_sent_cmt_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "id_task": 200,
    #     "cmt": "Đã làm xong 20% việc"
    # }
    print(res)
    status = 0
    msg = "Gửi thất bại, vui lòng gửi lại sau ít phút"

    email = res.get("email", "N/A")
    id_task = int(res.get("id_task", 0))
    cmt = str(res.get("cmt", ""))

    data_cmt = []
    try:
        if ut_check.check_email(email) and id_task > 0 and cmt != "":
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    cmt_info = fc_dag_type.fc_cmt(id_task)
                    f = fc_dag_type.fc_dag()
                    cmt_info.id_task = id_task
                    cmt_info.email = email
                    cmt_info.name = ut.get_ho_ten_fr_email_tb(cnx, email, caller)
                    print(cmt_info.name)
                    cmt_info.cmt = cmt
                    insert_cmt = cmt_info.insert_db(cnx, caller)
                    if insert_cmt:
                        msg = "Gửi thành công"
                        status = 1
                        data_cmt = f.get_data_cmt_fr_id_task(cnx, id_task)
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "data_cmt": data_cmt
    }
    return dict_info

def api_view_kanban_web(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # {
    #     "email": "phuongnam.nipt@fpt.net";
    # }
    print(res)
    status = 0
    msg = "Có lỗi xảy ra vui lòng thử lại sau ít phút"
    list_to_do = []
    list_doing = []
    list_waiting = []
    list_done = []

    list_to_do2 = []
    list_doing2 = []
    list_waiting2 = []
    list_done2 = []
    ok = False

    email = res.get("email", "N/A")
    if ut_check.check_email(email):
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                email = str(email).lower()
                info_task = fc_dag_type.fc_task(None)

                # Find list id_tree email is assigned
                list_id_tree = info_task.get_list_root_and_personal_work_task(cnx, email, caller)
                # print("id tree",list_id_tree)
                if len(list_id_tree) != 0:
                    for d_id_tree in list_id_tree:
                        id = d_id_tree["id"]
                        if id > 0:
                            dag = fc_dag_type.fc_dag()
                            dag.load_from_db(cnx, id)
                            # print("AAAAA")
                            list_leadves = dag.find_leaves_task()
                            # print(list_leadves)
                            if len(dag.dag.nodes()) == 1:  # trường hợp công việc lơ lửng mới chỉ có 1 task
                                list_leadves.append(dag.task_dict[id])

                            list_all_task = dag.find_all_task()

                            for leadves in list_leadves:
                                leadves = copy.deepcopy(leadves)
                                assigned = str(leadves[info_task.col_assigned]).lower()
                                state = leadves[info_task.col_state]
                                if email == assigned and state == 3:
                                    leadves["doing"] = 0
                                    leadves["edit"] = 0
                                    leadves["add"] = 0
                                    leadves["review"] = 0
                                    list_done.append(leadves)
                                elif email == assigned and state == 2:
                                    leadves["doing"] = 0
                                    leadves["edit"] = 0
                                    leadves["add"] = 0
                                    leadves["review"] = 0
                                    list_waiting.append(leadves)
                                elif email == assigned and state == 1:
                                    leadves["doing"] = 1
                                    leadves["edit"] = 0
                                    leadves["add"] = 1
                                    leadves["review"] = 0
                                    list_doing.append(leadves)
                                elif email == assigned and state == 0:
                                    leadves["doing"] = 0
                                    leadves["edit"] = 0
                                    leadves["add"] = 1
                                    leadves["review"] = 0
                                    list_to_do.append(leadves)

                            for not_leadves in list_all_task:
                                not_leadves = copy.deepcopy(not_leadves)

                                owner = str(not_leadves[info_task.col_owner]).lower()
                                assigned = str(not_leadves[info_task.col_assigned]).lower()
                                reviewer = str(not_leadves[info_task.col_reviewer]).lower()
                                state = not_leadves[info_task.col_state]

                                if owner == email or assigned == email or reviewer == email:
                                    if state == 3:
                                        not_leadves["edit"] = 0
                                        not_leadves["add"] = 0
                                        not_leadves["review"] = 0
                                        list_done2.append(not_leadves)
                                    elif state == 2:
                                        not_leadves["edit"] = 0
                                        not_leadves["add"] = 0
                                        if email == reviewer:
                                            not_leadves["review"] = 1
                                        else:
                                            not_leadves["review"] = 0
                                        list_waiting2.append(not_leadves)
                                    elif state == 1:
                                        if email == owner:
                                            not_leadves["edit"] = 1
                                        else:
                                            not_leadves["edit"] = 0
                                        if email == assigned:
                                            not_leadves["add"] = 1
                                        else:
                                            not_leadves["add"] = 0
                                        not_leadves["review"] = 0
                                        list_doing2.append(not_leadves)
                                    elif state == 0:
                                        if email == owner:
                                            not_leadves["edit"] = 1
                                        else:
                                            not_leadves["edit"] = 0
                                        if email == assigned:
                                            not_leadves["add"] = 1
                                        else:
                                            not_leadves["add"] = 0
                                        not_leadves["review"] = 0
                                        list_to_do2.append(not_leadves)

                            # sort list deadline
                            # list_dung = sorted(result_dung, key=lambda i: i['time_answer'], reverse=False)
                            msg = "OK"
                            status = 1
                else:
                    status = 1
                    msg = "Bạn đang rảnh không có việc làm :)"
            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"
    dict_info = {
        "status" : status,
        "msg": msg,
        "dict_kanban" : {
            "list_to_do": list_to_do,
            "list_doing": list_doing,
            "list_waiting": list_waiting,
            "list_done": list_done
        },
        "dict_owner_reviewer":{
            "list_to_do": list_to_do2,
            "list_doing": list_doing2,
            "list_waiting": list_waiting2,
            "list_done": list_done2
        }
    }
    return dict_info

def api_following_task(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "condition": {
    #                     "from_date": "01/04/2021",
    #                     "to_date": "08/04/2021",
    #     }
    # }
    print(res)
    status = 0
    msg = "Lấy thông tin thất bại"
    email = res.get("email", "N/A")
    source_res = res.get("source_res", "N/A")
    condition = res.get("condition", "")

    if isinstance(condition, str) and source_res == "mobile":
        condition = eval(condition)

    list_data = []
    print(condition)
    try:
        if ut_check.check_email(email) == True and ut_check.check_condition(condition, email, caller) == True:
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    email = str(email).lower()
                    info_task = fc_dag_type.fc_task(None)
                    f = fc_dag_type.fc_dag()
                    list_root = info_task.get_list_following_task_fr_email(cnx, email, caller)
                    for i in list_root:
                        dict_t = {}
                        dict_t["data_task"] = {}
                        list_content = []

                        if i[info_task.col_state] == 0:
                            list_content.append({"content": "Chưa làm", "color": "#616161"})  # Xám
                        elif i[info_task.col_state] == 1:
                            if i[info_task.col_assigned] is None and i[info_task.col_type] != 1:
                                list_content.append({"content": "Chưa phân công", "color": "#AEEA00"})  # Vàng
                            else:
                                list_content.append({"content": "Đang làm", "color": "#0277BD"})  # Xanh da trời
                        elif i[info_task.col_state] == 2:
                            if str(email).lower() == i[info_task.col_reviewer]:
                                list_content.append({"content": "Đánh giá", "color": "#AA00FF"})  # Tím
                            else:
                                list_content.append({"content": "Chờ đánh giá", "color": "#DD2C00"})  # Cam
                        else:
                            list_content.append({"content": "Hoàn thành", "color": "#2E7D32"})  # Xanh lá

                        if get_current_datetime() > i[info_task.col_deadline]:
                            list_content.append({"content": "Quá hạn", "color": "#B71C1C"})  # Đỏ
                        else:
                            list_content.append({"content": "Còn hạn", "color": "#304FFE"})  # Xanh biển

                        # dict_t["data_task"] = ut.convert_dict_none_datetime_to_str(i)
                        dict_t["data_task"] = f.output_dB_convert_datetime_to_str(dict_data=i, fname=caller)
                        dict_t["data_task"]["data_cmt"] = f.get_data_cmt_fr_id_task(cnx, i[f.col_id])
                        dict_t["data_task"]["data_root"] = f.get_data_root_fr_id(cnx, i[f.col_id_tree])
                        dict_t["list_content"] = list_content
                        list_data.append(dict_t)
                    status = 1
                    msg = "OK"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_data": list_data
    }
    return dict_info

def api_following_task2(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "condition": {
    #                     "from_date": "01/04/2021",
    #                     "to_date": "08/04/2021",
    #                     "id_tree": [259,285],
    #                     "tag": ["Còn hạn", "Hết hạn"]
    #     }
    # }
    print(res)
    status = 0
    msg = "Lấy thông tin thất bại"
    email = res.get("email", "N/A")
    source_res = res.get("source_res", "N/A")
    condition = res.get("condition", "")

    if isinstance(condition, str) and source_res == "mobile":
        condition = eval(condition)
    list_data = []
    try:
        if ut_check.check_email(email) == True and ut_check.check_condition(condition, email, caller) == True:
            from_date = condition.get("from_date", "")
            to_date = condition.get("to_date", "")
            list_id_tree = condition.get("id_tree", [])
            list_tag = condition.get("tag", [])

            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    info_task = fc_dag_type.fc_task(None)
                    f = fc_dag_type.fc_dag()

                    if list_id_tree == []: # get default all id_tree project and personal_task
                        list_id_tree = info_task.get_list_id_tree_fr_date(cnx=cnx, from_date=from_date, to_date=to_date, _type="1,2", fname=caller)
                    if list_tag == []: # get default all list_tag
                        list_tag = fc_dag_type.tag_table.list_tag
                    # print(list_tag)
                    email = str(email).lower()
                    # print(list_id_tree)
                    for id_tree in list_id_tree:
                        # print(id_tree)
                        f.load_from_db(cnx, id_tree)
                        for node in f.dag.nodes():
                            owner = str(f.get_owner(node)).lower()
                            assigned = str(f.get_assigned(node)).lower()
                            reviewer = str(f.get_reviewer(node)).lower()
                            _type = f.get_type(node)
                            # print(node, id_tree, email, _type)
                            # print([owner, assigned, reviewer])
                            if email in [owner, assigned, reviewer] and _type != 1:
                                # print(node)
                                dict_tag = f.get_list_tag_fr_task(email, node, caller) # return list_key_content, list_content
                                # print(dict_tag)
                                list_key_content = dict_tag["list_key_content"]
                                # print(list_key_content)
                                if fc_dag_type.check_intersection(list_key_content, list_tag):
                                    # dict_t[f.col_data_task] = {}
                                    # dict_t[f.col_data_task] = f.task_dict[node]
                                    # dict_t[f.col_data_task][f.col_permission] = f.list_permission(email, dict_t[f.col_data_task])
                                    # dict_t[f.col_list_content] = dict_tag[f.col_list_content]
                                    dict_t = f.get_dict_all_info_of_node_fr_email(email=email, node=node, fname=caller)
                                    list_data.append(dict_t)
                    if len(list_data) != 0:
                        status = 1
                        msg = "OK"
                    else:
                        msg = "Không có dữ liệu phù hợp điều kiện của bạn"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_data": list_data
    }
    return dict_info

def api_get_filter(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #      "type": "following_task", # or "project"
    # }
    print(res)
    status = 0
    msg = "Lấy thông tin thất bại"
    email = res.get("email", "N/A")
    type_input = res.get("type", "")
    # source_res = res.get("source_res", "N/A")
    # condition = res.get("condition", "")
    # if isinstance(condition, str) and source_res == "mobile":
    #     condition = eval(condition)
    list_project = []
    list_personal_task = []
    list_tag = []
    ok = False
    try:
        if ut_check.check_email(email):
            if type_input in ["following_task", "project"]:
                cnx = ut.make_db_connection(user=user, host=host, password=password)
                if cnx is not None:
                    try:
                        email = str(email).lower()
                        info_task = fc_dag_type.fc_task(None)

                        # get all project/personal fr email (owner, assigned, reviewer)
                        list_id_tree = info_task.get_list_id_tree_fr_email(cnx=cnx, email=email, _type=type_input, fname=caller)
                        # get all tag
                        list_tag = fc_dag_type.tag_table.list_content_tag
                        for id_tree in list_id_tree:
                            dict_t = {}
                            # print(id_tree)
                            f = fc_dag_type.fc_dag()
                            f.load_from_db(cnx, id_tree)
                            _type = f.get_type(id_tree)
                            dict_t[f.col_id] = f.get_id_tree(id_tree)
                            dict_t[f.col_title] = f.get_title(id_tree)
                            if _type == 1:
                                list_project.append(dict_t)
                            elif _type == 2:
                                list_personal_task.append(dict_t)
                        msg = "OK"
                        status = 1
                    except Exception as ex:
                        msg = "Có lỗi trong quá trình xử lý, vui lòng thử lại sau ít phút"
                        logger.info("Error {}: {}".format(caller, ex))
                    finally:
                        cnx.close()
                else:
                    msg = "Lỗi kết nối server, vui lòng thử lại sau ít phút"
                    logger.info("Error {}: Database connection error".format(caller))
            else:
                msg = "Sai thông tin đầu vào"
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_project": list_project,
        "list_personal_task": list_personal_task,
        "list_tag": list_tag
    }
    return dict_info

def api_project(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # a = {
    #     "email": "phuongnam.nipt@fpt.net",
    #     "condition": {
    #                     "from_date": "01/04/2021",
    #                     "to_date": "08/04/2021",
    #                     "id_tree": [259,285],
    #                     "tag": ["Còn hạn", "Hết hạn"]
    #     }
    # }
    print(res)
    status = 0
    msg = "Lấy thông tin thất bại"
    email = res.get("email", "N/A")
    source_res = res.get("source_res", "N/A")
    condition = res.get("condition", "")

    if isinstance(condition, str) and source_res == "mobile":
        condition = eval(condition)
    list_data = []
    try:
        if ut_check.check_email(email) == True and ut_check.check_condition(condition, email, caller) == True:
            from_date = condition.get("from_date", "")
            to_date = condition.get("to_date", "")
            list_id_tree = condition.get("id_tree", [])
            list_tag = condition.get("tag", [])

            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    info_task = fc_dag_type.fc_task(None)
                    f = fc_dag_type.fc_dag()

                    if list_id_tree == []: # get default all id_tree project and personal_task
                        list_id_tree = info_task.get_list_id_tree_fr_date(cnx=cnx, from_date=from_date, to_date=to_date, _type="1", fname=caller)
                    if list_tag == []: # get default all list_tag
                        list_tag = fc_dag_type.tag_table.list_tag
                    # print(list_tag)
                    email = str(email).lower()
                    # print(list_id_tree)
                    for id_tree in list_id_tree:
                        # print(id_tree)
                        f.load_from_db(cnx, id_tree)
                        for node in f.dag.nodes():
                            owner = str(f.get_owner(node)).lower()
                            _type = f.get_type(node)
                            # print(email, owner, _type)
                            if email == owner and _type == 1:
                                dict_tag = f.get_list_tag_fr_task(email, node, caller) # return list_key_content, list_content
                                # print(dict_tag)
                                list_key_content = dict_tag["list_key_content"]
                                # Giao 2 list lấy phần chung
                                if fc_dag_type.check_intersection(list_key_content, list_tag):
                                    dict_t = f.get_dict_all_info_of_node_fr_email(email=email, node=node, fname=caller)
                                    list_data.append(dict_t)
                    if len(list_data) != 0:
                        status = 1
                        msg = "OK"
                    else:
                        msg = "Không có dữ liệu phù hợp điều kiện của bạn"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_data": list_data
    }
    return dict_info

def api_get_info_child_depart(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    # Example
    # {
    #     "email": "phuongnam.nipt@fpt.net",
    #      "type": "child_depart"
    # }
    print(res)
    status = 0
    msg = "Lấy danh sách thất bại"
    ok = False

    email = res.get("email", "N/A")
    _type = res.get("type", "")
    dict_assigned = {}
    list_assigned = []
    if ut_check.check_email(email) and _type != "":
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                email = str(email).lower()
                task_info = fc_dag_type.fc_task(None)
                if _type == "child_depart":
                    info_data = task_info.get_dict_child_depart(cnx=cnx, email=email, fname=caller)
                    dict_assigned = info_data["dict_info"]
                    print("aaaaaaa",info_data)
                    list_assigned = info_data["list_child_depart"]
                    ok = True
                if ok:
                    status = 1
                    msg = "OK"
            except Exception as ex:
                msg = "Có lỗi trong quá trình xử lý"
                logger.info("Error {}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            msg = "Lỗi kết nối dB"
            logger.info("Error {}: Database connection error".format(caller))
    else:
        msg = "Không đúng định dạng email"

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_assigned" : list_assigned,
        "dict_info_assigned": dict_assigned,
        "list_reviewer": list_assigned,
        "dict_info_reviewer": dict_assigned
    }
    return dict_info


def api_filter_cv_fe(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):

    time_now = get_current_datetime()
    time_1 =  ut.convert_datetimeDb(time_now + timedelta(-1))
    time_2 = ut.convert_datetimeDb(time_now + timedelta(1))
    print(time_1)
    print(time_2)
    owner = res.get("email", None)
    date_from = str(res.get("date_from",time_1))
    date_to = str(res.get("date_to",time_2))
    state = res.get("state", "")
    priority = res.get("priority", "")
    id_du_an = res.get("du_an", "")
    status = 0
    msg = "Có lỗi xảy ra vui lòng thử lại sau ít phút"

    list_task = []
    try:
        if ut_check.check_email(owner):
            cnx = ut.make_db_connection(user=user, host=host, password=password)
            if cnx is not None:
                try:
                    date_to = ut.convert_ngay_gio_import_Db(date_to)
                    date_from = ut.convert_ngay_gio_import_Db(date_from)
                    dkien_state = ""
                    dkien_priority = ""
                    dkien_date_from = " t_create > \"{}\" AND".format(date_from)
                    dkieu_date_to = " t_create < \"{}\"".format(date_to)
                    dk_and = ""
                    dk_da = ""
                    if id_du_an != "":
                        dk_da = " AND id_tree = \"{}\" AND".format(id_du_an)
                    if state != "" and id_du_an =="":
                        dkien_state = " AND state = \"{}\" AND ".format(state)
                    if state != "" and id_du_an !="":
                        dkien_state = " AND state = \"{}\" ".format(state)
                    elif state == "" and id_du_an == "":
                        dk_and = " AND"
                    if priority !="":
                        dkien_priority = " priority = \"{}\" AND".format(priority)
                    query = "SELECT * FROM " + MYSQL_PCCV_TB + " WHERE owner = \"{}\"".format(owner)+ dk_and + dkien_state + dk_da  + dkien_priority + dkien_date_from + dkieu_date_to
                    print(query)
                    kq_query = ut.emp_checkin_exec_query(cnx, query, caller)
                    for i in kq_query:
                        dict_filter_cv = {}
                        dict_filter_cv["id"] = i["id"]
                        dict_filter_cv["title"] = i["title"]
                        dict_filter_cv["priority"] = i["priority"]
                        dict_filter_cv["state"] = i["state"]
                        dict_filter_cv["progression"] = i["progression"]
                        dict_filter_cv["owner"] = i["owner"]
                        dict_filter_cv["assigned"] = i["assigned"]
                        dict_filter_cv["type"] = i["type"]
                        dict_filter_cv["t_create"] = (i["t_create"])
                        dict_filter_cv["deadline"] = (i["deadline"])
                        dict_t = {}
                        list_content = []
                        if dict_filter_cv["state"] == 0:
                            list_content.append({"content": "Chưa làm", "color": "#616161"}) # Xám
                        elif dict_filter_cv["state"] == 1:
                            if dict_filter_cv["assigned"] is None and dict_filter_cv["type"] != 1:
                                list_content.append({"content": "Chưa phân công", "color": "#AEEA00"})  # Vàng
                            else:
                                list_content.append({"content": "Đang làm", "color": "#0277BD"}) # Xanh da trời
                        elif dict_filter_cv["state"] == 2:
                            if str(owner).lower() == i["reviewer"]:
                                list_content.append({"content": "Đánh giá", "color": "#AA00FF"}) # Tím
                            else:
                                list_content.append({"content": "Chờ đánh giá", "color": "#DD2C00"}) # Cam
                        else:
                            list_content.append({"content": "Hoàn thành", "color": "#2E7D32"}) # Xanh lá

                        if time_now > dict_filter_cv["deadline"]:
                            list_content.append({"content": "Quá hạn", "color": "#B71C1C"}) # Đỏ
                        else:
                            list_content.append({"content": "Còn hạn", "color": "#304FFE"}) # Xanh biển

                        dict_t["data_task"] = ut.convert_dict_none_datetime_to_str(dict_filter_cv)
                        dict_t["list_content"] = list_content
                        list_task.append(dict_t)
                        print(list_task)

                    status = 1
                    msg = "OK"
                except Exception as ex:
                    msg = "Có lỗi trong quá trình xử lý vui lòng thử lại sau ít phút"
                    logger.info("Error {}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                msg = "Lỗi kết nối dữ liệu, vui lòng thử lại sau ít phút"
                logger.info("Error {}: Database connection error".format(caller))
        else:
            msg = "Không đúng định dạng email"
    except Exception as ex:
        logger.info("Error {}: {}".format(caller, ex))

    dict_info = {
        "status" : status,
        "msg": msg,
        "list_task": list_task
    }
    return dict_info

def api_get_du_an(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):

    email = res.get("email", None)
    list_id_tree = []
    list_da = []
    if email is not None:
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                query = " SELECT id_tree FROM " + MYSQL_PCCV_TB + " WHERE owner = \"{}\"".format(email)
                result = ut.emp_checkin_exec_query(cnx, query, caller)
                for i in result:
                    list_id_tree.append(i["id_tree"])
                    list_id_tree1 = list(set(list_id_tree))
                    print(list_id_tree1)
                for x in list_id_tree1:
                    query2 = "SELECT id, title FROM " + MYSQL_PCCV_TB + " WHERE id = \"{}\" ".format(x)
                    result2 = ut.emp_checkin_exec_query(cnx, query2, caller)
                    for i in result2:
                        list_da_nguon = {}
                        list_da_nguon["id"] = i["id"]
                        list_da_nguon["root"] = i["title"]
                        list_da.append(list_da_nguon)
            except Exception as ex:
                logger.exception("{}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            logger.info("Error {}: Database connection error".format(caller))
            return json.dumps({'error': 'Database connection error'}), 200
    # checkinstr = ut.encrypt_server(iv, str(dict_ptq_tb), caller)
    msg = list_da
    return json.dumps({'msg': msg}), 200

def api_report_total_fe(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    time_now = get_current_datetime()
    time_1 =  ut.convert_datetimeDb(time_now + timedelta(-1))
    time_2 = ut.convert_datetimeDb(time_now + timedelta(1))
    email = res.get("email", None)
    moc_thoi_gian = res.get("moc_thoi_gian","t_assigned")
    date_from = str(res.get("date_from",time_1))
    date_to = str(res.get("date_to",time_2))
    child_depart = res.get("child_depart","")
    kieu_cv = res.get("kieu_cv","")
    state = res.get("state","")

    ds_report = {}
    sl_owner  = []
    sl_assigned = []
    sl_nv = []
    list_my_da = []
    list_my_cv = []
    sl_da_ht = 0
    sl_da_cht = 0
    sl_cv_ht = 0
    sl_cv_cht = 0
    chua_lam = 0
    dang_lam = 0
    cho_review = 0
    hoan_thanh = 0
    list_nvxs = []
    list_cv_nvxs = []

    if email is not None:
        if ut_check.check_email(email):
            cnx = ut.make_db_connection(user=user, host=host, password=password)

            if cnx is not None:
                try:
                    # Thong ke so nhan vien dang hoat dong trong tool giao viec
                    date_to = ut.convert_ngay_gio_import_Db(date_to)
                    date_from = ut.convert_ngay_gio_import_Db(date_from)
                    dkien_date_from = " >= \"{}\" AND ".format(date_from)
                    dkieu_date_to = " <= \"{}\" ".format(date_to)
                    dk_child_depart = ""
                    if child_depart != "":
                        dk_child_depart = " AND a.child_depart = \"{}\" ".format(child_depart)

                    dk_state = ""
                    if state != "":
                        dk_state = " AND state = \"{}\" ".format(state)

                    dk_kieu_or_1 =  " AND type = 1 AND owner = \"{}\" and reject ='0' ".format(email) + dk_state +  " or type = 2 AND owner = \"{}\" and reject ='0' ".format(email) + dk_state
                    dk_kieu_or_2 =  moc_thoi_gian + dkien_date_from + moc_thoi_gian + dkieu_date_to +" AND assigned = \"{}\" AND reject ='0' ".format(email) + dk_child_depart  + dk_state
                    dk_kieu_da = dk_kieu_or_1 + " or " + dk_kieu_or_2
                    dk_kieu_cv = " AND owner = \"{}\" and reject ='0' or assigned = \"{}\" AND reject ='0' ".format(email,email)
                    if kieu_cv != "":
                        if kieu_cv == "1":
                            dk_kieu_cv =" AND owner = \"{}\" and reject ='0' ".format(email) + dk_state
                        elif kieu_cv == "0":
                            dk_kieu_cv =" AND assigned = \"{}\" AND reject ='0' ".format(email) + dk_state

                    query_tong_nv = " SELECT owner,assigned FROM " + MYSQL_PCCV_TB + " WHERE reject ='0'"
                    result_tong_nv = ut.emp_checkin_exec_query(cnx, query_tong_nv, caller)
                    for u in result_tong_nv:
                        sl_owner.append(u["owner"])
                        sl_assigned.append(u["assigned"])
                    sl_nv_1 = sl_owner + sl_assigned
                    for i in sl_nv_1:
                        if i is not None and i != "":
                            i = str(i)
                            sl_nv.append(i)
                    sl_nv = [each_string.lower() for each_string in sl_nv]
                    sl_nv = len(list(set(sl_nv)))

                    # Thong ke so du an dang hoat dong cua email truyen vao
                    query = "SELECT a.child_depart, b.* FROM " + MYSQL_EMP_TB + " a INNER JOIN " + MYSQL_PCCV_TB + " b ON a.email = b.owner "
                    query_da = query + " WHERE "+ moc_thoi_gian + dkien_date_from + moc_thoi_gian + dkieu_date_to + dk_child_depart + dk_kieu_da
                    result_query_da = ut.emp_checkin_exec_query(cnx, query_da, caller)
                    for a in result_query_da:
                        list_my_da.append(a["id_tree"])
                    list_my_da = list(set(list_my_da))
                    tong_sl_da = len(list_my_da)
                    for a in list_my_da:
                        query_tt_da = "SELECT state FROM " + MYSQL_PCCV_TB + " WHERE id = \"{}\"".format(a)
                        result_tt_da = ut.emp_checkin_exec_query(cnx, query_tt_da, caller)
                        for b in result_tt_da:
                            if b["state"] == 3:
                                sl_da_ht +=1
                            else:
                                sl_da_cht +=1

                    # Thong ke so cong viec va trang thai

                    query_cv = query + " WHERE " + moc_thoi_gian + dkien_date_from + moc_thoi_gian + dkieu_date_to + dk_child_depart + dk_kieu_cv
                    result_query_cv = ut.emp_checkin_exec_query(cnx, query_cv, caller)
                    for c in result_query_cv:
                        list_my_cv.append(c["id"])
                    list_my_cv = list(set(list_my_cv))
                    tong_sl_cv = len(list_my_cv)
                    for d in list_my_cv:
                        query_tt_cv = "SELECT state FROM " + MYSQL_PCCV_TB + " WHERE id = \"{}\"".format(d)
                        result_tt_cv = ut.emp_checkin_exec_query(cnx, query_tt_cv, caller)
                        for e in result_tt_cv:
                            if e["state"] == 3:
                                sl_cv_ht += 1
                                hoan_thanh = sl_cv_ht
                            if e["state"] == 2:
                                sl_cv_cht +=1
                                cho_review +=1
                            if e["state"] == 1:
                                sl_cv_cht +=1
                                dang_lam +=1
                            if e["state"] == 0:
                                sl_cv_cht +=1
                                chua_lam +=1

                    # Thong ke top 5 nhan vien xuat sac
                    query_nvxs = "SELECT a.emp_name, a.child_depart, b.* FROM " + MYSQL_EMP_TB + " a INNER JOIN " + MYSQL_PCCV_TB + " b ON a.email = b.assigned AND reject ='0' AND  " + moc_thoi_gian + dkien_date_from + moc_thoi_gian + dkieu_date_to + dk_child_depart
                    result_query_nvxs = ut.emp_checkin_exec_query(cnx, query_nvxs, caller)
                    for i in result_query_nvxs:
                        if i["assigned"] is not None and i["assigned"] != "":
                            list_nvxs.append(i["emp_name"])

                    # list_nvxs = [each_string.lower() for each_string in list_nvxs]
                    list_nvxs_set = list(set(list_nvxs))
                    for i in list_nvxs_set:
                        dict_nvxs_list ={}
                        dict_nvxs_list["emp_name"] = i
                        dict_nvxs_list["dem"] = list_nvxs.count(i)
                        list_cv_nvxs.append(dict_nvxs_list)

                    list_cv_nvxs.sort(key=lambda x: x.get('dem'), reverse=True)
                    # print(list_cv_nvxs, end='\n\n')
                    list_top_5 = (list_cv_nvxs[0:5])

                    dic_tong_da = {}
                    dic_tong_da['tong_sl_da'] = tong_sl_da
                    dic_tong_da['sl_da_ht'] = sl_da_ht
                    dic_tong_da['sl_da_cht'] = sl_da_cht

                    dic_trang_thai = {}
                    dic_trang_thai['tong_cv'] = tong_sl_cv
                    dic_trang_thai['chua_lam'] = chua_lam
                    dic_trang_thai['dang_lam'] = dang_lam
                    dic_trang_thai['cho_review'] = cho_review
                    dic_trang_thai['hoan_thanh'] = hoan_thanh

                    dic_tong_cv = {}
                    dic_tong_cv['tong_sl_cv'] = tong_sl_cv
                    dic_tong_cv['sl_cv_ht'] = sl_cv_ht
                    dic_tong_cv['sl_cv_cht'] = sl_cv_cht

                    ds_report["du_an"] = dic_tong_da
                    ds_report["cong_viec"] = dic_tong_cv
                    ds_report["tong_trangthai"] = dic_trang_thai
                    ds_report["xep_hang_nhan_vien"] = list_top_5
                    ds_report["thanh_vien"] = sl_nv
                except Exception as ex:
                    logger.exception("{}: {}".format(caller, ex))
                finally:
                    cnx.close()
            else:
                logger.info("Error {}: Database connection error".format(caller))
        if ds_report != {}:
            msg = ds_report
        else:
            msg = ds_report
        return json.dumps({'msg': msg}), 200

def api_check_noti(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    count = 0
    ok = False
    email = res.get("email", None)
    status = 0
    dict_data = {}
    list_noti = []
    if email is not None:
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        if cnx is not None:
            try:
                query = " SELECT id,title, status_noti FROM " + MYSQL_PCCV_TB + " WHERE assigned = \"{}\" and status_noti = 0 ".format(email)
                result = ut.emp_checkin_exec_query(cnx, query, caller)
                print(query)
                ok = True
                if len(result) != 0:
                    for i in result:
                        count +=1
                        list_noti.append(i)
            except Exception as ex:
                logger.exception("{}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            logger.info("Error {}: Database connection error".format(caller))
            return json.dumps({'error': 'Database connection error'}), 200
    if ok:
        if len(list_noti) != 0:
            status = 1
            dict_data["status"] = status
            dict_data["data"] = list_noti
            dict_data["count"] = count
        else:

            dict_data["status"] = status
            dict_data["data"] = "Không có công việc mới đâu thằng ngu!"
            dict_data["count"] = count
    return json.dumps({"msg": dict_data}), 200

def api_update_status(res, user=MYSQL_DATABASE_USER,
                   password=MYSQL_DATABASE_PASSWORD,
                   host=MYSQL_DATABASE_HOST, caller=""):
    print(1)
    ok = False
    email = res.get("email", None)
    id_task = res.get("id_task", None)
    dict_ = {}
    status = 0
    if email is not None:
        cnx = ut.make_db_connection(user=user, host=host, password=password)
        print(2)
        if cnx is not None:
            try:
                print(3)
                query = " SELECT * FROM " + MYSQL_PCCV_TB + " WHERE id = \"{}\"".format(id_task)
                result = ut.emp_checkin_exec_query(cnx, query, caller)
                print(result)
                if len(result) != 0:
                    update = ut.update_noti(cnx, id_task, caller)
                    print(update)
                    if update == True:
                        ok = True
                        status = 1

            except Exception as ex:
                logger.exception("{}: {}".format(caller, ex))
            finally:
                cnx.close()
        else:
            logger.info("Error {}: Database connection error".format(caller))
            return json.dumps({'error': 'Database connection error'}), 200
    if ok:
        msg = "UPDATE OK"
        dict_["status"] = status
        dict_["msg"] = msg
    else:
        msg = "UPDATE NOT OK"
    return json.dumps({"msg": dict_}), 200


