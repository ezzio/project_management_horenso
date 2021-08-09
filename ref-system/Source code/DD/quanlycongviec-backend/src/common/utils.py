# -*- coding: utf-8 -*-
import sys
from builtins import type
import os
import tornado.wsgi
import tornado.httpserver
import tornado.ioloop
import mysql.connector
from logging.handlers import RotatingFileHandler
import errno
from global_def import *
import base64
from Cryptodome.Cipher import AES
from Cryptodome import Random
import time
import json
import random
import string
from Crypto.Util.Padding import pad
import numpy as np
import math
import os
import requests
import pandas as pd
import cv2
import random
import img2pdf
from PIL import Image
import json
import jwt
from flask import request
import copy
from flask_mail import Mail, Message


sender = 'phamnhutoanuser1@gmail.com'
import flask

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase

# from Crypto.Util.Padding import pad
# import Crypto.Util.Padding.pad

# region log
# ==============================================================================
def get_logger(name, level=logging.INFO, log_dir=None):
    try:
        # timecr = get_current_datetime()
        # timecr = timecr.strftime(DATETIME_FORMAT3).split("_")[0]
        logger = logging.getLogger(name)
        if log_dir is None:
            log_dir = LOG_DIR_ROOT
        try:
            # log_folder = log_dir + "/" + timecr
            os.makedirs(log_dir)
        except OSError as ex:
            if ex.errno != errno.EEXIST:
                logging.exception(ex)
            # else:
            #     try:
            #         os.makedirs(log_folder)
            #     except OSError as exx:
            #         if exx.errno != errno.EEXIST:
            #             logging.exception(exx)
        except Exception as ex:
            logging.exception(ex)

        # if level is not specified, use level of the root logger
        if level is None:
            level = logging.getLogger().getEffectiveLevel()

        formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')

        file_h = RotatingFileHandler('{}/{}_{}.log'.format(log_dir, logging.getLevelName(level), name), mode='a',
                                     maxBytes=1024*1024*1024, backupCount=10, encoding=None, delay=0)
        file_h.setFormatter(formatter)

        stdout_h = logging.StreamHandler(sys.stdout)
        stdout_h.setFormatter(formatter)

        if (logger.hasHandlers()):
            logger.handlers.clear()

        logger.addHandler(file_h)
        logger.addHandler(stdout_h)
        logger.setLevel(level)

        return logger
    # ==============================================================================
    # endregion
    except Exception as e:
        logger_db.info("{}".format(e))

logger_sendmail = get_logger("sendmail", level=logging.INFO)
logger_db = get_logger("utils_db", level=logging.INFO)
logger_query = get_logger("query", level=logging.INFO)

def start_tornado(app, port, force_https=True):
    try:
        max_buffer_size = 1024 * 1024 * 20  # 20M
        if force_https:
            settings = dict(
                ssl_options={
                    "certfile": SSL_CERT_FILE,
                    "keyfile": SSL_KEY_FILE,
                },
                max_buffer_size=max_buffer_size,
            )

            http_server = tornado.httpserver.HTTPServer(tornado.wsgi.WSGIContainer(app), **settings)
        else:
            http_server = tornado.httpserver.HTTPServer(
                tornado.wsgi.WSGIContainer(app),
                max_buffer_size=max_buffer_size,
            )

        http_server.listen(port)
        tornado.ioloop.IOLoop.instance().start()
    except Exception as e:
        logger_db.info("{}".format(e))

def stop_tornado():
    try:
        tornado.ioloop.IOLoop.instance().stop()
    except Exception as e:
        logger_db.info("{}".format(e))

def is_json(myjson):
    try:
        if isinstance(myjson, dict):
            return True
        json_object = json.loads(myjson)
    except ValueError as e:
        return False
    return True

def make_db_connection(user=MYSQL_DATABASE_USER,
                       password=MYSQL_DATABASE_PASSWORD,
                       host=MYSQL_DATABASE_HOST):
    i = 0
    cnx = None
    while True:  # Lap lai ket noi 10 lan trong time 1s.
        try:
            cnx = mysql.connector.connect(user=user, password=password, host=host,
                                          database=MYSQL_DATABASE_DB)
            return cnx
        except Exception as ex:
            i = i+1
            logger_db.info("Try connect database error number %d " %i)
            pass
        time.sleep(0.1)
        if i >= 10:
            print("Break")
            break
    return cnx

def emp_checkin_exec_query(cnx, query, fname=""):
    result = []
    try:
        t1 = time.time()
        cursor = cnx.cursor(buffered=True)
        cursor.execute( query )
        dt = time.time() - t1
        columns = cursor.description
        for value in cursor.fetchall():
            tmp = {}
            for (index, column) in enumerate(value):
                tmp[columns[index][0]] = column
            result.append(tmp)
        # logger_query.info("{} query dtime {}: {}".format(fname, dt, query))
    except Exception as e:
        logger_db.info("{} Error emp_checkin_exec_query ({}): {}".format(fname, query, e))
    return result

def executeGeneral(cnx, sql, values, fname=""):
    ok = False
    try:
        mycursor = cnx.cursor()
        mycursor.execute(sql, values)
        cnx.commit()
        ok = True
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def getDataDevice_id_tb(cnx, device_imei, device_id, fname=""):
    checkinListEmp = []  # Khai bao kieu List
    try:
        if device_imei == "unk" or device_imei == "":
            device_id1 = device_id
        else:
            device_id1 = device_imei
        query = "SELECT * FROM "+MYSQL_DEVICE_TB+" WHERE device_id = \'{}\'".format(device_id1)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for x in result:
                checkinDictEmp = {}  # Khai bao kieu dictionary
                checkinDictEmp['user_name'] = str(x['MBN_account_name'])
                checkinDictEmp['full_name'] = str(x['name'])
                checkinDictEmp['email'] = str(x['email'])
                checkinListEmp.append(checkinDictEmp)
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinListEmp

def getAllEmployees_tb(cnx, fname=""):
    checkinList = []
    try:
        query = "SELECT * FROM " + MYSQL_EMP_TB
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for x in result:
                checkinDict = {}  # Khai bao kieu dictionary
                job_title = str(x['job_title']).lower()
                checkinDict['email'] = str(x['email'])
                checkinDict['emp_code'] = str(x['emp_code'])
                checkinDict['emp_name'] = str(x['emp_name'])
                checkinDict['birthday'] = str(x['birthday'])
                checkinList.append(checkinDict)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinList

def getAllEmployees1_tb(cnx, fname=""):
    checkinList = []
    try:
        query = "SELECT * FROM " + MYSQL_EMP_TB + " WHERE status_working = 1"
        result = emp_checkin_exec_query(cnx, query, fname)
        list_khoi_ky_thuat = ['cb kỹ thuật tkbt', 'cb hỗ trợ kỹ thuật từ xa', 'cb hỗ trợ kỹ thuật tại nhà kh',
                              'cb xử lý sự cố']
        if len(result) != 0:
            for x in result:
                checkinDict = {}  # Khai bao kieu dictionary
                job_title = str(x['job_title']).lower()
                if job_title in list_khoi_ky_thuat:
                    checkinDict['email'] = str(x['email'])
                    checkinDict['emp_code'] = str(x['emp_code'])
                    checkinDict['emp_name'] = str(x['emp_name'])
                    checkinDict['birthday'] = str(x['birthday'])
                    checkinList.append(checkinDict)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinList

def get_list_email(cnx, fname=""):
    list_emp = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT * FROM " + MYSQL_EMP_TB
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            email = str(i[0]).lower()
            if email not in list_emp:
                list_emp.append(email)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_emp

def get_emp_id(cnx, device_imei, device_id, fname=""):
    emp_id = ""
    try:
        checkinListEmp = getDataDevice_id_tb(cnx, device_imei, device_id, fname)
        if len(checkinListEmp) == 1:
            for x in checkinListEmp:
                emp_id = x['user_name']
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return emp_id

