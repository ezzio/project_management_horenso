

from global_def import *
import requests
from common import utils as ut
import time
from random import choice
import json

def request_http(url, params=None, headers=None, get_request=False, auth=""):
    r = None
    try:
        # print(url)
        # print( ut.SELF_SIGNED_CERT_FILE2, os.path.isfile(ut.SELF_SIGNED_CERT_FILE2))

        if "https" in url:
            if not get_request:
                # r = requests.post(url=url, json=params, cert=(ut.CA_FILE, ut.KEY_FILE))
                r = requests.post(url=url, json=params, headers=headers, verify=False)
            else:
                # r = requests.get(url=url, json=params, verify=False)
                r = requests.get(url=url, verify=False, timeout=5)
        else:
            r = requests.post(url=url, json=params, headers=headers, auth=auth)

        print(r)

    except Exception as e:
        print(e)
    return r

def get_token():
    url = "http://localhost:6001/get_token"
    iv = ut.randomiv()
    print(iv)
    key = ut.encrypt_server(iv, "eptsereiipekomhu")
    data = {"key": key, "iv": iv}
    print(data)
    res = request_http(url=url, params=data, get_request=False)
    print(res.content)
    token = res.json().get("token", "")
    return token

def get_token2():
    url = "http://localhost:6001/get_token2"
    data = {"key": "isuinevtgferlw01", "iv": "OKRs"}
    print(data)
    res = request_http(url=url, params=data, get_request=False)
    print(res.content)
    token = res.json().get("token", "")
    return token

def test_token(token):
    url = "http://localhost:6001/test_token"
    key = "eptsereiipekomhu"
    # token = token + key
    headers = {"TOKEN": token}
    data = {}
    res = request_http(url=url, params=data, headers=headers, get_request=False)
    print(res.content)

def test_token2(token):
    url = "http://localhost:6001/test_token2"
    key = "eptsereiipekomhu"
    # token = token + key
    headers = {"TOKEN": token}
    data = {}
    res = request_http(url=url, params=data, headers=headers, get_request=False)
    print(res.content)

def get_emp_info1():
    token = get_token()
    headers = {"TOKEN": token}
    url = "http://localhost:5001/get_emp_info1"
    iv = ut.randomiv()
    print(iv)
    # device_imei = ut.encrypt_server(iv, "865646036772303")
    device_imei = ut.encrypt_server(iv, "")
    print(device_imei)
    device_imei = ""
    device_id = ut.encrypt_server(iv, "")
    device_api_level = ut.encrypt_server(iv, "24")
    email = ut.encrypt_server(iv, "anhnt232@fpt.com.vn")

    message = {
            "device_imei" : device_imei,
            "device_id" : device_id,
            "device_api_level" : device_api_level,
            "email" : email,
            "iv" : iv
    }
    res = request_http(url=url, params=message, headers=headers, get_request=False)
    if res.status_code == 200:
        kq = res.json()
        print("Noi dung ma hoa: ")
        print(json.dumps(kq, indent=4, sort_keys=True))
        msg = kq.get("msg")
        decrypt_kq = ut.decrypt(iv, msg)
        print("Noi dung sau khi giai ma: ")
        print(json.dumps(eval(decrypt_kq), indent=4, sort_keys=True))

def khai_bao_y_te():
    token = get_token()
    headers = {"TOKEN": token}
    url = "http://localhost:5001/khai_bao_y_te"
    message = {
                "email" : "phamnhutoan@gmailcom",
                "MBN_account_name" : "",
                "sot" : "0",
                "ho_khan": "0",
                "kho_tho" : "0",
                "viem_phoi" : "0",
                "dau_hong" : "0",
                "met_moi" : "0",
                "den_vung_dich": "0",
                "tiep_xuc_nguoi_nhiem": "0"
        }
    res = request_http(url=url, params=message, headers=headers, get_request=False)
    if res.status_code == 200:
        print(res.json())

if __name__ == '__main__':
    print("Start")
    # khai_bao_y_te()
    token = get_token()
    # print(token)
    # get_emp_info1()
    # print(token)
    # time.sleep(6)
    # test_token2(token)