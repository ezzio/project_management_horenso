
from global_def import *
import flask
from flask import jsonify, request
import datetime
import optparse
import jwt
import json
from common import utils as ut
from flask_cors import CORS

APP_NAME = "token_service"
logger = ut.get_logger(APP_NAME, level=logging.INFO)

# Obtain the flask app object
app = flask.Flask(APP_NAME)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or os.urandom(16)
CORS(app)


@app.route('/test_token', methods=['POST'])
@ut.token_required
def test_token():
    return jsonify({'msg': 'OK'})


@app.route('/test_token2', methods=['POST'])
@ut.token_required2
def test_token2():
    return jsonify({'msg': 'OK'})


@app.route('/get_token', methods=['POST'])
def get_token():
    res = request.get_json()
    logger.info("Log: {}".format(res))
    key = res.get("key", "")
    iv = res.get("iv", None)
    if iv is not None:
        key = ut.decrypt(iv, key)
    response = jsonify({"msg": "Invalidate", "token": ""})
    response.status_code = 404
    if key in TOKEN_KEY_LIST:
        time_limit = datetime.datetime.utcnow() + datetime.timedelta(seconds=TOKEN_LIEF_TIME)
        time_limit_s = (get_current_datetime() + datetime.timedelta(seconds=TOKEN_LIEF_TIME)).strftime(DATETIME_FORMAT)
        payload = {"exp": time_limit, "expired": time_limit_s}
        token = jwt.encode(payload, TOKEN_SECRET_KEY)
        response = jsonify({"msg": "OK", "token": token.decode('UTF-8')})
        response.status_code = 200
        logger.info("Return Token: {}".format(token))
    return response

@app.route('/get_token2', methods=['POST'])
def get_token2():
    res = request.get_json()
    logger.info("My TIN-PNC: {}".format(res))
    key = res.get("key", "")
    iv = res.get("iv", None)
    response = jsonify({"msg": "Invalidate", "token": ""})
    response.status_code = 404
    if key in TOKEN_KEY_LIST2 and iv == "OKRs":
        time_limit = datetime.datetime.utcnow() + datetime.timedelta(seconds=TOKEN_LIEF_TIME2)
        time_limit_s = (get_current_datetime() + datetime.timedelta(seconds=TOKEN_LIEF_TIME2)).strftime(DATETIME_FORMAT)
        payload = {"exp": time_limit, "expired": time_limit_s}
        token = jwt.encode(payload, TOKEN_SECRET_KEY2)
        response = jsonify({"msg": "OK", "token": token.decode('UTF-8')})
        response.status_code = 200
        logger.info("Return Token: {}".format(token))
    return response


if __name__ == '__main__':
    try:
        parser = optparse.OptionParser()
        parser.add_option('--port', type='int', default=6001)
        parser.add_option('--host', type='string', default='localhost')
        parser.add_option('--user', type='string', default='admin')
        parser.add_option('--password', type='string', default='password')
        parser.add_option('--https', type='int', default=1)
        opts, args = parser.parse_args()
        port = opts.port
        force_https = bool(opts.https)
        time_now = get_current_datetime()
        if not os.path.isdir(LOG_DIR_ROOT):
            os.system('mkdir ' + LOG_DIR_ROOT)
        user = opts.user
        host = opts.host
        password = opts.password
        logger.info("Starting Tornado server on port {} force_https {}".format(port, force_https))
        ut.start_tornado(app, port=port, force_https=force_https)
    except Exception as e:
        logger.info("Main error: {} ".format(e))
