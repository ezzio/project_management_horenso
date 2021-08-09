import logging
from datetime import datetime, timedelta, date
import socket
import os

LOG_DIR_ROOT = "../../log"

Linux = True
if os.name == "nt":
    Linux = False
# Ver APP My TIN-PNC
VER_CODE = '1.8.8.2'
HOST_IP = '127.0.0.1'

MYSQL_DATABASE_HOST = 'localhost'
MYSQL_DATABASE_USER = 'admin'
MYSQL_DATABASE_PASSWORD = 'password'
MYSQL_DATABASE_DB = 'quanlycongviec'
LINK_APP_CHPLAY = "https://play.google.com/store/apps/details?id=com.pnc.mytinpnc"


EMAIL_TEST = "phuongnam.haoldn@fpt.net"
LIST_EMAIL_TEST = ["phuongnam.nipt@fpt.net", "pnc.pdx@fpt.net"]

MYSQL_ACCOUNT_TB = "accounts"

MYSQL_SO_LUONG_BAO_TRI_TB = "so_luong_bao_tri_tb"
MYSQL_TIN_TUC_TB = "tin_tuc_tb"
MYSQL_KHAI_BAO_Y_TE_TB = 'khai_bao_y_te_tb'
MYSQL_LICH_SU_KHAI_BAO_Y_TE_TB = 'lich_su_khai_bao_y_te_tb'
MYSQL_ADD_COVID19_TB = 'add_covid19_tb'

MYSQL_TINH_THANH_TB = 'tinh_thanh_tb'
MYSQL_QUAN_HUYEN_TB = 'quan_huyen_tb'
MYSQL_PHUONG_XA_TB = 'phuong_xa_tb'

MYSQL_PCCV_TB = 'cong_viec'

MYSQL_THU_VIEN_TB = 'thu_vien_tb'
MYSQL_EMP_CHECKIN_TB = 'emp_checkin_tb'
MYSQL_EMP_TB = 'employees_tb'
MYSQL_EMP_TB01 = 'employees_tb01'
MYSQL_EMP_TB02 = 'employees_tb02'
MYSQL_DEVICE_TB = 'device_id_tb'
MYSQL_REGION_TB = 'region_tb'
MYSQL_UNION_TB = 'union_tb'
MYSQL_PTQ_TB = 'ptq_tb'
MYSQL_DEVICE_TB2 = 'device_id2_tb'
MYSQL_PROMOTION_CODE_TB = 'promotion_code_tb'
MYSQL_TASK_KPI_TB = 'task_kpi_tb'
MYSQL_KPIS_LATETIME_TB = 'KPIs_latetime_tb'
MYSQL_DEPARTMENT_TB = 'department'
MYSQL_OPEN_APP_HISTORY_TB = 'open_app_history_tb'
MYSQL_SCM_TB = "SCM_tb"
MYSQL_CEM_TB = "cem_tb"
MYSQL_SCHEDULE_TB = 'schedule_tb'
MYSQL_INFO_BLOCK_TB = 'info_block_tb'

MYSQL_LICH_SU_LOAI_LUONG_TB = 'lich_su_loai_luong_tb'
MYSQL_LUONG_TKBT_TB = 'luong_tk_bt_tb'
MYSQL_LUONG_DH_TB = 'luong_dh_tb'
MYSQL_LUONG_FTI_TB = 'luong_fti_tb'
MYSQL_LUONG_INDO_TB = 'luong_indo_tb'
MYSQL_LUONG_INF_TB = 'luong_inf_tb'
MYSQL_LUONG_KEYINDO_TB = 'luong_key_indo_tb'
MYSQL_LUONG_ABCD_TB = 'luong_nhom_abcd_tb'
MYSQL_LUONG_TF_TB = 'luong_tf_tb'
MYSQL_LUONG_THU_CUOC_TB = 'luong_thu_cuoc_tb'
MYSQL_LUONG_TNOS_TB = 'luong_tn_os_tb'
MYSQL_LUONG_HOACH_TOAN_TB = 'luong_hoach_toan_tb'
MYSQL_LUONG_DH_TIN_TB = 'luong_dh_tin_tb'
MYSQL_LUONG_SO_TB = 'luong_so_tb'
MYSQL_LUONG_TESTTB_TB = 'luong_testTB_tb'
MYSQL_LUONG_TF_TIN_TB = 'luong_tf_tin_tb'
MYSQL_LUONG_TKBT_TIN_TB = 'luong_tkbt_tin_tb'
MYSQL_LUONG_REALTIME_TB = 'luong_realtime_tb'

