export class GameClass {
  createElement() {
    const el = {
      email: '',
      ho_va_ten: '',
      so_vong_quay: ''
    };
    return el;
  }

  createTable() {
    const table = {
      columns: [
        {title: 'Email', dataField: 'email'},
        {title: 'Họ và tên', dataField: 'ho_va_ten'},
        {title: 'Số vòng quay', dataField: 'so_vong_quay'},
      ]
    };
    return table;
  }

  createPrizeElement() {
    const el = {
      so_tien: '',
      so_luong: ''
    };
    return el;
  }
  createPrizeTable() {
    const table = {
      columns: [
        {title: 'Giải thưởng', dataField: 'so_tien'},
        {title: 'Số lượng', dataField: 'so_luong'},
      ]
    };
    return table;
  }

  createInfoTable() {
    const table = {
      columns: [
        {title: 'Email', dataField: 'email'},
        {title: 'Họ và tên', dataField: 'ho_va_ten'},
        {title: 'Số vòng quay', dataField: 'so_vong_quay'},
        {title: 'Số vòng quay khả dụng', dataField: 'so_vong_kha_dung'},
        {title: 'Số vòng quay đã quay', dataField: 'so_vong_da_quay'},
      ]
    };
    return table;
  }


}
