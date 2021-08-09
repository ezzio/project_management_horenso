# -*- coding: utf-8 -*-
import flask
import os
import optparse
import json
from flask import jsonify
from global_def import *
from common import utils as ut
from common import utils_task as ut_task
from flask_cors import CORS
import requests
from flask import request, send_from_directory,redirect
from flask_mail import Mail, Message
from flask.json import jsonify
import base64
import time
# khoi tao flash server
APP_NAME = "f_task_service"

logger = ut.get_logger(APP_NAME, level=logging.INFO)
logger_web = ut.get_logger("f_web_task_service1", level=logging.INFO)

# Obtain the flask app object
app = flask.Flask(APP_NAME)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or os.urandom(16)

app.secret_key = 'your secret key'


app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'quanlycongviec'
CORS(app)

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    logger.info('Record not found: ' + request.url)
    respone.status_code = 404
    return respone

#----------------------WEB-------------------------------------#
@app.route('/login', methods=['POST'])
def login():

    func_name = "api_login"
    try:
        res = request.get_json()
        if res is not None and ut.is_json(res):
            result = ut_task.api_login(res, user=user, host=host, password=password, caller=func_name)
            return result
    except Exception as ex:
        logger.info("Error {}: {}".format(func_name, ex))
    return not_found()

@app.route('/register', methods=['POST'])
def register():

    func_name = "api_register"
    try:
        res = request.get_json()
        if res is not None and ut.is_json(res):
            result = ut_task.api_register(res, user=user, host=host, password=password, caller=func_name)
            return result
    except Exception as ex:
        logger.info("Error {}: {}".format(func_name, ex))
    return not_found()

@app.route('/web_create_task', methods=['POST'])
def web_create_task():
    func_name = "api_web_create_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_create_task(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_list_id_task', methods=['POST'])
def web_list_id_task():
    func_name = "api_web_list_id_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_list_id_task(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_tree_task', methods=['POST'])
def web_tree_task():
    func_name = "api_web_tree_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_tree_task(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}\n\n".format(func_name, dt))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_view_kanban', methods=['POST'])
def web_view_kanban():
    func_name = "api_web_view_kanban"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_view_kanban(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_view_kanban2', methods=['POST'])
def web_view_kanban2():
    func_name = "api_web_view_kanban2"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_view_kanban_web(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_edit_task', methods=['POST'])
def web_edit_task():
    func_name = "api_web_edit_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_edit_task(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_view_owner', methods=['POST'])
def web_view_owner():
    func_name = "api_web_view_owner"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_view_owner(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_list_email_available', methods=['POST'])
def web_list_email_available():
    func_name = "api_web_list_email_available"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_list_email_available(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger.exception(ex)
    return not_found()

@app.route('/web_sent_cmt_task', methods=['POST'])
def web_sent_cmt_task():
    func_name = "api_web_sent_cmt_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_sent_cmt_task(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_following_task', methods=['POST'])
def web_following_task():
    func_name = "api_web_following_task"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_following_task2(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_get_filter', methods=['POST'])
def web_get_filter():
    func_name = "api_web_get_filter"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_get_filter(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_project', methods=['POST'])
def web_project():
    func_name = "api_web_project"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_project(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/web_get_info_child_depart', methods=['POST'])
def web_get_info_child_depart():
    func_name = "api_web_get_info_child_depart"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_get_info_child_depart(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return json.dumps({'result': result}), 200
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/filter_cv_fe', methods=['POST'])
def filter_cv_fe():
    func_name = "api_filter_cv_fe"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))
        if res is not None and ut.is_json(res):
            result = ut_task.api_filter_cv_fe(res, user=user, host=host, password=password, caller=func_name)
            return result
    except Exception as ex:
        logger.info("Error {}: {}".format(func_name, ex))
    return not_found()

@app.route('/get_du_an', methods=['POST'])
def get_du_an():

    func_name = "api_get_du_an"
    try:
        res = request.get_json()
        if res is not None and ut.is_json(res):
            result = ut_task.api_get_du_an(res, user=user, host=host, password=password, caller=func_name)
            return result
    except Exception as ex:
        logger.info("Error {}: {}".format(func_name, ex))
    return not_found()

@app.route('/report_total_fe', methods=['POST'])
def report_total_fe():

    func_name = "api_report_total_fe"
    try:
        t1 = time.time()
        res = request.get_json()
        if res is not None and ut.is_json(res):
            result = ut_task.api_report_total_fe(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return result
    except Exception as ex:
        logger.info("Error {}: {}".format(func_name, ex))
    return not_found()

@app.route('/check_noti', methods=['POST'])
def check_noti():
    func_name = "api_check_noti"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_check_noti(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return result
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

@app.route('/update_status', methods=['POST'])
def update_status():
    func_name = "api_update_status"
    try:
        t1 = time.time()
        res = request.get_json()
        logger_web.info("Call {}: {}".format(func_name, res))

        if res is not None and ut.is_json(res):
            result = ut_task.api_update_status(res, user=user, host=host, password=password, caller=func_name)
            dt = time.time() - t1
            logger_web.info("Response {} / {}: {}\n\n".format(func_name, dt, result))
            return result
    except Exception as ex:
        logger_web.exception(ex)
    return not_found()

if __name__ == "__main__":

    parser = optparse.OptionParser()
    parser.add_option('--host', type='string', default='127.0.0.1')
    parser.add_option('--user', type='string', default='root')
    parser.add_option('--password', type='string', default='12345678')
    parser.add_option('--port', type='string', default=5009)
    parser.add_option('--https', type='int', default=1)

    check_register = []
    opts, args = parser.parse_args()
    user = opts.user
    host = opts.host
    password = opts.password
    port = opts.port
    force_https = bool(opts.https)

    logger.info("Starting Tornado server on port {} force_https {}".format(port, force_https))
    ut.start_tornado(app, port=port, force_https=force_https)