MYSQL_NOTI_MANAGEMENT_TOKEN = 'noti_management_token_tb'
MYSQL_NOTI_DANH_SACH_TB = 'noti_danh_sach_tb'
MYSQL_NOTI_CHU_DE_TB = 'noti_chu_de_tb'

MYSQL_TOOL_ATLD_TB = 'tool_ATLD_tb'
MYSQL_TOOL_ATLD_BANG_QUY_DOI_TB = 'tool_ATLD_bang_quy_doi_tb'
MYSQL_EMAIL_ADMIN_TP_TB = 'email_admin_TP_tb'
#
MYSQL_TUYEN_DUNG_BAI_THI_TEST_TB = 'tuyen_dung_bai_thi_test_tb'
MYSQL_TUYEN_DUNG_QUAN_LY_UNG_VIEN_TB = 'tuyen_dung_quan_ly_ung_vien_tb'
MYSQL_TUYEN_DUNG_DANH_GIA_UNG_VIEN_TB = 'tuyen_dung_danh_gia_ung_vien_tb'
MYSQL_TUYEN_DUNG_THONG_TIN_CA_NHAN_TB = 'tuyen_dung_thong_tin_ca_nhan_tb'

MYSQL_XEP_HANG_NHAN_VIEN_TB = 'xep_hang_nhan_vien_tb'
MYSQL_XEP_HANG_NHAN_VIEN_PNC_TB = "xep_hang_nhan_vien_PNC_tb"

MYSQL_DAO_TAO_GetClassByUserName_TB = 'dao_tao_GetClassByUserName_tb'
MYSQL_DAO_TAO_GetOnline_TB = 'dao_tao_GetOnline_tb'
MYSQL_DAO_TAO_GetDetailResultForClass_TB = 'dao_tao_GetDetailResultForClass_tb'
MYSQL_DAO_TAO_GetClassOffline_TB = 'dao_tao_GetClassOffline_tb'

MYSQL_DANH_SACH_TRUONG_HOC_TB = 'danh_sach_truong_hoc_tb'
MYSQL_DANH_SACH_DAN_TOC_TB = 'danh_sach_dan_toc_tb'
MYSQL_DANH_SACH_CHUYEN_NGANH_TB = 'danh_sach_chuyen_nganh_tb'
MYSQL_DANH_SACH_VT_CONG_VIEC_TB = 'danh_sach_vi_tri_cong_viec_tb'
MYSQL_DANH_SACH_CTY_THANH_VIEN_TB = 'danh_sach_cty_thanh_vien_tb'
MYSQL_DANH_SACH_NGAN_HANG_TB = 'danh_sach_ngan_hang_tb'
MYSQL_DANH_SACH_NGUOI_PV_TB = 'danh_sach_nguoi_pv_tb'
MYSQL_DANH_SACH_TAT_NIEN_TB = 'danh_sach_tat_nien_tb'

MYSQL_MODULE_OFFICE_CTP_TB = 'module_office_CTP_tb'
MYSQL_MODULE_OFFICE_HOA_DON_TB = 'module_office_hoa_don_tb'
MYSQL_MODULE_OFFICE_TAM_UNG_TB = 'module_office_tam_ung_tb'
MYSQL_MODULE_OFFICE_WORKFLOW_TB = 'module_office_workflow_tb'
MYSQL_ALERT_EMP_COVI19_TB = "alert_emp_covi19_tb"

MYSQL_PERMISSION_TB = "permission_tb"
MYSQL_USER_RIGHT_TB = "user_right_tb"
MYSQL_SCM_GROUP_TB = "SCM_group_tb"
MYSQL_ERROR_PTQ_TB = "error_ptq_tb"
MYSQL_USER_RIGHT_CHECKIN_TB = "user_right_checkin_tb"
MYSQL_PW_SALARY_TB = "password_salary_tb"
MYSQL_ACCOUNT_MANAGEMENT_TB = 'account_management_tb'

MYSQL_GAME_LICH_SU_QUAY_SO_TB = "tro_choi_lich_su_quay_so_tb"
MYSQL_GAME_KET_QUA_TB = "tro_choi_ket_qua_tb"
MYSQL_GAME_SO_VONG_QUAY_TB = "tro_choi_so_vong_quay_tb"
MYSQL_GAME_HISTORY_DHBC_TB = "game_history_dhbc_tb"
MYSQL_GAME_DUOI_HINH_BAT_CHU_TB = "game_duoi_hinh_bat_chu_tb"

DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'
DATETIME_FORMAT2 = '%Y-%m-%d_%H-%M-%S'
DATETIME_FORMAT3 = '%Y%m%d_%H%M%S'
DATETIME_FORMAT4 = '%d/%m/%Y %H:%M:%S'

