export const  NewsItem = {
  tin_tuc_id: '',
  muc_luc: '',
  tieu_de: '',
  tac_gia: '',
  ngay_dang_bai: '',
  tom_tat: '',
  hinh_anh: '',
  noi_dung: '',
  nguon: '',
  link: '',
  chi_nhanh: '',
  hieu_luc: 0,
  noi_bo: 0
};
export const listCategory = ['Bạn đọc viết', 'Trang chủ', 'Thông báo', 'Tuyển dụng', 'Phong trào', 'Góc kỹ thuật', 'Góc đào tạo', 'Quy trình - quy định'];
export const listCategoryEng = ['bandocviet', 'trangchu', 'thongbao', 'tuyendung', 'phongtrao', 'kythuat', 'daotao', 'quytrinhquydinh'];
export const TableNews = {
  columns: [
    {type: 'select', title: 'Chi nhánh', dataField: 'chi_nhanh', options: ['PNC', 'TIN'], optionFilter: []},
    {type: 'select', title: 'Tuỳ chỉnh hiển thị', dataField: 'noi_bo', options: ['Công khai', 'Nội bộ'], optionFilter: []},
    {type: 'select', title: 'Mục', dataField: 'muc_luc', options: listCategory, optionFilter: []},
    {type: 'uploadImage', title: 'Ảnh bìa (Chọn ảnh khổ ngang)', dataField: 'hinh_anh', optionFilter: []},
    {type: 'text', title: 'Tiêu đề', dataField: 'tieu_de', optionFilter: []},
    {type: 'textarea', title: 'Tóm tắt', dataField: 'tom_tat', optionFilter: []},
    {type: '', title: 'Tác giả', dataField: 'tac_gia', optionFilter: []},
    {type: '', title: 'Thời gian', dataField: 'ngay_dang_bai', formatDate: 'dd/MM/yyyy'},
    {type: '', title: 'Nội dung', dataField: 'noi_dung', optionFilter: []},
  ]
};
export const TablePNCNews = {
  columns: [
    {type: 'select', title: 'Mục', dataField: 'muc_luc', options: ['Tin tức', 'Sự kiện'], optionFilter: []},
    {type: 'uploadImage', title: 'Ảnh bìa (Chọn ảnh khổ ngang)', dataField: 'hinh_anh', optionFilter: []},
    {type: 'text', title: 'Tiêu đề', dataField: 'tieu_de', optionFilter: []},
    {type: 'textarea', title: 'Tóm tắt', dataField: 'tom_tat', optionFilter: []},
    {type: '', title: 'Tác giả', dataField: 'tac_gia', optionFilter: []},
    {type: '', title: 'Thời gian', dataField: 'ngay_dang_bai', formatDate: 'dd/MM/yyyy'},
    {type: '', title: 'Nội dung', dataField: 'noi_dung', optionFilter: []},
  ]
};
export const TableNewsSmall = {
  columns: [
    {type: 'select', title: 'Mục', dataField: 'muc_luc', options: listCategory, optionFilter: []},
    {type: 'text', title: 'Tiêu đề', dataField: 'tieu_de', optionFilter: []},
    {type: '', title: 'Tác giả', dataField: 'tac_gia', optionFilter: []},
    {type: '', title: 'Thời gian', dataField: 'ngay_dang_bai', formatDate: 'dd/MM/yyyy'},
  ]
};

export const TableImage = {
  columns: [
    {type: '', title: 'Stt', dataField: 'anh_id', optionFilter: []},
    {type: '', title: 'Ảnh', dataField: 'anh', optionFilter: []},
  ]
};
