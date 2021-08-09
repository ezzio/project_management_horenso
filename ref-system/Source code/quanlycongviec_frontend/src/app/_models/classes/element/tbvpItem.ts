export class TbvpClass {
  constructor() {
  }
  createNewElement(){
    const tbvpElement = {
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
    return tbvpElement;
  }
  createNewTable(){
    const tableTbvp = {
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
    return tableTbvp;
  }
  createNewDetailElement(){
    const tbList = [{
      thietbi: '',
      donvi: '',
      soluong: '',
      hinh: '',
      ngsudung: '',
      note: ''
    }];
    return tbList;
  }

  createNewDetailTable(){
    const tableTbvpDetail = {
      columns: [
        {title: 'Thiết bị', dataField: 'thietbi'},
        {title: 'DVT', dataField: 'donvi'},
        {title: 'Số lượng', dataField: 'soluong'},
        {title: 'Hình', dataField: 'hinh'},
        {title: 'Người sử dụng', dataField: 'ngsudung'},
      ]
    };
    return tableTbvpDetail;
  }
}