KEY_IV = "dPFH6xlrOoHoSL5B"

MOBILE_APP_UPLOAD_DIRECTORY = "../data/app"
FORM_DIRECTORY = "../data/formDownload"
IMG_DIRECTORY = "../data/upload/img/atld"
UPLOAD_DIRECTORY = "../data/upload"
EXPORT_CHECKIN_DIRECTORY =  "../data/export_checkin/"
EXPORT_KBYT_DIRECTORY =  "../data/export_kbyt/"
REPORT_DETAIL_DIRECTORY =  "../data/report_detail/"
SSL_CERTIFICATE_DIRECTORY = "../data/.certs"

FILE_TEXT_TUYEN_DUNG_PNC_UNG_VIEN = "../data/upload/tuyendung/email_thong_bao_ung_vien.txt"
FILE_TEXT_TUYEN_DUNG_PNC_PV1 = "../data/upload/tuyendung/email-moipv1-PNC.txt"
FILE_TEXT_TUYEN_DUNG_PNC_TEST = "../data/upload/tuyendung/email-test-PNC.txt"
FILE_TEXT_TUYEN_DUNG_PNC_PV2 = "../data/upload/tuyendung/email-moipv2-PNC.txt"
FILE_TEXT_TUYEN_DUNG_PNC_NHANVIEC = "../data/upload/tuyendung/email-nhanviec-PNC.txt"
FILE_TEXT_TUYEN_DUNG_NGUOI_PHONG_VAN = "../data/upload/tuyendung/email_nguoi_phong_van.txt"
FILE_TEXT_TUYEN_DUNG_TIN = ""
FILE_TEXT_MTCV_OS = "../data/upload/tuyendung/jd/kythuatvienonsite.txt"
FILE_TEXT_MTCV_INDO = "../data/upload/tuyendung/jd/kythuatvienindo.txt"
FILE_TEXT_MTCV_DIEUHANH = "../data/upload/tuyendung/jd/kythuatviendieuhanh.txt"
FILE_TEXT_MTCV_CTVNHANSU = "../data/upload/tuyendung/jd/congtacviennhansu.txt"
FILE_TEXT_MTCV_CTVTRUYENTHONG = "../data/upload/tuyendung/jd/congtacvientruyenthong.txt"
FILE_TEXT_MTCV_CTVTUYENDUNG = "../data/upload/tuyendung/jd/congtacvientuyendung.txt"
FILE_TEXT_MTCV_NVKT = "../data/upload/tuyendung/jd/nhanvienkythuat.txt"
FILE_TEXT_MTCV_NVNS = "../data/upload/tuyendung/jd/nhanviennhansu.txt"
FILE_TEXT_MTCV_KTVTEST = "../data/upload/tuyendung/jd/kythuatvientest.txt"
FILE_TEXT_MTCV_PTQ = "../data/upload/tuyendung/jd/nhanvienquanlychatluong.txt"
FILE_TEXT_MTCV_PTC = "../data/upload/tuyendung/jd/nhanvienquanlydaotao.txt"
FILE_TEXT_MTCV_TRUYENTHONG = "../data/upload/tuyendung/jd/nhanvientruyenthong.txt"
FILE_TEXT_MTCV_NVXLSC = "../data/upload/tuyendung/jd/nhanvienxulysuco.txt"
FILE_TEXT_MTCV_TTSKYTHUAT = "../data/upload/tuyendung/jd/thuctapsinhkythuat.txt"
FILE_TEXT_MTCV_TTSNHANSU = "../data/upload/tuyendung/jd/thuctapsinhnhansu.txt"


DICT_MOTA_TUYENDUNG = {
    "PNC": {
            "0" : FILE_TEXT_TUYEN_DUNG_PNC_TEST,
            "1" : FILE_TEXT_TUYEN_DUNG_PNC_PV1,
            "2" : FILE_TEXT_TUYEN_DUNG_PNC_PV2,
            "3" : FILE_TEXT_TUYEN_DUNG_PNC_NHANVIEC
            },
    "TIN": FILE_TEXT_TUYEN_DUNG_TIN,
    "Kỹ thuật viên INDO": FILE_TEXT_MTCV_INDO,
    "Kỹ thuật viên Onsite": FILE_TEXT_MTCV_OS,
    "Kỹ thuật viên Điều hành": FILE_TEXT_MTCV_DIEUHANH,
    "Nhân viên kỹ thuật" : FILE_TEXT_MTCV_NVKT,
    "Nhân viên xử lý sự cố ": FILE_TEXT_MTCV_NVXLSC,
    "Kỹ thuật viên test thiết bị" : FILE_TEXT_MTCV_KTVTEST,
    "Nhân viên nhân sự" :FILE_TEXT_MTCV_NVNS,
    "Cộng tác viên tuyển dụng" :FILE_TEXT_MTCV_CTVTUYENDUNG,
    "Nhân viên đào tạo": FILE_TEXT_MTCV_PTC,
    "Nhân viên truyền thông nội bộ": FILE_TEXT_MTCV_TRUYENTHONG,
    "Nhân viên quản lý chất lượng" : FILE_TEXT_MTCV_PTQ,
    "Cộng tác viên nhân sự":FILE_TEXT_MTCV_CTVNHANSU,
    "Cộng tác viên truyền thông" :FILE_TEXT_MTCV_CTVTRUYENTHONG,
    "Thực tập sinh kỹ thuật": FILE_TEXT_MTCV_TTSKYTHUAT,
    "Thực tập sinh nhân sự" : FILE_TEXT_MTCV_TTSNHANSU
}

