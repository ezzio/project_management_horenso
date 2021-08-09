import {heTN, nguonTD} from './participant';
// import {MailHireComponent} from '../../../components/pages/mainpages/tuyendung/' +
//   'jobhunter/shared/search-form-ungvien/form-info-ungvien/mail-hire/mail-hire.component';
// import {SendMailTrungtuyenComponent} from '../../../components/pages/mainpa' +
//   'ges/tuyendung/jobhunter/trungtuyen/send-mail-trungtuyen/send-mail-trungtuyen.component';

export class RecruiterClass {
  constructor() {
  }

  createNewTestElement() {
    return {
      id_ung_vien: '',
      ngay_test: '',
      gio_test: '',
      ket_qua_moi_test: '',
      ly_do_test: '',
      diem_bai_test: '',
      ket_qua_test: '',
      chi_nhanh: '',
      loai_de: '',
      dia_chi_test: '',
      have_test: 0
    };
  }

  createNewPV1Element() {
    return {
      id_ung_vien: '',
      ngay_pv_lan_1: '',
      gio_pv_lan_1: '',
      ket_qua_moi_pv_lan_1: '',
      ly_do_pv_lan_1: '',
      ket_qua_pv_lan_1: '',
      nguoi_pv_lan_1: '',
      ghi_chu_pv_lan_1: '',
    };
  }

  createNewPV2Element() {
    return {
      id_ung_vien: '',
      ngay_pv_lan_2: '',
      gio_pv_lan_2: '',
      ket_qua_moi_pv_lan_2: '',
      ly_do_pv_lan_2: '',
      ket_qua_pv_lan_2: '',
      nguoi_pv_lan_2: '',
      ghi_chu_pv_lan_2: '',
    };
  }

  createNewElement() {
    const el = {
      id_ung_vien: '',
      nguoi_phu_trach: '',
      khu_vuc_tuyen: '',
      nguon_tuyen_dung: '',
      vi_tri: '',
      ho_ten: '',
      email: '',
      sdt: '',
      noi_o_hien_nay: '',
      ngay_sinh: '',
      gioi_tinh: '',
      he_TN: '',
      ten_truong: '',
      chuyen_nganh: '',
      kinh_nghiem: '',
      chung_chi: '',
      ngay_test: '',
      gio_test: '',
      ket_qua_moi_test: '',
      ly_do_test: '',
      diem_bai_test: '',
      ket_qua_test: '',
      ngay_pv_lan_1: '',
      gio_pv_lan_1: '',
      ket_qua_moi_pv_lan_1: '',
      ly_do_pv_lan_1: '',
      ket_qua_pv_lan_1: '',
      nguoi_pv_lan_1: '',
      ghi_chu_pv_lan_1: '',
      ngay_pv_lan_2: '',
      ket_qua_moi_pv_lan_2: '',
      ket_qua_pv_lan_2: '',
      nguoi_pv_lan_2: '',
      ghi_chu_pv_lan_2: '',
      khu_vuc_nhan_viec: '',
      ngay_xem_viec_du_kien: '',
      ngay_xem_viec_tai_kv: '',
      manv: '',
      ngay_ky_hd: '',
      hoc_tan_binh: '',
      ngay_nghi: '',
      ly_do_nghi: '',
      tinh_trang_ung_vien: '',
      manv_nguoi_bao_lanh: '',
      ho_ten_nguoi_gioi_thieu: '',
      sdt_nguoi_gioi_thieu: '',
      email_nguoi_gioi_thieu: '',
      kv_nguoi_gioi_thieu_lam: '',
      thang_nhan_phi_GTNB: '',
      chi_nhanh: '',
      loai_de: '',
      kq_pv_cuoi_cung: '',
      dia_chi_pv_1: '',
      dia_chi_pv_2: ''
    };
    return el;
  }

  createTable() {
    const table = {
      columns: [
        {type: '', dataField: 'id_ung_vien', title: 'ID', openButton: 'opened'},
        {type: 'text', dataField: 'khu_vuc_tuyen', title: 'Khu vực tuyển'},
        {type: 'text', dataField: 'ho_va_ten', title: 'Tên ứng viên'},
        {type: 'text', dataField: 'email', title: 'Email'},
        {type: 'text', dataField: 'ket_qua_test', title: 'Bài test'},
        {type: 'select', dataField: 'ket_qua_pv_lan_1', title: 'PV lần 1', options: ['Đạt', 'Không Đạt']},
        {type: 'select', dataField: 'ket_qua_pv_lan_2', title: 'PV lần 2', options: ['Đạt', 'Không Đạt']},
        {type: 'text', dataField: 'kq_pv_cuoi_cung', title: 'Kết quả cuối', changeColor: true},
        {type: '', dataField: 'num_send_mail', title: 'Gửi mail'}
      ]
    };
    return table;
  }

