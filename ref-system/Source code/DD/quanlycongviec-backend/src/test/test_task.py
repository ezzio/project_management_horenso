import requests
import json
from common import utils as ut
import mysql.connector
import time

def request_http(url, params=None):
    r = None
    try:
        print(url)
        r = requests.post(url=url, json=params)
    except Exception as e:
        print(e)
    return r

def web_tree_task():
    url = "http://"+host+":5009/web_tree_task"
    message = {'email': 'phamnhutoan0304@gmail.com', 'id_tree': 1, "view": "tree"}

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_list_id_task():
    url = "http://"+host+":5009/web_list_id_task"
    message =   {
                    "email" : "phamnhutoan0304@gmail.com",
                    "type": "project",
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))


def web_create_task():
    url = "http://"+host+":5009/web_create_task"
    print(url)
    message = {

        "id": 214,
        "parent": 208,
        "owner": "phamnhutoan03041998@gmail.com",
        "assigned": "phamnhutoan03041998@gmail.com",
        "title": "Client is good 1",
        "description": "Test send email 1",
        "state": 0,
        "priority": 1,
        "kpi_time": 0,
        "kpi_quality": 0,
        "progression": 0,
        "completion": 0,
        "ts": "N/A",
        "te": "N/A",
        "t_assigned": "26/05/2021 19:00:00",
        "deadline": "31/05/2021 19:00:00",
        "type": 0,
        "problem": "N/A",
        "id_tree": 208,
        "t_create": "26/05/2021 19:33:34",
        "level": 1,
        "weight": 0.0,
        "weight_normalized": 0.0,
        "reviewer": "phamnhutoan03041998@gmail.com",
        "t_duration": 0,
        "child_depart": "PDX",
        "reject": 0,
        "status_noti": 0
        }
    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(kq)

def web_view_kanban():
    url = "http://"+host+":5009/web_view_kanban"
    message =   {
                    "email" : "phamnhutoan@gmail.com",
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_edit_task():
    url = "http://"+host+":5009/web_edit_task"
    message = {
        'email': 'phamnhutoan03041998@gmail.com',
        'data_task':
            {
                'assigned': 'toan@gmail.com',
                'completion': 98,
                'data_root':
                    {
                        'id': 1,
                        'parent': 1,
                        'owner': 'phamnhutoan03041998@gmail.com',
                        'assigned': 'phamnhutoan@gmail.com',
                        'title': 'test demo 1',
                        'description': 'mo ta test demo 1',
                        'state': 3,
                        'priority': 1,
                        'kpi_time': 0,
                        'kpi_quality': 0,
                        'progression': 0,
                        'completion': 97,
                        'ts': '14/04/2021 08:19:46',
                        'te': 'N/A',
                        't_assigned': '14/04/2021 08:00:00',
                        'deadline': '19/04/2021 17:00:00',
                        'type': 1,
                        'problem': 'N/A',
                        'id_tree': 1,
                        't_create': '14/04/2021 08:07:18',
                        'level': 3,
                        'weight': 0,
                        'weight_normalized': 0,
                        'reviewer': 'phamnhutoan03041998@gmail.com',
                        't_duration': 0,
                        'child_depart': 'PDX',
                        'reject': 0
                    },
                'deadline': '19/04/2021 17:00:00',
                'description': 'Lên giao diện web ',
                'id': 2,
                'id_tree': 1,
                'kpi_quality': '100',
                'kpi_time': 0,
                'level': 0,
                'owner': 'phamnhutoan03041998@gmail.com',
                'parent': 1,
                'priority': 1,
                'problem': 'N/A',
                'progression': 0,
                'reviewer': 'tophamnhutoanan@gmail.com',
                'state': 2,
                't_assigned': '14/04/2021 08:00:00',
                't_create': '14/04/2021 08:11:15',
                't_duration': 0,
                'te': '14/04/2021 11:25:18',
                'title': 'suaaaaaaaaaaaaaaaaaaaaaaaaaaaa ',
                'ts': '14/04/2021 11:22:47',
                'type': 0,
                'weight': 100,
                'weight_normalized': 26.2467
            },
        'action': 'reviewer_todo'
    }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_view_owner():
    url = "http://" + host + ":5009/web_view_owner"
    message = {
        "email": "phamnhutoan@gmail.com",
    }
    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_list_email_available():
    url = "http://" + host + ":5009/web_list_email_available"
    message = {
        "email": "phamnhutoan0304@gmail.com",
        "type_of": "create_task"
    }
    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_sent_cmt_task():
    url = "http://"+host+":5009/web_sent_cmt_task"
    message =   {
                    "email" : "phamnhutoan0304@gmail.com",
                    "id_task": 1,
                    "cmt": "téc cmt"
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_following_task():
    url = "http://"+host+":5009/web_following_task"
    message =   {
                    "email" : "phamnhutoan0304@gmail.com",
                    "condition" : {
                        "from_date": "14/04/2021",
                        "to_date": "14/05/2021",
                        "id_tree": [259,285],
                        "tag": ["Trễ deadline", "Còn hạn", "Hoàn thành"]
                    }
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_project():
    url = "http://"+host+":5009/web_project"
    message =   {
                    "email" : "phamnhutoan0304@gmail.com",
                    "condition" : {
                        "from_date": "30/03/2021",
                        "to_date": "25/04/2021",
                        # "id_tree": [259,285],
                        # "tag": ["Trễ deadline", "Còn hạn", "Hoàn thành"]
                    }
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))

def web_get_info_child_depart():
    url = "http://"+host+":5009/web_get_info_child_depart"
    message =   {
                    "email" : "admin@gmail.com",
                    "type" : "child_depart"
                }

    res = request_http(url, message)
    if res.status_code == 200:
        kq = res.json()
        print(json.dumps(kq, indent=4, sort_keys=True))



def get_du_an():
    url = "http://"+host+":5555/get_du_an"
    message = {
            "email": "phamnhutoan@gmail.com"
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)

def report_total_fe():
    url = "http://"+host+":5000/report_total_fe"
    message = {
            "email": "phamnhutoan0304@gmail.com",
            "moc_thoi_gian": "t_assigned",
            "child_depart": "PDX",
            "state": "",
            "date_from": "01/03/2021 00:00:00",
            "date_to": "01/06/2021 00:00:00",
            "kieu_cv": ""
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)


def login():
    url = "http://"+host+":5009/login"
    message = {
            "user": "phamnhutoan0304@gmail.com",
            "password": "12345678"
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)
def register():
    url = "http://"+host+":5009/register"
    message = {
            "email": "phamnhutoan03041998@gmail.com",
            "user": "user2",
            "password": 12345678
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)

def check_noti():
    url = "http://"+host+":5009/check_noti"
    message = {
            "email": "phamnhutoan0304@gmail.com"
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)

def update_status():
    url = "http://"+host+":5009/update_status"
    message = {
            "email": "phamnhutoan0304@gmail.com",
            "id_task": 57
        }
    res = request_http(url, message)
    if res.status_code == 200:
        print(res.json())
    else:
        print("Error: ", res)
if __name__ == '__main__':
    # host = "192.168.1.19"
    host = "localhost"

    # update_status()
    # check_noti()
    # login()
    # register()
    # web_tree_task()
    # web_list_id_task()
    web_create_task()
    # web_view_owner()
    # web_list_emsk()
    # web_view_kanban()
    # web_edit_tail_available()
    # web_sent_cmt_task()
    # web_following_task()
    # web_list_project_and_task_in_project()
    # web_get_filter()
    # web_project()
    # web_get_info_child_depart()
    # filter_cv_fe()
    # get_du_an()
    # report_total_fe()


