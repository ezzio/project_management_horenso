export class Library {
  constructor() {
  }
  createElement() {
    const element = {
      id: '',
      ten_tai_lieu: '',
      ma_tai_lieu: '',
      loai_tai_lieu: '',
      link_file: '',
      thoi_gian_upload: '',
      email_nguoi_tao: '',
      chi_nhanh: ''
    };
    return element;
  }
  createTable(){
    const table = {
      columns: [
        {type: '', dataField: 'ma_tai_lieu', title: 'Mã tài liệu', linkTo: '/api/auth/thuvien/detail/'},
        {type: 'select', dataField: 'loai_tai_lieu', title: 'Loại tài liệu', options: ['Quy trình', 'Quy định', 'Tài liệu hướng dẫn', 'Chính sách']},
        {type: 'text', dataField: 'ten_tai_lieu', title: 'Tên tài liệu'},
        {type: 'upload', dataField: 'link_file', title: 'Link file (file pdf hoặc file ảnh)'},
        {type: '', dataField: 'thoi_gian_upload', title: 'Thời gian đăng', formatDate: 'dd/MM/yyyy'},
        {type: '', dataField: 'email_nguoi_tao', title: 'Email người tạo'},
        {type: 'select', dataField: 'chi_nhanh', title: 'Chi nhánh', options: ['TIN', 'PNC']},
      ]
    };
    return table;
  }
}
