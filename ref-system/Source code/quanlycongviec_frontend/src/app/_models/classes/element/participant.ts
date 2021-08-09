export class RegistrationParticipant {
  constructor() {
  }

  createNewElement() {
    const element = {
      vi_tri_cong_viec: '',
      ngay_co_the_di_lam: '',
      thu_nhap_gan_nhat: '',
      thu_nhap_mong_muon: '',
      biet_thong_tin_qua: '',
      ho_ten_nguoi_gioi_thieu: '',
      email_nguoi_gioi_thieu: '',
      ho_va_ten: '',
      gioi_tinh: '',
      ngay_sinh: '',
      noi_sinh: '',
      chieu_cao: '',
      can_nang: '',
      tinh_trang_hon_nhan: '',
      dia_chi_theo_cmnd: '',
      tinh_thanh_theo_cmnd: '',
      quan_huyen_theo_cmnd: '',
      phuong_xa_theo_cmnd: '',
      dia_chi_tam_tru: '',
      phuong_xa_tam_tru: '',
      quan_huyen_tam_tru: '',
      tinh_thanh_tam_tru: '',
      so_cmnd_the_can_cuoc: '',
      ngay_cap: '',
      noi_cap: '',
      cmnd_hoac_can_cuoc: '',
      so_cmnd_cu: '',
      dan_toc: '',
      sdt: '',
      da_tung_lam_viec_fpt: '',
      ten_cty_da_lam: '',
      kinh_nghiem_lam_viec: '',
      chung_chi_chuyen_nganh: '',
      trinh_do_hoc_van: '',
      ngoai_ngu: ''
    };
    return element;
  }

  createGeneralInfoTable() {
    const table = {
      columns: [
        {type: 'select', dataField: 'vi_tri_cong_viec', title: 'Vị trí công việc', required: true},
        {
          type: 'sdate',
          dataField: 'ngay_co_the_di_lam',
          title: 'Ngày có thể đi làm',
          required: true,
          formatDate: 'dd/MM/yyyy',
          default: true,
        },
        {
          type: 'select', dataField: 'thu_nhap_gan_nhat', title: 'Thu nhập gần nhất',
          options: ['0.000.000', '1.000.000 - 3.000.000', '3.000.000 - 5.000.000', '5.000.000 - 7.000.000', '7.000.000 - 10.000.000', '10.000.000 - 15.000.000',
            '15.000.000 - 20.000.000', '> 20.000.000']
        },
        {
          type: 'select',
          dataField: 'thu_nhap_mong_muon',
          title: 'Thu nhập mong muốn',
          required: true,
          options: ['0.000.000', '1.000.000 - 3.000.000', '3.000.000 - 5.000.000', '5.000.000 - 7.000.000', '7.000.000 - 10.000.000', '10.000.000 - 15.000.000',
            '15.000.000 - 20.000.000', '> 20.000.000']
        },
        {type: 'select', dataField: 'biet_thong_tin_qua', title: 'Biết thông tin qua', options: nguonTD},
        // {type: 'text', dataField: 'nguon_khac', title: 'Nguồn khác'},
        {type: 'text', dataField: 'ho_ten_nguoi_gioi_thieu', title: 'Họ tên người giới thiệu'},
        {type: 'select', dataField: 'email_nguoi_gioi_thieu', title: 'Email người giới thiệu'},
      ]
    };
    return table;
  }

  createPrivateInfoTable() {
    const table = {
      columns: [
        {type: 'text', dataField: 'ho_va_ten', title: 'Họ và tên', required: true},
        {type: 'select', dataField: 'gioi_tinh', title: 'Giới tính', options: ['Nữ', 'Nam'], required: true},
        {
          type: 'sdate', dataField: 'ngay_sinh', title: 'Ngày sinh', required: true, formatDate: 'dd/MM/yyyy',
          default: true, minDate: minBirthDay, maxDate: maxBirthDay
        },
        {type: 'select', dataField: 'noi_sinh', title: 'Nơi sinh', required: true},
        {type: 'number', dataField: 'chieu_cao', title: 'Chiều cao (cm)'},
        {type: 'number', dataField: 'can_nang', title: 'Cân nặng (kg)'},
        {
          type: 'select',
          dataField: 'tinh_trang_hon_nhan',
          title: 'Tình trạng hôn nhân',
          options: ['Độc thân', 'Đã kết hôn', 'Ly thân', 'Goá'],
          required: true
        },
        {type: 'other'},
        {type: 'other'},
        {type: 'select', dataField: 'tinh_thanh_theo_cmnd', title: 'Tỉnh/TP (theo CMND)'},
        {type: 'select', dataField: 'quan_huyen_theo_cmnd', title: 'Quận/Huyện (theo CMND)'},
        {type: 'select', dataField: 'phuong_xa_theo_cmnd', title: 'Phường/Xã (theo CMND)'},
        {type: 'text', dataField: 'dia_chi_theo_cmnd', title: 'Số nhà, đường (theo CMND)'},
        {type: 'other'},
        {type: 'other'},
        {type: 'select', dataField: 'tinh_thanh_tam_tru', title: 'Tỉnh/T (tạm trú)'},
        {type: 'select', dataField: 'quan_huyen_tam_tru', title: 'Quận/Huyện (tạm trú)'},
        {type: 'select', dataField: 'phuong_xa_tam_tru', title: 'Phường/Xã (tạm trú)'},
        {type: 'text', dataField: 'dia_chi_tam_tru', title: 'Số nhà, đường (tạm trú)'},
        {type: 'other'},
        {type: 'other'},
        {type: 'select', dataField: 'cmnd_hoac_can_cuoc', title: 'CMND/Căn cước', options: ['CMND', 'Căn cước'], required: true},
        {type: 'text', dataField: 'so_cmnd_the_can_cuoc', title: 'Số CMND/Số căn cước', required: true},
        {type: 'sdate', dataField: 'ngay_cap', title: 'Ngày cấp', required: true, formatDate: 'dd/MM/yyyy', default: true},
        {type: 'select', dataField: 'noi_cap', title: 'Nơi cấp', required: true},
        {type: 'text', dataField: 'so_cmnd_cu', title: 'Số CMND cũ'},
        {type: 'other'},
        {type: 'select', dataField: 'dan_toc', title: 'Dân tộc', required: true},
        {type: 'number', dataField: 'sdt', title: 'Số điện thoại', validator: 10, required: true},
        // {type: 'text', dataField: 'email', title: 'Email'},
        {type: 'select', dataField: 'da_tung_lam_viec_fpt', title: 'Đã từng làm việc tại FPT', options: ['Có', 'Chưa']},
        {type: 'select', dataField: 'ten_cty_da_lam', title: 'Tên công ty'},
        {type: 'other'},
      ]
    };
    return table;
  }

  createPrivateInfoTableStandard() {
    const table = {
      columns: [
        {type: 'text', dataField: 'ho_va_ten', title: 'Họ và tên', required: true},
        {type: 'select', dataField: 'gioi_tinh', title: 'Giới tính', options: ['Nữ', 'Nam'], required: true},
        {
          type: 'sdate', dataField: 'ngay_sinh', title: 'Ngày sinh', required: true, formatDate: 'dd/MM/yyyy',
          default: true
        },
        {type: 'select', dataField: 'noi_sinh', title: 'Nơi sinh', required: true},
        {type: 'number', dataField: 'chieu_cao', title: 'Chiều cao (cm)'},
        {type: 'number', dataField: 'can_nang', title: 'Cân nặng (kg)'},
        {
          type: 'select',
          dataField: 'tinh_trang_hon_nhan',
          title: 'Tình trạng hôn nhân',
          options: ['Độc thân', 'Đã kết hôn', 'Ly thân', 'Goá'],
          required: true
        },
        {type: 'line', color: 'white'},
        {type: 'select', dataField: 'tinh_thanh_theo_cmnd', title: 'Tỉnh/TP (theo CMND)'},
        {type: 'select', dataField: 'quan_huyen_theo_cmnd', title: 'Quận/Huyện (theo CMND)'},
        {type: 'select', dataField: 'phuong_xa_theo_cmnd', title: 'Phường/Xã (theo CMND)'},
        {type: 'text', dataField: 'dia_chi_theo_cmnd', title: 'Số nhà, đường (theo CMND)'},
        {type: 'select', dataField: 'tinh_thanh_tam_tru', title: 'Tỉnh/TP (tạm trú)'},
        {type: 'select', dataField: 'quan_huyen_tam_tru', title: 'Quận/Huyện (tạm trú)'},
        {type: 'select', dataField: 'phuong_xa_tam_tru', title: 'Phường/Xã (tạm trú)'},
        {type: 'text', dataField: 'dia_chi_tam_tru', title: 'Số nhà, đường (tạm trú)'},
        {type: 'line', color: 'white'},
        {type: 'select', dataField: 'cmnd_hoac_can_cuoc', title: 'CMND/Căn cước',
          options: ['CMND', 'Căn cước'], required: true},
        {type: 'text', dataField: 'so_cmnd_the_can_cuoc', title: 'Số CMND/Số căn cước', required: true},
        {type: 'sdate', dataField: 'ngay_cap', title: 'Ngày cấp', required: true, formatDate: 'dd/MM/yyyy', default: true},
        {type: 'select', dataField: 'noi_cap', title: 'Nơi cấp', required: true},
        {type: 'text', dataField: 'so_cmnd_cu', title: 'Số CMND cũ'},
        {type: 'line', color: 'white'},
        {type: 'select', dataField: 'dan_toc', title: 'Dân tộc', required: true},
        {type: 'number', dataField: 'sdt', title: 'Số điện thoại', validator: 10, required: true},
        {type: 'select', dataField: 'da_tung_lam_viec_fpt', title: 'Đã từng làm việc tại FPT', options: ['Có', 'Chưa']},
        {type: 'select', dataField: 'ten_cty_da_lam', title: 'Tên công ty'},
        {type: 'other'},
      ]
    };
    return table;
  }

  createBHElement() {
    return {
      tham_gia_bao_hiem: '',
      so_ho_khau: '',
      chu_ho: '',
      ngay_sinh_chu_ho: '',
      cmnd_chu_ho: '',
      so_so_bhxh: '',
      so_to_roi: '',
      da_nhan_bhxh_1_lan: '',
      dang_nhan_tro_cap: ''
    };
  }

  createBHTable() {
    const tb = {
      columns: [
        {type: 'select', dataField: 'tham_gia_bao_hiem', title: 'Tình trạng BHXH', options: ['Chưa từng tham gia', 'Đã từng tham gia']},
        // {type: 'checkbox', dataField: 'da_tham_gia_bao_hiem', title: 'Đã từng tham gia'},
        {type: 'text', dataField: 'so_ho_khau', title: 'Số sổ hộ khẩu', disabled: false},
        {type: 'text', dataField: 'chu_ho', title: 'Họ và tên chủ hộ', disabled: false},
        {type: 'sdate', dataField: 'ngay_sinh_chu_ho', title: 'Ngày sinh chủ hộ', disabled: false, default: true},
        {type: 'text', dataField: 'cmnd_chu_ho', title: 'CMND chủ hộ', disabled: false},
        {type: 'text', dataField: 'so_so_bhxh', title: 'Số sổ BHXH', disabled: false},
        {type: 'text', dataField: 'so_to_roi', title: 'Số tờ rời', disabled: false},
        {type: 'text', dataField: 'da_nhan_bhxh_1_lan', title: 'Đã nhận BHXH 01 lần'},
        {type: 'text', dataField: 'dang_nhan_tro_cap', title: 'Đang nhận trợ cấp BHTN'},
      ]
    };
    return tb;
  }

  createFamilyElement() {
    const el = [{
      ho_ten: '',
      ngay_sinh: '',
      cmnd: '',
      quan_he: '',
      nghe_nghiep: ''
    }];
    return el;
  }

  createFamilyInfoTable() {
    const table = {
      columns: [
        {type: '', dataField: 'ho_va_ten', title: 'Họ và tên'},
        {type: 'sdate', dataField: 'ngay_sinh', title: 'Ngày sinh', default: true},
        {type: 'text', dataField: 'cmnd', title: 'CMND'},
        {type: 'text', dataField: 'quan_he', title: 'Quan hệ'},
        {type: 'text', dataField: 'nghe_nghiep', title: 'Nghề nghiệp'},
      ]
    };
    return table;
  }

  createDegreeElement() {
    const el = [{
      nam_tot_nghiep: '',
      truong: '',
      chuyen_nganh: '',
      bang_cap: '',
      xep_loai: '',
    }];
    return el;
  }

  createDegreeInfoTable() {
    const table = {
      columns: [
        {type: 'select', dataField: 'truong', title: 'Trường', placeholder: 'Tên trường', required: true},
        {
          type: 'select', dataField: 'chuyen_nganh', title: 'Chuyên ngành',
          placeholder: ' Chuyên ngành', required: true},
        {type: 'select', dataField: 'bang_cap', title: 'Bằng cấp', options: heTN, placeholder: 'Bằng cấp'
        },
        {
          type: 'select',
          dataField: 'xep_loai',
          title: 'Xếp loại',
          options: ['Giỏi', 'Khá', 'Trung bình khá', 'Trung bình'],
          placeholder: 'Xếp loại',
          required: true
        },
        {
          type: 'text',
          dataField: 'nam_tot_nghiep',
          title: 'Năm',
          classText: 'text-form-table',
          placeholder: 'Năm(vd: 2020)',
          required: true
        },
      ]
    };
    return table;
  }

  createCertificateElement() {
    const el = [{
      thoi_gian: '',
      ten_chung_chi: '',
      noi_dao_tao: '',
      diem_xep_loai: '',
    }];
    return el;
  }

  createCertificateInfoTable() {
    const table = {
      columns: [
        {type: 'text', dataField: 'thoi_gian', title: 'Thời gian', placeholder: 'Thời gian'},
        {type: 'text', dataField: 'ten_chung_chi', title: 'Chứng chỉ',  placeholder: 'Chứng chỉ'},
        {type: 'text', dataField: 'noi_dao_tao', title: 'Nơi đào tạo', placeholder: 'Nơi đào tạo'},
        {type: 'text', dataField: 'diem_xep_loai', title: 'Điểm/ Xếp loại', placeholder: 'Điểm/ Xếp loại'},
      ]
    };
    return table;
  }

  createLanguageElement() {
    const el = [{
      ngoai_ngu: '',
      nghe: '',
      noi: '',
      doc: '',
      viet: '',
      chung_chi: ''
    }];
    return el;
  }

  createLanguageInfoTable() {
    const table = {
      columns: [
        {type: 'text', dataField: 'ngoai_ngu', title: 'Ngoại ngữ', placeholder: 'Ngoại ngữ'},
        {type: 'text', dataField: 'nghe', title: 'Nghe',  placeholder: 'Nghe'},
        {type: 'text', dataField: 'noi', title: 'Nói', placeholder: 'Nói'},
        {type: 'text', dataField: 'doc', title: 'Đọc',  placeholder: 'Đọc'},
        {type: 'text', dataField: 'viet', title: 'Viết', placeholder: 'Viết'},
        {
          type: 'text',
          dataField: 'chung_chi',
          title: 'Chứng chỉ (TOEIC 500, IELTS 6.0, ...)',
          placeholder: 'Chứng chỉ (TOEIC 500, IELTS 6.0, ...)'
        },
      ]
    };
    return table;
  }

  createExperienceElement() {
    const el = [{
      thoi_gian: '',
      ten_cong_ty: '',
      vi_tri: '',
      mo_ta_ngan_gon_cong_viec: '',
      muc_luong: '',
      ly_do_nghi_viec: ''
    }];
    return el;
  }

  createExperienceTable() {
    const table = {
      columns: [
        {type: 'text', dataField: 'thoi_gian', title: 'Thời gian', placeholder: 'Thời gian'},
        {type: 'text', dataField: 'ten_cong_ty', title: 'Tên công ty', placeholder: 'Tên công ty'},
        {type: 'text', dataField: 'vi_tri', title: 'Vị trí', placeholder: 'Vị trí'},
        {
          type: 'text',
          dataField: 'mo_ta_ngan_gon_cong_viec',
          title: 'Mô tả ngắn gọn công việc (< 200từ)',
          placeholder: 'Mô tả ngắn gọn công việc',
        },
        {type: 'text', dataField: 'muc_luong', title: 'Mức lương', placeholder: 'Mức lương'},
        {type: 'text', dataField: 'ly_do_nghi_viec', title: 'Lý do nghỉ việc', placeholder: 'Lý do nghỉ việc'}
      ]
    };
    return table;
  }

  createTinHocElement() {
    const el = [{
      ky_nang_tin_hoc: '',
      mo_ta_ky_nang: ''
    }];
    return el;
  }

  createTinHocTable() {
    const table = {
      columns: [
        {type: 'text', title: 'Kỹ năng tin học', dataField: 'ky_nang_tin_hoc'},
        {type: 'text', title: 'Mô tả', dataFields: 'mo_ta_ky_nang'},
      ]
    };
    return table;
  }

  createInternInfoTable() {
    const table = {
      columns: [
        {type: 'text', dataField: 'ho_va_ten', title: 'Họ và tên', placeholder: 'In hoa chữ cái đầu'},
        {type: 'text', dataField: 'email', title: 'Email'},
        {type: 'select', dataField: 'biet_thong_tin_qua', title: 'Nguồn tuyển dụng', options: nguonTD},
        {type: 'select', dataField: 'vi_tri_cong_viec', title: 'Vị trí thực tập'},
        {type: 'sdate', dataField: 'ngay_sinh', title: 'Ngày sinh'},
        {type: 'select', dataField: 'gioi_tinh', title: 'Giới tính', options: ['Nam', 'Nữ']},
        {type: 'select', dataField: 'quan_huyen_tam_tru', title: 'Nơi ở hiện nay'},
      ]
    };
    return table;
  }
  createInternElement(){
    return {
      ho_va_ten: '',
      email: '',
      biet_thong_tin_qua: '',
      vi_tri_cong_viec: '',
      he_TN: '',
      ngay_sinh: '',
      gioi_tinh: '',
      ten_truong: '',
      chuyen_nganh: '',
      quan_huyen_tam_tru: ''
    };
  }
}

