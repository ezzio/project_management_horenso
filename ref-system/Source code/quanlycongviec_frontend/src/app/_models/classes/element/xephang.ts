export class XepHangClass {
  constructor() {
  }

  createElement() {
    const el = {
      emp_code: '',
      thang: '',
      nam: '',
      dung_hen: '',
      cl7n: '',
      nang_suat_co_he_so: '',
      csat: '',
      tong_so_mon: '',
      tong_diem_cac_mon: '',
      tong_kien_thuc: '',
      tong_diem_kien_thuc: '',
      diem_thi_dua: '',
      diem_khen_thuong: '',
      diem_ky_luat: '',
    };
    return el;
  }

  createTable() {
    const tb = {
      columns: [
        {type: 'textfix', title: 'Tháng', dataField: 'thang', nameClass: ['sticky-col', 'xephangTb'],},
        {type: 'textfix', title: 'Năm', dataField: 'nam', nameClass: ['sticky-col', 'xephangTb'],},
        {type: 'textfix', title: 'Mã NV', dataField: 'emp_code', nameClass: ['sticky-col', 'xephangTb'],},
        {type: 'text', title: 'Đúng hẹn', dataField: 'dung_hen'},
        {type: 'text', title: 'CL7N', dataField: 'cl7n'},
        {type: 'text', title: 'Năng suất có hệ số', dataField: 'nang_suat_co_he_so'},
        {type: 'text', title: 'CSAT thái độ nhân viên', dataField: 'csat'},
        {type: 'text', title: 'Tổng số môn', dataField: 'tong_so_mon'},
        {type: 'text', title: 'Tổng điểm các môn', dataField: 'tong_diem_cac_mon'},
        {type: 'text', title: 'Tổng kiến thức', dataField: 'tong_kien_thuc'},
        {type: 'text', title: 'Tổng điểm kiến thức', dataField: 'tong_diem_kien_thuc'},
        {type: 'text', title: 'Điểm thi đua', dataField: 'diem_thi_dua'},
        {type: 'text', title: 'Điểm khen thưởng', dataField: 'diem_khen_thuong'},
        {type: 'text', title: 'Điểm kỷ luật', dataField: 'diem_ky_luat'},
      ]
    };
    return tb;
  }
}