  createUngVienTam() {
    const table = {
      columns: [
        {type: '', dataField: 'id_ung_vien', title: 'ID'},
        {type: '', dataField: 'khu_vuc_tuyen', title: 'Khu vực tuyển', selectParent: true},
        {type: '', dataField: 'thuc_tap', title: 'Tình trạng', selectThuctap: true},
        {type: 'text', dataField: 'ho_va_ten', title: 'Tên ứng viên'},
        {type: 'text', dataField: 'email', title: 'Email'},
        {type: 'text', dataField: 'sdt', title: 'Số điện thoại'},
        {type: '', dataField: 'selectUngVien', title: 'Chọn', checkbox: true}
      ]
    };
    return table;
  }

  createTableTest() {
    const table = {
      columns: [
        {type: 'sdate', dataField: 'ngay_test', title: 'Ngày test', formatDate: 'dd/MM/yyyy'},
        {type: 'time', dataField: 'gio_test', title: 'Giờ test'},
        {type: 'select', dataField: 'dia_chi_test', title: 'Địa chỉ test', options: addPV},
        {type: 'select', dataField: 'ket_qua_moi_test', title: 'Kết quả mời test', options: ['Đồng ý', 'Không đồng ý']},
        {type: 'text', dataField: 'ly_do_test', title: 'Lý do test'},
        {type: 'select', dataField: 'chi_nhanh', title: 'Chi nhánh', options: ['TIN', 'PNC']},
        {type: 'select', dataField: 'loai_de', title: 'Loại đề', options: ['ONSITE', 'NVKT']},
        {type: 'textfix', dataField: 'diem_bai_test', title: 'Điểm bài test'},
        {type: 'textfix', dataField: 'ket_qua_test', title: 'Kết quả test'}
      ]
    };
    return table;
  }

  createTableTest1() {
    const table = {
      columns: [
        {type: 'sdate', dataField: 'ngay_pv_lan_1', title: 'Ngày PV lần 1'},
        {type: 'time', dataField: 'gio_pv_lan_1', title: 'Giờ PV'},
        {type: 'select', dataField: 'ket_qua_moi_pv_lan_1', title: 'Kết quả mời  PV lần 1', options: ['Đồng ý', 'Không đồng ý']},
        {type: 'text', dataField: 'ly_do_pv_lan_1', title: 'Lý do pv lần 1'},
        {type: 'textfix', dataField: 'ket_qua_pv_lan_1', title: 'Kết quả PV lần 1'},
        {type: 'select', dataField: 'nguoi_pv_lan_1', title: 'Người phỏng vấn lần 1'},
        {type: 'text', dataField: 'ghi_chu_pv_lan_1', title: 'Ghi chú lần 1'},
        {type: 'select', dataField: 'dia_chi_pv_1', title: 'Địa chỉ', options: addPV},

      ]
    };
    return table;
  }

  createTableTest2() {
    const table = {
      columns: [
        {type: 'sdate', dataField: 'ngay_pv_lan_2', title: 'Ngày PV lần 2', formatDate: 'dd/MM/yyyy'},
        {type: 'time', dataField: 'gio_pv_lan_2', title: 'Giờ PV'},
        {type: 'select', dataField: 'ket_qua_moi_pv_lan_2', title: 'Kết quả mời PV lần 2', options: ['Đồng ý', 'Không đồng ý']},
        {type: 'textfix', dataField: 'ket_qua_pv_lan_2', title: 'Kết quả PV lần 2'},
        {type: 'select', dataField: 'nguoi_pv_lan_2', title: 'Người PV'},
        {type: 'text', dataField: 'ghi_chu_pv_lan_2', title: 'Ghi chú'},
        {type: 'select', dataField: 'dia_chi_pv_2', title: 'Địa chỉ', options: addPV},

      ]
    };
    return table;
  }
  createAddElement() {
    const el = {
      chi_nhanh: '',
      khu_vuc_tuyen: '',
      biet_thong_tin_qua: '',
      vi_tri_cong_viec: '',
      ho_va_ten: '',
      email: '',
      sdt: '',
      quan_huyen_tam_tru: '',
      ngay_sinh: '',
      gioi_tinh: '',
      he_TN: '',
      ten_truong: '',
      chuyen_nganh: '',
    };
    return el;
  }