SSL_CERT_FILE = os.path.join(SSL_CERTIFICATE_DIRECTORY, "mytinpnc_vn.crt")
SSL_KEY_FILE = os.path.join(SSL_CERTIFICATE_DIRECTORY, "mytinpnc.vn.PRIVATE.key")

TUYENDUNG_SUBJECT_PNC_TEST = "[FPT - PNC TELECOM] THƯ MỜI TEST"
TUYENDUNG_SUBJECT_PNC_PHONGVAN = "[FPT - PNC TELECOM] THƯ MỜI PHỎNG VẤN"
TUYENDUNG_SUBJECT_PNC_NHANVIEC = "[FPT - PNC TELECOM]THƯ MỜI NHẬN VIỆC"
TUYENDUNG_SUBJECT_TIN = ""
TUYENDUNG_SUBJECT_NGUOI_PHONG_VAN = "SYSTEM REMIND"

GAME_LIST_EMAIL = []


html_reject = '''
'''
html_accept = '''

</html>
'''
html_kbyt = """

 """
def get_current_datetime():
    return datetime.utcnow() + timedelta(hours=7)
def get_current_date():
    return datetime.utcnow().date() + timedelta(hours=7)
def time_block_PNC():
    return get_current_datetime().replace(minute=00, hour=8, second=00, microsecond=0)
def time_office_PNC():
    return get_current_datetime().replace(minute=30, hour=7, second=00, microsecond=0)
def time_after_BL_PNC():
    return get_current_datetime().replace(minute=30, hour=13, second=00, microsecond=0)
def time_after_VP_PNC():
    return get_current_datetime().replace(minute=30, hour=13, second=00, microsecond=0)

def time_block_TIN():
    return get_current_datetime().replace(minute=30, hour=7, second=00, microsecond=0)
def time_office_TIN():
    return get_current_datetime().replace(minute=00, hour=7, second=00, microsecond=0)
def time_after_BL_TIN():
    return get_current_datetime().replace(minute=30, hour=14, second=00, microsecond=0)
def time_after_VP_TIN():
    return get_current_datetime().replace(minute=00, hour=14, second=00, microsecond=0)

def time_start_chieu():
    return get_current_datetime().replace(minute=00, hour=12, second=00, microsecond=0)

TOKEN_LIEF_TIME = 120  # seconds
TOKEN_SECRET_KEY = "MYTINPNC_tdced7a1o9fc0N46d4Iad2cA34325a128a38"
TOKEN_KEY_LIST = ['siuintevgferlwol',
                  'nqcmxjwoeolxozzw',
                  'bdzzehzmmisnwjsb',
                  'xxdjwestqgjhrovz',
                  'mdaviibgrqxpllww',
                  'seaqrxmmxbvsaofi',
                  'gsvgrhmoraccderk',
                  'pfplpxjoromhchwe',
                  'tdzxvljnyzchykoi',
                  'bitwqorjvymrtqoo',
                  'cojksfbodchsmlds',
                  'zdfwpxzeazcobiwk',
                  'sjdifjlytpfupdhb',
                  'aiccrlrszgxoadby',
                  'bjudevgnhcgxcaxi',
                  'srwkknsadltbfpeu',
                  'davnxinyphxwxrno',
                  'nqejwdaqhsyejrei',
                  'iwushghzilpbzsnj',
                  'eptsereiipekomhu']

# WEB mytinpnc.vn
TOKEN_SECRET_KEY2 = "mytinpnc_vn_hnil7a1o9FcON46d4Iad2cA34325a733a40"
TOKEN_LIEF_TIME2 = 7200
TOKEN_KEY_LIST2 = ['isuinevtgferlw01']
