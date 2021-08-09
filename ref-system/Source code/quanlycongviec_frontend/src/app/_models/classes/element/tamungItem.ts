export class TamUngClass {
  constructor(){}
  createNewElement(){
    const tamungElement = {
      task_id: '',
      task_time: '',
      ngay_tao: '',
      ng_tao: '',
      bp_ng_tao: '',
      ng_quan_ly: '',
      ng_dang_duyet: '',
      noi_dung_de_xuat: '',
      file_dinh_kem: '',
      so_tien: '',
      so_tien_bang_chu: '',
      ghi_chu: '',
      ng_huong_loi: '',
      ngan_hang: '',
      chi_nhanh_ngan_hang: '',
      su_dung: '',
      nguon_su_dung: '',
      step: '',
      result: ''
    };
    return tamungElement;
  }
  createNewDetail(){
    const tamungDetailList = [{
      type: '',
      content: '',
      donvi: '',
      soluong: '',
      dongia: '',
      thanhtien: ''
    }];
    return tamungDetailList;
  }
  createTableTamUng(){
    const tableTamung = {
      columns: [
        { type: '', title: 'Số đơn', dataField: 'task_time', placeholder: '', optionFilter: [], shortTable: true,
          // linkTo: '/api/auth/hanhchinh/tbvp/tamung/',
          stickyCol: true,
          widthCustom: 'w-90',
          openButton: true
        },
        {type: '', title: 'Người tạo đơn ', dataField: 'ng_tao', optionFilter: [], shortTable: true, widthCustom: 'w-90' },
        {type: '', title: 'Ngày tạo', dataField: 'ngay_tao', formatDate: 'dd/MM/yyyy', optionFilter: [], shortTable: true},
        {type: '', title: 'BP người tạo đơn', dataField: 'bp_ng_tao', optionFilter: []},
        {type: 'text', title: 'Email trưởng bộ phận', dataField: 'ng_quan_ly', optionFilter: []},
        {type: 'text', title: 'Nội dung đề xuất', dataField: 'noi_dung_de_xuat', optionFilter: [], shortTable: true},
        {type: 'upload', title: 'File đính kèm', dataField: 'file_dinh_kem', notShowInEmail: true, linkDownload: 'file', optionFilter: []},
        {type: 'currency', title: 'Số tiền', dataField: 'so_tien', formatCurrency: 'VND', optionFilter: [], shortTable: true},
        {type: '', title: 'Số tiền bằng chữ', dataField: 'so_tien_bang_chu', optionFilter: []},
        {type: 'text', title: 'Ghi chú', dataField: 'ghi_chu', optionFilter: []},
        {type: '', title: 'Bước', dataField: 'step', placeholder: '', notShowInEmail: true, optionFilter: [], shortTable: true, widthCustom: 'w-90'},
        {type: '', title: 'Status', dataField: 'result', placeholder: '', notShowInEmail: true, optionFilter: [], shortTable: true, widthCustom: 'w-90'},
      ],
    };
    return tableTamung;
  }
}
// export const TableTamung = {
//   columns: [
//     {type: '', title: 'Người tạo đơn ', dataField: 'ng_tao', nameClass: ['sticky-col', 'second-col-nonefrt'], optionFilter: [] },
//     {type: '', title: 'Ngày tạo', dataField: 'ngay_tao', formatDate: 'dd/MM/yyyy', nameClass: ['sticky-col', 'third-col-nonefrt'], optionFilter: []},
//     {type: '', title: 'BP người tạo đơn', dataField: 'bp_ng_tao', nameClass: ['sticky-col', 'forth-col-nonefrt'], optionFilter: []},
//     {type: 'text', title: 'Email trưởng bộ phận', dataField: 'ng_quan_ly', optionFilter: []},
//     {type: 'text', title: 'Nội dung đề xuất', dataField: 'noi_dung_de_xuat', optionFilter: []},
//     {type: 'upload', title: 'File đính kèm', dataField: 'file_dinh_kem', notShowInEmail: true, linkDownload: 'file', optionFilter: []},
//     {type: 'text', title: 'Số tiền', dataField: 'so_tien', formatCurrency: 'VND', optionFilter: []},
//     {type: '', title: 'Số tiền bằng chữ', dataField: 'so_tien_bang_chu', optionFilter: []},
//     {type: 'text', title: 'Ghi chú', dataField: 'ghi_chu', optionFilter: []},
//     {type: '', title: 'Bước', dataField: 'step', placeholder: '', notShowInEmail: true, optionFilter: []},
//     {type: '', title: 'Status', dataField: 'result', placeholder: '', notShowInEmail: true, optionFilter: []},
//   ],
// };
export const TableTamungDetail = {
  columns: [
    {title: 'Loại', dataField: 'type', optionFilter: []},
    {title: 'Nội dung', dataField: 'content', optionFilter: []},
    {title: 'DVT', dataField: 'donvi', optionFilter: []},
    {title: 'Số lượng', dataField: 'soluong', optionFilter: []},
    {title: 'Đơn giá', dataField: 'dongia', optionFilter: []},
    {title: 'Thành tiền', dataField: 'thanhtien', optionFilter: []},
  ]
};