  createTableParticipant() {
    const table = {
      columns: [
        // {type: 'select', dataField: 'chi_nhanh', title: 'Chi nhánh', options: ['TIN', 'PNC']},
        // {type: 'select', dataField: 'khu_vuc_tuyen', title: 'Khu vực tuyển'},
        {type: 'select', dataField: 'biet_thong_tin_qua', title: 'Nguồn tuyển dụng', options: nguonTD},
        {type: 'select', dataField: 'vi_tri_cong_viec', title: 'Vị trí'},
        {type: 'text', dataField: 'ho_va_ten', title: 'Họ và tên', placeholder: 'In hoa chữ cái đầu'},
        {type: 'text', dataField: 'email', title: 'Email'},
        {type: 'number', dataField: 'sdt', title: 'SDT', validator: 10},
        // {type: 'select', dataField: 'quan_huyen_tam_tru', title: 'Nơi ở hiện nay'},
        // {type: 'sdate', dataField: 'ngay_sinh', title: 'Ngày sinh', formatDate: 'dd/MM/yyyy'},
        // {type: 'select', dataField: 'gioi_tinh', title: 'Giới tính', options: ['Nam', 'Nữ']},
        {type: 'select', dataField: 'thuc_tap', title: 'Thực tập/Nhân viên', options: ['Thực tập', 'Nhân viên']},
        // {type: 'select', dataField: 'he_TN', title: 'Hệ tốt nghiệp', options: heTN},
        // {type: 'select', dataField: 'ten_truong', title: 'Tên trường'},
        // {type: 'select', dataField: 'chuyen_nganh', title: 'Chuyên ngành'},
      ]
    };
    return table;
  }

  createTableTrungTuyenSum() {
    const table = {
      columns: [
        {type: '', dataField: 'id_ung_vien', title: 'ID', openButton: 'opened'},
        {type: '', dataField: 'ho_va_ten', title: 'Họ tên'},
        {type: 'textfix', dataField: 'email', title: 'Email'},
        // {type: '', dataField: '', title: 'Mail', sendMail: SendMailTrungtuyenComponent}
        // {type: 'text', dataField: 'khu_vuc_nhan_viec', title: 'Khu vực nhận việc'}
      ]
    };
    return table;
  }

  createTableMailTrungTuyen() {
    const table = {
      columns: [
        // {type: 'textfix', dataField: 'email', title: 'Email'},
        {type: 'time', dataField: 'thoi_gian_nhan_viec', title: 'Thời gian nhận việc'},
        {type: 'sdate', dataField: 'ngay_nhan_viec', title: 'Ngày nhận việc'},
        {type: 'select', dataField: 'dia_chi_nhan_viec', title: 'Địa chỉ nhận việc', options: addPV},
      ]
    };
    return table;
  }

  createElementEmailTrungTuyen() {
    const el = {
      id_ung_vien: 0,
      thoi_gian_nhan_viec: '',
      ngay_nhan_viec: '',
      dia_chi_nhan_viec: '',
    };
    return el;
  }

  createTableTrungTuyen() {
    const table = {
      columns: [
        {type: '', dataField: 'id_ung_vien', title: 'ID'},
        {type: 'text', dataField: 'email', title: 'Email'},
        {type: '', dataField: 'ho_va_ten', title: 'Họ và tên'},
        {type: 'select', dataField: 'khu_vuc_nhan_viec', title: 'Khu vực nhận việc'},
        {type: 'date', dataField: 'ngay_xem_viec_du_kien', title: 'Ngày xem việc dự kiến'},
        {type: 'date', dataField: 'ngay_xem_viec_tai_kv', title: 'Ngày xem việc tại khu vực'},
        {type: 'text', dataField: 'manv', title: 'Mã Nhân viên'},
        {type: 'date', dataField: 'ngay_ky_hd', title: 'Ngày ký hợp đồng'},
        {type: 'text', dataField: 'hoc_tan_binh', title: 'Học tân binh'},
        {type: 'date', dataField: 'ngay_nghi', title: 'Ngày nghỉ'},
        {type: 'text', dataField: 'ly_do_nghi', title: 'Lý do nghỉ'},
        {type: 'text', dataField: 'tinh_trang_ung_vien', title: 'Tình trạng ứng viên'},
        {type: 'text', dataField: 'manv_nguoi_bao_lanh', title: 'Mã NV người bảo lãnh'},
        {type: 'text', dataField: 'ho_ten_nguoi_gioi_thieu', title: 'Họ tên người giới thiệu'},
        {type: 'text', dataField: 'sdt_nguoi_gioi_thieu', title: 'SDT người giới thiệu'},
        {type: 'text', dataField: 'kv_nguoi_gioi_thieu_lam', title: 'Khu vực người giới thiệu làm'},
        {type: 'text', dataField: 'thang_nhan_phi_GTNB', title: 'Tháng nhận phí GTNB'},
      ]
    };
    return table;
  }