export const nguonTD = [
  'Timviecnhanh',
  'Vieclam24h',
  'Careerlink',
  'Careerbuilder',
  'Fptjobs',
  'Facebook',
  'viectotnhat',
  'TopCV',
  'Giới thiệu nội bộ',
  'Nhà trường',
  'Ngày hội việc làm',
  'Thực tập',
  'Nhân viên cũ',
  'Website công ty',
  'Khác',
];
export const heTN = [
  'THPT', 'Trung cấp', 'Cao Đẳng', 'Đại học', 'Thạc sĩ', 'Tiến sĩ'
];

const minBirthDay = {year: 1900, month: 1, day: 1};
const maxBirthDay = {year: 2000, month: 1, day: 1};

export const contentJD = [
  {shortname: 'nvkt', job: 'Nhân viên kỹ thuật', content: 'nhanvienkythuat.txt'},
  {shortname: 'xlsc', job: 'Nhân viên xử lý sự cố', content: 'nhanvienxulysuco.txt'},
  {shortname: 'onsite', job: 'Kỹ thuật viên Onsite', content: 'kythuatvienonsite.txt'},
  {shortname: 'indo', job: 'Kỹ thuật viên INDO', content: 'kythuatvienindo.txt'},
  {shortname: 'testtb', job: 'Kỹ thuật viên test thiết bị', content: 'kythuatvientest.txt'},
  {shortname: 'dh', job: 'Kỹ thuật viên điều hành', content: 'kythuatviendieuhanh.txt'},
  {shortname: 'qldt', job: 'Nhân viên quản lý đào tạo', content: 'nhanvienquanlydaotao.txt'},
  {shortname: 'nvns', job: 'Nhân viên nhân sự', content: 'nhanviennhansu.txt'},
  {shortname: 'ttnb', job: 'Nhân viên truyền thông nội bộ', content: 'nhanvientruyenthong.txt'},
  {shortname: 'qlcl', job: 'Nhân viên quản lý chất lượng', content: 'nhanvienquanlychatluong.txt'},
  {shortname: 'ctvtt', job: 'Cộng tác viên truyền thông', content: 'congtacvientruyenthong.txt'},
  {shortname: 'ctvtd', job: 'Cộng tác viên tuyển dụng', content: 'congtacvientuyedung.txt'},
  {shortname: 'ctvns', job: 'Cộng tác viên nhân sự', content: 'contacviennhansu.txt'},
  {shortname: 'ttsns', job: 'Thực tập sinh nhân sự', content: 'thuctapsinhnhansu.txt'},
  {shortname: 'ttskt', job: 'Thực tập sinh kỹ thuật', content: 'thuctapsinhkythuat.txt'},
];

export const mailTemp = [
  {nameMail: 'Mẫu mail mời phỏng vấn - PNC', content: 'mpvpnc'},
  {nameMail: 'Mẫu mail trúng tuyển - PNC', content: 'mttpnc'},
  {nameMail: 'Mẫu mail mời phỏng vấn - TIN', content: 'mpvtin'},
  {nameMail: 'Mẫu mail trúng tuyển - TIN', content: 'mtttin'},
  {nameMail: 'Mẫu mail nhắc lịch phỏng vấn - PNC', content: 'npvpnc'},
  {nameMail: 'Mẫu mail nhắc lịch phỏng vấn - TIN', content: 'npvtin'},
];

