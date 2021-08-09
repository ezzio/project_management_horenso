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
from common import utils as ut
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
import re

logger = ut.get_logger("utils_check_parameter", level=logging.INFO)

backlist_mysql = ["drop", "delete", "select", "update", "or", "and", "insert", "all",
                      "=", "<>", "!=", ">", ">=", "<", "<=", "*", ";"]

def check_email(email):
    ok = False
    if email is not None and re.match(r"[^@]+@[^@]+\.[^@]+", email):
        ok = True
    return ok

def check_phone_number(phone_number):
    return all([x.isdigit() for x in phone_number.split("-")])

def check_query(query):
    query_sec = str(query).split(";")[0]
    return query_sec

def check_quyen_TP_fr_email(cnx, email, fname=""):
    ok = False
    try:
        email = str(email).lower()
        query = "SELECT * FROM " + MYSQL_EMAIL_ADMIN_TP_TB + " WHERE email_TP like \"%{}%\" ".format(email)
        result = ut.emp_checkin_exec_query(cnx, query, fname)
        if len(result) != 0:
            ok = True
    except Exception as e:
        logger.info("{}: {}".format(fname, e))
    return ok
def check_money_input(from_money, to_money,fname = ""):
    ok = False
    print(from_money,to_money)
    try:
        if isinstance(from_money, int) and isinstance(to_money, int) and to_money >= from_money :
            ok = True
    except Exception as e:
        logger.info("{}: {}".format(fname, e))
    return ok

def check_condition(condition, user_email, fname = ""):
    ok = False
    try:
        if isinstance(condition, dict):
            for k, v in condition.items():
                _temp_v = str(v).split(" ")
                for i in _temp_v:
                    if i.lower() in backlist_mysql:
                        ok = False
                        logger.info("User_email {} condition have backlist_mysql: {}".format(user_email, condition))
                        break
                    else:
                        ok = True
                if ok == False:
                    break
        else:
            logger.info("User_email {} codition not dict: {}".format(user_email, condition))
    except Exception as e:
        logger.info("User_email {} codition erorr: {}".format(user_email, e))
    return ok