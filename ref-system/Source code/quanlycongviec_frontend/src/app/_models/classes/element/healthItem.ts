export class AddCovid19 {
  constructor() {
  }
  addCovid19Item(){
    const el = {
      address: '',
      city: ''
    };
    return el;
  }
  tableAddCovid19(){
    const tableAddCovid19 = {
      columns: [
        {type: 'text', title: 'Địa chỉ', dataField: 'address', optionFilter: []},
        {type: 'text', title: 'Thành phố', dataField: 'city', optionFilter: []},
        {type: 'text', title: 'Vĩ độ', dataField: 'latitude', optionFilter: []},
        {type: 'text', title: 'Kinh độ', dataField: 'longitude', optionFilter: []}
      ]
    };
    return tableAddCovid19;
  }
}