  createElementComment1() {
    const el = {
      ngoai_hinh: '',
      tac_phong_thai_do: '',
      kien_thuc_chuyen_mon: '',
      diem_test: '',
      ky_nang: '',
      tinh_trang_pv: '',
      ket_qua_pv: '',
      ngay_nhan_viec_du_kien: '',
      khu_vuc_nhan_viec: '',
      vong_pv: 1,
      id_ung_vien: ''
    };
    return el;
  }

  createTableComment1() {
    const table = {
      columns:
        [
          {type: 'select', dataField: 'ngoai_hinh', title: 'Ngoại hình', options: [1, 2, 3, 4, 5]},
          {type: 'select', dataField: 'tac_phong_thai_do', title: 'Tác phong thái độ', options: [1, 2, 3, 4, 5]},
          {type: 'select', dataField: 'kien_thuc_chuyen_mon', title: 'Kiến thức chuyên môn', options: [1, 2, 3, 4, 5]},
          {type: 'textfix', dataField: 'diem_test', title: 'Điểm bài test'},
          {type: 'select', dataField: 'ky_nang', title: 'Kỹ năng', options: [1, 2, 3, 4, 5]},
          {type: 'text', dataField: 'tinh_trang_pv', title: 'Tình trạng phỏng vấn'},
          {type: 'select', dataField: 'ket_qua_pv', title: 'Kết quả phỏng vấn', options: ['Đạt', 'Không Đạt']},
          {type: 'sdate', dataField: 'ngay_nhan_viec_du_kien', title: 'Ngày nhận việc dự kiến', default: false},
          {type: 'select', dataField: 'khu_vuc_nhan_viec', title: 'Khu vực nhận việc'},
        ]
    };
    return table;
  }

  createEmailElement() {
    const content = {
      chi_nhanh: '',
      vi_tri_cong_viec: '',
      ngay_toi: '',
      gio_toi: ''
    };
    return content;
  }

  createEmailForm() {
    const tb = {
      columns: [
        {type: 'select', dataField: 'chi_nhanh', title: 'Chi nhánh', options: ['TIN', 'PNC']},
        {type: 'select', dataField: 'vi_tri_cong_viec', title: 'Vị trí công việc'},
        {type: 'date', dataField: 'ngay_toi', title: 'Ngày phỏng vấn/ nhận việc'},
        {type: 'time', dataField: 'gio_toi', title: 'Giờ phỏng vấn/ nhận việc'},
      ]
    };
    return tb;
  }

  createSentEmailTable() {
    const tb = {
      columns: [
        {type: '', dataField: 'dateSent', title: 'Thời gian'},
        {type: '', dataField: 'emailSent', title: 'Email gửi'},

      ]
    };
    return tb;
  }
}

const addPV = [
  'Số 130 đường 40, Khu định cư Tân Quy Đông, Phường Tân Phong, Quận 7, Tp.HCM',
  'Số 7 đường số 14, Phường Phước Bình, Quận 9, Tp.HCM',
  'Số 96/1D Hòa Bình, Phường Phú Trung, Quận Tân Phú, Tp.HCM',
  'Số 158/7/9 Hoàng Hoa Thám, Phường 12, Quận Tân Bình, Tp.HCM',
  'Số 169/5 Võ Thị Sáu, Phường 7, Quận 3, Tp.HCM',
  'Số 32/4 Bùi Đình Túy, Phường 12, Quận Bình Thạnh, Tp.HCM',
  'Số 7/5B Lý Tế Xuyên, Phường Linh Đông, Quận Thủ Đức, Tp.HCM',
  'Số 128 đường Huỳnh Thị Hai, Phường Tân Chánh Hiệp, Quận 12, Tp.HCM',
  'Số 473/20 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, Tp.HCM',
  'Số 66 Đường 218, Cao Lỗ, Phường 4, Quận 8, Tp.HCM'
];
