export const UnionElement = {
  date: '',
  region: '',
  block_name: '',
  content: '',
  month: '',
  amount: '',
  note: '',
};
export const TableUnion = {
  columns: [
    {type: 'datetime', title: 'Ngày', dataField: 'date'},
    {type: '', title: 'Vùng', dataField: 'region'},
    {type: '', title: 'Tên Block', dataField: 'block_name'},
    {type: 'text', title: 'Nội dung', dataField: 'content'},
    {type: 'text', title: 'Ghi chú', dataField: 'note'},
    {type: 'text', title: 'Thành tiền', dataField: 'amount'},
  ]
};
