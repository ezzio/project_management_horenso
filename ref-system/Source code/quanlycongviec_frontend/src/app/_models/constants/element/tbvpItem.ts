export const TbvpElement = {
  truongBP: '',
  ng_gui: '',
  chuc_danh_ng_gui: '',
  noi_ct_ng_gui: '',
  ng_nhan: '',
  chuc_danh_ng_nhan: '',
  noi_ct_ng_nhan: '',
  ly_do: '',
  cap_moi_cap_doi: ''
};
export const TbList = [{
  thietbi: '',
  donvi: '',
  soluong: '',
  hinh: '',
  ngsudung: '',
  note: ''
}];
export const TableTbvp = {
  columns: [
    {type: 'text', title: 'Họ tên người đặt', dataField: 'senderName'},
    {type: 'text', title: 'Nơi công tác', dataField: 'senderPlace'},
    {type: 'text', title: 'Chức danh', dataField: 'senderJob'},
    {type: 'text', title: 'Họ tên người nhận', dataField: 'receiverName'},
    {type: 'text', title: 'Nơi công tác', dataField: 'receiverPlace'},
    {type: 'text', title: 'Chức danh', dataField: 'receiverJob'},
    {type: 'text', title: 'Trưởng bộ phận xác nhận', dataField: 'truongBP'},
    {type: 'select', title: 'Tình trạng', dataField: 'changeOrNew', options: ['Cấp Đổi', 'Cấp Mới']},
    {type: 'text', title: 'Lý do', dataField: 'reason'},
  ],
};
export const TableTbvpDetail = {
  columns: [
    {title: 'Thiết bị', dataField: 'thietbi'},
    {title: 'DVT', dataField: 'donvi'},
    {title: 'Số lượng', dataField: 'soluong'},
    {title: 'Hình', dataField: 'hinh'},
    {title: 'Người sử dụng', dataField: 'ngsudung'},
  ]
};