def getDataDevice_id2_tb(cnx, device_id, fname=""):#Query bang Device_id2 de lay ra dong data co email
    checkinList = []  # Khai bao kieu List
    try:
        query = "SELECT * FROM "+MYSQL_DEVICE_TB2+" WHERE device_id = \'{}\'".format(device_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for x in result:
                checkinDict = {}  #Khai bao kieu dictionary
                checkinDict['id'] = str(x['id'])
                checkinDict['fullname'] = str(x['fullname'])
                checkinDict['email'] = str(x['email'])
                checkinDict['department'] = str(x['department'])
                checkinDict['active_time'] = str(x['active_time'])
                checkinDict['activated'] = str(x['activated'])
                checkinList.append(checkinDict)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinList

def getDataPromotion_code_tb(cnx, device_id, fname=""):#Query bang promotion_code_tb de lay ra dong data co email
    checkinListPromotion = []  # Khai bao kieu List
    try:
        #Kiem tra device_id co trong device_id2:
        query = "SELECT * FROM "+MYSQL_DEVICE_TB2+" WHERE device_id = \'{}\'".format(device_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            checkinDictPromotion = {}  # Khai bao kieu dictionary
            for x in result:
                checkinDictPromotion['email'] = str(x['email'])
                checkinDictPromotion['department'] = str(x['department'])
                break
            # Lay code co active=1
            query1 = "SELECT * FROM "+MYSQL_PROMOTION_CODE_TB+" WHERE active = 1"
            result1 = emp_checkin_exec_query(cnx, query1, fname)
            for z in result1:
                checkinDictPromotion['id'] = str(z['id'])
                checkinDictPromotion['code'] = str(z['code'])
                checkinDictPromotion['active'] = str(z['active'])
                checkinListPromotion.append(checkinDictPromotion)
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinListPromotion

def getEmailDevice_id2_tb(cnx, device_id, fname=""): #Tra ve email device_id2 neu active="1"
    try:
        email = ""
        fullname = ""
        department = ""
        checkinList = getDataDevice_id2_tb(cnx, device_id)
        if len(checkinList) == 1:
            for x in checkinList:
                if x['activated'] == "1":
                    email = x['email']
                    fullname = x['fullname']
                    department = x['department']
        return email, fullname, department
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def getCodePromotion_code_tb(cnx, device_id, fname=""): #Tra ve email device_id2 neu active="1"
    try:
        code = ""
        time_now = get_current_datetime()
        checkinListPromotion = getDataPromotion_code_tb(cnx, device_id)
        #print("checkinListPromotion: ",checkinListPromotion)
        if len(checkinListPromotion) == 1:
            for x in checkinListPromotion:
                code = x['code']
                # update time = now, active = 0, email va department get trong device_id2_tb
                updateDataPromotion_code_tb(cnx, x['email'], x['department'], x['code'], time_now, 0, x['id'])
        return code
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def getCodePromotionHistory_code_tb(cnx, device_id, fname=""):
    try:
        history_list = []#Khai bao kieu List
        #Tu Device_Id lần ra email
        query = "SELECT * FROM "+MYSQL_DEVICE_TB2+" WHERE device_id = \'{}\'".format(device_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None:
            if len(result) > 0:
                checkinDictDevice = {}  #Khai bao kieu dictionary
                for x in result:
                    checkinDictDevice['email'] = str(x['email'])
                    break
                #Tu email liệt kê tất cả code đã dùng có active=0.
                query1 = "SELECT * FROM "+MYSQL_PROMOTION_CODE_TB+" WHERE email = \'{}\' AND active = 0".format(checkinDictDevice['email'])
                result1 = emp_checkin_exec_query(cnx, query1, fname)
                for z in result1:#Tra ve list chứa data trong promotion_code_tb
                    checkinDictPromotion = {}# Khai bao kieu dictionary
                    checkinDictPromotion['id'] = str(z['id'])
                    checkinDictPromotion['email'] = str(z['email'])
                    checkinDictPromotion['department'] = str(z['department'])
                    checkinDictPromotion['code'] = str(z['code'])
                    checkinDictPromotion['time'] = str(z['time'])
                    checkinDictPromotion['active'] = str(z['active'])
                    history_list.append(checkinDictPromotion)
                #print("history_list: ", history_list)
            return history_list
        else:
            return history_list
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def insertDataDevice_id_tb(cnx, device_id, account_name, email, child_depart, active_time, fname=""):
    try:
        email = str(email).lower()
        cursor = cnx.cursor(buffered=True)
        sql = "INSERT INTO " + MYSQL_DEVICE_TB + " (device_id, MBN_account_name, email, child_depart, name, active_time, active_by) VALUES (%s, %s, %s, %s, NULL, %s, NULL)"
        values = (device_id, account_name, email, child_depart, active_time)
        cursor.execute(sql, values)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def updateDataPromotion_code_tb(cnx, email, department, code, time, active, id, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "UPDATE "+MYSQL_PROMOTION_CODE_TB+" SET email = %s, department = %s, code = %s, time = %s, active = %s WHERE id = %s"
        values = (email, department, code, time, active, id)
        cursor.execute(sql, values)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))


def update_noti(cnx, id_task, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        qr_update = "UPDATE " + MYSQL_PCCV_TB + " SET status_noti = 1 WHERE id = \"{}\"".format(id_task)
        print(qr_update)
        values = (id_task)
        cursor.execute(qr_update, values)
        cnx.commit()
        return True
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def checkDeviceID_Device_id_tb(cnx, device_id, fname=""):#Query bang Device_id2 de lay ra dong data co email
    try:
        query = "SELECT * FROM "+MYSQL_DEVICE_TB+" WHERE device_id = \'{}\'".format(device_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            return False
        else:
            return True
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def checkEmail_Device_id_tb(cnx, email, fname=""):#Query bang Device_id de lay ra dong data co email
    try:
        query = "SELECT * FROM "+MYSQL_DEVICE_TB+" WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) >= 5:
            return False
        else:
            return True
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def aes256():
    try:
        # 16s bit
        BS = 16
        # SECRET KEY of API SCM in Document
        # Staging
        # key =   b'8840240ce0ecbb703a9425b40a121d99'
        # Production
        key = b'33b8ddca078f4bbc85d90fb7d3b4fde4'
        # Key IV of API SCM in Document
        iv =  b'bscKHn8REOJ2aikS'
        return BS,key,iv
    except Exception as e:
        print(e)

# encrypt aes256 (mode CBC) and return format base64
def encrypt(raw, fname=""):
    try:
        BS = aes256()[0]
        key = aes256()[1]
        iv = randomiv().encode()
        # print(b'caf\xe9'.decode('base64.b64encode'))
        pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS)
        raw = pad(raw)
        cipher = AES.new(key, AES.MODE_CBC, iv )
        return base64.b64encode( cipher.encrypt( raw.encode() ) ).decode("utf-8"), iv.decode()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def encrypt_server(iv, raw, fname=""):
    try:
        # BS = aes256()[0]
        key = aes256()[1]
        _iv = iv.encode()
        # pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS)
        # raw = pad(raw)
        raw = pad(raw.encode(), 16)
        cipher = AES.new(key, AES.MODE_CBC,_iv)
        return base64.b64encode( cipher.encrypt( raw) ).decode("utf-8")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

# decrypt aes256 (mode CBC)
def decrypt(iv, enc, fname=""):
    try:
        key = aes256()[1]
        # iv = aes256()[2]
        unpad = lambda s : s[:-ord(s[len(s)-1:])]
        enc = base64.b64decode(enc)
        cipher = AES.new(key, AES.MODE_CBC, iv.encode() )
        return unpad(cipher.decrypt( enc )).decode("utf-8")
    except Exception as e:
        logger_db.info("{} error decrypt data ({}): {}".format(fname, enc, e))

def checkInsertDataEmp_checkin_tb(cnx, emp_code, checkin_date, fname=""):
    try:
        query = "SELECT * FROM "+MYSQL_EMP_CHECKIN_TB+" WHERE emp_code = \'{}\' AND checkin_date = \'{}\'".format(emp_code, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            return False
        else:
            return True
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def handling_day_over(day_input, fname=""):
    time_result = ''
    try:
        temp_time = datetime.strptime(day_input, '%Y-%m-%d').replace(hour=0, minute=0, microsecond=0, second=0)
        date_time_now = get_current_datetime().replace(hour=0, minute=0, microsecond=0, second=0)
        if temp_time >= date_time_now:
            time_result = (date_time_now - timedelta(1)).strftime('%Y-%m-%d')
        else:
            time_result = day_input
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return time_result

def get_email_device_id_tb(cnx, device_imei, device_id, fname=""):
    try:
        email = ""
        checkinListEmp = getDataDevice_id_tb(cnx, device_imei, device_id, fname)
        if len(checkinListEmp) == 1:
            for x in checkinListEmp:
                email = x['email'].lower()
                break
        return email
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def check_table_db(cursor, table, fname=""):
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    check_tb = False
    for x in tables:
        if x[0] == table:
            check_tb = True
            break
    return check_tb

def checkEmailSCM_tb(cnx, email, item_code, fname=""):
    try:
        query = "SELECT * FROM "+MYSQL_SCM_TB+" WHERE email = \'{}\' AND item_code = \'{}\'".format(email, item_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None:
            if len(result) > 0:
                return False
            else:
                return True
        else:
            return False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def insertOpen_app_history_tb(cnx, email, device_api_level, ver_code_user, fname=""):
    try:
        time_now = get_current_datetime()
        open_day = time_now.strftime("%Y-%m-%d")
        cursor = cnx.cursor(buffered=True)
        sql = "INSERT INTO " + MYSQL_OPEN_APP_HISTORY_TB + " (open_day, email, device_api_level, ver_code_user) VALUES (%s, %s, %s, %s)"
        values = (open_day, email, device_api_level, ver_code_user)
        if check_insert_open_app_history_tb(cnx, email, open_day, fname):
            cursor.execute(sql, values)
            cnx.commit()
    except Exception as e:
        logger_db.info("{} error insertOpen_app_history_tb: {}".format(fname, e))

def insertDataSCM_tb(cnx, email, stock_name, item_code, item_name, unit_name, size_name, quantity_now, quantity_hold, start_date, expire_date, zone_name, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "INSERT INTO " + MYSQL_SCM_TB + " (SCM_id, email, stock_name, item_code, item_name, unit_name, size_name, quantity_now, quantity_hold, start_date, expire_date, zone_name, DateofControl, CommentCDCD) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NULL, NULL)"
        values = (email, stock_name, item_code, item_name, unit_name, size_name, quantity_now, quantity_hold, start_date, expire_date, zone_name)
        cursor.execute(sql, values)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def updateDataSCM_tb(cnx, email, stock_name, item_code, item_name, unit_name, size_name, quantity_now, quantity_hold, start_date, expire_date, zone_name, scm_id, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "UPDATE " + MYSQL_SCM_TB + " SET email = %s, stock_name = %s, item_code = %s, item_name = %s, unit_name = %s, size_name = %s, quantity_now = %s, quantity_hold = %s, start_date = %s, expire_date = %s, zone_name = %s WHERE SCM_id = %s"
        values = (email, stock_name, item_code, item_name, unit_name, size_name, quantity_now, quantity_hold, start_date, expire_date, zone_name, scm_id)
        cursor.execute(sql, values)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def getDataSCM_tb(cnx, email, item_code, fname=""):
    list_scm = []
    try:
        query = "SELECT * FROM "+MYSQL_SCM_TB+" WHERE email = \'{}\' AND item_code = \'{}\'".format(email, item_code)
        list_scm = emp_checkin_exec_query(cnx, query, fname)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_scm

def insert_update_scm_tb(cnx, result, fname=""):
    try:
        if result is not None and len(result) > 0:
            for y in result:
                stock_name = str(y['STOCK_NAME'])
                email = str(y['EMAIL']).lower()
                item_code = str(y['ITEM_CODE'])
                item_name = str(y['ITEM_NAME'])
                unit_name = str(y['UNIT_NAME'])
                size_name = str(y['SIZE_NAME'])
                quantity_now = str(y['QUANTITY_NOW'])
                quantity_hold = str(y['QUANTITY_HOLD'])
                start_date2 = str(y['START_DATE'])
                if start_date2 != "None":
                    start_date1 = str(y['START_DATE']).strip()[:-11].strip()
                    start_date = datetime.strptime(start_date1, "%M/%d/%Y").strftime('%Y-%M-%d')
                else:
                    start_date = None
                expire_date2 = str(y['EXPIRE_DATE'])
                if expire_date2 != "None":
                    expire_date1 = str(y['EXPIRE_DATE']).strip()[:-11].strip()
                    expire_date = datetime.strptime(expire_date1, "%M/%d/%Y").strftime('%Y-%M-%d')
                else:
                    expire_date = None
                zone_name = str(y['ZONE_NAME'])
                if checkEmailSCM_tb(cnx, email, item_code):
                    # Insert result into SCM_tb
                    insertDataSCM_tb(cnx, email, stock_name, item_code, item_name, unit_name, size_name, quantity_now,
                                     quantity_hold, start_date, expire_date, zone_name)
                    print("insert complete")
                else:
                    # Update result into SCM_tb
                    list_scm = getDataSCM_tb(cnx, email, item_code)
                    for z in list_scm:
                        scm_id = str(z['SCM_id'])
                        updateDataSCM_tb(cnx, email, stock_name, item_code, item_name, unit_name, size_name,
                                         quantity_now, quantity_hold, start_date, expire_date, zone_name, scm_id)
                        print("update complete")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def checkInsertDataTask_kpi_tb(cnx, MBN_account_name, day_task, fname=""):
    try:
        query = "SELECT * FROM "+MYSQL_TASK_KPI_TB+" WHERE MBN_account_name = \'{}\' AND day_task = \'{}\'".format(MBN_account_name, day_task)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None:
            if len(result) > 0:
                return False
            else:
                return True
        else:
            return False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def get_data_emp_checkin_tb_fr_emp_code(cnx, __month, __year, emp_code, fname=""):
    list_checkin = []
    try:
        query = "SELECT * FROM " + MYSQL_EMP_CHECKIN_TB + " WHERE checkin_month = \'{}\' AND checkin_year = \'{}\' AND emp_code = \'{}\' ORDER BY checkin_date".format(__month, __year, emp_code)
        list_checkin = emp_checkin_exec_query(cnx, query, fname)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_checkin

def get_data_ptq_tb_date(cnx, emp_code, date_from, date_to, fname=""):
    list_ptq = []
    try:
        query = "SELECT * FROM " + MYSQL_PTQ_TB + " WHERE emp_code = \'{}\' AND date_check BETWEEN \'{}\'  AND \'{}\'".format(emp_code, date_from, date_to)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            for y in result:
                dict_ptq_tb = {}
                dict_ptq_tb['ptq_id'] = str(y['ptq_id'])
                if len(str(y['contract'])) > 0:
                    dict_ptq_tb['contract'] = str(y['contract'])
                else:
                    dict_ptq_tb['contract'] = "None"
                dict_ptq_tb['deadline'] = convert_dateDb(y['deadline'])
                dict_ptq_tb['date_check'] = convert_dateDb(y['date_check'])
                dict_ptq_tb['error_main'] = str(y['error_main'])
                dict_ptq_tb['expected_punishment'] = str(y['punishment'])
                recorded = y['recorded']
                if recorded is not None and recorded != "":
                    dict_ptq_tb['recorded'] = recorded
                else:
                    dict_ptq_tb['recorded'] = "Chưa duyệt"
                list_ptq.append(dict_ptq_tb)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_ptq

def get_emp_code(cnx, _emp_code, fname=""):
    checkinList = []  # Khai bao kieu List
    try:
        query = "SELECT * FROM " + MYSQL_EMP_TB + " WHERE emp_code = " + _emp_code
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for x in result:
                checkinDict = {}  # Khai bao kieu dictionary
                checkinDict['email'] = str(x['email'])
                checkinDict['emp_code'] = str(x['emp_code'])
                checkinDict['emp_name'] = str(x['emp_name'])
                checkinDict['birthday'] = str(x['birthday'])
                checkinDict['day'] = str(x['day'])
                checkinDict['month'] = str(x['month'])
                checkinDict['year'] = str(x['year'])
                checkinDict['dependent_info'] = str(x['dependent_info'])
                checkinDict['job_title'] = str(x['job_title'])
                checkinDict['child_depart'] = str(x['child_depart'])
                checkinDict['mobile_phone'] = str(x['mobile_phone'])
                checkinDict['mstcn'] = str(x['mstcn'])
                checkinDict['contract_type'] = str(x['contract_type'])
                checkinDict['contract_begin'] = str(x['contract_begin'])
                checkinDict['contract_end'] = str(x['contract_end'])
                checkinDict['account_number'] = str(x['account_number'])
                checkinDict['type_salary'] = str(x['type_salary'])
                checkinList.append(checkinDict)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return checkinList

def update_explanation_ptq_tb(cnx, ptq_id, explanation, fname=""):
    ok = False
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "UPDATE " + MYSQL_PTQ_TB + " SET explanation = %s WHERE ptq_id = %s"
        values = (explanation, ptq_id)
        cursor.execute(sql, values)
        if cursor.rowcount > 0:
            ok = True
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def lookup_email_fr_accountMBN(acc = '', fname=""):
    mail = ''
    list_block_v1 = []
    list_block_v5 = []
    for i in range(1, 10):
        list_block_v1.append('TIN0{}'.format(i))
        list_block_v5.append('PNC0{}'.format(i))
    list_block_v1 += ['TIN10', 'TIN11', 'TIN12', 'TIN13', 'TIN14']

    list_block_v2 = ['BGGTI', 'BNHTI', 'CBGTI', 'HYNTI', 'LCITI', 'LSNTI', 'PTOTI', 'QNHT1', 'QNHT2', 'TNNTI', 'TQGTI',
                     'VPCTI', 'YBITI']

    list_block_v3 = ['DBNTI', 'HBHTI', 'HDGTI', 'HDGTI', 'HNMTI', 'HPGTI', 'HTHTI', 'NANTI', 'NBHTI', 'NDHTI', 'SLATI',
                     'TBHTI', 'THATI']

    list_block_v4_TI = ['DNGTI', 'HUETI', 'QBHTI', 'QTITI']

    list_SO_TIN = ['BGGSO', 'BNHSO', 'CBGSO', 'HYNSO', 'LCISO', 'LSNSO', 'PTOSO', 'TINSO', 'QNHSO', 'TNNSO', 'TQGSO',
                   'VPCSO', 'YBISO', 'DBNSO', 'HBHSO', 'HDGSO', 'HDGSO', 'HNMSO', 'HPGSO', 'HTHSO', 'NANSO', 'NBHSO',
                   'NDHSO', 'SLASO', 'TBHSO', 'THASO', 'DNGSO', 'HUESO', 'QBHSO', 'QTISO',]

    list_SO_PNC = ['PNCSO', 'BDHSO', 'GLISO', 'KHASO', 'KTMSO', 'PYNSO', 'QNMSO', 'QNISO', 'DLKSO',
                   'VTUSO', 'BDGSO', 'BPCSO', 'BTNSO', 'LDGSO', 'NTNSO', 'TNHSO', 'DNISO',
                   'AGGSO', 'BLUSO', 'BTESO', 'CMUSO', 'CTOSO', 'HGGSO', 'KGGSO', 'LANSO', 'STGSO', 'TGGSO', 'TVHSO', 'VLGSO', 'DTPSO']

    list_TTF_TIN = ['TTF01','TTF02','TTF03']

    list_block_v5 += ['PNC10', 'PNC11', 'PNC12', 'PNC13','PNC14', 'PNC15', 'PNC16']

    list_block_v4_PN = ['BDHPN', 'GLIPN', 'KHAPN', 'KTMPN', 'PYNPN', 'QNMPN', 'QNIPN', 'DLKPN']

    list_block_v6 = ['VTUPN', 'BDGPN', 'BPCPN', 'BTNPN', 'LDGPN', 'NTNPN', 'TNHPN', 'DNIPN']

    list_block_v7 = ['AGGPN', 'BLUPN', 'BTEPN', 'CMUPN', 'CTOPN', 'HGGPN', 'KGGPN', 'LANPN', 'STGPN', 'TGGPN', 'TVHPN', 'VLGPN', 'DTPPN']

    list_block_fti = ['PNCTF']

    list_block_PN = list_block_v5 + list_block_v4_PN + list_block_v6 + list_block_v7 + list_block_fti + list_SO_PNC
    list_block_TIN = list_block_v1 + list_block_v2 + list_block_v3 + list_block_v4_TI + list_SO_TIN + list_TTF_TIN
    # list_block =  list_block_v2 + list_block_v3 + list_block_v4_TI
    if len( acc.split(".")) == 2:
        cn = acc.split('.')[0]
        name = acc.split('.')[1]
        if cn in list_block_TIN:
            mail = name + '@vienthongtin.com'
        elif cn in list_block_PN:
            mail = 'phuongnam.' + name + '@fpt.net'
        return mail
    else:
        return mail

def get_group_name_fr_SCM_group(cnx, item_code, fname=""):
    group_name = "CCDC_other"
    try:
        query = "SELECT * FROM "+MYSQL_SCM_GROUP_TB+" WHERE item_code = \'{}\'".format(item_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        for x in result:
            if str(x['group_name']) == "BHLD":
                group_name = "BHLD"
                break
            elif str(x['group_name']) == "CCDC_main":
                group_name = "CCDC_main"
                break
            else:
                group_name = "CCDC_other"
                break
        return group_name
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
        return group_name

def convert_date_dao_tao(__date, fname=""):
    #input: %Y-%m-%dT%H:%M:%S
    #output: %d/%m/%Y
    result = ""
    try:
        if __date is not None:
            result = datetime.strptime(__date,'%Y-%m-%dT%H:%M:%S').strftime('%d/%m/%Y')
        else:
            result = str(__date)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return result

def convert_dateDb(__date, fname=""):
    result = ""
    try:
        if __date is not None:
            result = datetime.strftime(__date, "%d/%m/%Y")
        else:
            result = str(__date)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return result

def convert_datetimeDb(__datetime, fname=""):
    result = ""
    try:
        if __datetime is not None:
            result = datetime.strftime(__datetime, "%d/%m/%Y %H:%M:%S")
        else:
            result = str(__datetime)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return result

#input: str( dd/mm/yyyy )
def convert_datetime_import_Db(dd_mm_yyy, fname=""):
    result = None
    try:
        if dd_mm_yyy is not None and len(dd_mm_yyy) > 0:
            result = datetime.strptime(str(dd_mm_yyy), "%d/%m/%Y").strftime('%Y-%m-%d')
    except Exception as e:
        logger_db.info("Error {}: {}".format(fname, e))
    return result

def convert_ngay_gio_import_Db(dd_mm_yyy_hh_mm_ss, fname=""):
    result = None
    try:
        if dd_mm_yyy_hh_mm_ss is not None and len(dd_mm_yyy_hh_mm_ss) > 0:
            result = datetime.strptime(str(dd_mm_yyy_hh_mm_ss), "%d/%m/%Y %H:%M:%S").strftime("%Y-%m-%d %H:%M:%S")
    except Exception as e:
        logger_db.info("Error {}: {}".format(fname, e))
    return result

def deleteData_Device_id_tb(cnx, device_id, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "DELETE FROM " + MYSQL_DEVICE_TB + " WHERE device_id = \'{}\' ".format(device_id)
        cursor.execute(sql)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def checkInsertDataEmployees_tb(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            return False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_account_management_tb(cnx, emp_code, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_ACCOUNT_MANAGEMENT_TB + " WHERE emp_code = \'{}\' ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_MBN_account_name_fr_email_of_account(cnx, email, fname=""):
    MBN_account_name = ""
    try:
        query = "SELECT a.email, b.MBN_account_name FROM employees_tb a INNER JOIN account_management_tb b on a.emp_code = b.emp_code where a.email = \"{}\" ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            MBN_account_name = result[0].get("MBN_account_name", "")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return MBN_account_name

def check_insert_cem_tb(cnx, MBN_account_name, contract, time_complete, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_CEM_TB + " WHERE MBN_account_name = \'{}\' AND contract = \'{}\' AND time_complete = \'{}\' ".format(MBN_account_name, contract, time_complete)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def insert_update_cem_tb(cnx, detail, type, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        if len(detail) > 0:
            for i in detail:
                MBN_account_name = str(i["Account"]).upper()
                contract = i["Contract"]
                point = i["Point"]
                time_survey1 = str(i["TimeSurvey"])
                time_survey = time_survey1.split(" ")[0]
                time_complete = i["TimeCompleted"]
                type_task = type
                sql_insert_tb = "INSERT INTO " + MYSQL_CEM_TB + " (cem_id, MBN_account_name, contract, point, time_survey, time_complete, type_task) VALUES (NULL, %s, %s, %s, %s, %s, %s)"
                sql_update_tb = "UPDATE " + MYSQL_CEM_TB + " SET point = %s, time_survey = %s, type_task = %s WHERE MBN_account_name = %s AND contract = %s AND time_complete = %s "
                if check_insert_cem_tb(cnx, MBN_account_name, contract, time_complete, fname):
                    values = (MBN_account_name, contract, point, time_survey, time_complete, type_task)
                    cursor.execute(sql_insert_tb, values)
                else:
                    values = (point, time_survey, type_task, MBN_account_name, contract, time_complete)
                    cursor.execute(sql_update_tb, values)
        cursor.close()
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def randomiv(stringLength=16, fname=""):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(stringLength))

def check_insert_open_app_history_tb(cnx, email, open_day, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_OPEN_APP_HISTORY_TB + " WHERE email = \'{}\' AND open_day = \'{}\' ".format(email, open_day)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def update_note_checkin_emp_checkin_tb(cnx, MBN_account_name, checkin_date, note, fname=""):
    ok = False
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "UPDATE " + MYSQL_EMP_CHECKIN_TB + " SET note = %s WHERE MBN_account_name = %s AND checkin_date = %s"
        values = (note, MBN_account_name, checkin_date)
        cursor.execute(sql, values)
        if cursor.rowcount > 0:
            ok = True
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def rule_luong (chuyenmon, bophan = '', fname=""):
    nhom_luong = ''
    dic = {
        'CB Kỹ thuật hạ tầng':'INF',
        'CB Thu cước': 'Thu cước',
        'CB Xử lý sự cố' : 'TF',
        'CB Kỹ thuật TKBT' : 'TKBT',
        'CB Kỹ thuật FTTH' : 'FTI',
        'Kỹ Thuật viên Điều hành' : 'ĐH'
    }
    try:
        if chuyenmon == 'CB Hỗ trợ kỹ thuật tại nhà KH' and len(bophan) >=3 and bophan[-3:] == 'USR':
            nhom_luong = 'TKBT'
        elif chuyenmon == 'CB Hỗ trợ kỹ thuật tại nhà KH' and len(bophan) >=4 and bophan[-4:] == 'INDO':
            nhom_luong = 'INDO'
        elif chuyenmon in dic.keys():
            nhom_luong = dic[chuyenmon]
        else:
            nhom_luong = 'Nhóm ABCD'
    except Exception as ex:
        logger_db.info("{}: {}".format(fname, ex))
    return nhom_luong

def get_schedule(cnx, fname=""):
    try:
        query = "SELECT * FROM " + MYSQL_SCHEDULE_TB
        result = emp_checkin_exec_query(cnx, query, fname)
        list_permission = []
        if result is not None:
            if len(result) > 0:
                list_permission = result
        return list_permission
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def schedule_update(cnx, _event_id, _event_name, _emp_code, _emp_name, _start_time, _end_time, _isAllDay, _location, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sqlQuery = "UPDATE " + MYSQL_SCHEDULE_TB + " SET event_name=%s, emp_code=%s, emp_name=%s, start_time=%s, end_time=%s, isAllDay=%s, location=%s  WHERE event_id=%s"
        bindData = (_event_name, _emp_code, _emp_name, _start_time, _end_time, _isAllDay, _location, _event_id)
        cursor.execute(sqlQuery, bindData)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def schedule_add(cnx, _event_name, _emp_code, _emp_name, _start_time, _end_time, _isAllDay, _location, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sqlQuery = "INSERT INTO " + MYSQL_SCHEDULE_TB + "(event_name, emp_code, emp_name, start_time, end_time, isAllDay, location)" + \
                   " VALUES(%s, %s, %s, %s, %s, %s, %s)"
        bindData = (_event_name, _emp_code, _emp_name, _start_time, _end_time, _isAllDay, _location)
        cursor.execute(sqlQuery, bindData)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def schedule_remove(cnx, _event_id, fname=""):
    try:
        cursor = cnx.cursor(buffered=True)
        sql = "DELETE FROM " + MYSQL_SCHEDULE_TB + " WHERE event_id = \'{}\' ".format(_event_id)
        print(sql)
        cursor.execute(sql)
        cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def check_insert_user_right(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_USER_RIGHT_CHECKIN_TB + " WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            return False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_luongALL_tb(cnx, email, month, table_luong, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + table_luong + " WHERE email = \'{}\' AND month = \'{}\' ".format(email, month)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_columns_table(cnx, table, fname=""):
    name_columns = []
    try:
        query = "SHOW COLUMNS FROM "+ table
        result = emp_checkin_exec_query(cnx, query, fname)
        for x in result:
            name_columns.append(str(x['Field']))
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return name_columns

def get_type_salary_fr_emp_tb(cnx, email, fname=""):
    type_salary = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            type_salary = result[0].get("type_salary")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return type_salary

def get_type_salary_fr_lich_su_loai_luong_tb(cnx, email, month, fname=""):
    type_salary = ""
    try:
        query = "SELECT * FROM "+ MYSQL_LICH_SU_LOAI_LUONG_TB +" WHERE email = \'{}\' AND month = \'{}\'".format(email, month)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            type_salary = result[0].get("type_salary")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return type_salary

def check_insert_emp_checkin_tb(cnx, MBN_account_name, checkin_date, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_EMP_CHECKIN_TB + " WHERE MBN_account_name = \'{}\' AND checkin_date = \'{}\' ".format(MBN_account_name, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_emp_checkin_tb_by_emp_code(cnx, emp_code, checkin_date, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_EMP_CHECKIN_TB + " WHERE emp_code = \'{}\' AND checkin_date = \'{}\' ".format(emp_code, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_khai_bao_y_te_tb(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_KHAI_BAO_Y_TE_TB + " WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_add_covid19_tb(cnx, address, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_ADD_COVID19_TB + " WHERE address = \"{}\" ".format(address)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_KPIs_latetime_tb(cnx, MBN_account_name, so_HD, ngay_hoan_tat, loai_kpis, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_KPIS_LATETIME_TB + " WHERE MBN_account_name = \"{}\" AND so_HD = \"{}\" AND ngay_hoan_tat = \"{}\" AND loai_kpis = \"{}\"".format(MBN_account_name,so_HD,ngay_hoan_tat,loai_kpis)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_department_tb(cnx, child_depart, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_DEPARTMENT_TB + " WHERE child_depart = \"{}\" ".format(child_depart)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_region_tb(cnx, block, shortname, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_REGION_TB + " WHERE block = \"{}\" and shortname = \"{}\" ".format(block, shortname)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_email_admin_TP_tb(cnx, child_depart1, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_EMAIL_ADMIN_TP_TB + " WHERE child_depart1 = \"{}\" ".format(child_depart1)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        ok = False
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_emp_code_fr_checkin_tb(cnx, MBN_account_name, fname=""):
    emp_code = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE MBN_account_name = \'{}\'".format(MBN_account_name)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                emp_code = str(x['emp_code'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return emp_code

def get_emp_code_fr_email(cnx, email, fname=""):
    emp_code = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                emp_code = str(x['emp_code'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return emp_code

def get_child_depart_fr_emp_code(cnx, emp_code, fname=""):
    child_depart = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE emp_code = \'{}\'".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                child_depart = str(x['child_depart'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return child_depart

def get_workday_convert_fr_checkin_tb(cnx, MBN_account_name, checkin_date, fname=""):
    workday_convert = 0
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE MBN_account_name = \'{}\' AND checkin_date = \'{}\' ".format(MBN_account_name, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                workday_convert = float(x['workday_convert'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return workday_convert

def get_workday_convert_fr_checkin_tb_by_emp_code(cnx, emp_code, checkin_date, fname=""):
    workday_convert = 0
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE emp_code = \'{}\' AND checkin_date = \'{}\' ".format(emp_code, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                workday_convert = float(x['workday_convert'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return workday_convert

def get_note_fr_emp_checkin_tb_by_checkin_id(cnx, checkin_id, fname=""):
    note = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE checkin_id = \'{}\' ".format(checkin_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                note = str(x['note'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return note

def get_note_fr_ptq_tb_by_ptq_id(cnx, ptq_id, fname=""):
    note = ""
    try:
        query = "SELECT * FROM "+ MYSQL_PTQ_TB +" WHERE ptq_id = \'{}\' ".format(ptq_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            note = result[0].get("note")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return note

def get_note_fr_emp_checkin_tb_by_MBN(cnx, MBN_account_name, checkin_date, fname=""):
    note = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE MBN_account_name = \'{}\' AND checkin_date = \'{}\' ".format(MBN_account_name, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                note = str(x['note'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return note

def get_note_fr_emp_checkin_tb_by_emp_code(cnx, emp_code, checkin_date, fname=""):
    note = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_CHECKIN_TB +" WHERE emp_code = \'{}\' AND checkin_date = \'{}\' ".format(emp_code, checkin_date)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                note = str(x['note'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return note

def check_insert_pass_salary_tb(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_PW_SALARY_TB + " WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_device_id_account_management_tb(cnx, emp_code, fname=""):
    device_id = "NOTOK"
    try:
        query = "SELECT * FROM " + MYSQL_ACCOUNT_MANAGEMENT_TB + " WHERE emp_code = \'{}\' ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                device_id = x['device_id']
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return device_id

def get_pass_fr_pass_salary_tb(cnx, email, fname=""):
    pass_salary = ""
    try:
        query = "SELECT * FROM "+ MYSQL_PW_SALARY_TB +" WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                _pass = str(x['pass'])
                pass_salary = decrypt(KEY_IV,_pass,fname)
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return pass_salary

def check_region(teamname="", fname=""):
    dic_region = {
                  'TIN01': 'Vùng 1', 'TIN02': 'Vùng 1', 'TIN03': 'Vùng 1', 'TIN04': 'Vùng 1', 'TIN05': 'Vùng 1', 'TIN06': 'Vùng 1', 'TIN07': 'Vùng 1',
                  'TIN08': 'Vùng 1', 'TIN09': 'Vùng 1', 'TIN10': 'Vùng 1', 'TIN11': 'Vùng 1', 'TIN12': 'Vùng 1', 'TIN13': 'Vùng 1', 'TIN14': 'Vùng 1',
                  'BGGTI': 'Vùng 2', 'BNHTI': 'Vùng 2', 'CBGTI': 'Vùng 2', 'HYNTI': 'Vùng 2', 'LCITI': 'Vùng 2', 'LSNTI': 'Vùng 2', 'PTOTI': 'Vùng 2', 'QNHT1': 'Vùng 2', 'QNHT2': 'Vùng 2', 'TNNTI': 'Vùng 2', 'TQGTI': 'Vùng 2', 'VPCTI': 'Vùng 2', 'YBITI': 'Vùng 2',
                  'DBNTI': 'Vùng 3', 'HBHTI': 'Vùng 3', 'HDGTI': 'Vùng 3', 'HNMTI': 'Vùng 3', 'HPGTI': 'Vùng 3', 'HTHTI': 'Vùng 3', 'NANTI': 'Vùng 3', 'NBHTI': 'Vùng 3', 'NDHTI': 'Vùng 3', 'SLATI': 'Vùng 3', 'TBHTI': 'Vùng 3', 'THATI': 'Vùng 3',
                  'BDHPN': 'Vùng 4', 'GLIPN': 'Vùng 4', 'KHAPN': 'Vùng 4', 'KTMPN': 'Vùng 4', 'PYNPN': 'Vùng 4', 'QNMPN': 'Vùng 4', 'QNIPN': 'Vùng 4', 'DLKPN': 'Vùng 4', 'DNGTI': 'Vùng 4', 'HUETI': 'Vùng 4', 'QBHTI': 'Vùng 4', 'QTITI': 'Vùng 4',
                  'PNC01': 'Vùng 5', 'PNC02': 'Vùng 5', 'PNC03': 'Vùng 5', 'PNC04': 'Vùng 5', 'PNC05': 'Vùng 5', 'PNC06': 'Vùng 5', 'PNC07': 'Vùng 5', 'PNC08': 'Vùng 5',
                  'PNC09': 'Vùng 5', 'PNC10': 'Vùng 5', 'PNC11': 'Vùng 5', 'PNC12': 'Vùng 5', 'PNC13': 'Vùng 5', 'PNC14': 'Vùng 5', 'PNC15': 'Vùng 5', 'PNC16': 'Vùng 5', 'PNCTF': 'Vùng 5',
                  'VTUPN': 'Vùng 6', 'BDGPN': 'Vùng 6', 'BPCPN': 'Vùng 6', 'BTNPN': 'Vùng 6', 'LDGPN': 'Vùng 6', 'NTNPN': 'Vùng 6', 'TNHPN': 'Vùng 6', 'DNIPN': 'Vùng 6',
                  'AGGPN': 'Vùng 7', 'BLUPN': 'Vùng 7', 'BTEPN': 'Vùng 7', 'CMUPN': 'Vùng 7', 'CTOPN': 'Vùng 7', 'HGGPN': 'Vùng 7', 'KGGPN': 'Vùng 7', 'LANPN': 'Vùng 7', 'STGPN': 'Vùng 7', 'TGGPN': 'Vùng 7', 'TVHPN': 'Vùng 7', 'VLGPN': 'Vùng 7', 'DTPPN': 'Vùng 7',
                  'ALL' : 'admin'
                  }
    if teamname in dic_region.keys():
        region = dic_region[teamname]
    else:
        region = "admin"
    return region

def get_block_name_emp_checkin_tb_by_checkin_id(cnx, checkin_id, fname=""):
    block_name = ""
    emp_code = ""
    try:
        query = "SELECT * FROM " + MYSQL_EMP_CHECKIN_TB + " WHERE checkin_id = \'{}\'".format(checkin_id)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                emp_code = str(x['emp_code'])
                break
        query = "SELECT * FROM " + MYSQL_EMP_CHECKIN_TB + " WHERE emp_code = \'{}\' ORDER BY checkin_date DESC".format(emp_code)
        result1 = emp_checkin_exec_query(cnx, query, fname)
        if result1 is not None and len(result1) > 0:
            for x in result1:
                block_name = str(x['block_name'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return block_name

def format_encrypt_salary(salary, fname=""): #salary is tuple
    encrypt_salary = ()
    salary_list = list(salary)
    if salary is not None and len(salary) > 0:
        for i in range(0, len(salary_list)):
            row = salary_list[i]
            if isinstance(row, int):
                row = '{:,.0f}'.format(row)
                _format_row = encrypt_server(KEY_IV, row, fname)
            elif isinstance(row, float):
                row = round(row, 2)
                _format_row = encrypt_server(KEY_IV, str(row), fname)
            else:
                _format_row = row
            salary_list[i] = _format_row
        encrypt_salary = tuple(salary_list)
    return encrypt_salary

def decrypt_salary_detail(cnx, query, fname="", mode=""):
    result = []
    try:
        # logger_db.info("query: {}".format(query))
        cursor = cnx.cursor(buffered=True)
        cursor.execute( query )
        columns = cursor.description
        for value in cursor.fetchall():
            # logger_db.info("values: {}".format(value))
            value = format_decrypt_salary(value, fname, mode)
            # logger_db.info("values sau ma hoa: {}".format(value))
            tmp = {}
            for (index, column) in enumerate(value):
                tmp[columns[index][0]] = column
            result.append(tmp)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return result

def format_decrypt_salary(salary, fname="", mode=""): #salary is tuple
    decrypt_salary = ()
    salary_list = list(salary)
    _len_salary_list = len(salary_list)
    if mode == "luong_hoach_toan":
        _len_salary_list = len(salary_list) - 3
    if salary_list is not None and len(salary_list) > 0:
        for i in range(3, _len_salary_list):
            row = salary_list[i]
            if row is not None:
                _format_row = decrypt(KEY_IV, row, fname)
            else:
                _format_row = "N/A"
            salary_list[i] = _format_row
        decrypt_salary = tuple(salary_list)
    return decrypt_salary

def query_format(dic, fname=""):
    qr = " select * from "+ MYSQL_EMP_CHECKIN_TB + " where "
    tmp = ""
    cnt = 0
    for k,v in dic.items():
        if dic[k] != '' and cnt == 0:
            tmp = tmp + '''{} = \" {} \" '''.format(k,v)
            cnt +=1
        elif dic[k] != '' and cnt != 0:
            tmp = tmp + '''and {} = \" {} \" '''.format(k,v)
        else:
            pass
    qr = qr + tmp
    return qr

def check_insert_tool_ATLD(cnx, emp_code, ngay_cap, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_TOOL_ATLD_TB + " WHERE emp_code = \'{}\' and ngay_bat_dau_dao_tao = \'{}\' ".format(emp_code, ngay_cap)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

#input: 30/01/2020 08:30
#output: 2020-01-30 08:30
#day = 30, month = 01, year = 2020
def parse_datetime(str_datetime, fname=""):
    day = month = year = spl_time = date_time = ''
    dic_output = {}
    try:
        if str_datetime != '':
            spl = str_datetime.split()
            spl_time = spl[1]
            spl_dmy = spl[0].split('/')
            day = spl_dmy[0]
            month = spl_dmy[1]
            year = spl_dmy[2]
            date_time = '{}-{}-{} {}'.format(year, month, day, spl_time)
    except Exception as e:
        logger_db.info("{} Error: {}".format(fname, e))
    dic_output =  {
                    'day': day,
                    'month': month,
                    'year': year,
                    'date_time': date_time
                }
    return dic_output

def check_insert_thu_vien_tb(cnx, ten_tai_lieu, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_THU_VIEN_TB + " WHERE ten_tai_lieu = \'{}\' ".format(ten_tai_lieu)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_token_tb(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_NOTI_MANAGEMENT_TOKEN + " WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_email_fr_emp_code_employees_tb(cnx, emp_code, fname=""):
    email = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE emp_code = \'{}\' ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                email = str(x['email']).lower()
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return email

def get_acc_pctu_fr_emp_code(cnx, emp_code, fname=""):
    acc_pctu = ""
    try:
        query = "SELECT * FROM "+ MYSQL_ACCOUNT_MANAGEMENT_TB +" WHERE emp_code = \'{}\' ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                acc_pctu = str(x['MBN_account_name'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return acc_pctu

def get_acc_pctu_fr_email(cnx, email, fname=""):
    acc_pctu = ""
    try:
        query = "SELECT a.*, b.emp_code, b.email FROM " + MYSQL_ACCOUNT_MANAGEMENT_TB + " a LEFT JOIN " + MYSQL_EMP_TB + \
                " b on a.emp_code = b.emp_code where b.email = \'{}\' ".format(email)
        # query = "SELECT * FROM "+ MYSQL_ACCOUNT_MANAGEMENT_TB +" WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                acc_pctu = str(x['MBN_account_name']).upper()
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return acc_pctu

def insert_update_account_management_tb(cnx, emp_code, acc_pctu, fname="",block_name=""):
    try:
        ok = True
        acc_pctu = str(acc_pctu).upper()
        time_now = get_current_datetime()
        cursor = cnx.cursor(buffered=True)
        sql_insert_tb = "INSERT INTO " + MYSQL_ACCOUNT_MANAGEMENT_TB + " (emp_code, MBN_account_name,block_name, acctive_time) VALUES (%s,%s, %s, %s)"
        sql_update_tb = "UPDATE " + MYSQL_ACCOUNT_MANAGEMENT_TB + " SET MBN_account_name = %s,block_name = %s, acctive_time = %s WHERE emp_code = %s "
        if check_insert_account_management_tb(cnx, emp_code, fname):
            try:
                # email = get_email_fr_emp_code_employees_tb(cnx, emp_code, fname)
                values = (emp_code, acc_pctu,block_name, time_now)
                cursor.execute(sql_insert_tb, values)
            except Exception as ex:
                ok = False
                logger_db.info("{}: {}".format(fname, ex))
        else:
            try:
                MBN_account_name = get_acc_pctu_fr_emp_code(cnx, emp_code, fname)
                # if acc_pctu != MBN_account_name:
                #     values = (acc_pctu,block_name, time_now, emp_code)
                #     cursor.execute(sql_update_tb, values)
                values = (acc_pctu,block_name, time_now, emp_code)
                cursor.execute(sql_update_tb, values)
            except Exception as ex:
                ok = False
                logger_db.info("{}: {}".format(fname, ex))
        if ok:
            cursor.close()
            cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))

def nhom_loai_the_atld(cnx, vi_tri, fname=""):
    _group = ""
    _type = ""
    # list_group_1 = ['Giám đốc','Phó giám đốc']
    # list_group_2 = ['Phó phòng','Trưởng phòng']
    # list_group_3 = ['CB Kỹ thuật FTTH','CB Kỹ thuật hạ tầng','CB Kỹ thuật TK SWAP','CB Kỹ thuật TKBT','CB Vận hành khai thác hạ tầng','CB Xử lý sự cố','Thanh tra viên']
    # list_group_4_1 = ['CB Bảo hiểm','CB Đảm bảo chất lượng','CB Điều hành hệ thống mạng','CB Hành chính nhân sự','CB Hành chính tổng hợp','CB Hỗ trợ CNTT','CB Hỗ trợ KH qua tổng đài']
    # list_group_4_2 = ['CB Hỗ trợ kỹ thuật tại nhà KH','CB Hỗ trợ kỹ thuật từ xa','CB Hoàn ứng vật tư','CB Kế toán','CB Kiểm soát nghiệp vụ','CB Kiểm tra thiết bị']
    # list_group_4_3 = ['CB Lập trình','CB Quản lý CB','CB Quản lý đào tạo','CB Quản lý nghiệp vụ thuê bao','CB Thu cước','CB Truyền thông nội bộ','CB Tuyển dụng']
    # list_group_4_4 = ['Giảng viên nội bộ','Giao dịch viên','Kỹ Thuật viên Điều hành','Kỹ thuật viên INDO','Kỹ thuật viên Onsite','Phụ kho']
    # list_group_4_5 = ['QL Chăm sóc khách hàng','QL Đào tạo (mảng HR)','QL Hệ thống mạng (network)','QL Hỗ trợ khách hàng DN','QL Triển khai bảo trì thuê bao','Thủ kho', "CB Lập trình 1", "CB Quản lý CB 1"]
    # list_group_4_6 = ["QL Hệ thống mạng (network) 1", 'CB Kế toán 1', 'CB Đảm bảo chất lượng 1', 'CB Tuyển dụng 1', 'CB Truyền thông nội bộ 1']
    # list_group_4 = list_group_4_1 + list_group_4_2 + list_group_4_3 + list_group_4_4 + list_group_4_5 + list_group_4_6
    # if vi_tri in list_group_1 :
    #     _group = "Nhóm 1"
    #     _type = "Chứng Nhận"
    # elif vi_tri in list_group_2:
    #     _group = "Nhóm 2"
    #     _type = "Chứng Nhận"
    # elif vi_tri in list_group_3:
    #     _group = "Nhóm 3"
    #     _type = "Thẻ"
    # elif vi_tri in list_group_4:
    #     _group = "Nhóm 4"
    #     _type = "Ghi Sổ"
    if vi_tri != "":
        try:
            query = "SELECT * FROM " + MYSQL_TOOL_ATLD_BANG_QUY_DOI_TB + " WHERE job_title = \'{}\' ".format(vi_tri)
            result = emp_checkin_exec_query(cnx, query, fname)
            if result is not None and len(result) != 0:
                _group = result[0].get("nhom_dao_tao", "")
                _type = result[0].get("cap_the_chung_chi", "")
        except Exception as e:
            logger_db.info("{}: {}".format(fname, e))
    dic_output = {
                    'group': _group,
                    'type': _type
                }
    return dic_output

def get_job_title_fr_emp_code_employees_tb(cnx, emp_code, fname=""):
    job_title = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE emp_code = \'{}\' ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                job_title = str(x['job_title'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return job_title

def get_job_title_fr_email_employees_tb(cnx, email, fname=""):
    job_title = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                job_title = str(x['job_title'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return job_title

def get_thoi_gian_fr_kbyt(cnx, email, fname=""):
    thoi_gian = ""
    try:
        query = "SELECT * FROM "+ MYSQL_KHAI_BAO_Y_TE_TB +" WHERE email = \'{}\'".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                _tg = x['thoi_gian']
                thoi_gian = convert_datetimeDb(_tg)
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return thoi_gian

def get_list_values_unique_of_colunm_table(cnx, colunm, table, fname=""):
    list = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT " + colunm + " FROM "+ table
        print(query )
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            value = i[0]
            if value not in list:
                list.append(value)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def get_list_address_fr_add_covid19_tb(cnx, city, fname=""):
    list = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT * FROM "+ MYSQL_ADD_COVID19_TB +" WHERE city = \'{}\' and status = 1".format(city)
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            address = i[1]
            if address not in list:
                list.append(address)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def get_list_city_fr_add_covid19_tb(cnx, fname=""):
    list = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT city FROM "+ MYSQL_ADD_COVID19_TB +" WHERE status = 1"
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            city = i[0]
            if city not in list:
                list.append(city)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def get_list_phong_van_tb(cnx, fname=""):
    list = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT * FROM danh_sach_nguoi_pv_tb"
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            email = str(i[0]).lower()
            if email not in list:
                list.append(email)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def get_list_lat_long_fr_add_covid19_tb(cnx, city, fname=""):
    list_lat_long = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT * FROM "+ MYSQL_ADD_COVID19_TB +" WHERE city = \'{}\' and status = 1".format(city)
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            dict = {}
            _lat = i[3]
            _long = i[4]
            if _lat is not None and _long is not None:
                if len(_lat) != 0 and len(_long) != 0:
                    dict["lat"] = _lat
                    dict["long"] = _long
                    list_lat_long.append(dict)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_lat_long

def get_tong_cl_KH_phat_sinh(cnx, account_name, date_from, date_to, fname=""):
    tong_cl = 0
    list = []
    try:
        cursor = cnx.cursor(buffered=True)
        query = "SELECT * FROM " + MYSQL_SO_LUONG_BAO_TRI_TB + " WHERE MBN_account_name = \"{}\" AND ngay_tinh_kpis BETWEEN \"{}\" AND \"{}\" ".format(account_name, date_from, date_to)
        cursor.execute(query)
        empRows = cursor.fetchall()
        for i in empRows:
            so_HD = i[2]
            if so_HD not in list:
                tong_cl = tong_cl + 1
                list.append(so_HD)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return tong_cl

def get_tong_cl_KH_phat_sinh1(cnx, emp_code, date_from, date_to, fname=""):
    tong_cl = 0
    try:
        loai_kpis = "cl_lap"
        query = "SELECT * FROM " + MYSQL_KPIS_LATETIME_TB + " WHERE emp_code = \"{}\" AND loai_kpis = \"{}\" AND ngay_tinh_kpis BETWEEN \"{}\" AND \"{}\" ORDER BY ngay_tinh_kpis DESC ".format(emp_code, loai_kpis, date_from, date_to)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            totalcushascl = result[0].get("totalcushascl", 0)
            if totalcushascl is not None:
                tong_cl = totalcushascl
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return tong_cl

# def img_to_base64 (file_img, fname=""):
#     img_string = ""
#     try:
#         if file_img != "":
#             with open(file_img, "rb") as img_file:
#                 img_string = base64.b64encode(img_file.read())
#                 img_string = img_string.decode('utf-8')
#     except Exception as e:
#         logger_db.info("{} error: {}".format(fname, e))
#     return img_string

def img_to_base64(file_img, fname="", scale_percent = 25):
    img_string = ""
    try:
        if file_img != "":
            img = cv2.imread(file_img, cv2.IMREAD_UNCHANGED)
            # scale_percent = 25  # percent of original size
            width = int(img.shape[1] * scale_percent / 100)
            height = int(img.shape[0] * scale_percent / 100)
            dim = (width, height)
            resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
            cv2.imwrite("temp.png", resized)

            with open("temp.png", "rb") as img_file:
                img_string = base64.b64encode(img_file.read())
                img_string = img_string.decode('utf-8')
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return img_string

def img_to_base64_new(file_img = "", fname="", scale_percent = 100, width = "", height = ""):
    img_string = ""
    try:
        if file_img != "":
            img = cv2.imread(file_img, cv2.IMREAD_UNCHANGED)
            # scale_percent = 25  # percent of original size
            if width == "":
                width = int(img.shape[1] * scale_percent / 100)
            if height == "":
                height = int(img.shape[0] * scale_percent / 100)
            dim = (width, height)
            resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
            cv2.imwrite("temp_new.png", resized)

            with open("temp_new.png", "rb") as img_file:
                img_string = base64.b64encode(img_file.read())
                img_string = img_string.decode('utf-8')
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return img_string

def get_branch_fr_email(cnx, email, fname=""):
    branch = ""
    try:
        query = "SELECT a.child_depart, a.email, b.child_depart, b.branch FROM " + MYSQL_EMP_TB + " a LEFT JOIN " + MYSQL_DEPARTMENT_TB + " b on a.child_depart = b.child_depart WHERE a.email = \"{}\" ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                branch = str(x['branch'])
                break
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return branch

def get_branch_fr_emp_code(cnx, emp_code, fname=""):
    branch = ""
    try:
        query = "SELECT a.child_depart, a.emp_code, b.child_depart, b.branch FROM " + MYSQL_EMP_TB + " a LEFT JOIN " + MYSQL_DEPARTMENT_TB + " b on a.child_depart = b.child_depart WHERE a.emp_code = \"{}\" ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                branch = str(x['branch'])
                break
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return branch

def get_child_depart1_fr_email(cnx, email, fname=""):
    child_depart1 = ""
    try:
        query = "SELECT a.child_depart, a.email, b.child_depart, b.child_depart1 FROM " + MYSQL_EMP_TB + " a LEFT JOIN " + MYSQL_DEPARTMENT_TB + " b on a.child_depart = b.child_depart WHERE a.email = \"{}\" ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                child_depart1 = str(x['child_depart1'])
                break
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return child_depart1

def get_device_id_fr_email(cnx, email, fname=""):
    device_id = ""
    try:
        query = "SELECT a.email, a.emp_code, b.emp_code, b.device_id FROM " + MYSQL_EMP_TB + " a LEFT JOIN " + MYSQL_ACCOUNT_MANAGEMENT_TB + " b on a.emp_code = b.emp_code WHERE a.email = \"{}\" ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                device_id = str(x['device_id'])
                break
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return device_id

def save_file_txt(folder, name_file, content, fname= ""):
    # ex : input namefile = test, link_forder = ../../data/export_kbyt, content = test
    # ouput ../data/export_kbyt/test.txt
    filename = name_file + '.' + 'txt'
    file_directory = ""
    try:
        if folder != "":
            link_folder = UPLOAD_DIRECTORY + "/" + folder
            abs_dir = os.path.abspath(link_folder)
            file_directory = os.path.join(abs_dir, filename)
            if not os.path.exists(link_folder):
                os.makedirs(link_folder)
            with open(file_directory, "w") as fp:
                fp.write(content)
                fp.close()
    except Exception as ex:
        logger_db.info("Error on {} when save file: {}".format(fname, file_directory, ex))
    return file_directory

def read_file_txt_convert_str(link_file, fname= ""):
    # ex : link_file = ../../data/a/b.txt
    # ouput: str nội dung file
    content = ""
    try:
        if link_file != "":
            f = open(link_file, 'r')
            content = f.read()
    except Exception as ex:
        logger_db.info("Error on {} when read file: {}".format(fname, link_file, ex))
    return content

def get_email_admin_TP(cnx, child_depart1, fname=""):
    email_admin = []
    email_TP = []
    dic_output = {'email_admin': email_admin, 'email_TP': email_TP}
    try:
        query = "SELECT * from " + MYSQL_EMAIL_ADMIN_TP_TB + " where child_depart1 = \"{}\" ".format(child_depart1)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            email_admin_tmp =  result[0].get("email_admin", None)
            email_TP_tmp = result[0].get("email_TP", None)
            if email_admin_tmp is not None and email_admin_tmp != "":
                email_admin = email_admin_tmp.split(',')
            if email_TP_tmp is not None and email_TP_tmp != "":
                email_TP = email_TP_tmp.split(',')
            dic_output = {'email_admin': email_admin, 'email_TP': email_TP}
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return dic_output

def get_ti_le_kbyt(cnx, fname=""):
    sl_nhan_vien_pnc = 0
    sl_nhan_vien_tin = 0
    sl_kbyt_pnc = 0
    sl_kbyt_tin = 0
    ti_le_pnc = 0
    ti_le_tin = 0
    kq = {"ti_le_pnc": ti_le_pnc, "ti_le_tin": ti_le_tin,"sl_kbyt_pnc":sl_kbyt_pnc,"sl_kbyt_tin":sl_kbyt_tin}
    try:
        for i in ["TIN","PNC"]:
            query = "SELECT a.branch, a.parent_depart, b.child_depart,b.status_working, b.emp_name FROM department_tb a INNER JOIN employees_tb b on a.child_depart = b.child_depart WHERE branch = \"{}\" and status_working = 1".format(i)
            rs = emp_checkin_exec_query(cnx, query, fname)
            if i == "PNC":
                sl_nhan_vien_pnc = len(rs)
            if i == "TIN":
                sl_nhan_vien_tin = len(rs)
        list_email_kbyt = get_list_values_unique_of_colunm_table(cnx, "email", MYSQL_KHAI_BAO_Y_TE_TB, fname)
        for j in list_email_kbyt:
            branch = get_branch_fr_email(cnx, j, fname)
            if branch == "PNC":
                sl_kbyt_pnc += 1
            if branch == "TIN":
                sl_kbyt_tin += 1
        kq["ti_le_pnc"] = round((sl_kbyt_pnc * 100) / sl_nhan_vien_pnc, 2)
        kq["ti_le_tin"] = round((sl_kbyt_tin * 100) / sl_nhan_vien_tin, 2)
        kq["sl_kbyt_pnc"] = sl_kbyt_pnc
        kq["sl_kbyt_tin"] = sl_kbyt_tin
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return kq

def get_type_emp(cnx, email, fname=""):
    type_emp = ""
    list_contract_new_emp = ['hợp đồng đào tạo nghề', 'hợp đồng thử việc', "hđ đào tạo nghề", "hđ thử việc"]
    list_khoi_ky_thuat = ['cb kỹ thuật tkbt', 'cb hỗ trợ kỹ thuật từ xa', 'cb hỗ trợ kỹ thuật tại nhà kh', 'cb xử lý sự cố']
    list_phong_van = get_list_phong_van_tb(cnx, fname)
    try:
        if email != "":
            email = str(email).lower()
            query = "SELECT * from " + MYSQL_EMP_TB + " where email = \"{}\" ".format(email)
            result = emp_checkin_exec_query(cnx, query, fname)
            if len(result) != 0:
                type_contract =  str(result[0].get("contract_type", "")).lower()
                job_title = str(result[0].get("job_title", "")).lower()
                if type_contract is not None and type_contract in list_contract_new_emp:
                    type_emp = 'emp_new'
                elif job_title in list_khoi_ky_thuat:
                    type_emp = 'emp_old'
                else:
                    if email in list_phong_van:
                        type_emp = 'emp_interviewer'
                    else:
                        type_emp = 'emp_office'
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return type_emp

def calculate_distance_to(self, other):
    r = 6371  # Earth radius

    lat_dif = abs(float(self.split(",")[0]) - float(other.split(",")[0])) * math.pi / 180
    a = np.sin(lat_dif / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    lat_dis = r * c

    lon_dif = abs(float(self.split(",")[1]) - float(other.split(",")[1])) * math.pi / 180
    a = np.sin(lon_dif / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    lon_dis = r * c

    distance = abs(lat_dis) + abs(lon_dis)
    return distance * 1000

def tinh_cong(t_second = 0, fname="" ):
    ngay_cong = 0
    if t_second <= 0:
        ngay_cong = 1
    elif t_second > 0 and t_second / 28800 < 1:
        ngay_cong = round((1 - t_second / 28800), 2)
    return ngay_cong

def calculate_workday_factor (branch, res_time, ca, location, fname="" ):
    time_in = datetime.strptime(res_time,'%Y-%m-%d %H:%M:%S')
    time_block = time_block_PNC()
    time_office = time_office_PNC()
    time_after_VP = time_after_VP_PNC()
    time_after_BL = time_after_BL_PNC()
    if branch == 'TIN':
        time_block = time_block_TIN()
        time_office = time_office_TIN()
        time_after_VP = time_after_VP_TIN()
        time_after_BL = time_after_BL_TIN()
    t_sang_BL= (time_in - time_block).total_seconds()
    t_sang_VP = (time_in - time_office).total_seconds()
    t_chieu_VP = (time_in - time_after_VP).total_seconds()
    t_chieu_BL = (time_in - time_after_BL).total_seconds()
    t_start_chieu = (time_in - time_start_chieu()).total_seconds()
    tmp = 0
    if ca == 'S' and location == 'BLOCK':
        tmp = t_sang_BL
    elif ca == 'C' and location == 'VP' and t_start_chieu >= 0:
        tmp = t_chieu_VP
    elif ca == 'C' and location == 'BLOCK' and t_start_chieu >= 0 :
        tmp = t_chieu_BL
    else :
        tmp = t_sang_VP
    return tinh_cong(tmp)

def check_in_result (cnx, emp_code, coor_emp, fname=""):
    toa_do_van_phong = '0.0,0.0'
    toa_do_kho = '0.0,0.0'
    toa_do_lam_viec = '0.0,0.0'
    ban_kinh_lam_viec = 0
    checkin = ""
    location = ""
    try:
        query = "SELECT * from " + MYSQL_ACCOUNT_MANAGEMENT_TB + " where emp_code = \"{}\" ".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            __toadovanphong = result[0].get("toa_do_van_phong", '0.0,0.0')
            if __toadovanphong is not None:
                toa_do_van_phong =  __toadovanphong

            __toadokho = result[0].get("toa_do_kho", '0.0,0.0')
            if __toadokho is not None:
                toa_do_kho = __toadokho

            __toadolamviec = result[0].get("toa_do_lam_viec", '0.0,0.0')
            if __toadolamviec is not None:
                toa_do_lam_viec = __toadolamviec

            __bankinhlamviec = result[0].get("ban_kinh_lam_viec", 0)
            if __bankinhlamviec is not None:
                ban_kinh_lam_viec = int(__bankinhlamviec)
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    if calculate_distance_to(coor_emp, toa_do_van_phong) <= 200 or calculate_distance_to(coor_emp , toa_do_kho) <= 200 :
        checkin = "OK"
        location = "VP"
    elif calculate_distance_to(coor_emp, toa_do_lam_viec) <= ban_kinh_lam_viec :
        checkin = "OK"
        location = "BLOCK"
    else:
        checkin = "NOTOK"
    return {"checkin":checkin, "location":location}

def luu_toa_do_phan_hoi(acc_mobinet="", emp_code="", res_time="", coor_emp=""):
    time_split = get_current_datetime().strftime(DATETIME_FORMAT3).split("_")[0]
    if not os.path.exists("../data/report_checkin"):
        os.makedirs("../data/report_checkin")
    if not os.path.exists("../data/report_checkin/{}".format(time_split)):
        os.makedirs("../data/report_checkin/{}".format(time_split))
    file_log = '../data/report_checkin/{}/{}.csv'.format(time_split,acc_mobinet)
    c = '{},{},{},{}\n'.format(acc_mobinet,emp_code,res_time,coor_emp)
    if not os.path.exists(file_log):
        with open(file_log, 'w') as outfile:
            outfile.write("acc_mobinet,emp_code,res_time,coor_emp\n" + c)
    else:
        with open(file_log, 'a') as outfile:
            outfile.write(c)

def parse_st(st):
    out = "N/A"
    if st != "N/A" and len(st.split(";")) == 3 and float(st.split(";")[2]) > 10:
        out = st.split(";")[0]
    return out

def get_persion_perf(emp_code):
    file_source = "services/personal_perf_dict.json"
    with open(file_source) as f:
        array = json.load(f)
    _keys = array .keys()
    dict_input = {}
    dict_output = {}
    for i in _keys:
        dict_input[i.zfill(8)] = array[i]
    if emp_code in dict_input.keys():
        dict_output["st1_1"] = parse_st(dict_input[emp_code].get("st1_1", "N/A"))
        dict_output["st1_2"] = parse_st(dict_input[emp_code].get("st1_2", "N/A"))
        dict_output["st1_3"] = parse_st(dict_input[emp_code].get("st1_3", "N/A"))
        dict_output["st1_4"] = parse_st(dict_input[emp_code].get("st1_4", "N/A"))
    else:
        dict_output["st1_1"] = dict_output["st1_2"] = dict_output["st1_3"] = dict_output["st1_4"] = "N/A"
    return dict_output

def insert_tool_atld(cnx, email, old_job_title, new_job_title, fname=""):
    con_han = "Còn Hạn"
    kq = "NOTOK"
    _thoi_han = 0
    try:
        date_now = get_current_date()
        cursor = cnx.cursor()
        sql_insert_tb = "INSERT INTO " + MYSQL_TOOL_ATLD_TB + " (atld_id, emp_code, nhom_dao_tao, cap_the_chung_chi, tinh_trang_the_chung_chi) VALUES (NULL, %s, %s, %s, %s) "
        if new_job_title != old_job_title:
            branch = get_branch_fr_email(cnx, email, fname)
            emp_code = get_emp_code_fr_email(cnx, email, fname)
            if branch == "PNC":
                old_nhom_loai_atld = nhom_loai_the_atld(cnx, old_job_title, fname)
                old_nhom_dao_tao = old_nhom_loai_atld.get("group", "")
                new_nhom_loai_atld = nhom_loai_the_atld(cnx, new_job_title, fname)
                new_nhom_dao_tao = new_nhom_loai_atld.get("group", "")
                sql_select = "SELECT * FROM " + MYSQL_TOOL_ATLD_TB + " WHERE emp_code = \"{}\" AND tinh_trang_the_chung_chi = \"{}\" AND nhom_dao_tao = \"{}\" ".format(emp_code, con_han, new_nhom_dao_tao)
                result = emp_checkin_exec_query(cnx, sql_select, fname)
                if len(result) > 0:
                    ngay_het_han_ATLD = result[0].get("ngay_het_han_ATLD", None)
                    _temp = ngay_het_han_ATLD - date_now
                    _thoi_han = _temp.days
                if new_nhom_dao_tao != old_nhom_dao_tao:
                    if _thoi_han > 0:
                        atld_id = result[0].get("atld_id", None)
                        sql_update_tb = "UPDATE " + MYSQL_TOOL_ATLD_TB + " SET ngay_cap_the_ATLD = %s WHERE atld_id = %s "
                        values = (date_now, atld_id)
                        cursor.execute(sql_update_tb, values)
                        cnx.commit()
                        kq = "OK"
                    else:
                        tinh_trang_the_chung_chi = "Chưa Cấp"
                        cap_the_chung_chi = new_nhom_loai_atld.get("type", "")
                        values = (emp_code, new_nhom_dao_tao, cap_the_chung_chi, tinh_trang_the_chung_chi)
                        cursor.execute(sql_insert_tb, values)
                        cnx.commit()
                        kq = "OK"
    except Exception as e:
        logger_db.info("{} error insert_tool_atld: {}".format(fname, e))
    return kq

def check_insert_tuyen_dung_quan_ly_ung_vien_tb(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_TUYEN_DUNG_QUAN_LY_UNG_VIEN_TB + " WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_lich_su_loai_luong_tb(cnx, email, month, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_LICH_SU_LOAI_LUONG_TB + " WHERE email = \"{}\" AND month = \"{}\" ".format(email, month)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def insert_update_lich_su_loai_luong_tb(cnx, email, month, type_salary, update_by, fname=""):
    ok = False
    try:
        time_now = get_current_datetime()
        cursor = cnx.cursor(buffered=True)
        sql_insert_tb = "INSERT INTO " + MYSQL_LICH_SU_LOAI_LUONG_TB + " (id, email, month, type_salary, update_time, update_by) VALUES (NULL, %s, %s, %s, %s, %s)"
        sql_update_tb = "UPDATE " + MYSQL_LICH_SU_LOAI_LUONG_TB + " SET type_salary = %s, update_time = %s, update_by = %s WHERE email = %s AND month = %s "
        if check_insert_lich_su_loai_luong_tb(cnx, email, month, fname):
            values = (email, month, type_salary, time_now, update_by)
            cursor.execute(sql_insert_tb, values)
            ok = True
        else:
            values = (type_salary, time_now, update_by, email, month)
            cursor.execute(sql_update_tb, values)
            ok = True
        # if ok:
        #     cursor.close()
        #     cnx.commit()
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_query_insert_update_fr_dict(dict_input = {}, tb_name = '', fname=""):
    tup_key = []
    tup_vl = []
    for i , k in dict_input.items():
        tup_key.append(i)
        tup_vl.append(str(k))
    str_tup_key = ",".join(tup_key)
    str_tup_vl = "\",\"".join(tup_vl)
    qr = "INSERT INTO " + tb_name + " ({})".format(str_tup_key) + " VALUES " + "(\"{}\")".format(str_tup_vl)
    return qr

def get_query_update_fr_dict(dict_input = {}, qr_where = "", tb_name = '', fname=""):
    tup_key = []
    tup_vl = []
    qr = "UPDATE {} SET ".format(tb_name)
    n_tmp = 0
    for i , k in dict_input.items():
        i = str(i)
        k = str(k)
        if n_tmp == 0:
            str_tmp = i + " = \"" + k + "\""
        else:
            if k == "None":
                str_tmp = "," + i + " = NULL "
            else:
                str_tmp = "," + i + " = \"" + k + "\""
        qr = qr + str_tmp
        n_tmp +=1
    qr = qr + " Where " + qr_where
    return qr

def get_id_ung_vien_fr_email_tb(cnx, email, fname=""):
    id_ung_vien = ""
    try:
        query = "SELECT * FROM "+ MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB +" WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                id_ung_vien = str(x['id_ung_vien'])
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return id_ung_vien

def check_insert_tuyen_dung_thong_tin_ca_nhan_tb(cnx, id_ung_vien, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB + " WHERE id_ung_vien = \"{}\"".format(id_ung_vien)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_tuyen_dung_thong_tin_ca_nhan_tb_from_email(cnx, email, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB + " WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_tuyen_dung_danh_gia_ung_vien_tb(cnx, id_ung_vien, ngay_pv, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_TUYEN_DUNG_DANH_GIA_UNG_VIEN_TB + " WHERE id_ung_vien = \"{}\" AND ngay_pv = \"{}\" ".format(id_ung_vien, ngay_pv)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def get_dict_fr_thong_tin_ca_nhan_tb(result, colunm = [], fname=""):
    dict_info = {}
    try:
        convert_ngay = ["ngay_nhap", "ngay_sinh", "ngay_cap", "ngay_co_the_di_lam"]
        convert_ngay += ["ngay_test", "ngay_pv_lan_1", "ngay_pv_lan_2" , "ngay_xem_viec_du_kien", "ngay_xem_viec_tai_kv", "ngay_ky_hd", "ngay_nghi"]
        if result is not None and len(result) > 0:
            for i in colunm:
                if i in convert_ngay:
                    dict_info[i] = convert_dateDb(result[0].get(i, ""), fname)
                else:
                    dict_info[i] = result[0].get(i, "")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return dict_info

def covert_str_to_list(str_data, fname=""):
    list_data = []
    try:
        list_temp = str_data.split("//")
        if len(list_temp) >= 1:
            for i in list_temp:
                i = eval(i)
                list_data.append(i)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list_data

def get_chinhanh_and_loaide_ung_vien_fr_email_tb(cnx, email, fname=""):
    chi_nhanh = ""
    loai_de = ""
    have_test = 0
    ngay_test = ""
    gio_test = ""
    id_ung_vien = ""
    try:
        # query = "SELECT * FROM "+ MYSQL_TUYEN_DUNG_QUAN_LY_UNG_VIEN_TB +" WHERE email = \"{}\"".format(email)
        query = "SELECT a.*, b.* FROM tuyen_dung_thong_tin_ca_nhan_tb a INNER JOIN tuyen_dung_quan_ly_ung_vien_tb b on a.id_ung_vien = b.id_ung_vien " + " WHERE email = \"{}\"".format(email)
        print(query)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            for x in result:
                chi_nhanh = str(x['chi_nhanh'])
                loai_de = str(x['loai_de'])
                ngay_test = str(x['ngay_test'])
                gio_test = str(x['gio_test'])
                have_test = x['have_test']
                id_ung_vien = x['id_ung_vien']
                break
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return { "chi_nhanh":chi_nhanh, "loai_de":loai_de ,"have_test" : have_test,"ngay_test":ngay_test,"gio_test":gio_test,"id_ung_vien":id_ung_vien}

def get_token_fr_email(cnx, email, fname=""):
    token = ""
    try:
        query = "SELECT * FROM "+ MYSQL_NOTI_MANAGEMENT_TOKEN +" WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            token = result[0].get("token", "")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return token

def get_thu_nhap_mong_muon_fr_id_uv(cnx, id_ung_vien, fname=""):
    thu_nhap_mong_muon = ""
    try:
        query = "SELECT * FROM "+ MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB +" WHERE id_ung_vien = \"{}\"".format(id_ung_vien)
        result = emp_checkin_exec_query(cnx, query, fname)
        if result is not None and len(result) > 0:
            thu_nhap_mong_muon = result[0].get("thu_nhap_mong_muon", "")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return thu_nhap_mong_muon

def sent_notification(data, token_user, fname=""):
    kq = ""
    msg = {}
    try:
        url = "https://fcm.googleapis.com/fcm/send"
        token = "AAAANEsF02U:APA91bE1NBt9Hs94C2BZZq5DsSq2FDPDCCmWiG5Bml1bZ9Z6zm4qVrzBVQz8H2T7QSzpHO7Ts5SZ_dyNVmMmPt8cGDZ2qYnQUJ0F7M9wVSgFLcy8nyrZ7thHamOZqB0rdpbLFOjI8KUh"
        headers = {
                    'Authorization': "key=" + token
                    }
        msg["data"] = data
        msg["to"] = token_user
        res = requests.post(url=url, json=msg, headers=headers)
        kq = res.status_code
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return kq

def get_total_kqpv(number,email,cnx):
    query_pv = "SELECT * FROM " + MYSQL_TUYEN_DUNG_QUAN_LY_UNG_VIEN_TB + " where nguoi_pv_lan_{} = \"{}\" ".format(number,email)
    result_pv = emp_checkin_exec_query(cnx, query_pv)
    kqpv_n = "ket_qua_pv_lan_{}".format(number)
    day_pv = "ngay_pv_lan_{}".format(number)
    dpv = 0
    cpv = 0
    dat = 0
    k_dat = 0
    list_days_phongvan = []
    if len(result_pv) !=0 :
        for i in result_pv:
            kq1 = i[kqpv_n]
            days_phongvan = i[day_pv]

            if days_phongvan is not None:
                days_phongvan = days_phongvan.strftime("%d/%m/%Y")
                if days_phongvan not in list_days_phongvan :
                    list_days_phongvan.append(days_phongvan)
            if kq1 == "Đạt":
                dpv += 1
                dat += 1
            elif kq1 == "Không Đạt":
                dpv += 1
                k_dat += 1
        cpv = len(result_pv) - dpv
    return dpv,cpv,dat,k_dat,list_days_phongvan

def convert_diem_to_hang(diem, fname=""):
    hang = "N/A"
    if diem > 140:
        hang = "A+"
    elif diem <= 140 and diem > 125:
        hang = "A"
    elif diem <= 125 and diem > 110:
        hang = "B"
    elif diem <= 110 and diem > 95:
        hang = "C"
    elif diem <= 95 and diem > 85:
        hang = "D"
    elif diem <= 85 and diem > 75:
        hang = "E"
    elif diem <= 75 and diem > 60:
        hang = "F"
    else:
        hang = "KHÔNG XẾP HẠNG"
    return hang

def convert_pnc_diem_to_hang(diem, csat, cl7n, fname=""):
    if diem >= 7200 and csat > 4.29 and cl7n < 1.5:
        hang = "7"
    elif diem >= 7200:
        hang = "6"
    elif diem < 7200 and diem >= 7000 and csat > 4.15 and cl7n < 3.1:
        hang = "6"
    elif diem < 7200 and diem >= 7000:
        hang = "5"
    elif diem < 7000 and diem >= 6800:
        hang = "5"
    elif diem < 6800 and diem >= 6600:
        hang = "4"
    elif diem < 6600 and diem >= 6400:
        hang = "3"
    elif diem < 6400 and diem >= 6200:
        hang = "2"
    elif diem < 6200 and diem >= 6000:
        hang = "1"
    else:
        hang = "0"
    return hang

def get_ho_ten_fr_email_tb(cnx, email, fname=""):
    emp_name = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            emp_name = result[0].get("emp_name")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return emp_name

def get_child_depart_fr_email_tb(cnx, email, fname=""):
    child_depart = ""
    try:
        query = "SELECT * FROM "+ MYSQL_EMP_TB +" WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            child_depart = result[0].get("child_depart")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return child_depart

def get_history_kbyt_fr_email_tb(cnx, email, fname=""):
    thoi_gian = ""
    try:
        query = "SELECT * FROM "+ MYSQL_KHAI_BAO_Y_TE_TB +" WHERE email = \"{}\"".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            thoi_gian = convert_datetimeDb(result[0].get("thoi_gian"), fname)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return thoi_gian

def get_luong_realtime(cnx, emp_code, month_year, fname=""):
    dict_salary = {}
    try:
        # Thông tin cột kiểu float
        branch = get_branch_fr_emp_code(cnx, emp_code, fname)
        list_float = ["NumWorkDay", "SumProductivityScore", "NumRewardChecklistAfter7Days", "NumPenaltyRefuseTask", "Productivity"]
        query = "SELECT * FROM "+ MYSQL_LUONG_REALTIME_TB +" WHERE emp_code = \"{}\" ORDER BY daily DESC limit 5".format(emp_code)
        result = emp_checkin_exec_query(cnx, query, fname)
        if branch == "TIN":
            if len(result) != 0:
                dict_salary = result[0]
                date_salary = convert_dateDb(dict_salary.get("daily", ""), fname)
                dict_salary["text_ngay_luong_gan_nhat"] = "Tổng lương từ ngày 01 -> {}".format(date_salary)
                dict_salary["text_tong_luong_gan_nhat"] = ""
                for k, v in dict_salary.items():
                    if v is None:
                        dict_salary[k] = "N/A"
                    elif isinstance(v, float) and k not in list_float:
                        int_v = float(v)
                        dict_salary[k] = '{:,.0f}'.format(int_v)
                    else:
                        dict_salary[k] = str(v)
        else:
            if len(result) != 0:
                dict_salary = result[0]
                date_salary = convert_dateDb(dict_salary.get("daily", ""), fname)
                nsld = dict_salary.get("Productivity", "N/A")
                dict_salary["text_ngay_luong_gan_nhat"] = "Công thức lương thay đổi, tính năng sẽ cập nhật sau"
                dict_salary["text_tong_luong_gan_nhat"] = "NSLD từ ngày ngày 01 -> {}: {}".format(date_salary, nsld)
                for k, v in dict_salary.items():
                    if k not in ["Productivity", "text_ngay_luong_gan_nhat", "text_tong_luong_gan_nhat"]:
                        dict_salary[k] = "N/A"
                        if k == "SumSalaryMonth":
                            dict_salary[k] = "0"
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return dict_salary

def read_text_file_to_str(filename, fname=""):
    data = ''
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            data = file.read().replace('\n', '')
    except Exception as ex:
        logger_db.info("{}: {}".format(fname, ex))
    return data

def convert_tinh_trang_fr_ngay_het_han_ATLD(ngay_het_han_ATLD, fname=""):
    tinh_trang = "Chưa Cấp"
    day_now = get_current_date()
    if ngay_het_han_ATLD is not None and ngay_het_han_ATLD != "":
        ngay_het_han_ATLD = datetime.strptime(ngay_het_han_ATLD, "%d/%m/%Y").date()
        tmp = ngay_het_han_ATLD - day_now
        _day = tmp.days
        if _day > 0 and _day <= 45:
            tinh_trang = "Sắp Hết Hạn"
        elif _day <= 0:
            tinh_trang = "Hết Hạn"
        else:
            tinh_trang = "Còn Hạn"
    return tinh_trang

def get_so_vong_pv_fr_id_ung_vien(cnx, id_ung_vien, fname=""):
    so_vong_pv = 2
    try:
        query = "SELECT a.id_ung_vien, a.vi_tri_cong_viec, b.ten_vi_tri, b.so_vong_pv FROM " + MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB + " a LEFT JOIN " + MYSQL_DANH_SACH_VT_CONG_VIEC_TB + " b on a.vi_tri_cong_viec = b.ten_vi_tri WHERE a.id_ung_vien = \"{}\"".format(id_ung_vien)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            so_vong_pv = result[0].get("so_vong_pv")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return so_vong_pv

def get_ptq_id_fr_soHD(cnx, contract, deadline, fname=""):
    ptq_id = ""
    try:
        query = "SELECT * FROM " + MYSQL_PTQ_TB + " WHERE contract = \"{}\" AND deadline = \"{}\" ".format(contract, deadline)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            ptq_id = result[0].get("ptq_id")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ptq_id

def get_list_noti_chu_de(cnx, chu_de, fname=""):
    list = []
    try:
        query = "SELECT * FROM " + MYSQL_NOTI_CHU_DE_TB + " WHERE chu_de = \"{}\" ".format(chu_de)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for i in result:
                noi_dung = i.get("noi_dung")
                if noi_dung not in list:
                    list.append(noi_dung)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def get_list_cau_tho(cnx, fname=""):
    list = []
    try:
        query = "SELECT * FROM cau_tho_tb"
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for i in result:
                noi_dung = i.get("cau_tho")
                if noi_dung not in list:
                    list.append(noi_dung)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def check_insert_ptq_tb(cnx, emp_code, contract, date_check, date_complete, deadline, error_description, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_PTQ_TB + " WHERE emp_code = \"{}\" AND contract = \"{}\" AND date_complete = \"{}\" AND date_check = \"{}\" AND deadline = \"{}\" AND error_description = \"{}\" ".format(emp_code, contract, date_complete, date_check, deadline, error_description)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_dao_tao_GetOnline_tb(cnx, email, id, className, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_DAO_TAO_GetOnline_TB + " WHERE email = \"{}\" AND id = \"{}\" AND className = \"{}\" ".format(email, id, className)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def check_insert_dao_tao_GetDetailResultForClass_tb(cnx, email, id_class, className, fname=""):
    ok = True
    try:
        query = "SELECT * FROM " + MYSQL_DAO_TAO_GetDetailResultForClass_TB + " WHERE email = \"{}\" AND id_class = \"{}\" AND className = \"{}\" ".format(email, id_class, className)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) > 0:
            ok = False
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return ok

def convert_img_to_pdf(img_path, fname = ""):
    pdf_path = ""
    try:
        image = Image.open(img_path)
        temp = str(img_path).rsplit(".", 1)
        pdf_path = temp[0] + ".pdf"
        # Kho A4
        # a4inpt = (img2pdf.mm_to_pt(210), img2pdf.mm_to_pt(297))
        # layout_fun = img2pdf.get_layout_fun(a4inpt)
        with open(pdf_path, "wb") as f:
            f.write(img2pdf.convert(image.filename))
            # f.write(img2pdf.convert(image.filename, layout_fun=layout_fun))
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return pdf_path

def get_sum_notify(cnx, email, fname=""):
    sum_noti = 0
    try:
        query = "SELECT * FROM "+ MYSQL_NOTI_DANH_SACH_TB +" WHERE email = \"{}\" AND status <= 0".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        sum_noti = len(result)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return sum_noti

def token_required(func):
    def wrapper():
        try:
            token_passed = request.headers['TOKEN']
            # key = token_passed[-16:]
            # print(type(key), key)
            # token_passed = token_passed[:len(token_passed)-16]
            # print(token_passed)
            if token_passed != '' and token_passed is not None:
                try:
                    data = jwt.decode(token_passed, TOKEN_SECRET_KEY, algorithms=['HS256'])
                    # print(data)
                    return func()
                    # if key in TOKEN_KEY_LIST:
                    #     return func()
                    # else:
                    #     return_data = {
                    #         "error": "1",
                    #         "msg": "Invalid Key Token"
                    #     }
                    #     return json.dumps(return_data), 200
                except jwt.exceptions.ExpiredSignatureError:
                    return_data = {
                        "error": "2",
                        "msg": "Token has expired"
                        }
                    return json.dumps(return_data), 200
                except:
                    return_data = {
                        "error": "3",
                        "msg": "Invalid Token"
                    }
                    return json.dumps(return_data), 200
            else:
                return_data = {
                    "error": "4",
                    "msg": "Token required",
                }
                return json.dumps(return_data), 200
        except Exception as e:
            return_data = {
                "error": "5",
                "msg": "Đã có phiên bản mới trên mytinpnc.vn, vui lòng cập nhật để sử dụng"
                }
            return json.dumps(return_data), 200

    wrapper.__name__ = func.__name__
    return wrapper

def token_required2(func):
    def wrapper():
        try:
            token_passed = request.headers['TOKEN']
            if token_passed != '' and token_passed is not None:
                try:
                    data = jwt.decode(token_passed, TOKEN_SECRET_KEY2, algorithms=['HS256'])
                    # print(data)
                    return func()
                except jwt.exceptions.ExpiredSignatureError:
                    return_data = {
                        "error": "2",
                        "msg": "Token has expired"
                        }
                    return json.dumps(return_data), 200
                except:
                    return_data = {
                        "error": "3",
                        "msg": "Invalid Token"
                    }
                    return json.dumps(return_data), 200
            else:
                return_data = {
                    "error": "4",
                    "msg": "Token required",
                }
                return json.dumps(return_data), 200
        except Exception as e:
            return_data = {
                "error": "5",
                "msg": "Error Token"
                }
            return json.dumps(return_data), 200

    wrapper.__name__ = func.__name__
    return wrapper

def get_block_nearest(cnx, coor_contract, fname=""):
    blockid = 0
    distance = 1000000
    try:
        query = "SELECT * FROM "+ MYSQL_INFO_BLOCK_TB
        result = emp_checkin_exec_query(cnx, query, fname)
        # print(result)
        for block in result:
            blockcoor = block.get("block_coor","0.0,0.0")
            try:
                tmp = calculate_distance_to(str(coor_contract), blockcoor)
                # print(tmp)
            except Exception as ex :
                logger_db.info("{}: {}".format(fname, ex))
            if tmp <= distance:
                distance = tmp
                blockid = block.get("block_id")
            else:
                pass
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return blockid

def get_list_child_depart_right(cnx, txt_right, fname=""):
    list = []
    try:
        temp = ""
        if txt_right == "ALL":
            temp = "TIN,PNC"
        elif txt_right == "ALLTIN":
            temp = "TIN"
        elif txt_right == "ALLPNC":
            temp = "PNC"
        child_branch_split = temp.split(',')
        branch = "\",\"".join(child_branch_split)
        query = "SELECT * FROM " + MYSQL_DEPARTMENT_TB + " WHERE branch in (\"{}\")".format(branch)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for i in result:
                child_depart = i.get("child_depart")
                if child_depart not in list and child_depart not in ["ALL", "ALLTIN", "ALLPNC"]:
                    list.append(child_depart)
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return list

def check_dieu_kien_binh_chon(cnx, email, fname=""):
    status = -1
    try:
        query = "SELECT * FROM " + MYSQL_DANH_SACH_TAT_NIEN_TB + " WHERE email = \"{}\"".format(email)
        print(query)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            status = result[0].get("status")
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return status

def parse_history_ticket (history_ticket,ng_quan_ly) :
    action = ""
    mail = ""
    n= 0
    list_out = []
    if history_ticket is not None and history_ticket != "":
        spl_tmp = history_ticket.split(",")
        for i in spl_tmp:
            if i != "":
                ispl = i.split("_")
                if n == 0 :
                    mail = ng_quan_ly
                else:
                    mail = ispl[0]
                action = ispl[1]
                dict_tmp = {
                    "mail" : mail,
                    "action" : action
                }
                list_out.append(dict_tmp)
            n = n + 1
    return list_out

def decrypt_dict_of_api(res, fname = ""):
    dict_data = {}
    try:
        if isinstance(res, dict):
            iv = res["iv"]
            for k, v in res.items():
                if k != "iv":
                    dict_data[k] = decrypt(iv, v, fname)
                else:
                    dict_data[k] = v
    except Exception as e:
        logger_db.info("Error decrypt_dict_of_api {}: {}".format(fname, e))
    return dict_data

def tinh_quang_duong_from_df (cnx,emp,_day,df):
    distance = 0
    list_coor = []
    list_lat = []
    list_lon = []
    timestart = _day + " 08:00:00"
    timeend = _day + " 18:00:00"
    lat_center = 0
    lon_center = 0
    cnt  = 0
    query = "SELECT * FROM emp_checkin_tb where MBN_account_name = \"{}\" and checkin_date = \"{}\" ".format(emp,_day)
    rs = emp_checkin_exec_query(cnx,query)
    if len(rs) > 0 and rs[0].get("checkin_time") != "00:00:00":
        timestart = str(rs[0].get("checkin_date")) + " " + rs[0].get("checkin_time")
        ca = rs[0].get("sheet_time","")
        if ca == "C":
            timeend = _day + " 21:00:00"
    else:
        ca = "S"
    timestart = datetime.strptime(timestart,DATETIME_FORMAT)
    timeend = datetime.strptime(timeend,DATETIME_FORMAT)
    if df.empty == False:
        df_list = df.values.tolist()
        if len(df_list) > 1 and ca != "O":
            for i in range(1,len(df_list)):
                time1 = df_list[i - 1][1]
                time2 = df_list[i][1]
                time1 = datetime.strptime(time1, ' %Y-%m-%d %H:%M:%S')
                time2 = datetime.strptime(time2, ' %Y-%m-%d %H:%M:%S')
                deltatime = (time2 - time1).total_seconds()
                lat1 = df_list[i - 1][3]
                lon1 = df_list[i - 1][4]
                lat2 = df_list[i][3]
                lon2 = df_list[i][4]
                coor2 = str(lat2) + "," + str(lon2)
                coor1 = str(lat1) + "," + str(lon1)
                tmp = calculate_distance_to(coor1, coor2)
                v = tmp / deltatime
                flag = 0
                if time1 >= timestart and time2 <= timeend :
                    if cnt != 0 :
                        if v > 22.22 and tmp < 10000:
                            flag = 1
                            list_coor[-1]["flag"] = flag
                        elif tmp > 10000:
                            pass
                        else:
                            distance = distance + tmp
                            dict_tmp = {"lat": lat2, "lon": lon2, "flag": flag,"time":str(df_list[i][1])}
                            list_coor.append(dict_tmp)
                            list_lon.append(lon2)
                            list_lat.append(lat2)
                    else :
                        list_coor.append({"lat": df_list[i][3], "lon": df_list[i][4], "flag": flag,"time":str(df_list[i][1])})
                        list_lon.append(df_list[i][4])
                        list_lat.append(df_list[i][3])
                        cnt = cnt +1
                else:
                    pass
            lat_center = sum(list_lat) / len(list_lat)
            lon_center = sum(list_lon) / len(list_lon)
    else:
        pass
    distance = round((distance/1000),2)
    return distance,list_coor,lat_center,lon_center

def change_dict_distance_format(l):
    list_out = []
    list_tmp = []
    for i in range(0, len(l)):
        if i == 0:
            k_last = l[i].get("flag")
        k = l[i].get("flag")
        if k != k_last:
            tmp = l[i].copy()
            tmp["flag"] = k_last
            list_tmp.append(tmp)
            list_out.append(list_tmp)
            k_last = k
            list_tmp = [l[i]]
        else:
            list_tmp.append(l[i])
    list_out.append(list_tmp)
    return list_out

def check_user_right_pv(cnx, email, fname=""):
    user_right = "0"
    try:
        query = "SELECT * FROM " + MYSQL_DANH_SACH_NGUOI_PV_TB + " WHERE email = \'{}\' ".format(email)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            user_right = "1"
    except Exception as e:
        logger_db.info("{}: {}".format(fname, e))
    return user_right

# utils for task
def convert_dict_none_datetime_to_str(dict_data = {}, fname=""):
    for k, v in dict_data.items():
        if v is None:
            dict_data[k] = "N/A"
        elif isinstance(v, datetime):
            dict_data[k] = convert_datetimeDb(v, fname)
    return dict_data

def convert_dict_str_to_datetime(dict_data = {}, fname=""):
    for k, v in dict_data.copy().items():
        if v is None or v == "N/A":
            del dict_data[k]
        elif k in ["ts", "te", "deadline", "t_assigned", "t_create", "update_time"]:
            dict_data[k] = convert_ngay_gio_import_Db(v)
        elif k in ["data_root", "data_cmt", "color_check", "info_owner", "info_assigned", "info_reviewer", "example_title"]:
            del dict_data[k]
    return dict_data

def get_quan_fr_tinh(cnx, tinh, caller=""):
    # xuat ra list cac quan trong tinh/thanh pho
    # input dau vao là tinh !=""
    list_quan=[]
    try:
        query = "SELECT id_tinh_thanh FROM " + MYSQL_TINH_THANH_TB + " WHERE tinh_thanh = \'{}\'".format(tinh)
        result = emp_checkin_exec_query(cnx, query, caller)
        if result is not None and len(result) > 0:
            id_tinh_thanh = result[0]['id_tinh_thanh']
            query_2 = "SELECT * FROM " + MYSQL_QUAN_HUYEN_TB + " WHERE id_tinh_thanh = \'{}\'".format(id_tinh_thanh)
            result_quan = emp_checkin_exec_query(cnx, query_2, caller)
            if result_quan is not None and len(result_quan) > 0:
                for i in result_quan:
                    ten_quan = i['quan_huyen']
                    list_quan.append(ten_quan)
    except Exception as e:
        logger_db.info("{}: {}".format(caller, e))
    return  list_quan

def get_list_email_fr_branch(cnx, branch, fname=""):
    list_email = []
    try:
        query = "SELECT a.email, a.emp_name FROM " + MYSQL_EMP_TB + " a INNER JOIN " + MYSQL_DEPARTMENT_TB + " b on a.child_depart = b.child_depart WHERE b.branch = \"{}\" ".format(branch)
        result = emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            for i in result:
                dict_t = {}
                dict_t["email"] = str(i["email"]).lower()
                dict_t["emp_name"] = str(i["emp_name"]).title()
                list_email.append(dict_t)
        list_email = list(set(list_email))
        list_email.sort(reverse=True)
    except Exception as e:
        logger_db.info("{} error: {}".format(fname, e))
    return list_email



def send_email(email_send,body):
    _msg = MIMEMultipart()
    _msg['From'] = 'phamnhutoanuser1@gmail.com'
    _msg['To'] = email_send
    _msg['Subject'] = 'Thông báo công việc mới'

    _msg.attach(MIMEText(body,'plain'))

    text = _msg.as_string()
    text = text.encode('utf-8')
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login('phamnhutoanuser1@gmail.com','Phamnhutoan@user1')
    email_user = "phamnhutoanuser1@gmail.com"
    # email_send = to
    server.sendmail(email_user,email_send,text)