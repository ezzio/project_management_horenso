define({ "api": [
  {
    "type": "post",
    "url": "/upload/folder/namefile/typefile",
    "title": "Tải lên file Data",
    "name": "Upload_Data",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"http://localhost:5000/upload/test/test/docx\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n     \"filepath\": \"../data/upload/test/test.docx\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: https://127.0.0.1:5000/upload/test/test</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/upload/atld/mnv/day/typefile",
    "title": "Tải lên IMG",
    "name": "Upload_IMG",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"http://localhost:5000/upload/atld/test/22102020/docx\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n     \"filepath\": \"/test_22102020.docx\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: https://127.0.0.1:5000/upload/atld/test</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/add_data_table",
    "title": "Thêm dữ liệu vào bảng",
    "name": "add_data_table",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "array.id_ung_vien",
            "description": "<p>Mã ứng viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.ket_qua_pv",
            "description": "<p>Kết quả phỏng vấn</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name_table",
            "description": "<p>Tên bảng</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"array\": {\n        \"id_ung_vien\": 100,\n        \"ket_qua_pv\": \"Không Đạt\"\n    },\n    \"user_email\": \"phuongnam.LinhTd1@fpt.net\",\n    \"name_table\": \"pv_lan_2\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": {\n    \"msg\": \"Gửi kết quả phỏng vấn vòng 2 thành công\",\n    \"count_insert\": 0,\n    \"count_update\": 1,\n    \"email_notok\": \"\",\n    \"error_import\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Thông báo</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count_insert",
            "description": "<p>Count Insert</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count_update",
            "description": "<p>Count Update</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email_notok",
            "description": "<p>Email NotOK</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "error_import",
            "description": "<p>Error Import</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/add_data_table</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/bao_cao_kbyt",
    "title": "Báo Cáo KBYT",
    "name": "bao_cao_kbyt",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "get_report",
            "description": "<p>Get Report</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "get_file",
            "description": "<p>Get file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"get_report\": 1,\n    \"get_file\": 1\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"binh_thuong\": 724,\n  \"bat_thuong_kdvd\": 31,\n  \"bat_thuong_cdvd\": 6,\n  \"list_bat_thuong_kdvd\": [\n    {\n      \"Họ Tên\": \"Nguyễn Cao Minh Thông\",\n      \"Phòng Ban\": \"PAGG\",\n      \"email\": \"phuongnam.thongncm@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 1,\n      \"ho_khan\": 1,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 1,\n      \"met_moi\": 0,\n      \"den_vung_dich\": 0,\n      \"tiep_xuc_nguoi_nhiem\": 0\n    },\n    {\n      \"Họ Tên\": \"Ngô Văn Nhơn\",\n      \"Phòng Ban\": \"PBDG\",\n      \"email\": \"phuongnam.nhonnv@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 0,\n      \"ho_khan\": 1,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 0,\n      \"met_moi\": 0,\n      \"den_vung_dich\": 0,\n      \"tiep_xuc_nguoi_nhiem\": 0\n    },\n    {\n      \"Họ Tên\": \"Nguyễn Thương\",\n      \"Phòng Ban\": \"PBDH\",\n      \"email\": \"phuongnam.thuongn@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 0,\n      \"ho_khan\": 0,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 0,\n      \"met_moi\": 1,\n      \"den_vung_dich\": 0,\n      \"tiep_xuc_nguoi_nhiem\": 0\n    },\n    {\n      \"Họ Tên\": \"Lê Thành Vinh\",\n      \"Phòng Ban\": \"PBDH\",\n      \"email\": \"phuongnam.vinhlt2@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 0,\n      \"ho_khan\": 0,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 1,\n      \"met_moi\": 0,\n      \"den_vung_dich\": 0,\n      \"tiep_xuc_nguoi_nhiem\": 0\n    }\n  ],\n  \"list_bat_thuong_cdvd\": [\n    {\n      \"Họ Tên\": \"Phạm Văn Ngọc\",\n      \"Phòng Ban\": \"PDX\",\n      \"email\": \"phuongnam.ngocpv1@fpt.net\",\n      \"kho_tho\": 1,\n      \"sot\": 1,\n      \"ho_khan\": 0,\n      \"viem_phoi\": 1,\n      \"dau_hong\": 1,\n      \"met_moi\": 0,\n      \"den_vung_dich\": 1,\n      \"tiep_xuc_nguoi_nhiem\": 1\n    },\n    {\n      \"Họ Tên\": \"Nguyễn Minh Luật\",\n      \"Phòng Ban\": \"PSG03\",\n      \"email\": \"phuongnam.luatnm@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 0,\n      \"ho_khan\": 0,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 1,\n      \"met_moi\": 1,\n      \"den_vung_dich\": 1,\n      \"tiep_xuc_nguoi_nhiem\": 0\n    },\n    {\n      \"Họ Tên\": \"Thái Trọng Sĩ\",\n      \"Phòng Ban\": \"PSG03\",\n      \"email\": \"phuongnam.sitt1@fpt.net\",\n      \"kho_tho\": 0,\n      \"sot\": 0,\n      \"ho_khan\": 1,\n      \"viem_phoi\": 0,\n      \"dau_hong\": 1,\n      \"met_moi\": 1,\n      \"den_vung_dich\": 1,\n      \"tiep_xuc_nguoi_nhiem\": 2\n    }\n  ],\n  \"total\": 761,\n  \"ti_le_pnc\": 39.49,\n  \"ti_le_tin\": 10.03,\n  \"link_file\": \"KBYT_20201103_103828.xlsx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "binh_thuong",
            "description": "<p>Bình thường</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "bat_thuong_kdvd",
            "description": "<p>Bất thường không đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "bat_thuong_cdvd",
            "description": "<p>Bất thường có đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "list_bat_thuong_kdvd",
            "description": "<p>List bất thường không đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_kdvd.emp_name",
            "description": "<p>Họ Tên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_kdvd.child_depart1",
            "description": "<p>Phòng ban</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_kdvd.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.kho_tho",
            "description": "<p>Khó thở</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.sot",
            "description": "<p>Sốt</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.ho_khan",
            "description": "<p>Ho khan</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.viem_phoi",
            "description": "<p>Viêm Phổi</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.dau_hong",
            "description": "<p>Đau họng</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.met_moi",
            "description": "<p>Mệt mỏi</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.den_vung_dich",
            "description": "<p>Đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_kdvd.tiep_xuc_nguoi_nhiem",
            "description": "<p>Tiếp xúc người nhiễm</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "list_bat_thuong_cdvd",
            "description": "<p>List bất thường có đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_cdvd.emp_name",
            "description": "<p>Họ Tên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_cdvd.child_depart1",
            "description": "<p>Phòng ban</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list_bat_thuong_cdvd.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.kho_tho",
            "description": "<p>Khó thở</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.sot",
            "description": "<p>Sốt</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.ho_khan",
            "description": "<p>Ho khan</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.viem_phoi",
            "description": "<p>Viêm Phổi</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.dau_hong",
            "description": "<p>Đau họng</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.met_moi",
            "description": "<p>Mệt mỏi</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.den_vung_dich",
            "description": "<p>Đến vùng dịch</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list_bat_thuong_cdvd.tiep_xuc_nguoi_nhiem",
            "description": "<p>Tiếp xúc người nhiễm</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "total",
            "description": "<p>Total</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "ti_le_pnc",
            "description": "<p>Tỉ lệ PNC</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "ti_le_tin",
            "description": "<p>Tỉ lệ TIN</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link_file",
            "description": "<p>Link file</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/bao_cao_kbyt</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/cham_diem_test",
    "title": "Chấm điểm test",
    "name": "cham_diem_test",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>List câu trả lời</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"tangdieulinh13@gmail.com\",\n    \"input\": [[1, \"a\"], [2, \"c\"], [3, \"d\"], [4, \"C\"], [5, \"B\"],[54, \"CAB\"]]\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Đạt\",\n    \"point\": \"60/60\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Kết quả</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "point",
            "description": "<p>Điểm</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/cham_diem_test</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/check_user_right_checkin",
    "title": "Check User Right Checkin",
    "name": "check_user_right_checkin",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"anhlnc@fpt.com.vn\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n  \"result\": {\n    \"email\": \"anhlnc@fpt.com.vn\",\n    \"per_id\": \"1\",\n    \"team_name\": \"VLGPN\",\n    \"child_depart_right\": {\n      \"PNCV7\": [\n        \"PVLGUSR\"\n      ]\n    },\n    \"super_admin\": null\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "per_id",
            "description": "<p>Per ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team_name",
            "description": "<p>Team Name</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "child_depart_right",
            "description": "<p>Child Depart Right</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "super_admin",
            "description": "<p>Super admin</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/check_user_right_checkin</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/convert_img_base64",
    "title": "Chuyển IMG sang Base64",
    "name": "convert_img_base64",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mode",
            "description": "<p>Mode</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Link</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"mode\": \"convert_link\",\n    \"link\": \"//home/cds/my_TIN_PNC/mytin_backend/data/upload/news/default.jpeg\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    {\"result\":\"/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQxxxxxxxxxx\"}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/convert_img_base64</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/delete_row_table",
    "title": "Xóa dòng của bảng",
    "name": "delete_row_table",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id_table",
            "description": "<p>ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name_table",
            "description": "<p>Tên bảng</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"user_email\": \"phuongnam.nipt\",\n    \"id_table\" : \"27\",\n    \"name_table\": \"ptq_tb\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"OK\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>kết quả</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/sendmail</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/empCheckin",
    "title": "Thông tin điểm danh",
    "name": "empCheckin",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Query",
            "description": "<p>&quot;query&quot;:&quot;SELECT checkin_id, MBN_account_name, checkin_time, checkin_day, checkin_month, checkin_year, sheet_time, workday_factor, block_name, checkin_success, location, team_name, note FROM emp_checkin_tb&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"query\":\"SELECT checkin_id, MBN_account_name, checkin_time, checkin_day, checkin_month, checkin_year, sheet_time, workday_factor, block_name, checkin_success, location, team_name, note FROM emp_checkin_tb\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{[\n    {\n        \"MBN_account_name\": \"DNIPN.TUNGTT3\",\n        \"block_name\": \"H.Xuan Loc-002\",\n        \"checkin_day\": \"03\",\n        \"checkin_id\": 460263,\n        \"checkin_month\": \"11\",\n        \"checkin_success\": \"OK\",\n        \"checkin_time\": \"05:05:53\",\n        \"checkin_year\": \"2020\",\n        \"location\": \"BLOCK\",\n        \"note\": null,\n        \"sheet_time\": \"S\",\n        \"team_name\": \"DNIPN\",\n        \"workday_factor\": 1.0\n    },\n    {\n        \"MBN_account_name\": \"DTPPN.TAMNC\",\n        \"block_name\": \"TP.Sa Dec-001\",\n        \"checkin_day\": \"03\",\n        \"checkin_id\": 460264,\n        \"checkin_month\": \"11\",\n        \"checkin_success\": \"OK\",\n        \"checkin_time\": \"05:06:09\",\n        \"checkin_year\": \"2020\",\n        \"location\": \"BLOCK\",\n        \"note\": null,\n        \"sheet_time\": \"S\",\n        \"team_name\": \"DTPPN\",\n        \"workday_factor\": 1.0\n    }\n]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MBN_account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "block_name",
            "description": "<p>Tên BLOCK</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "checkin_day",
            "description": "<p>Ngày điểm danh (Format DD)</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "checkin_id",
            "description": "<p>Mã nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "checkin_month",
            "description": "<p>Tháng điểm danh (Format MM)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "checkin_success",
            "description": "<p>Điểm danh thành công</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "checkin_time",
            "description": "<p>Thời gian điểm danh (Format HH:MM:SS)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "checkin_year",
            "description": "<p>Năm điểm danh (Format YYYY)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Địa điểm (BLOCK or VP)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "note",
            "description": "<p>Ghi chú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sheet_time",
            "description": "<p>Ca điểm danh (S or C)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "team_name",
            "description": "<p>Tên nhóm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "workday_factor",
            "description": "<p>Ngày công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/empCheckin</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/get_exam_test",
    "title": "Bài kiểm tra",
    "name": "get_exam_test",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"ngocpv.ptit@gmail.com\",\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"numbers_question\": 60,\n    \"questions\": [],\n    \"status\": \"Đã hết lượt thi\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "numbers_question",
            "description": "<p>Số câu hỏi</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "questions",
            "description": "<p>Câu hỏi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/get_exam_test</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/insert_emp_checkin_tb",
    "title": "Thêm thông tin điểm danh",
    "name": "insert_emp_checkin_tb",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "array[]",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.MBN_account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.emp_code",
            "description": "<p>Mã nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_date",
            "description": "<p>Thời gian điểm danh (Format DD/MM/YYYY)</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "array.checkin_time",
            "description": "<p>Giờ điểm danh (Format HH:MM:SS)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_day",
            "description": "<p>Ngày điểm danh (Format DD)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_month",
            "description": "<p>Tháng điểm danh (Format MM)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_year",
            "description": "<p>Năm điểm danh (Format YYYY)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.sheet_time",
            "description": "<p>Ca điểm danh (S or C)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.workday_factor",
            "description": "<p>Ngày công</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.workday_convert",
            "description": "<p>Chuyển đổi ngày làm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.block_name",
            "description": "<p>Tên BLOCK</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.checkin_success",
            "description": "<p>Điểm danh thành công</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.location",
            "description": "<p>Địa điểm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.team_name",
            "description": "<p>Tên nhóm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.note",
            "description": "<p>Ghi chú</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email người cập nhật</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"array\":[{\n        \"email\" : \"\",\n        \"MBN_account_name\":\"PNC08.HADV11\",\n        \"emp_code\": \"100000\",\n        \"checkin_date\":\"14/06/2020\",\n        \"checkin_time\":\"07:13:17\",\n        \"checkin_day\":\"13\",\n        \"checkin_month\":\"06\",\n        \"checkin_year\":\"2020\",\n        \"sheet_time\":\"S\",\n        \"workday_factor\":\"1\",\n        \"workday_convert\":\"\",\n        \"block_name\" :\"Q.Thu Duc-005\",\n        \"checkin_success\" :\"OK\",\n        \"location\" :\"BLOCK\",\n        \"team_name\":\"PNC08\",\n        \"note\" :\"\"\n    }],\n    \"user_email\": \"phuongnam.ThyTNT@fpt.net\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Insert success\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Kết quả</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/insert_emp_checkin_tb</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/module_office_CTP",
    "title": "Module Office CTP",
    "name": "module_office_CTP",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "task_time",
            "description": "<p>Task Time</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại (CTP: Công tác phí , UT: Tạm ứng)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "html",
            "description": "<p>HTML</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action (Accept or Reject)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"task_time\": \"22102020145905\",\n    \"type\": \"CTP\",\n    \"html\": \"\",\n    \"action\": \"accept\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"task_id\": 40,\n    \"step\": 2,\n    \"status\": \"PENDING\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "task_id",
            "description": "<p>Task ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "step",
            "description": "<p>Step</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status (PENDING,NOK,DONE)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/module_office_CTP</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/sendmail",
    "title": "Gởi mail",
    "name": "sendmail",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Tiêu đề</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhận</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "html",
            "description": "<p>Teamplate mail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"subject\" : \"Thông tin \",\n    \"email\": \"phuongnam.ThyTNT@fpt.net\",\n    \"html\": \"\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"Email sent successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>&quot;Email sent successfully!&quot;</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/sendmail</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/update_data_table",
    "title": "Cập nhật dữ liệu cho bảng",
    "name": "update_data_table",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "array",
            "description": "<p>array[]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name_table",
            "description": "<p>Tên bảng</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"array\": [{\"ptq_id\": 31, \"recorded\": \"OK\"}],\n    \"user_email\": \"phuongnam.LinhTd1@fpt.net\",\n    \"name_table\": \"ptq_tb\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": {\n    \"msg\": \"Cập nhật thông tin thành công\",\n    \"status\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Thông báo</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/update_data_table</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "type": "post",
    "url": "/update_emp_checkin_tb",
    "title": "Cập nhật thông tin điểm danh",
    "name": "update_emp_checkin_tb",
    "version": "1.0.0",
    "group": "Backend_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "array[]",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.MBN_account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.emp_code",
            "description": "<p>Mã nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_date",
            "description": "<p>Thời gian điểm danh (Format DD/MM/YYYY)</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "array.checkin_time",
            "description": "<p>Giờ điểm danh (Format HH:MM:SS)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_day",
            "description": "<p>Ngày điểm danh (Format DD)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_month",
            "description": "<p>Tháng điểm danh (Format MM)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "array.checkin_year",
            "description": "<p>Năm điểm danh (Format YYYY)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.sheet_time",
            "description": "<p>Ca điểm danh (S or C)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.workday_factor",
            "description": "<p>Ngày công</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.workday_convert",
            "description": "<p>Chuyển đổi ngày làm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.block_name",
            "description": "<p>Tên BLOCK</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.checkin_success",
            "description": "<p>Điểm danh thành công</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.location",
            "description": "<p>Địa điểm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.team_name",
            "description": "<p>Tên nhóm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "array.note",
            "description": "<p>Ghi chú</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email người cập nhật</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"array\":[{\n        \"email\" : \"\",\n        \"MBN_account_name\":\"PNC08.HADV11\",\n        \"emp_code\": \"100000\",\n        \"checkin_date\":\"15/06/2020\",\n        \"checkin_time\":\"07:13:17\",\n        \"checkin_day\":\"13\",\n        \"checkin_month\":\"06\",\n        \"checkin_year\":\"2020\",\n        \"sheet_time\":\"S\",\n        \"workday_factor\":\"1\",\n        \"workday_convert\":\"\",\n        \"block_name\" :\"Q.Thu Duc-005\",\n        \"checkin_success\" :\"OK\",\n        \"location\" :\"BLOCK\",\n        \"team_name\":\"PNC08\",\n        \"note\" :\"\"\n    }],\n    \"user_email\": \"phuongnam.ThyTNT@fpt.net\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Update success\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Kết quả</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5000/update_emp_checkin_tb</p>"
          }
        ]
      }
    },
    "filename": "./services/backend_service.py",
    "groupTitle": "Backend_Service"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "E:\\Projects\\PNC\\myTin_backend\\src\\apidoc\\main.js",
    "groupTitle": "E:\\Projects\\PNC\\myTin_backend\\src\\apidoc\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/danh_gia_ung_vien",
    "title": "Đánh giá ứng viên",
    "name": "danh_gia_ung_vien",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "List",
            "optional": false,
            "field": "thong_tin_danh_gia",
            "description": "<p>Thông tin đánh giá</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.id_ung_vien",
            "description": "<p>Id ứng viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.ngoai_hinh",
            "description": "<p>Ngoại hình</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.tac_phong_thai_do",
            "description": "<p>Tác phong thái độ</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.kien_thuc_chuyen_mon",
            "description": "<p>Kiến thức chuyên môn</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.diem_test",
            "description": "<p>Điểm test</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.ky_nang",
            "description": "<p>Kỹ năng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.tinh_trang_pv",
            "description": "<p>Tình trạng phỏng vấn</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.ket_qua_pv",
            "description": "<p>Kết quả phỏng vấn</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "thong_tin_danh_gia.ngay_nhan_vien_du_kien",
            "description": "<p>Ngày nhận việc dự kiến(Format D-M-Y)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thong_tin_danh_gia.khu_vuc_nhan_viec",
            "description": "<p>Khu vực nhận việc</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"pnc.pdx@fpt.net\",\n    thong_tin_danh_gia = {\n        \"id_ung_vien\": \"13\",\n        \"ngoai_hinh\": \"đẹp trai\",\n        \"tac_phong_thai_do\": \"tốt\",\n        \"kien_thuc_chuyen_mon\": \"tốt\",\n        \"diem_test\": \"45/60\",\n        \"ky_nang\": \"quá tốt\",\n        \"tinh_trang_pv\": \"Có\",\n        \"ket_qua_pv\": \"Đạt\",\n        \"ngay_nhan_vien_du_kien\": \"17/10/2020\",\n        \"khu_vuc_nhan_viec\": \"PSG17\"\n    }\n    \"iv\" : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n    \"msg\": \"P3QwXbzwArrATuLvvuArG8KSmBRTiDXBlnAEtkJpfXP2gLESz57GEiYZgC7R5ukxxxx\"\n}\nNoi dung sau khi giai ma:\n\"Gửi thông tin đánh giá ứng viên thành công\"",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Gửi thông tin đánh giá ứng viên thành công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/danh_gia_ung_vien</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/danh_sach_tai_lieu",
    "title": "Danh sách tài liệu",
    "name": "danh_sach_tai_lieu",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>Tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"pnc.pdx@fpt.net\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"dklaldqlbalhdlas\",\n    \"iv\"    : \"Dsakldjlqwdnlanlq\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"8bZB7GgdELpYqUi2+mZjvPr0bZoTMSzxxx\"\n}\nNội dung sau khi giải mã:\n{\n  \"ds_chinh_sach\": [\n\n  ],\n  \"ds_huong_dan\": [\n    {\n      \"id\": \"5\",\n      \"ten_tai_lieu\": \"TL_HD1 Thi\\u1ebft l\\u1eadp m\\u1eadt kh\\u1ea9u xem l\\u01b0\\u01a1ng tr\\u00ean app My TIN-PNC\"\n    }\n  ],\n  \"ds_quy_dinh\": [\n    {\n      \"id\": \"6\",\n      \"ten_tai_lieu\": \"Quy \\u0111\\u1ecbnh v\\u1ec1 an to\\u00e0n \\u0111i\\u1ec7n khi thi c\\u00f4ng\"\n    }\n  ],\n  \"ds_quy_trinh\": [\n\n  ],\n  \"sl_chinh_sach\": 0,\n  \"sl_huong_dan\": 1,\n  \"sl_quy_dinh\": 1,\n  \"sl_quy_trinh\": 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_chinh_sach",
            "description": "<p>Danh sách chính sách</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_chinh_sach.id",
            "description": "<p>id chính sách</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_chinh_sach.ten_tai_lieu",
            "description": "<p>Tên tài liệu</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_huong_dan",
            "description": "<p>Hướng dẫn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_huong_dan.id",
            "description": "<p>id hướng dẫn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_huong_dan.ten_tai_lieu",
            "description": "<p>Tên tài liệu</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_quy_dinh",
            "description": "<p>Quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_quy_dinh.id",
            "description": "<p>id quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_quy_dinh.ten_tai_lieu",
            "description": "<p>Tên tài liệu</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_quy_trinh",
            "description": "<p>Quy trình</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_quy_trinh.id",
            "description": "<p>id quy trình</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_quy_trinh.ten_tai_lieu",
            "description": "<p>Tên tài liệu</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sl_chinh_sach",
            "description": "<p>Số lượng chính sách</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sl_huong_dan",
            "description": "<p>Số lượng hướng dẫn</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sl_quy_dinh",
            "description": "<p>Số lượng quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sl_quy_trinh",
            "description": "<p>Số lượng quy trình</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/danh_sach_tai_lieu</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/danh_sach_tre_hen",
    "title": "Danh sách hợp đồng trễ hẹn",
    "name": "danh_sach_tre_hen",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_imei",
            "description": "<p>Imei thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Mã thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_from",
            "description": "<p>Ngày bắt đầu (Format Y-M-D)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_to",
            "description": "<p>Ngày kết thúc (Format Y-M-D)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loai_kpis",
            "description": "<p>Loại KPI</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\": \"phuongnam.nipt@fpt.net\",\n    \"device_imei\": \"358240051111110\",\n    \"device_id\": \"1ade30cbf6632e27\",\n    \"date_from\": \"2020-09-01\",\n    \"date_to\": \"2020-09-30\",\n    \"loai_kpis\": \"bt\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\": \"lvanskadhkjwdnkjad\",\n    \"device_imei\": \"lsdoqdjakcnaxqqd\",\n    \"device_id\": \"lcaiasjqkwnckan,ckas\",\n    \"date_from\": \"dwdwdascasvfq\",\n    \"date_to\": \"lodqndkjcnqd\",\n    \"loai_kpis\": \"daklsjlqwdkjnca\",\n    \"iv\"    : \"Daksdhkqwdkjbdas\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"/gMah4LSSIPtlHOtWFjDab8QETVsDbO7BpwTyxxxxx\"\n}\nNội dung sau khi giải mã:\n{\n    \"ds_hd_tre_hen\": [\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"05-09-2020 15:59:19\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGCM00209\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"10-09-2020 18:12:05\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH556897\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"14-09-2020 10:55:18\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH777625\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"10-09-2020 14:58:36\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH648777\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"19-09-2020 18:39:41\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH708145\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"20-09-2020 10:21:35\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH837064\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"22-09-2020 13:43:00\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGD222267\"\n    },\n    {\n      \"MBN_account_name\": \"PNC16.VUND\",\n      \"ngay_hoan_tat\": \"24-09-2020 11:38:46\",\n      \"ngay_phat_sinh_cl\": \"\",\n      \"so_HD\": \"SGH753364\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_hd_tre_hen",
            "description": "<p>DS hợp đồng trễ hẹn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_hd_tre_hen.MBN_account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "ds_hd_tre_hen.ngay_hoan_tat",
            "description": "<p>Ngày hoàn tất(Format D-M-Y H:M:S)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_hd_tre_hen.ngay_phat_sinh_cl",
            "description": "<p>Ngày phát sinh CL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ds_hd_tre_hen.so_HD",
            "description": "<p>Số hợp đồng trễ hẹn</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/danh_sach_tre_hen</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/dao_tao",
    "title": "Đào tạo",
    "name": "dao_tao",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"pnc.pdx@fpt.net\",\n    \"iv\"    : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n    \"msg\": \"iUlYKZcRiEYepiWI4juUTEN2e6gdcNfJS/DSmxxxxx\"\n}\nNoi dung sau khi giai ma:\n{\n  'lich_su': {\n    'da_hoan_thanh': 2,\n    'chua_hoan_thanh': 4,\n    'dat': 2,\n    'chua_dat': 0,\n    'lich_su_khoa_hoc': [\n      {\n        'ten_khoa_hoc': 'PNC_Quy trình 13 bước trong triển khai và bảo trì tại nhà khách hàng',\n        'ngay_thi': 'None',\n        'diem': 'None',\n        'status': 'notok'\n      },\n      {\n        'ten_khoa_hoc': 'FTQ_Quy trình triển khai FPT Camera cho TIN.PNC - FTQ',\n        'ngay_thi': '16:59 17/02/2020',\n        'diem': '8.82/10',\n        'status': 'ok'\n      },\n      {\n        'ten_khoa_hoc': 'FTELSCM _Bảo hành Nhà cung cấp trên hệ thống _Tạo đơn đề nghị',\n        'ngay_thi': '08:12 14/01/2020',\n        'diem': '9.09/10',\n        'status': 'ok'\n      },\n\n      {\n        'ten_khoa_hoc': 'CEM1 - Tác phong, giao tiếp chuyên nghiệp - tháng 03/2016',\n        'ngay_thi': '08:05 19/03/2016',\n        'diem': '9.00/10',\n        'status': 'notok'\n      },\n      {\n        'ten_khoa_hoc': 'Quy trình triển khai dịch vụ (TIN/PNC) - tháng 7/2015',\n        'ngay_thi': 'None',\n        'diem': 'None',\n        'status': 'notok'\n      },\n      {\n        'ten_khoa_hoc': 'Nâng cấp băng thông và các gói cước mới từ 01/06/2015 (KT, Thu ngân, TIN, PNC)',\n        'ngay_thi': 'None',\n        'diem': 'None',\n        'status': 'notok'\n      }\n    ]\n  },\n  'thong_tin_khoa_hoc': {\n    'online': [\n      {\n        'tinh_trang_1': 'Đang diễn ra',\n        'tinh_trang_2': 'Vào học',\n        'ten_khoa_hoc': 'PNC_Quy trình 13 bước trong triển khai và bảo trì tại nhà khách hàng',\n        'mo_ta_khoa_hoc': 'None',\n        'loai': 2,\n        'ngay_bat_dau': '13/03/2020 17:40:00'\n      },\n      {\n        'tinh_trang_1': 'Đang diễn ra',\n        'tinh_trang_2': 'Vào học',\n        'ten_khoa_hoc': 'FTQ_Quy trình triển khai FPT Camera cho TIN.PNC - FTQ',\n        'mo_ta_khoa_hoc': 'None',\n        'loai': 2,\n        'ngay_bat_dau': '13/02/2020 16:00:00'\n      }\n    ],\n    'offline': [\n      {\n        'ten_khoa_hoc': 'Hiểu biết về dịch vụ, sản phẩm - FPT Play Box_THA',\n        'ngay_bat_dau': '11/01/2018 18:50:40'\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "lich_su",
            "description": "<p>Lịch sử</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "lich_su.da_hoan_thanh",
            "description": "<p>Đã hoàn thành</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "lich_su.chua_hoan_thanh",
            "description": "<p>Chưa hoàn thành</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "lich_su.dat",
            "description": "<p>Đạt</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "lich_su.chua_dat",
            "description": "<p>Chưa đạt</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su.lich_su_khoa_hoc",
            "description": "<p>Lịch sử khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su.lich_su_khoa_hoc.ten_khoa_hoc",
            "description": "<p>Tên khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su.lich_su_khoa_hoc.ngay_thi",
            "description": "<p>Ngày thi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su.lich_su_khoa_hoc.diem",
            "description": "<p>Điểm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su.lich_su_khoa_hoc.status",
            "description": "<p>Trạng thái</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "thong_tin_khoa_hoc",
            "description": "<p>Thông tin khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online",
            "description": "<p>Online</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.tinh_trang_1",
            "description": "<p>Đang diễn ra</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.tinh_trang_2",
            "description": "<p>Vào học</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.ten_khoa_hoc",
            "description": "<p>Tên khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.mota_khoa_hoc",
            "description": "<p>Mô tả khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.type",
            "description": "<p>Loại ( 1 đợt thi, 2 lớp học)</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "thong_tin_khoa_hoc.online.ngay_bat_dau",
            "description": "<p>Ngày bắt đầu (Format D-M-Y H:M:S)</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_khoa_hoc.offline",
            "description": "<p>Offline</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_khoa_hoc.offline.ten_khoa_hoc",
            "description": "<p>Tên khóa học</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "thong_tin_khoa_hoc.offline.ngay_bat_dau",
            "description": "<p>Ngày bắt đầu (Format D-M-Y H:M:S)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/dao_tao</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/diem_danh",
    "title": "Điểm danh nhân viên mới",
    "name": "diem_danh",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "coor_emp",
            "description": "<p>Tọa độ nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Mã thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"device_id\" : \"355228083344570\",\n    \"coor_emp\" : \"10.6407004, 106.7333669\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"nmbdalhdlqhdlwlda\",\n    \"device_id\" : \"klasjdladnlqnlwqbcaslbclas\",\n    \"coor_emp\" : \"klnalnclabclwqblaslclkasld\",\n    \"iv\"    : \"dlandlqnlancpqlalsd\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n     \"msg\": \"ctIw7nsl4kItO8rR1Ahxxxxx\"\n}\nNội dung sau khi giải mã:\n{\n     \"msg\": \"Vị trí điểm danh của bạn không phù hợp\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Bạn đã điểm danh thành công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/diem_danh</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/diem_theo_tieu_chi",
    "title": "Điểm theo tiêu chí",
    "name": "diem_theo_tieu_chi",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>Tháng</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"pnc.PDX@fpt.net\",\n    \"month\" : \"06\",\n    \"iv\"    : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n    \"msg\": \"RrnoLGBM9AbCvzfsfOgwGhdGar3ciFWePjUgbH57DUNJHTsFMwwxxxxx\"\n}\nNoi dung sau khi giai ma:\n{\n    \"chua_quy_doi\":\n    {\n        \"chuyen_mon\": 9.0,\n        \"csat\": 3.91,\n        \"diem_thuong\": 0.0,\n        \"nsld_tb\": 7.46,\n        \"tham_nien\": \"10.0\",\n        \"tl_clps_7_ngay_sau_tkbt\": \"10.65\",\n        \"tl_dung_hen_tk_bt\": \"95.01\",\n        \"y_thuc\": \"Không vi phạm kỷ luật\"\n    },\n    \"da_quy_doi\":\n    {\n        \"diem_chuyen_mon\": 22.5,\n        \"diem_csat\": 20.0,\n        \"diem_nsld_tb\": 21.0,\n        \"diem_tham_nien\": 15.0,\n        \"diem_thuong\": 0.0,\n        \"diem_tl_clps_7_ngay_sau_tkbt\": 0.0,\n        \"diem_tl_dung_hen_tk_bt\": 25.0,\n        \"diem_y_thuc\": 0.0\n    },\n    \"tong_diem\": 103.5\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "chua_quy_doi",
            "description": "<p>Chưa Quy Đổi</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "chua_quy_doi.chuyen_mon",
            "description": "<p>Điểm chuyên môn</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "chua_quy_doi.csat",
            "description": "<p>Điểm CSAT</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "chua_quy_doi.diemthuong",
            "description": "<p>Điểm thưởng</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "chua_quy_doi.nsld_tb",
            "description": "<p>nsld_tb</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chua_quy_doi.tham_nien",
            "description": "<p>Thâm niên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chua_quy_doi.tl_clps_7_ngay_sau_tkbt",
            "description": "<p>Tỉ lệ checklist phát sinh 7 ngày sau triển khai bảo trì</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chua_quy_doi.tl_dung_hen_tk_bt",
            "description": "<p>Tỉ lệ đúng hẹn triển khai bảo trì</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "chua_quy_doi.y_thuc",
            "description": "<p>Điểm ý thức</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "da_quy_doi",
            "description": "<p>Đã quy đổi</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_chuyen_mon",
            "description": "<p>Điểm chuyên môn</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_csat",
            "description": "<p>Điểm CSAT</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_nsld_tb",
            "description": "<p>Điểm nsld_tb</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_tham_nien",
            "description": "<p>Điểm thâm niên</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_thuong",
            "description": "<p>Điểm thưởng</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_tl_clps_7_ngay_sau_tkbt",
            "description": "<p>Điểm tỉ lệ checklist phát sinh 7 ngày sau triển khai bảo trì</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_tl_dung_hen_tk_bt",
            "description": "<p>Điểm tỉ lệ đúng hẹn triển khai bảo trì</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "da_quy_doi.diem_y_thuc",
            "description": "<p>Điểm ý thức</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "tong_diem",
            "description": "<p>Tổng điểm</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/diem_theo_tieu_chi</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/ds_chi_tiet_covid",
    "title": "DS chi tiết covid",
    "name": "ds_chi_tiet_covid",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>Thành Phố</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"city\" : \"TpHCM\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    'msg': {\n        'chi_tiet_kv': [\n          'Bệnh viện Triều An, 425 Kinh Dương Vương, An Lạc, Bình Tân',\n          'Bệnh viện Quốc tế City, số 3 Đường Số 17A, Bình Trị Đông B, Bình Tân',\n          'Khách sạn Thanh Danh 2, số 624 Nguyễn Chí Thanh, Phường 4, Quận 11',\n          'AEON MALL Bình Tân, số 1 Đường Số 17A, Bình Trị Đông B, Bình Tân'\n        ],\n        'lat_long': [\n          {\n            'lat': '10.7393341',\n            'long': '106.6149876'\n          },\n          {\n            'lat': '10.7413641',\n            'long': '106.6071638'\n          },\n          {\n            'lat': '10.7532372',\n            'long': '106.6574827'\n          },\n          {\n            'lat': '10.742755',\n            'long': '106.6097422'\n          }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "chi_tiet_kv",
            "description": "<p>Chi tiết khu vực</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lat_long",
            "description": "<p>Tọa độ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lat_long.lat",
            "description": "<p>Latitude</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lat_long.long",
            "description": "<p>Longitude</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/ds_chi_tiet_covid</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/ds_kv_cach_ly",
    "title": "Danh sách khu vực cách ly",
    "name": "ds_kv_cach_ly",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"phuongnam.nipt@fpt.net\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n     \"msg\": {\n        \"thoi_gian\": \"22/10/2020 11:28:31\",\n        \"danh_sach_kv\": [\n            \"Đà Nẵng\",\n            \"TPHCM\",\n            \"Hà Nội\",\n            \"Quảng Nam\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "thoi_gian",
            "description": "<p>Thời gian (DD/MM/YYYY H:M:S)</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "danh_sach_kv",
            "description": "<p>Danh sách khu vực</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/ds_kv_cach_ly</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_checkin_info",
    "title": "Kiểm tra thông tin điểm danh",
    "name": "get_checkin_info",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_imei",
            "description": "<p>Mã imei thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"device_imei\": \"358240051111110\",\n    \"device_id\": \"1ade30cbf6632e27\",\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"device_imei\": \"kdkasdkhdahsad,\n    \"device_id\": \"jhdajshdsjajjxjj\",\n    \"email\" : \"lisadasdjhjjajsd\",\n    \"iv\"    : \"djsajajiqmkakls\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"zD1aoTkjJsaVfkd9Q6aLdjan7hPkc+VjoQSnRAzU9cY=\"\n}\n\nNội dung sau khi giải mã:\n{\n    \"msg\": \"Not OK\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Check in thành công</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "Not_OK",
            "description": "<p>Check in thất bại</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_checkin_info</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_data_ptq_tb",
    "title": "Thông tin danh sách chế tài",
    "name": "get_data_ptq_tb",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_from",
            "description": "<p>Ngày bắt đầu (format Y-M-D)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_to",
            "description": "<p>Ngày kết thúc (format Y-M-D)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự    phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.luongtd1@fpt.net\",\n    \"date_from\" : \"2020-01-01\",\n    \"date_to\" : \"2020-01-30\",\n    \"iv\": key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"skjdhkajhdascnasjk\",\n    \"date_from\" : \"kjdahkdhsa\",\n    \"date_to\" : \"hdhakjdks\",\n    \"iv\": \"djkhsakjdhsa\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"iobOZzRhGmE5+0t45MFE9eQdBjoYPRUx2c5ck4Sp9s1E8LIDJB2FISlrvKkCljuI\"\n}\nNội dung sau khi giải mã:\n{\n    {\n        \"contract\": \"SGH000001\",\n        \"date_check\": \"01/01/2020\",\n        \"deadline\": \"10/01/2020\",\n        \"error_main\": \"ABCDE\",\n        \"expected_punishment\": \"Mức 1\",\n        \"ptq_id\": \"1\"\n    },\n    {\n        \"contract\": \"SGH000002\",\n        \"date_check\": \"02/01/2020\",\n        \"deadline\": \"10/01/2020\",\n        \"error_main\": \"ABCDE\",\n        \"expected_punishment\": \"Mức 2\",\n        \"ptq_id\": \"2\"\n    },\n    {\n        \"contract\": \"SGH000003\",\n        \"date_check\": \"02/01/2020\",\n        \"deadline\": \"22/08/2020\",\n        \"error_main\": \"ABCDE\",\n        \"expected_punishment\": \"Mức 3\",\n        \"ptq_id\": \"3\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contract",
            "description": "<p>Số hợp đồng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_check",
            "description": "<p>Ngày kiểm tra (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "deadline",
            "description": "<p>Hạn nhận giải trình (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_main",
            "description": "<p>Lỗi chính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expected_punishment",
            "description": "<p>Mức chế tài</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ptq_id",
            "description": "<p>Mã id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_data_ptq_tb</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_detail_ptq_tb",
    "title": "Thông tin chi tiết chế tài",
    "name": "get_detail_ptq_tb",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ptq_id",
            "description": "<p>Mã id</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"ptq_id\" : \"7\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"ptq_id\" : \"skjdajhkafajsd\",\n    \"iv\"    : \"djkahdksahdkjashdknsaxkas\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"Ce9ibYyqhdVR6FSd0BOxZRVqbWbFWl8LTDfWqLLxxxx\"\n}\nNội dung sau khi giải mã:\n{\n    \"contract\": \"SGH863790\",\n    \"date_complete\": \"25/07/2020 07:40:19\",\n    \"deadline\": \"01/11/2020\",\n    \"duration_check\": \"10/2020\",\n    \"error_description\": \"Kh\\u00f4ng ho\\u00e0n th\\u00e0nh nhi\\u1ec7m v\\u1ee5\",\n    \"error_detail\": \"\\u1ea2nh 7\",\n    \"error_group\": \"B\\u1ea3o tr\\u00ec\",\n    \"error_main\": \"Quy \\u0111\\u1ecbnh\",\n    \"error_number\": \"1\",\n    \"error_type\": \"PTC\",\n    \"expected_punishment\": \"50000\",\n    \"explanation\": \"None\",\n    \"recorded\": \"NOTOK\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contract",
            "description": "<p>Số hợp đồng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_complete",
            "description": "<p>Ngày hoàn tất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deadline",
            "description": "<p>Hạn nhận giải trình (dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "duration_check",
            "description": "<p>Kỳ kiểm soát (dd/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_description",
            "description": "<p>Mô tả lỗi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_detail",
            "description": "<p>Chi tiết lỗi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_group",
            "description": "<p>Nhóm lỗi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_main",
            "description": "<p>Lỗi chính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_number",
            "description": "<p>Số lần vi phạm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error_type",
            "description": "<p>Loại phiếu (PTC, CL)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expected_punishment",
            "description": "<p>Mức chế tài</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "explanation",
            "description": "<p>Giải trình</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recorded",
            "description": "<p>Ghi nhận (NOTOK, OK)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_detail_ptq_tb</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_emp_checkin_his_day",
    "title": "Thông tin điểm danh ngày",
    "name": "get_emp_checkin_his_day",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Ngày điểm danh (Format YYYY-MM-DD)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.vund@fpt.net\",\n    \"date\" : \"2020-08-20\",\n    \"iv\" : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"osifoihflaflhlasdxxx\",\n    \"date\" : \"kldjfljsvnxxx\",\n    \"iv\" : \"dkahdkashdkshdc\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n     \"msg\": \"76CWs/Sb+qTs/k/Vfm/tcui0GbSoomO9UMQExxxxxx\"\n}\n\nNội dung sau khi giải mã:\n{\n    \"checkin_date\": \"2020-08-20\",\n    \"checkin_time\": \"07:53:20\",\n    \"location\": \"Q7-003\",\n    \"workday_factor\": 1.0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "checkin_date",
            "description": "<p>Ngày điểm danh (Format YYYY-MMM-DD)</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "checkin_time",
            "description": "<p>Giờ điểm danh (Format HH:MM:SS)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Địa điểm</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "workday_factor",
            "description": "<p>Ngày công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_emp_checkin_his_day</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_emp_checkin_his_month",
    "title": "Lịch sử diểm danh tháng",
    "name": "get_emp_checkin_his_month",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>Tháng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>Năm</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.vund@fpt.net\",\n    \"month\": \"06\",\n    \"year\" : \"2020\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"ayYHgalXRiJzwTPtZNmlWSjxjxxxxx\",\n    \"month\": \"XRiJzwTPtZNmlWSjxjxxxxx\",\n    \"year\" : \"galXRiJzwTPtZNmlWSjxx\",\n    \"iv\"    : \"ayYHgalXRiJzwTPtxx\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"ayYHgalXRiJzwTPtZNmlWSjxjxxxxx\"\n}\n\nNội dung sau khi giải mã:\n{\n  \"check_in_his_month\": [\n    {\n      \"checkin_date\": \"2020-06-01\",\n      \"checkin_time\": \"07:40:57\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-02\",\n      \"checkin_time\": \"07:44:04\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-03\",\n      \"checkin_time\": \"07:23:40\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-04\",\n      \"checkin_time\": \"07:34:40\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-05\",\n      \"checkin_time\": \"07:31:25\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-08\",\n      \"checkin_time\": \"07:40:25\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-09\",\n      \"checkin_time\": \"07:33:51\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-10\",\n      \"checkin_time\": \"07:34:33\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-11\",\n      \"checkin_time\": \"07:56:46\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-12\",\n      \"checkin_time\": \"11:12:49\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 0.6\n    },\n    {\n      \"checkin_date\": \"2020-06-13\",\n      \"checkin_time\": \"07:41:44\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-15\",\n      \"checkin_time\": \"07:37:12\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-16\",\n      \"checkin_time\": \"07:35:21\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-17\",\n      \"checkin_time\": \"07:42:57\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-18\",\n      \"checkin_time\": \"07:41:12\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-19\",\n      \"checkin_time\": \"07:50:08\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-21\",\n      \"checkin_time\": \"08:00:52\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-22\",\n      \"checkin_time\": \"07:34:26\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-23\",\n      \"checkin_time\": \"07:48:38\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-24\",\n      \"checkin_time\": \"07:24:49\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-25\",\n      \"checkin_time\": \"07:38:09\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-26\",\n      \"checkin_time\": \"09:07:15\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 0.86\n    },\n    {\n      \"checkin_date\": \"2020-06-27\",\n      \"checkin_time\": \"07:56:47\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-29\",\n      \"checkin_time\": \"07:49:14\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    },\n    {\n      \"checkin_date\": \"2020-06-30\",\n      \"checkin_time\": \"07:38:06\",\n      \"location\": \"Q7-003\",\n      \"workday_factor\": 1.0\n    }\n  ],\n  \"sum_workday_factor\": \"24.46\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "check_in_his_month",
            "description": "<p>Lịch sử điểm danh tháng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "check_in_his_month.checkin_date",
            "description": "<p>Ngày điểm danh</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "check_in_his_month.checkin_time",
            "description": "<p>Thời gian điểm danh (Format HH:MM:SS)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "check_in_his_month.location",
            "description": "<p>Địa điểm (Block or VP)</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "check_in_his_month.workday_factor",
            "description": "<p>Ngày công</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sum_workday_factor",
            "description": "<p>Tổng số ngày công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_emp_checkin_his_month</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_emp_info",
    "title": "Thông tin nhân viên",
    "name": "get_emp_info",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_imei",
            "description": "<p>Imei thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Mã thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_api_level",
            "description": "<p>Phiên bản android thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"device_imei\" : \"13688186e96b59d9\",\n    \"device_id\" : \"080ce5b6f04d7105\",\n    \"device_api_level\" : \"24\",\n    \"email\" : \"baopnh@fpt.com.vn\",\n    \"iv\"    : Key tự phát sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"device_imei\" : \"kldjaldhlhcnas\",\n    \"device_id\" : \"kldaldhklskcncas\",\n    \"device_api_level\" : \"dkjshakdhas\",\n    \"email\" : \"dlkasjldhasca\",\n    \"iv\"    : \"djkhsakdhsakjdk\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": [\n        \"pdiehdwU4MHiVXzskPPe/ZIwjpYrBb8lonoifGw31cqOxxxxxx\"\n    ]\n}\n\nNội dung sau khi giải mã:\n{\n    \"account\": \"\",\n    \"birthday\": \"12/02/1984\",\n    \"contract_date_end\": \"None\",\n    \"contract_date_start\": \"16/01/2011\",\n    \"contract_type\": \"HĐLĐ Không xác định thời hạn\",\n    \"department\": \"FPNCBGD\",\n    \"dependent_info\": \"None\",\n    \"device_id\": \"None\",\n    \"email\": \"baopnh@fpt.com.vn\",\n    \"emp_code\": \"00012586\",\n    \"emp_name\": \"Phạm Như Hoài Bảo\",\n    \"job_title\": \"QL Quản lý đối tác\",\n    \"mstcn\": \"8044490726\",\n    \"phone_number\": \"0907579992\",\n    \"type_emp\": \"emp_interviewer\",\n    \"ver_code\": \"1.8.2\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>Tài khoản PCTU.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthday",
            "description": "<p>Ngày sinh của nhân viên (dd/mm/yyyy).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "contract_date_end",
            "description": "<p>Ngày kết thúc hợp đồng (dd/mm/yyyy).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "contract_date_start",
            "description": "<p>Ngày bắt đầu hợp đồng (dd/mm/yyyy).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contract_type",
            "description": "<p>Loại hợp đồng.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>Mã phòng ban</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dependent_info",
            "description": "<p>Thông tin giảm trừ gia cảnh.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Mã thiết bị.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emp_code",
            "description": "<p>Mã nhân viên.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "emp_name",
            "description": "<p>Tên nhân viên.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "job_title",
            "description": "<p>Vị trí công việc.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mstcn",
            "description": "<p>Mã số thuế.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Số điện thoại.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type_emp",
            "description": "<p>Loại nhân viên.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ver_code",
            "description": "<p>Phiên bản ứng dụng.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_emp_info</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_id_ung_vien",
    "title": "Link làm bài TEST",
    "name": "get_id_ung_vien",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"pnc.PDX@fpt.net\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"bhagdgdajsdbasdhjas\",\n    \"iv\"    : \"dsahdjwqkdkasbqwkbd\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"0q9qesmWzVxeb/xHGk2EQRfNbCUsbxG+Dxxxxxx\"\n}\nNội dung sau khi giải mã:\n{\n    \"id_ung_vien\": \"11\",\n    \"link_bai_test\": \"mytinpnc.vn/api/auth/tuyendung/mobile-test/11\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id_ung_vien",
            "description": "<p>ID ứng viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link_bai_test",
            "description": "<p>Link bài test</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_id_ung_vien</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_info_ung_vien",
    "title": "Thông tin ứng viên",
    "name": "get_info_ung_vien",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"pnc.pdx@fpt.net\",\n    \"iv\"    : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n     \"msg\": \"2qRT4aSz1fipV9VkwdIss04jJeYYRPCbMIG4lxu6mlcX/zFfS14Axxxxxx\"\n}\nNoi dung sau khi giai ma:\n{\n  \"kinh_nghiem_lam_viec\": [\n    {\n      \"ly_do_nghi_viec\": \"1\",\n      \"mo_ta_ngan_gon_cong_viec\": \"1\",\n      \"muc_luong\": \"1\",\n      \"ten_cong_ty\": \"pnc\",\n      \"thoi_gian\": \"1\",\n      \"vi_tri\": \"1\"\n    }\n  ],\n  \"thong_tin_ca_nhan\": {\n    \"cmnd\": {\n      \"cmnd_hoac_can_cuoc\": \"CMND\",\n      \"ngay_cap\": \"05/10/2020\",\n      \"noi_cap\": \"T\\u1ec9nh B\\u1ebfn Tre\",\n      \"so_cmnd_cu\": \"\",\n      \"so_cmnd_the_can_cuoc\": \"321588044\"\n    },\n    \"dia_chi_tam_tru\": {\n      \"dia_chi_tam_tru\": \"123 456\",\n      \"phuong_xa_tam_tru\": \"Ph\\u01b0\\u1eddng T\\u00e2n Quy\",\n      \"quan_huyen_tam_tru\": \"Qu\\u1eadn 7\",\n      \"tinh_thanh_tam_tru\": \"Th\\u00e0nh Ph\\u1ed1 H\\u1ed3 Ch\\u00ed Minh\"\n    },\n    \"fpt\": {\n      \"da_tung_lam_viec_fpt\": \"C\\u00f3\",\n      \"ten_cty_da_lam\": \"PNC Telecom\",\n      \"thoi_gian\": \"\"\n    },\n    \"ho_khau_cmnd\": {\n      \"dia_chi_theo_cmnd\": \"123 456\",\n      \"phuong_xa_theo_cmnd\": \"Ph\\u01b0\\u1eddng 7\",\n      \"quan_huyen_theo_cmnd\": \"Th\\u00e0nh Ph\\u1ed1 B\\u1ebfn Tre\",\n      \"tinh_thanh_theo_cmnd\": \"T\\u1ec9nh B\\u1ebfn Tre\"\n    },\n    \"info\": {\n      \"can_nang\": \"58\",\n      \"chieu_cao\": \"168\",\n      \"dan_toc\": \"Kinh\",\n      \"gioi_tinh\": \"Nam\",\n      \"ho_va_ten\": \"Vo Chau Anh Khoa\",\n      \"ngay_sinh\": \"12/09/1998\",\n      \"noi_sinh\": \"T\\u1ec9nh B\\u1ebfn Tre\",\n      \"sdt\": \"0987132756\",\n      \"tinh_trang_hon_nhan\": \"\\u0110\\u1ed9c th\\u00e2n\"\n    }\n  },\n  \"thong_tin_cong_viec\": {\n    \"biet_thong_tin_qua\": \"Gi\\u1edbi thi\\u1ec7u n\\u1ed9i b\\u1ed9\",\n    \"email_nguoi_gioi_thieu\": \"vochauanhkhoa@gmail.com\",\n    \"ho_ten_nguoi_gioi_thieu\": \"khoa\",\n    \"ngay_co_the_di_lam\": \"05/10/2020\",\n    \"thu_nhap_gan_nhat\": \">20.000.000\",\n    \"thu_nhap_mong_muon\": \">20.000.000\",\n    \"vi_tri_cong_viec\": \"Nh\\u00e2n vi\\u00ean tuy\\u1ec3n d\\u1ee5ng \"\n  },\n  \"trinh_do_hoc_van\": {\n    \"bang_cap\": [\n      {\n        \"bang_cap\": \"\\u0110\\u1ea1i h\\u1ecdc\",\n        \"chuyen_nganh\": \"\\u0110i\\u1ec7n - \\u0110i\\u1ec7n t\\u1eed\",\n        \"nam_tot_nghiep\": \"2020\",\n        \"truong\": \"\\u0110\\u1ea1i H\\u1ecdc B\\u00e1ch Khoa TP.HCM\",\n        \"xep_loai\": \"Gi\\u1ecfi\"\n      },\n      {\n        \"bang_cap\": \"Ti\\u1ebfn s\\u0129\",\n        \"chuyen_nganh\": \"Khoa h\\u1ecdc m\\u00e1y t\\u00ednh\",\n        \"nam_tot_nghiep\": \"2025\",\n        \"truong\": \"\\u0110\\u1ea1i H\\u1ecdc B\\u00e1ch Khoa TP.HCM\",\n        \"xep_loai\": \"Gi\\u1ecfi\"\n      }\n    ],\n    \"chung_chi\": [\n      {\n        \"diem_xep_loai\": \"1\",\n        \"noi_dao_tao\": \"1\",\n        \"ten_chung_chi\": \"khoa\",\n        \"thoi_gian\": \"1\"\n      }\n    ],\n    \"ngoai_ngu\": [\n      {\n        \"chung_chi\": \"toeic 990\",\n        \"doc\": \"100\",\n        \"nghe\": \"100\",\n        \"ngoai_ngu\": \"anh\",\n        \"noi\": \"100\",\n        \"viet\": \"100\"\n      },\n      {\n        \"chung_chi\": \"ielts 9.0\",\n        \"doc\": \"100\",\n        \"nghe\": \"100\",\n        \"ngoai_ngu\": \"l\\u00e0o\",\n        \"noi\": \"100\",\n        \"viet\": \"100\"\n      }\n    ]\n  },\n  \"xac_minh\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "kinh_nghiem_lam_viec",
            "description": "<p>Kinh nghiệm làm việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.ly_do_nghi_viec",
            "description": "<p>Lý do nghỉ việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.mo_ta_ngan_gon_cong_viec",
            "description": "<p>Mô tả ngắn gọn công việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.muc_luong",
            "description": "<p>Mức lương</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.ten_cong_ty",
            "description": "<p>Tên công ty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.thoi_gian",
            "description": "<p>Thời gian</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.vi_tri",
            "description": "<p>Vị trí</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "thong_tin_ca_nhan",
            "description": "<p>Thông tin cá nhân</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd",
            "description": "<p>Chứng minh nhân dân</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.cmnd_hoac_can_cuoc",
            "description": "<p>CMND hoặc Căn cước</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.ngay_cap",
            "description": "<p>Ngày cấp (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.noi_cap",
            "description": "<p>Nơi cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.so_cmnd_cu",
            "description": "<p>Số CMND cũ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.so_cmnd_the_can_cuoc",
            "description": "<p>Số CMND thẻ căn cước</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru",
            "description": "<p>Địa chỉ tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.dia_chi_tam_tru",
            "description": "<p>Địa chỉ tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.phuong_xa_tam_tru",
            "description": "<p>Phường xã tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.quan_huyen_tam_tru",
            "description": "<p>Quận huyện tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.tinh_thanh_tam_tru",
            "description": "<p>Tỉnh thành tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt",
            "description": "<p>FPT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt.da_tung_lam_viec_fpt",
            "description": "<p>Đã từng làm việc FPT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt.ten_cty_da_lam",
            "description": "<p>Tên công ty đã làm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt.thoi_gian",
            "description": "<p>Thời gian</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd",
            "description": "<p>Hộ khẩu CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.dia_chi_theo_cmnd",
            "description": "<p>Địa chỉ theo CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.phuong_xa_theo_cmnd",
            "description": "<p>Phường xã theo CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.quan_huyen_theo_cmnd",
            "description": "<p>Quận huyện theo CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.tinh_thanh_theo_cmnd",
            "description": "<p>Tỉnh thành theo CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.info",
            "description": "<p>Thông tin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.can_nang",
            "description": "<p>Cân nặng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.chieu_cao",
            "description": "<p>Chiều cao</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.dan_toc",
            "description": "<p>Dân tộc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.gioi_tinh",
            "description": "<p>Giới tính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.ho_va_ten",
            "description": "<p>Họ và tên</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.ngay_sinh",
            "description": "<p>Ngày sinh (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.noi_sinh",
            "description": "<p>Nơi sinh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.sdt",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.tinh_trang_hon_nhan",
            "description": "<p>Tình trạng hôn nhân</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_cong_viec",
            "description": "<p>Thông tin công việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.biet_thong_tin_qua",
            "description": "<p>Biết thông tin qua</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.email_nguoi_gioi_thieu",
            "description": "<p>Email người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.ho_ten_nguoi_gioi_thieu",
            "description": "<p>Họ tên người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.ngay_co_the_di_lam",
            "description": "<p>Ngày có thể đi làm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.thu_nhap_gan_nhat",
            "description": "<p>Thu nhập gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.thu_nhap_mong_muon",
            "description": "<p>Thu nhập mong muốn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.vi_tri_cong_viec",
            "description": "<p>Vị trí công việc</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "trinh_do_hoc_van",
            "description": "<p>Trình độ học vấn</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap",
            "description": "<p>Bằng cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.bang_cap",
            "description": "<p>Bằng cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.chuyen_nganh",
            "description": "<p>Chuyên ngành</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.nam_tot_nghiep",
            "description": "<p>Năm tốt nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.truong",
            "description": "<p>Trường</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.xep_loai",
            "description": "<p>Xếp loại</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi",
            "description": "<p>Chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.diem_xep_loai",
            "description": "<p>Điểm xếp loại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.noi_dao_tao",
            "description": "<p>Nơi đào tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.ten_chung_chi",
            "description": "<p>Tên chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.thoi_gian",
            "description": "<p>Thời gian</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu",
            "description": "<p>Ngoại ngữ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.chung_chi",
            "description": "<p>Chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.doc",
            "description": "<p>Đọc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.nghe",
            "description": "<p>Nghe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.ngoai_ngu",
            "description": "<p>Ngoại ngữ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.noi",
            "description": "<p>Nói</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.viet",
            "description": "<p>Viết</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "xac_minh",
            "description": "<p>Xác minh</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_info_ung_vien</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/get_scm_info",
    "title": "Thông tin công cụ dụng cụ",
    "name": "get_scm_info",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"datpt4@vienthongtin.com\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"Kjskdksfhkdsjfdsfjdk\",\n    \"iv\"    : \"kdjkdfkwkfncskckd\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"9wosJqwZ0EFPY2Abfoj6dd20QXsphSrxYZ1my62fMc9xxxxx\"\n}\nNội dung sau khi giải mã:\n{\n  \"BHLD\": [\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000209\",\n      \"item_name\": \"Gi\\u1ea7y ASIA\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 \\u0110\\u00f4i\",\n      \"size_name\": \"43\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"\\u0110\\u00f4i\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000340\",\n      \"item_name\": \"D\\u00e2y an to\\u00e0n A3\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    }\n  ],\n  \"CCDC_main\": [\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000342\",\n      \"item_name\": \"T\\u00fai \\u0111\\u1ef1ng \\u0111\\u1ed3 lo\\u1ea1i to\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000684\",\n      \"item_name\": \"K\\u00ecm b\\u1ea5m \\u0111\\u1ea7u m\\u1ea1ng RJ45\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 C\\u00e1i\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"C\\u00e1i\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20001565\",\n      \"item_name\": \"Thang Nh\\u00f4m R\\u00fat 3,8m\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 B\\u1ed9\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"B\\u1ed9\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20016513\",\n      \"item_name\": \"D\\u1ee5ng c\\u1ee5 tu\\u1ed1t s\\u1ee3i quang, c\\u1eaft \\u1ed1ng l\\u1ecfng CFS-2\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20019094\",\n      \"item_name\": \"RY-C500 Optical Fiber Cleaver 82055900\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20019095\",\n      \"item_name\": \"RY-M3207B Optical Power Meter (70dBm~+10dBm)\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"03/02/2020\",\n      \"item_code\": \"20019100\",\n      \"item_name\": \"T\\u00fai \\u0111\\u1ef1ng \\u0111\\u1ed3 lo\\u1ea1i nh\\u1ecf\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 C\\u00e1i\",\n      \"size_name\": \"None\",\n      \"start_date\": \"03/07/2019\",\n      \"unit_name\": \"C\\u00e1i\",\n      \"zone_name\": \"\\u0110ang SD\"\n    }\n  ],\n  \"CCDC_other\": [\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000061\",\n      \"item_name\": \"K\\u00ecm \\u0111i\\u1ec7n 7\\\"\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000306\",\n      \"item_name\": \"Dao r\\u1ecdc\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000339\",\n      \"item_name\": \"G\\u0103ng tr\\u00e1ng nh\\u1ef1a h\\u1ea1t \\u0110L\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 \\u0110\\u00f4i\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"\\u0110\\u00f4i\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20000346\",\n      \"item_name\": \"B\\u00fat \\u0111i\\u1ec7n\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 C\\u00e1i\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"C\\u00e1i\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20015725\",\n      \"item_name\": \"T\\u00f4 v\\u00edt 2 \\u0111\\u1ea7u to\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20020498\",\n      \"item_name\": \"H\\u1ed9p test m\\u1ea1ng RJ45\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20024094\",\n      \"item_name\": \"Gi\\u00e1 ra c\\u00e1p lo\\u1ea1i nh\\u1ecf\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20024316\",\n      \"item_name\": \"K\\u00ecm c\\u1eaft 8\\\" Licota\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20024509\",\n      \"item_name\": \"Qu\\u1ea7n \\u00e1o b\\u1ea3o h\\u1ed9 lao \\u0111\\u1ed9ng \\u2013 c\\u00f3 logo TIN\",\n      \"quantity_now\": \"2\",\n      \"quantity_now_unit\": \"2 B\\u1ed9\",\n      \"size_name\": \"XL\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"B\\u1ed9\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20024511\",\n      \"item_name\": \"M\\u0169 b\\u1ea3o hi\\u1ec3m n\\u1eeda \\u0111\\u1ea7u c\\u00f3 in logo TIN\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    },\n    {\n      \"CommentCDCD\": \"None\",\n      \"DateofControl\": \"None\",\n      \"expire_date\": \"None\",\n      \"item_code\": \"20027545\",\n      \"item_name\": \"S\\u00e0o \\u0111i c\\u00e1p d\\u00e0i 5,6m (version 2)\",\n      \"quantity_now\": \"1\",\n      \"quantity_now_unit\": \"1 Chi\\u1ebfc\",\n      \"size_name\": \"None\",\n      \"start_date\": \"None\",\n      \"unit_name\": \"Chi\\u1ebfc\",\n      \"zone_name\": \"\\u0110ang SD\"\n    }\n  ],\n  \"sum_BHLD\": 2,\n  \"sum_item_CCDC_main\": 7,\n  \"sum_item_CCDC_other\": 11\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "BHLD",
            "description": "<p>Danh sách dụng cụ bảo hộ lao động</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.CommentCDCD",
            "description": "<p>Ghi chú công cụ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.DateofControl",
            "description": "<p>Ngày kiểm soát (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.expire_date",
            "description": "<p>Ngày hết hạn (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.item_code",
            "description": "<p>Mã hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.item_name",
            "description": "<p>Tên hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.quanlity_now",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.quanlity_now_unit",
            "description": "<p>Số lượng đơn vị</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.size_name",
            "description": "<p>Size</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.start_date",
            "description": "<p>Ngày cấp (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.unit_name",
            "description": "<p>Đơn vị tính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BHLD.zone_name",
            "description": "<p>Tình trạng</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "CCDC_main",
            "description": "<p>Công cụ chính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.CommentCDCD",
            "description": "<p>Ghi chú công cụ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.DateofControl",
            "description": "<p>Ngày kiểm soát (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.expire_date",
            "description": "<p>Ngày hết hạn (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.item_code",
            "description": "<p>Mã hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.item_name",
            "description": "<p>Tên hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.quanlity_now",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.quanlity_now_unit",
            "description": "<p>Số lượng đơn vị</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.size_name",
            "description": "<p>Size</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.start_date",
            "description": "<p>Ngày cấp (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.unit_name",
            "description": "<p>Đơn vị tính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_main.zone_name",
            "description": "<p>Tình trạng</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "CCDC_other",
            "description": "<p>Công cụ khác</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.CommentCDCD",
            "description": "<p>hi chú công cụ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.DateofControl",
            "description": "<p>Ngày kiểm soát (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.expire_date",
            "description": "<p>Ngày hết hạn (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.item_code",
            "description": "<p>Mã hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.item_name",
            "description": "<p>Tên hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.quanlity_now",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.quanlity_now_unit",
            "description": "<p>Số lượng đơn vị</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.size_name",
            "description": "<p>Size</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.start_date",
            "description": "<p>Ngày cấp (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.unit_name",
            "description": "<p>Đơn vị tính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CCDC_other.zone_name",
            "description": "<p>Tình trạng</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sum_BHLD",
            "description": "<p>Tổng số lượng bảo hộ lao động</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sum_item_CCDC_main",
            "description": "<p>Tổng số lượng công cụ chính</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "sum_item_CCDC_other",
            "description": "<p>Tổng số lượng công cụ khác</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/get_scm_info</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/ho_so_ung_vien",
    "title": "Hồ sơ ứng viên",
    "name": "ho_so_ung_vien",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ho_so",
            "description": "<p>Hồ Sơ</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"qIO5NxnzKPNFrcmMgwnVMg==\",\n    \"ho_so\" : \"6ZZWSRpp4YW5/qpvmyCzvvTGSQDcenafGR4tksn4pYeecApZbzh3mMOLX4s7wQIxmRs6yx2YTCHtfFD7cmpSvKVOQojzw0TT9eUjw9cLNyM67lejJGVw7RPrmgGjR3P2MdelK6YQfWOQltNa3lMaToRSHgwDk+IXYpBehtDW4VxtBpoXYhcwrnnYAuKB6aGywMWS3H/+N+guxKZ/1MeGqU+Ywi/r9WkOUl7JrJb5r4ZstzGov91lMB5uS6TXaBqwED4RGJFyZsH3wxFmvB8iTeR5QMKGJaBTl4TpuJopeSv0dRJIZfSg5bHkL4qMiz40WQGRsPoPcEDfP9PUmAv4FGPrvwlwWFJbS81SBHfQ2jhIzz/13Zi022cmKWcoPu1QvtdkAjCeBzgWOvQltU5JTWZJfrl+zgTXvxlvs4wWdM0VAzd3Z2/1/JY7Q54I1E27EOYoLRk6wEb13zyfcPS0gfrUQ3DEu4PyV4iieLBpNTrd/GUZEH9Wuhz4Rg2PQFz/C8yq1WMSiF6SQ0h3gmJejKgbkXQvxPIdYrPP43MYdfec5BG3IjqRR/fH1oQAN0X60dyZmitFtVNkfyYiDRVxsmh0LBsZyZ7gaZJcABVCNwigNivP5R0XZEsaH1aq0zQvodCXfSN7iiqXIeBH1NR8oWKvOCj6TE9N1YkQDGcrvxUYPLMmGtmtuif681xwBo4BUI2mf+WQgGOYi8T5zq5amhis3Ce9Q4z2+MzbF2QWcGOVCoF8Hq68VM58eTD0we8RPlegYjalz+rOcbgqR2+FtzyjdGpoIRL8B2ImHvB55o28A8q/TtrD4swZed4eYLkB40VSGKeJmB20wD48mKJ9m2K+6zje1SxJbC4IUpwyiM1emhfhU/taT8ta903O1ge+5swJz8g/WHNzuVPfuaNkr0Ps1eTS/0MmBCXeZDdQ2xSQpiAQDVQ13ErzfjMmazxW1SYyvaRNGp0MAZXdx+rwK6wBrzIww9aJ24xch2cF+3pJUaRxBJSptRmBrow8WfLCswimnPkAwtMKTKFqvD+Ml+3AaYl6d1nemYFOgDZbh8wzrl3GNmTjb8Ifiij5YiMJFro27f6QqkI9RIZR0tAqIqSRWyeCkvKbtLIt5L1Qi188OAtFZE2EzJGR5KeVUn+xoYsrCUxRD7l74tLkqoJ3m8bQlLrDODko/M+pVQVQP0ysQYOZYzLBVefx/5MwUyW5kwa7bCtEFpAPMda8xMe7iWvue6J1RGayJR06R4I1ivcML9DKtAFFuxXjAOgFf98GbY1xQm9cjiEk/tHoxaTZqu1yZlKwUNZfAxpT/3ot/gl6rSKidxzxtqGlS5phqyhdfPQINzpuHSHbHSGwGW4xYr44lWQlIxsK7gVYbXcazLjw9NNQTV1a5zUfNIY6ajntjE+pia27r0leUBKEZBKDgvZJC0nZPNkMevTChe48UzG1wucUTCVJcv8QuYnzOKcJMkaaLbckV59Nes8qSp1f5qPZFsVszp2xHkDdD37Bk+bMftBXcDRn8dvnsFIR5jNWj173P+pVhx85Pn4Ikoc6NXaL1K4YMQbVEqtdjyY0vHi5QDyr74/7x0Vzn61caKLYneuyY1WTUsQr5xvgwrJ0UOCfkWqNBufDR2EggvRE4ZWvbo/qOKuxzfVFso7A3ag5KWn7OBZFID39DoqGmlmdBVLxt43kaACh2lAOUZbccfJ6VN+Md2QW9/ybPQ41bmO4ZHvwwK8otaB5ST60xO+h8h9nowB8M2Da33r++B+2q6DTwP3lr8spDQtjAjIxXb97oSDhnTEJMZMfoHLr7nozXv0OjHwww+yNaWx7fVRluP+39uvSNZgtf0gvo8fjupvO37KLEoKG+jZ0B6PJPvlNh5NMeZZyriQ/LCMQg5oCwR2aZ1W9L1hVjJQ6CHQR9RAxApf76pfGSLDPDWvs/CCHMMKQcyQ2TnGBl829HYwsvty7VNQO/iHwa27dHjkFa244Cabd9QoUHDi5o5HbGBRanhAs0TxVtSXQeAbq0hD9Sv8kCCHyTtqcWH8MHHdeExR3LvCx+CigBLL36Tuax2kt8Sqy8w5CaO2A24hCjsYrGEGfL9UsiZ191gGU3j7ub24h5w8c6FDNFI8r7GXeIiJNxFYaKD/BpNG8zVPaCdjNfiMNbuscNa0kJr/SKXgzhZlJX6AWdKon1CiVovbI71NfdQ==\"\n    \"iv\"    : \"xzczepqmlegxpdnq\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"Ua5aBYHdj1EchS6JUFNA25xxxxx\"\n}\nNội dung sau khi giải mã:\n{\n  'thong_tin_ca_nhan': {\n    'info': {\n      'ho_va_ten': 'asdf',\n      'gioi_tinh': 'Nam',\n      'ngay_sinh': '01/10/2020',\n      'noi_sinh': 'Tỉnh Bà Rịa - Vũng Tàu',\n      'dan_toc': 'Khmer',\n      'chieu_cao': '123',\n      'can_nang': '456',\n      'tinh_trang_hon_nhan': 'Độc thân',\n      'sdt': '1234544565'\n    },\n    'ho_khau_cmnd': {\n      'tinh_thanh': 'Tỉnh Bà Rịa - Vũng Tàu',\n      'quan_huyen': 'Huyện Đất Đỏ',\n      'phuong_xa': 'Xã Láng Dài',\n      'dia_chi': '111123'\n    },\n    'dia_chi_tam_tru': {\n      'tinh_thanh': 'Tỉnh An Giang',\n      'quan_huyen': 'Huyện Thoại Sơn',\n      'phuong_xa': 'Xã Mỹ Phú Đông',\n      'dia_chi': '123123'\n    },\n    'cmnd': {\n      'status': 'CCCD',\n      'so_cmnd_cu': '1231231',\n      'ngay_cap': '01/10/2020',\n      'noi_cap': 'Tỉnh Bình Thuận',\n      'so_cmnd_the_can_cuoc': '113213'\n    },\n    'fpt': {\n      'da_tung_lam_viec_fpt': 'Có',\n      'ten_cty_da_lam': 'Synnex FPT'\n    }\n  },\n  'thong_tin_cong_viec': {\n    'vi_tri_ung_tuyen': 'Nhân viên thanh tra, giám sát',\n    'ngay_di_lam': '01/10/2020',\n    'thu_nhap_gan_nhat': '0.000.000',\n    'thu_nhap_mong_muon': '0.000.000',\n    'biet_thong_tin_qua': 'Giới thiệu nội bộ',\n    'ho_ten_nguoi_gioi_thieu': '1231',\n    'email_nguoi_gioi_thieu': 'meo meo'\n  },\n  'trinh_do_hoc_van': {\n    'bang_cap': [\n      {\n        'truong': 'Cao Đẳng Bách Khoa Hà Nội',\n        'nam_tot_nghiep': '',\n        'chuyen_nganh': 'Chế tạo máy',\n        'bang_cap': 'THPT',\n        'xep_loai': 'Giỏi'\n      }\n    ],\n    'ngoai_ngu': [\n      {\n        'ngoai_ngu': '',\n        'nghe': '',\n        'noi': '',\n        'doc': '',\n        'viet': '',\n        'chung_chi': ''\n      }\n    ],\n    'chung_chi': [\n      {\n        'ten_chung_chi': '21',\n        'thoi_gian': '21',\n        'noi_dao_tao': '21',\n        'diem_xep_loai': '12'\n      }\n    ]\n  },\n  'kinh_nghiem_lam_viec': [\n    {\n      'thoi_gian': '',\n      'ten_cong_ty': '',\n      'vi_tri': '',\n      'muc_luong': '',\n      'ly_do_nghi_viec': '',\n      'mo_ta_ngan_gon_cong_viec': ''\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "thong_tin_ca_nhan",
            "description": "<p>Thông tin cá nhân</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.info",
            "description": "<p>Thông tin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.ho_va_ten",
            "description": "<p>Họ và tên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.gioi_tinh",
            "description": "<p>Giới tính</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.ngay_sinh",
            "description": "<p>Ngày sinh (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.noi_sinh",
            "description": "<p>Nơi sinh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.dan_toc",
            "description": "<p>Dân tộc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.chieu_cao",
            "description": "<p>Chiều cao</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.can_nang",
            "description": "<p>Cân nặng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.tinh_trang_hon_nhan",
            "description": "<p>Tình trạng hôn nhân</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.info.sdt",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd",
            "description": "<p>Hộ khẩu CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.tinh_thanh",
            "description": "<p>Tỉnh thành</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.quan_huyen",
            "description": "<p>Quận huyện</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.phuong_xa",
            "description": "<p>Phường xã</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.ho_khau_cmnd.dia_chi",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru",
            "description": "<p>Địa chỉ tạm trú</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.tinh_thanh",
            "description": "<p>Tỉnh thành</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.quan_huyen",
            "description": "<p>Quận huyện</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.phuong_xa",
            "description": "<p>Phường xã</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.dia_chi_tam_tru.dia_chi",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd",
            "description": "<p>CMND</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.so_cmnd_cu",
            "description": "<p>Số CMND cũ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.ngay_cap",
            "description": "<p>Ngày cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.noi_cap",
            "description": "<p>Nơi cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.cmnd.so_cmnd_the_can_cuoc",
            "description": "<p>Số CMND thẻ căn cước</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt",
            "description": "<p>FPT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt.da_tung_lam_viec_fpt",
            "description": "<p>Đã từng làm việc FPT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_ca_nhan.fpt.ten_cty_da_lam",
            "description": "<p>Tên công ty đã làm</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "thong_tin_cong_viec",
            "description": "<p>Thông tin công việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.vi_tri_ung_tuyen",
            "description": "<p>Vị trí ứng tuyển</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.ngay_di_lam",
            "description": "<p>Ngày đi làm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.thu_nhap_gan_nhat",
            "description": "<p>Thu nhập gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.thu_nhap_mong_muon",
            "description": "<p>Thu nhập mong muốn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.biet_thong_tin_qua",
            "description": "<p>Biết thông tin qua</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.ho_ten_nguoi_gioi_thieu",
            "description": "<p>Thông tin người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thong_tin_cong_viec.email_nguoi_gioi_thieu",
            "description": "<p>Email người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "trinh_do_hoc_van",
            "description": "<p>Trình độ học vấn</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap",
            "description": "<p>Bằng cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.truong",
            "description": "<p>Trường</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.nam_tot_nghiep",
            "description": "<p>Năm tốt nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.chuyen_nganh",
            "description": "<p>Chuyên ngành</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.bang_cap",
            "description": "<p>Bằng cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.bang_cap.xep_loai",
            "description": "<p>Xếp loại</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu",
            "description": "<p>Ngoại ngữ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.ngoai_ngu",
            "description": "<p>NGoại ngữ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.nghe",
            "description": "<p>Nghe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.doc",
            "description": "<p>Đọc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.viet",
            "description": "<p>Viết</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.ngoai_ngu.chung_chi",
            "description": "<p>Chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi",
            "description": "<p>Chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.ten_chung_chi",
            "description": "<p>Tên chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.thoi_gian",
            "description": "<p>Thời gian</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.noi_dao_tao",
            "description": "<p>Nơi đào tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "trinh_do_hoc_van.chung_chi.diem_xep_loai",
            "description": "<p>Điểm xếp loại</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "kinh_nghiem_lam_viec",
            "description": "<p>Kinh nghiệm làm việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.thoi_gian",
            "description": "<p>Thời gian</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.ten_cong_ty",
            "description": "<p>Tên công ty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.vi_tri",
            "description": "<p>Vị trí</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.muc_luong",
            "description": "<p>Mức lương</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.ly_do_nghi_viec",
            "description": "<p>Lý do nghỉ việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kinh_nghiem_lam_viec.mo_ta_ngan_gon_cong_viec",
            "description": "<p>Mô tả ngắn gọn công việc</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/ho_so_ung_vien</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/ket_qua_cong_viec",
    "title": "Kết quả công việc",
    "name": "ket_qua_cong_viec",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_from",
            "description": "<p>Ngày bắt đầu (Format yyyy-mm-dd)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_to",
            "description": "<p>Ngày kết thúc (Format yyyy-mm-dd)</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"date_from\": \"2020-08-01\",\n    \"date_to\": \"2020-10-21\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"lomkhaskdakdadadsad\",\n    \"date_from\": \"mkakasdjwkqdnamd\",\n    \"date_to\": \"clalcsaodjasdkakdnas\",\n    \"iv\"    : \"dksajdkwqdlnacna\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"Myn8FHknjOnnhswr0WLajEWZg7Aq4ZDENvxxxx\"\n}\nNội dung sau khi giải mã:\n{\n  \"account_name\": \"PNC16.KHOANV2\",\n  \"che_tai\": [\n    {\n      \"contract\": \"SGH001234\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"16\"\n    },\n    {\n      \"contract\": \"SGH001126\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"17\"\n    },\n    {\n      \"contract\": \"SGH001234\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"18\"\n    },\n    {\n      \"contract\": \"SGH001126\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"19\"\n    },\n    {\n      \"contract\": \"SGH001126\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"23\"\n    },\n    {\n      \"contract\": \"SGH001234\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"24\"\n    },\n    {\n      \"contract\": \"SGH001126\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"25\"\n    },\n    {\n      \"contract\": \"SGH001234\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"28\"\n    },\n    {\n      \"contract\": \"SGH001126\",\n      \"date_check\": \"17/09/2020\",\n      \"deadline\": \"25/09/2020\",\n      \"error_main\": \"Sai quy tr\\u00ecnh quy \\u0111\\u1ecbnh\",\n      \"expected_punishment\": \"100\",\n      \"ptq_id\": \"29\"\n    }\n  ],\n  \"cl_lap\": {\n    \"so_luong\": 7,\n    \"ti_le\": 2.47\n  },\n  \"clps_7n_bt\": {\n    \"so_luong\": 10,\n    \"ti_le\": 3.41\n  },\n  \"clps_7n_tk\": {\n    \"so_luong\": 10,\n    \"ti_le\": 5.62\n  },\n  \"csat_dv_bt\": {\n\n  },\n  \"csat_dv_tk\": {\n\n  },\n  \"csat_nv_bt\": {\n    \"Point_1\": 0,\n    \"Point_2\": 0,\n    \"Point_3\": 2,\n    \"Point_4\": 19,\n    \"Point_5\": 18\n  },\n  \"csat_nv_tk\": {\n    \"Point_1\": 0,\n    \"Point_2\": 0,\n    \"Point_3\": 3,\n    \"Point_4\": 47,\n    \"Point_5\": 3\n  },\n  \"csat_tb_dv\": \"N/A\",\n  \"csat_tb_nv\": \"4.17\",\n  \"dung_hen_tk_bt\": {\n    \"Psum_ontime_BT\": 85.67,\n    \"Psum_ontime_TK\": 96.63,\n    \"Tsum_BT\": 293,\n    \"Tsum_TK\": 178\n  },\n  \"tgxl_tb\": {\n    \"bt_lg\": \"N/A\",\n    \"bt_vl\": \"N/A\",\n    \"rating\": \"N/A\",\n    \"tk_box\": \"N/A\",\n    \"tk_net\": \"N/A\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "che_tai",
            "description": "<p>Chế tài</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "che_tai.contract",
            "description": "<p>Số hợp đồng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "che_tai.date_check",
            "description": "<p>Ngày kiểm tra(Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "che_tai.deadline",
            "description": "<p>Hạn giải trình (Format D-M-Y)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "che_tai.error_main",
            "description": "<p>Lỗi chính</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "che_tai.expected_punishment",
            "description": "<p>Mức chế tài</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "che_tai.ptq_id",
            "description": "<p>Mã id</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "cl_lap",
            "description": "<p>CL lặp</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "cl_lap.so_luong",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "cl_lap.ti_le",
            "description": "<p>Tỉ lệ</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "clps_7n_bt",
            "description": "<p>CLPS7N BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "clps_7n_bt.so_luong",
            "description": "<p>Số lượng CLPS7N BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "clps_7n_bt.ti_le",
            "description": "<p>Tỉ lệ CLPS7N BT</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "clps_7n_tk",
            "description": "<p>CLPS7N TK</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "clps_7n_tk.so_luong",
            "description": "<p>Số lượng CLPS7N TK</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "clps_7n_tk.ti_le",
            "description": "<p>Tỉ lệ CLPS7N TK</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "csat_dv_bt",
            "description": "<p>CSAT dịch vụ BT</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "csat_dv_tk",
            "description": "<p>CSAT dịch vụ TK</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "csat_nv_bt",
            "description": "<p>CSAT NV BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_bt.Point_1",
            "description": "<p>Điểm Point 1</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_bt.Point_2",
            "description": "<p>Điểm Point 2</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_bt.Point_3",
            "description": "<p>Điểm Point 3</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_bt.Point_4",
            "description": "<p>Điểm Point 4</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_bt.Point_5",
            "description": "<p>Điểm Point 5</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "csat_nv_tk",
            "description": "<p>CSAT NT TK</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_tk.Point_1",
            "description": "<p>Điểm Point 1</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_tk.Point_2",
            "description": "<p>Điểm Point 2</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_tk.Point_3",
            "description": "<p>Điểm Point 3</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_tk.Point_4",
            "description": "<p>Điểm Point 4</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "csat_nv_tk.Point_5",
            "description": "<p>Điểm Point 5</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "csat_nv_tk.csat_tb_dv",
            "description": "<p>CSAT TB DV</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "csat_nv_tk.csat_tb_nv",
            "description": "<p>CSAT TB NV</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "dung_hen_tk_bt",
            "description": "<p>Đúng hẹn TK BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "dung_hen_tk_bt.Psum_ontime_BT",
            "description": "<p>Tổng điểm đúng hẹn BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "dung_hen_tk_bt.Psum_ontime_TK",
            "description": "<p>Tổng điểm đúng hẹn TK</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dung_hen_tk_bt.Tsum_BT",
            "description": "<p>Tống số lượng BT</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dung_hen_tk_bt.Tsum_TK",
            "description": "<p>tống số lượng TK</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "tgxl_tb",
            "description": "<p>Thời gian xử lý tác vụ TB</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tgxl_tb.bt_lg",
            "description": "<p>BT logic</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tgxl_tb.bt_vl",
            "description": "<p>BT vật lý</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tgxl_tb.rating",
            "description": "<p>Rating</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tgxl_tb.tk_box",
            "description": "<p>TK Box</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tgxl_tb.tk_net",
            "description": "<p>TK Net</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/ket_qua_cong_viec</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/khai_bao_y_te",
    "title": "Khai báo y tế",
    "name": "khai_bao_y_te",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "MBN_account_name",
            "description": "<p>Tài khoản PCTU</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sot",
            "description": "<p>Sốt</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ho_khan",
            "description": "<p>Ho khan</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "kho_tho",
            "description": "<p>Khó thở</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viem_phoi",
            "description": "<p>Viêm phổi</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dau_hong",
            "description": "<p>Đau họng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "met_moi",
            "description": "<p>Mệt mỏi</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "den_vung_dich",
            "description": "<p>Đến vùng dịch</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tiep_xuc_nguoi_nhiem",
            "description": "<p>Tiếp xúc người nhiễm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"MBN_account_name\" : \"HDGTI.TUNGBV3\",\n    \"sot\" : \"0\",\n    \"ho_khan\": \"0\",\n    \"kho_tho\" : \"0\",\n    \"viem_phoi\" : \"0\",\n    \"dau_hong\" : \"0\",\n    \"met_moi\" : \"0\",\n    \"den_vung_dich\": \"0\",\n    \"tiep_xuc_nguoi_nhiem\": \"0\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    Trường họp 1:\n    \"Khai báo y tế thành công\"\n\n    Trường hợp 2: Input email rỗng\n    \"Khai báo y tế thất bại\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Khai báo y tế thành công</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "NOTOK",
            "description": "<p>Khai báo y tế thất bại</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/khai_bao_y_te</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Đăng kí tài khoản",
    "name": "register",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mode",
            "description": "<p>Loại đăng kí</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id_checkin",
            "description": "<p>Mã thiết bị sử dụng diểm danh (nhân viên mới)</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"mode\" : \"register_device\",\n    \"device_id_checkin\": \"358240051111110\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"kldjalskdjslanclasnlshd\",\n    \"mode\" : \"sdkjashkdasc\",\n    \"device_id_checkin\": \"daskjdhkwnacn\",\n    \"iv\"    : \"sdksakdjsakdhask\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"iobOZzRhGmE5+0t45MFE9eQdBjoYPRUx2c5ck4Sp9s1E8LIDJB2FISlrvKkCljuI\"\n}\n\nNội dung sau khi giải mã:\n{\n    \"expired_date\": \"2020-10-27 16:02:55\",\n    \"expired_date_second\": 600,\n    \"msg\": \"OK\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "expired_date",
            "description": "<p>Ngày hết hạn(Format Y-M-D H:M:S)</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "expired_date_second",
            "description": "<p>Số giây hết hạn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Tin nhắn (OK, NOTOK)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/register</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/report_checkin_his_day",
    "title": "Phản hồi thông tin điểm danh",
    "name": "report_checkin_his_day",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Ngày phản hồi (Format Y-M-D)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Nội dung phản hồi</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "coor_emp",
            "description": "<p>Tọa độ vị trí phản hồi</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"date\": \"2020-08-20\",\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"content\": \"kiem tra lai ngay cong\",\n    \"coor_emp\" : \"10.4217602, 105.5056914\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"date\": \"dsaldjlsadlwalc\",\n    \"email\" : \"ljdlsadowqjdcahsadasd\",\n    \"content\": \"daslkdjlkwdnanclkahahdasd\",\n    \"coor_emp\" : \"kldjalsduoiqwndkacnkagq\",\n    \"iv\"    : \"dklasjdklashdlqwhdlalqwh\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"0RZ8pkr4BpCB+6o6x1nVQPnIif3XeOq5Y5Nxxxxx\"\n}\nNội dung sau khi giải mã:\n{\n    \"msg\": \"Gửi phản hồi thành công, kết quả sẽ được kiểm tra lại trong ngày\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Gửi phản hồi thành công, kết quả sẽ được kiểm tra lại trong ngày</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/report_checkin_his_day</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/salary_emp",
    "title": "Thông tin lương nhân viên",
    "name": "salary_emp",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Tháng xem lương(Format mm-yyyy)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"pnc.pdx@fpt.net\",\n    \"date\": \"09-2020\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"lkdalcnlhdasdasxx\",\n    \"date\": \"ldsadioacjqhcacn\",\n    \"iv\"    : \"daklsdjlqwhdlnalckhqlk\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\" : \"DHdHlvzTOPhcprNmCNYiuX7OCDd35P88Qi1ZbzpKCIhvscZz6cIu8W5Dxxxxx\"\n}\nNội dung sau khi giải mã:\n{\n  'announcement': 'Mọi ý kiến về thông tin bảng lương bên dưới, Anh/Chị vui lòng liên hệ Quản lý hoặc gửi email về Phòng Nhân sự (hr1.pnc@fpt.net) để được giải quyết.',\n  'type_salary': 'ĐH',\n  'password': '123456',\n  'accounting_salary': [\n\n  ],\n  'detail_salary': [\n    {\n      'luong_dh_id': 103,\n      'email': 'pnc.pdx@fpt.net',\n      'month': '10-2020',\n      'luong_cung': '1,000,000',\n      'ngay_cong': '23.0',\n      'luong_san_pham': '1,000,006',\n      'ngay_cong_thuc_te': '23.34',\n      'luong_ca_vu_tru_ES': '1,000,004',\n      'luong_ca_vu_ES': '1,000,005',\n      'luong_chat_luong': '0',\n      'clps': '0',\n      'cl_lap': '0',\n      'bao_hanh_chat_luong': '0',\n      'do_hai_long_KH': '1,000,010',\n      'phu_cap': '1,000,011',\n      'che_tai': '1,000,012',\n      'thu_chi_khac': '1,000,013',\n      'bu_tru_luong_thang_t_1': '1,000,014',\n      'khen_thuong': '1,000,015',\n      'cac_khoan_ho_tro_khac': '1,000,016',\n      'luong_san_pham_khac': '1,000,017',\n      'hoa_hong_ban_hang': '1,000,018',\n      'luong_thu_cuoc_khong_chuyen': '1,000,019'\n    }\n  ],\n  'realtime_salary': {\n\n  },\n  'type_salary2': 'PNC'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "announcement",
            "description": "<p>Thông báo ghi chú đầu mối tương tác</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type_salary",
            "description": "<p>Loại lương nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Thông tin mật khẩu xem lương</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "accounting_salary",
            "description": "<p>Thông tin lương hạch toán</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "detail_salary",
            "description": "<p>Chi tiết lương</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "detail_salary.luong_dh_id",
            "description": "<p>id lương</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.bao_hanh_chat_luong",
            "description": "<p>Bảo hành chất lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.bu_tru_luong_thang_t_1",
            "description": "<p>Bù trừ lương tháng t-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.cac_khoan_ho_tro_khac",
            "description": "<p>Các khoản hỗ trợ khác</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.che_tai",
            "description": "<p>Chế tài</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.cl_lap",
            "description": "<p>CL lặp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.clps",
            "description": "<p>CL phát sinh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.do_hai_long_KH",
            "description": "<p>Độ hài lòng KH</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.hoa_hong_ban_hang",
            "description": "<p>Hoa hồng bán hàng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.khen_thuong",
            "description": "<p>Khen thưởng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_ca_vu_ES",
            "description": "<p>Lương ca vụ ES</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_ca_vu_tru_ES",
            "description": "<p>Lương ca vụ trừ ES</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_chat_luong",
            "description": "<p>Lương chất lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_cung",
            "description": "<p>Lương cứng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_san_pham",
            "description": "<p>Lương sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_san_pham_khac",
            "description": "<p>Lương sản phẩm khác</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.luong_thu_cuoc_khong_chuyen",
            "description": "<p>Lương thu cước không chuyên</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "detail_salary.month",
            "description": "<p>Tháng lương (Format MM-YYYY)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.ngay_cong",
            "description": "<p>Ngày công chuẩn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.ngay_cong_thuc_te",
            "description": "<p>Ngày công thực tế</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.phu_cap",
            "description": "<p>Phụ cấp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "detail_salary.thu_chi_khac",
            "description": "<p>Thu chi khác</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "realtime_salary",
            "description": "<p>Lương realtime</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type_salary2",
            "description": "<p>Loại lương realtime (TIN hoặc PNC)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/salary_emp</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/tin_tuc",
    "title": "Tin tức - Sự kiện",
    "name": "tin_tuc",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_imei",
            "description": "<p>Imei thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id",
            "description": "<p>Mã thiết bị</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\" : \"phuongnam.nipt@fpt.net\",\n    \"device_imei\": \"355228083344570\",\n    \"device_id\": \"1ade30cbf6632e27\",\n    \"iv\"    : key tự sinh\n}\n\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\" : \"sdlsanalcnlwnlasd\",\n    \"device_imei\": \"dlasdjaslhdlqwnlc\",\n    \"device_id\": \"dakhwqdbkasbckjasbfkjasd\",\n    \"iv\"    : \"dklshdlqwhldaslfhqlw\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"upDMRgk9X7YP2NEbdi1kop9xxxxx\"\n}\nNội dung sau khi giải mã:\n{\n    \"ds_tin_tuc\": [\n    {\n        \"hinh_anh\": \"\",\n        \"link\": \"https://mytinpnc.vn/api/auth/news/pnc/18583121102020\",\n        \"ngay_dang_bai\": \"21/10/2020 19:01:53\",\n        \"tac_gia\": \"Cao Mỹ Uyên\",\n        \"tieu_de\": \"QUỸ CHUNG TAY ỦNG HỘ \"THƯƠNG VỀ MIỀN TRUNG\" PNC ĐẠT 8.400.000 VNĐ SAU 24H\",\n        \"tom_tat\": \"Chỉ trong 24h, Qũy chung tay ủng hộ 'THƯƠNG VỀ MIỀN TRUNG\" PNC đã nhận được 8.400.000 VNĐ từ sự góp sức của các thành viên đại gia đình Phương Nam.\"\n    },\n    {\n        \"hinh_anh\": \"\",\n        \"link\": \"https://mytinpnc.vn/api/auth/news/pnc/1815389102020\",\n        \"ngay_dang_bai\": \"09/10/2020 18:17:59\",\n        \"tac_gia\": \"Cao Mỹ Uyên\",\n        \"tieu_de\": \"THÔNG BÁO CHƯƠNG TRÌNH KHÁM SỨC KHỎE ĐỊNH KỲ NĂM 2020\",\n        \"tom_tat\": \"Nhằm đảm bảo phúc lợi chăm lo sức khỏe cho người lao động, với mong muốn CBNV chủ động theo dõi tình trạng sức khỏe của bản thân, kịp thời phát hiện sớm nhất những dấu hiệu bất thường có nguy cơ phát triển thành bệnh lý, PNC Telecom phối hợp với đội ngũ y bác sĩ phòng khám đa khoa An Khang Vinamilk thực hiện Chương trình khám sức khỏe định kỳ 2020 dành cho cán bộ nhân viên Phương Nam.\"\n    },\n    {\n        \"hinh_anh\": \"\",\n        \"link\": \"https://mytinpnc.vn/api/auth/news/general/1131262992020\",\n        \"ngay_dang_bai\": \"29/09/2020 11:34:01\",\n        \"tac_gia\": \"Nguyễn Cửu Minh Thư\",\n        \"tieu_de\": \"Chiến lược hành động hiệu quả - Phòng kỹ thuật SG03 bứt phá CSAT, xuất sắc lập “cú đúp” giải thưởng về CLDV\",\n        \"tom_tat\": \"Bứt phá đường đua “Nâng cao Chất lượng dịch vụ” tháng 8, PKT SG03 đã xuất sắc khi nắm giữ hai giải thưởng cao nhất về Chất lượng dịch vụ ở Vùng 5, với tỉ lệ CL7N TK-BT đạt mức 3,9%, tỷ lệ CL7N tháng 8 giảm 3% so với tháng 7. Cùng khám phá xem “chiến lược” nào đã giúp đơn vị này đạt được thành tích vượt trội như vậy?\"\n\n    }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "ds_tin_tuc",
            "description": "<p>Danh sách tin tức</p>"
          },
          {
            "group": "Success 200",
            "type": "Dict",
            "optional": false,
            "field": "dict_kq",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dict_kq.hinh_anh",
            "description": "<p>Hình ảnh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dict_kq.link",
            "description": "<p>Link</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "dict_kq.ngay_dang_bai",
            "description": "<p>Ngày đăng bài (Format D-M-Y H-M-S)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dict_kq.tac_gia",
            "description": "<p>Tác giả</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dict_kq.tieu_de",
            "description": "<p>Tiêu đề</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dict_kq.tom_tat",
            "description": "<p>Tóm tắt nội dung</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/tin_tuc</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/token_noti",
    "title": "Token Noti",
    "name": "token_noti",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Trường hợp 1:\n{\n     \"email\" : \"pnc.pdx@fpt.net\",\n     \"token\": \"pQiR7bhwYF_DYYaJmnheDCBW0Gzwwgbo0zLVW9K9pU9wH\",\n     \"iv\" : key tự sinh\n}\nTrường hợp 2:\n{\n     \"email\" : \"\",\n     \"token\": \"pQiR7bhwYF_DYYaJmnheDCBW0Gzwwgbo0zLVW9K9pU9wH\",\n     \"iv\" : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n    \"msg\": \"brkPEAVOFLEp+Yw5ELhRqg==\"\n}\nNoi dung sau khi giai ma:\n\"Update OK\"",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "InsertOK",
            "description": "<p>Email chưa có trong hệ thống</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "UpdateOK",
            "description": "<p>Email đã có trong hệ thống</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "NOTOK",
            "description": "<p>Khi không truyền email</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/token_noti</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/update_explanation_ptq_tb",
    "title": "Thông tin giải trình nhân viên",
    "name": "update_explanation_ptq_tb",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ptq_id",
            "description": "<p>Mã id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "explanation",
            "description": "<p>Thông tin giải trình</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"ptq_id\" : \"14\",\n    \"explanation\": \"giai trinh nhe\",\n    \"iv\"    : key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"ptq_id\" : \"dskajh\",\n    \"explanation\": \"kdjlasjdlsajdlwndlnalcahsfhdlkasjdlkasdkla\",\n    \"iv\"    : \"dkhaskddasd\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    \"msg\": \"iobOZzRhGmE5+0t45MFE9eQdBjoYPRUx2c5ck4Sp9s1E8LIDJB2FISlrvKkCljuI\"\n}\nNội dung sau khi giải mã:\n{\n    \"msg\": \"Gửi thông tin giải trình thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "OK",
            "description": "<p>Gửi giải trình thành công</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/update_explanation_ptq_tb</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/verify_otp",
    "title": "Xác thực OTP qua email",
    "name": "verify_otp",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mode",
            "description": "<p>Loại xác thực</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device_id_checkin",
            "description": "<p>Mã thiết bị dùng điểm danh (cho nhân viên mới)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp_code",
            "description": "<p>Mã OTP</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "Nội dung chưa mã hóa:\n{\n    \"email\": \"phuongnam.nipt@fpt.net\",\n    \"mode\" : \"register_device\",\n    \"device_id_checkin\": \"358240051111110\",\n    \"otp_code\": otp_code,\n    \"iv\": Key tự sinh\n}\nNội dung được mã hóa khi gửi đi:\n{\n    \"email\": \"kdhsakdsandkqwjk\",\n    \"mode\" : \"klasjlnascsakh\",\n    \"device_id_checkin\": \"mkdjfkdjfdfdsfs\",\n    \"otp_code\": \"dkjasdjkasjdkac\",\n    \"iv\": \"dksajhdkashdkasnc\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Nội dung mã hóa nhận được:\n{\n    'msg': 'skldjalkcniwjfionalasjflkhflasndflasflkasdfhnasfd'\n}\nNội dung sau khi giải mã:\n{\n    'msg': 'Email này đã đăng kí thiết bị trước đó vui lòng liên hệ HR để cập nhật lại thiết bị'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/verify_otp</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/xep_hang_nhan_vien",
    "title": "Xếp hạng nhân viên",
    "name": "xep_hang_nhan_vien",
    "version": "1.0.0",
    "group": "Mobile_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "Key",
            "optional": false,
            "field": "iv",
            "description": "<p>tự phát sinh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\" : \"thanglv@vienthongtin.com\",\n    \"iv\"    : key tự sinh\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "Noi dung ma hoa:\n{\n    \"msg\": \"HjXK1WcVZiZPXEazYHsiZ6VbO8mF80ih3jOfpBxFzxxxxxx\"\n}\nNoi dung sau khi giai ma:\n{\n  \"hang_nhan_vien\": \"C\",\n  \"lich_su_hang\": {\n    \"hang_nv_cua_nam\": \"B\",\n    \"theo_quy\": [\n      \"C\",\n      \"B\",\n      \"KH\\u00d4NG X\\u1ebeP H\\u1ea0NG\",\n      \"KH\\u00d4NG X\\u1ebeP H\\u1ea0NG\"\n    ],\n    \"theo_thang\": [\n      {\n        \"hang_nhan_vien\": \"C\",\n        \"thang\": \"01\",\n        \"tong_diem\": 96.67\n      },\n      {\n        \"hang_nhan_vien\": \"C\",\n        \"thang\": \"02\",\n        \"tong_diem\": 99.83\n      },\n      {\n        \"hang_nhan_vien\": \"B\",\n        \"thang\": \"03\",\n        \"tong_diem\": 112.15\n      },\n      {\n        \"hang_nhan_vien\": \"A\",\n        \"thang\": \"04\",\n        \"tong_diem\": 130.08\n      },\n      {\n        \"hang_nhan_vien\": \"B\",\n        \"thang\": \"05\",\n        \"tong_diem\": 116.54\n      },\n      {\n        \"hang_nhan_vien\": \"C\",\n        \"thang\": \"06\",\n        \"tong_diem\": 106.5\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"07\",\n        \"tong_diem\": 0\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"08\",\n        \"tong_diem\": 0\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"09\",\n        \"tong_diem\": 0\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"10\",\n        \"tong_diem\": 0\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"11\",\n        \"tong_diem\": 0\n      },\n      {\n        \"hang_nhan_vien\": \"N/A\",\n        \"thang\": \"12\",\n        \"tong_diem\": 0\n      }\n    ],\n    \"tong_diem\": 661.77\n  },\n  \"thang_xep_hang\": \"06\",\n  \"top_10\": [\n    {\n      \"don_vi\": \"TV2QNH2UR\",\n      \"email\": \"longnd2@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Nguy\\u1ec5n \\u0110\\u1ee9c Long\",\n      \"tong_diem\": 157.07\n    },\n    {\n      \"don_vi\": \"TV3NDHUR\",\n      \"email\": \"thucdt@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"\\u0110o\\u00e0n Trung Th\\u1ef1c\",\n      \"tong_diem\": 150.67\n    },\n    {\n      \"don_vi\": \"TV4HUEUR\",\n      \"email\": \"thuylt1@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"L\\u00ea Thanh Th\\u00f9y\",\n      \"tong_diem\": 145.78\n    },\n    {\n      \"don_vi\": \"TV3HPG1UR\",\n      \"email\": \"tuongdx@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"\\u0110\\u1ed3ng Xu\\u00e2n T\\u01b0\\u01a1ng\",\n      \"tong_diem\": 144.93\n    },\n    {\n      \"don_vi\": \"TV3NDHUR\",\n      \"email\": \"thomx@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Mai Xu\\u00e2n Th\\u1ecd\",\n      \"tong_diem\": 144.64\n    },\n    {\n      \"don_vi\": \"TV3HTHUR\",\n      \"email\": \"linhtv@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Th\\u00e1i V\\u0103n Linh\",\n      \"tong_diem\": 143.65\n    },\n    {\n      \"don_vi\": \"TV4HUEUR\",\n      \"email\": \"baotbq@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Tr\\u1ea7n B\\u00e1 Qu\\u1ed1c B\\u1ea3o\",\n      \"tong_diem\": 143.23\n    },\n    {\n      \"don_vi\": \"TV4HUEUR\",\n      \"email\": \"phucvd@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"V\\u00f5 \\u0110\\u1ee9c Ph\\u00fac\",\n      \"tong_diem\": 142.13\n    },\n    {\n      \"don_vi\": \"TV3NANUR\",\n      \"email\": \"tuanna@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Nguy\\u1ec5n Anh Tu\\u1ea5n\",\n      \"tong_diem\": 141.87\n    },\n    {\n      \"don_vi\": \"TV3HPG2UR\",\n      \"email\": \"quangnv3@vienthongtin.com\",\n      \"hang_nhan_vien\": \"A+\",\n      \"ho_va_ten\": \"Nguy\\u1ec5n V\\u0103n Quang\",\n      \"tong_diem\": 141.7\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hang_nhan_vien",
            "description": "<p>Hạng nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang",
            "description": "<p>Lịch sử hạng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su_hang.hang_nv_cua_nam",
            "description": "<p>Hạng nhân viên của năm</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang.theo_quy",
            "description": "<p>Theo quý</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang.theo_thang",
            "description": "<p>Theo tháng</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang.theo_thang.hang_nhan_vien",
            "description": "<p>Hạng nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang.theo_thang.thang",
            "description": "<p>Hạng nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "lich_su_hang.theo_thang.tong_diem",
            "description": "<p>Tổng điểm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lich_su_hang.thang_xep_hang",
            "description": "<p>Tháng xếp hạng</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "top_10",
            "description": "<p>Top 10</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "top_10.don_vi",
            "description": "<p>Đơn vị</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "top_10.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "top_10.hang_nhan_vien",
            "description": "<p>Hạng nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "top_10.ho_va_ten",
            "description": "<p>Họ và tên</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "top_10.tong_diem",
            "description": "<p>Tổng điểm</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5001/xep_hang_nhan_vien</p>"
          }
        ]
      }
    },
    "filename": "./services/mobile_service_https.py",
    "groupTitle": "Mobile_Service"
  },
  {
    "type": "post",
    "url": "/bao_cao_chi_tiet",
    "title": "Báo cáo chi tiết",
    "name": "bao_cao_chi_tiet",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Query",
            "optional": false,
            "field": "query",
            "description": "<p>&quot;SELECT * FROM employees_tb&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_email",
            "description": "<p>Email người xuất báo cáo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name_table",
            "description": "<p>Tên bảng</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"query\": \"SELECT * FROM employees_tb\",\n    \"user_email\": \"phuongnam.nipt@fpt.net\",\n    \"name_table\": \"employees_tb\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Bao_cao_chi_tiet_NhanVien_20201104_082519.xlsx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>kết quả (Trả về file .xlsx)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/bao_cao_chi_tiet</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  },
  {
    "type": "post",
    "url": "/bao_cao_nghiep_vu",
    "title": "Báo cáo nghiệp vụ",
    "name": "bao_cao_nghiep_vu",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Tên loại (atld)</p>"
          },
          {
            "group": "Parameter",
            "type": "Query",
            "optional": false,
            "field": "input",
            "description": "<p>''' SELECT a.<em>, b.</em>, c.* FROM tool_ATLD_tb a LEFT JOIN employees_tb b on a.emp_code = b.emp_code LEFT JOIN department_tb c on b.child_depart = c.child_depart where b.child_depart in (&quot;PDX&quot;) and a.tinh_trang_the_chung_chi in (&quot;Còn Hạn&quot;, &quot;Hết Hạn&quot;, &quot;Sắp Hết Hạn&quot;, &quot;Chưa Cấp&quot;)'''</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"type\" : \"atld\",\n    \"input\" : ''' SELECT a.*, b.*, c.* FROM tool_ATLD_tb a LEFT JOIN employees_tb b on a.emp_code = b.emp_code LEFT JOIN department_tb c on b.child_depart = c.child_depart where b.child_depart in (\"PDX\") and a.tinh_trang_the_chung_chi in (\"Còn Hạn\", \"Hết Hạn\", \"Sắp Hết Hạn\", \"Chưa Cấp\")'''\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Report_ATLD_20201104_091831.xlsx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>kết quả (File Report_ATLD_{}_{}.xlsx)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/bao_cao_nghiep_vu</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  },
  {
    "type": "post",
    "url": "/bao_cao_nguoi_phong_van_all",
    "title": "Tổng hợp báo cáo người phỏng vấn",
    "name": "bao_cao_nguoi_phong_van_all",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email người phỏng vấn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\":\"pnc.pdx@fpt.net\",\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"chua_phong_van\": 4,\n    \"da_phong_van\": 5,\n    \"dat\": 1,\n    \"k_dat\": 4,\n    \"list_days_pv\": [\n        \"10/12/2020\",\n        \"27/10/2020\",\n        \"12/10/2020\",\n        \"28/10/2020\",\n        \"31/12/2020\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "chua_phong_van",
            "description": "<p>Số lượng chưa phỏng vấn</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "da_phong_van",
            "description": "<p>Số lượng đã phỏng vấn</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "dat",
            "description": "<p>Số lượng đạt</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "k_dat",
            "description": "<p>Số lượng không đạt</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "list_days_pv",
            "description": "<p>Danh sách ngày phỏng vấn (Format dd/mm/yyyy)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/bao_cao_nguoi_phong_van_all</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  },
  {
    "type": "post",
    "url": "/bao_cao_nguoi_phong_van_daily",
    "title": "Báo cáo người phỏng vấn hằng ngày",
    "name": "bao_cao_nguoi_phong_van_daily",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email người phỏng vấn</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "day",
            "description": "<p>Ngày phỏng vấn (format dd/mm/yyyy)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"email\":\"pnc.pdx@fpt.net\",\n    \"day\": \"12/10/2020\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"list\": [\n        {\n            \"chi_nhanh\": \"None\",\n            \"chung_chi\": null,\n            \"chuyen_nganh\": \"Điện tử viễn thông\",\n            \"diem_bai_test\": null,\n            \"email\": \"tanthanhcr77@gmail.com\",\n            \"email_nguoi_gioi_thieu\": null,\n            \"ghi_chu_pv_lan_1\": null,\n            \"ghi_chu_pv_lan_2\": null,\n            \"gio_pv_lan_1\": \"08:00:00\",\n            \"gio_test\": null,\n            \"gioi_tinh\": \"Nam\",\n            \"have_test\": 0,\n            \"he_TN\": \"Cao Đẳng\",\n            \"ho_ten\": \"Nguyễn Tấn Thành\",\n            \"ho_ten_nguoi_gioi_thieu\": null,\n            \"hoc_tan_binh\": null,\n            \"id_ung_vien\": 14,\n            \"ket_qua_moi_pv_lan_1\": null,\n            \"ket_qua_moi_pv_lan_2\": null,\n            \"ket_qua_moi_test\": null,\n            \"ket_qua_pv_lan_1\": \"Không đạt\",\n            \"ket_qua_pv_lan_2\": null,\n            \"ket_qua_test\": null,\n            \"khu_vuc_nhan_viec\": null,\n            \"khu_vuc_tuyen\": \"PNCHO\",\n            \"kinh_nghiem\": null,\n            \"kq_pv_cuoi_cung\": \"Đạt\",\n            \"kv_nguoi_gioi_thieu_lam\": null,\n            \"loai_de\": null,\n            \"ly_do_nghi\": null,\n            \"ly_do_pv_lan_1\": null,\n            \"ly_do_test\": null,\n            \"manv\": null,\n            \"manv_nguoi_bao_lanh\": null,\n            \"ngay_ky_hd\": null,\n            \"ngay_nghi\": null,\n            \"ngay_nhap\": \"Wed, 07 Oct 2020 00:00:00 GMT\",\n            \"ngay_pv_lan_1\": \"Mon, 12 Oct 2020 00:00:00 GMT\",\n            \"ngay_pv_lan_2\": \"Thu, 31 Dec 2020 00:00:00 GMT\",\n            \"ngay_sinh\": \"Thu, 08 Oct 2020 00:00:00 GMT\",\n            \"ngay_test\": \"Fri, 09 Oct 2020 00:00:00 GMT\",\n            \"ngay_xem_viec_du_kien\": null,\n            \"ngay_xem_viec_tai_kv\": null,\n            \"nguoi_phu_trach\": \"phuongnam.nhivb@fpt.net\",\n            \"nguoi_pv_lan_1\": \"pnc.pdx@fpt.net\",\n            \"nguoi_pv_lan_2\": \"phuongnam.LinhTD1@fpt.net\",\n            \"nguon_tuyen_dung\": \"Giới thiệu nội bộ\",\n            \"noi_o_hien_nay\": \"Quận 9\",\n            \"sdt\": \"961918994\",\n            \"sdt_nguoi_gioi_thieu\": null,\n            \"send_mail\": null,\n            \"ten_truong\": \"Cao Đẳng Công Nghệ Thủ Đức\",\n            \"thang_nhan_phi_GTNB\": null,\n            \"tinh_trang_ung_vien\": null,\n            \"vi_tri\": \"Kỹ thuật viên Onsite\"\n        },\n        {\n            \"chi_nhanh\": \"None\",\n            \"chung_chi\": null,\n            \"chuyen_nganh\": \"Quản trị mạng\",\n            \"diem_bai_test\": null,\n            \"email\": \"hiephoamail@gmail.com\",\n            \"email_nguoi_gioi_thieu\": null,\n            \"ghi_chu_pv_lan_1\": null,\n            \"ghi_chu_pv_lan_2\": null,\n            \"gio_pv_lan_1\": \"15:00:00\",\n            \"gio_test\": null,\n            \"gioi_tinh\": \"Nam\",\n            \"have_test\": 0,\n            \"he_TN\": \"Cao Đẳng\",\n            \"ho_ten\": \"Đinh Hiệp Hòa\",\n            \"ho_ten_nguoi_gioi_thieu\": null,\n            \"hoc_tan_binh\": null,\n            \"id_ung_vien\": 15,\n            \"ket_qua_moi_pv_lan_1\": null,\n            \"ket_qua_moi_pv_lan_2\": null,\n            \"ket_qua_moi_test\": null,\n            \"ket_qua_pv_lan_1\": \"Không Đạt\",\n            \"ket_qua_pv_lan_2\": null,\n            \"ket_qua_test\": null,\n            \"khu_vuc_nhan_viec\": null,\n            \"khu_vuc_tuyen\": \"PNCHO\",\n            \"kinh_nghiem\": null,\n            \"kq_pv_cuoi_cung\": \"Không Đạt\",\n            \"kv_nguoi_gioi_thieu_lam\": null,\n            \"loai_de\": null,\n            \"ly_do_nghi\": null,\n            \"ly_do_pv_lan_1\": null,\n            \"ly_do_test\": null,\n            \"manv\": null,\n            \"manv_nguoi_bao_lanh\": null,\n            \"ngay_ky_hd\": null,\n            \"ngay_nghi\": null,\n            \"ngay_nhap\": \"Wed, 07 Oct 2020 00:00:00 GMT\",\n            \"ngay_pv_lan_1\": \"Mon, 12 Oct 2020 00:00:00 GMT\",\n            \"ngay_pv_lan_2\": null,\n            \"ngay_sinh\": \"Thu, 08 Oct 2020 00:00:00 GMT\",\n            \"ngay_test\": \"Fri, 09 Oct 2020 00:00:00 GMT\",\n            \"ngay_xem_viec_du_kien\": null,\n            \"ngay_xem_viec_tai_kv\": null,\n            \"nguoi_phu_trach\": \"phuongnam.nhivb@fpt.net\",\n            \"nguoi_pv_lan_1\": \"pnc.pdx@fpt.net\",\n            \"nguoi_pv_lan_2\": \"pnc.pdx@fpt.net\",\n            \"nguon_tuyen_dung\": \"Giới thiệu nội bộ\",\n            \"noi_o_hien_nay\": \"Quận Thủ Đức\",\n            \"sdt\": \"389825526\",\n            \"sdt_nguoi_gioi_thieu\": null,\n            \"send_mail\": null,\n            \"ten_truong\": \"Cao Đẳng Nghề Cntt Ispace\",\n            \"thang_nhan_phi_GTNB\": null,\n            \"tinh_trang_ung_vien\": null,\n            \"vi_tri\": \"Kỹ thuật viên Onsite\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "list",
            "description": "<p>Danh sách ứng viên phỏng vấn</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.chi_nhanh",
            "description": "<p>Chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.chung_chi",
            "description": "<p>Chứng chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.chuyen_nganh",
            "description": "<p>Chuyên ngành</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.diem_bai_test",
            "description": "<p>Điểm bài test</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.email_nguoi_gioi_thieu",
            "description": "<p>Email người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ghi_chu_pv_lan_1",
            "description": "<p>Ghi chú phỏng vấn lần 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ghi_chu_pv_lan_2",
            "description": "<p>Ghi chú phỏng vấn lần 2</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "list.gio_pv_lan_1",
            "description": "<p>Giờ phỏng vấn lần 1  (Format hh:mm:ss)</p>"
          },
          {
            "group": "Success 200",
            "type": "Time",
            "optional": false,
            "field": "list.gio_test",
            "description": "<p>Giờ test (Format hh:mm:ss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.gioi_tinh",
            "description": "<p>Giới tính</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list.have_test",
            "description": "<p>Bài kiểm tra</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.he_TN",
            "description": "<p>Hệ tốt nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ho_ten",
            "description": "<p>Họ tên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ho_ten_nguoi_gioi_thieu",
            "description": "<p>Họ tên người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.hoc_tan_binh",
            "description": "<p>Học tân binh</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "list.id_ung_vien",
            "description": "<p>Mã ứng viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_moi_pv_lan_1",
            "description": "<p>Kết quả mời phỏng vấn lần 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_moi_pv_lan_2",
            "description": "<p>Kết quả mời phỏng vấn lần 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_moi_test",
            "description": "<p>Kết quả mời test</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_pv_lan_1",
            "description": "<p>Kết quả phỏng vấn lần 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_pv_lan_2",
            "description": "<p>Kết quả phỏng vấn lần 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ket_qua_test",
            "description": "<p>Kết quả test</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.khu_vuc_nhan_viec",
            "description": "<p>Khu vực nhận việc</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.khu_vuc_tuyen",
            "description": "<p>Khu vực tuyển</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.kinh_nghiem",
            "description": "<p>Kinh nghiệm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.kq_pv_cuoi_cung",
            "description": "<p>Kết quả phỏng vấn cuối cùng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.kv_nguoi_gioi_thieu_lam",
            "description": "<p>Khu vực người giới thiệu làm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.loai_de",
            "description": "<p>Loại đề</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ly_do_nghi",
            "description": "<p>Lý do nghỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ly_do_pv_lan_1",
            "description": "<p>Lý do phỏng vấn phần 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ly_do_test",
            "description": "<p>Lý do test</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.manv",
            "description": "<p>Mã nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.manv_nguoi_bao_lanh",
            "description": "<p>Mã nhân viên người bảo lãnh</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_ky_hd",
            "description": "<p>Ngày kí hợp đồng (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_nghi",
            "description": "<p>Ngày nghỉ (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_nhap",
            "description": "<p>Ngày nhập (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_pv_lan_1",
            "description": "<p>Ngày phỏng vấn lần 1 (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_pv_lan_2",
            "description": "<p>Ngày phỏng vấn lần 2 (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_sinh",
            "description": "<p>Ngày sinh (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_test",
            "description": "<p>Ngày test (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_xem_viec_du_kien",
            "description": "<p>Ngày xem việc dự kiến (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "list.ngay_xem_viec_tai_kv",
            "description": "<p>Ngày xem việc tại khu vực (Format dd/mm/yyyy)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.nguoi_phu_trach",
            "description": "<p>Người phụ trách</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.nguoi_pv_lan_1",
            "description": "<p>Người phỏng vấn lần 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.nguoi_pv_lan_2",
            "description": "<p>Người phỏng vấn lần 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.nguon_tuyen_dung",
            "description": "<p>Nguồn tuyển dụng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.noi_o_hien_nay",
            "description": "<p>Nơi ở hiện nay</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.sdt",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.sdt_nguoi_gioi_thieu",
            "description": "<p>Số điện thoại người giới thiệu</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.send_mail",
            "description": "<p>Gởi mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.ten_truong",
            "description": "<p>Tên trường</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.thang_nhan_phi_GTNB",
            "description": "<p>Tháng nhận phí GTNB</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.tinh_trang_ung_vien",
            "description": "<p>Tình trạng ứng viên</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list.vi_tri",
            "description": "<p>Vị trí</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/bao_cao_nguoi_phong_van_daily</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  },
  {
    "type": "post",
    "url": "/export_report",
    "title": "Xuất báo cáo",
    "name": "export_report",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "team_name",
            "description": "<p>Tên phòng</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start_day",
            "description": "<p>Ngày bắt đầu (Format d)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_day",
            "description": "<p>Ngày kết thúc (Format dd)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "month",
            "description": "<p>Tháng (Format mm)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "year",
            "description": "<p>Năm (Format yyyy)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"team_name\" :\"PDX\",\n    \"start_day\": 1,\n    \"end_day\" : 31,\n    \"month\" : 10,\n    \"year\" : 2020\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"../data/export_checkin/Report_20201104_113606_131102020.xlsx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>kết quả (Trả về file .xlsx)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/export_report</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  },
  {
    "type": "post",
    "url": "/gop_bao_cao_foxpro",
    "title": "Gộp báo cáo Foxpro",
    "name": "gop_bao_cao_foxpro",
    "version": "1.0.1",
    "group": "Report_Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "team_name",
            "description": "<p>Tên nhóm</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start_day",
            "description": "<p>Ngày bắt đầu (Format d)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_day",
            "description": "<p>Ngày kết thúc (Format dd)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "month",
            "description": "<p>Tháng (Format mm)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "year",
            "description": "<p>Năm (Format yyyy)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename_foxpro",
            "description": "<p>Tên file foxpro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input-Example:",
          "content": "{\n    \"team_name\" :\"ALLPNC,FPNCAD,FPNCBGD,FPNCCS,FPNCDA,FPNCDN,FPNCDT,FPNCDX,FPNCHR,FPNCNV01,FPNCNV02,FPNCQA,FPNCVT,PAD,PAF,PAGGBIL,PAGGINF,PAGGUSR,PBDGBIL,PBDGINF,PBDGUSR,PBDHBIL,PBDHINF,PBDHUSR,PBLUBIL,PBLUINF,PBLUUSR,PBPCBIL,PBPCINF,PBPCUSR,PBTEBIL,PBTEINF,PBTEUSR,PBTNBIL,PBTNINF,PBTNUSR,PCAM,PCMUBIL,PCMUINF,PCMUUSR,PCSHT2,PCSHT4,PCSHT6,PCSHT8,PCTOBIL,PCTOINF,PCTOUSR,PDLKBIL,PDLKINF,PDLKUSR,PDNIBIL,PDNIINF,PDNIUSR,PDTPBIL,PDTPINF,PDTPUSR,PDX,PFTI,PGLIBIL,PGLIINF,PGLIUSR,PHGGBIL,PHGGINF,PHGGUSR,PHR,PINDO,PINFKTNV,PINFQVH1,PINFQVH2,PINFQVH3,PINFTKHT,PKGGBIL,PKGGINF,PKGGUSR,PKHABIL,PKHAINF,PKHAUSR,PKTMBIL,PKTMINF,PKTMUSR,PLANBIL,PLANINF,PLANUSR,PLDGBIL,PLDGINF,PLDGUSR,PNTNBIL,PNTNINF,PNTNUSR,PNV1,PNV2,PPX,PPYNBIL,PPYNINF,PPYNUSR,PQA,PQLT,PQNIBIL,PQNIINF,PQNIUSR,PQNMBIL,PQNMINF,PQNMUSR,PSG01BIL,PSG01USR,PSG02BIL,PSG02CS,PSG02USR,PSG03BIL,PSG03USR,PSG04BIL,PSG04CS,PSG04USR,PSG05BIL,PSG05CS,PSG05USR,PSG06BIL,PSG06USR,PSG07BIL,PSG07USR,PSG08BIL,PSG08USR,PSG09BIL,PSG09USR,PSG10BIL,PSG10USR,PSG11BIL,PSG11CS,PSG11USR,PSG12BIL,PSG12USR,PSG13BIL,PSG13CS,PSG13USR,PSG14BIL,PSG14USR,PSG15BIL,PSG15USR,PSG16BIL,PSG16CS,PSG16USR,PSTGBIL,PSTGINF,PSTGUSR,PTC,PTF,PTGGBIL,PTGGINF,PTGGUSR,PTNHBIL,PTNHINF,PTNHUSR,PTVHBIL,PTVHINF,PTVHUSR,PVLGBIL,PVLGINF,PVLGUSR,PVT,PVTUBIL,PVTUINF,PVTUUSR\",\n    \"start_day\": 1,\n    \"end_day\" : 31,\n    \"month\" : 10,\n    \"year\" : 2020,\n    \"filename_foxpro\": \"zbc.xlsx\"\n}",
          "type": "json"
        },
        {
          "title": "Output-Example:",
          "content": "{\n    \"result\": \"Report_20201104_100246_131102020.xlsx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>kết quả (Trả về file .xlsx)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Record not found: http://localhost:5002/gop_bao_cao_foxpro</p>"
          }
        ]
      }
    },
    "filename": "./services/report_service.py",
    "groupTitle": "Report_Service"
  }
] });
