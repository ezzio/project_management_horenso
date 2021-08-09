export const LocationElement = {
  emp_code: '',
  MBN_account_name: '',
  acctive_time: '',
  ban_kinh_lam_viec: '',
  device_id: '',
  toa_do_kho: '',
  toa_do_lam_viec: '',
  toa_do_van_phong: ''
};
export class LocationClass {
  constructor() {
  }
  createNewElement(){
    const locationElement = {
      emp_code: '',
      MBN_account_name: '',
      acctive_time: '',
      ban_kinh_lam_viec: '',
      device_id: '',
      toa_do_kho: '',
      toa_do_lam_viec: '',
      toa_do_van_phong: ''
    };
    return locationElement;
  }
  createNewTb() {
    const tableLocation = {
      columns: [
        {type: 'text', title: 'Mã nhân viên', dataField: 'emp_code', placeholder: ''},
        {type: 'text', title: 'Account PCTU', dataField: 'MBN_account_name', placeholder: ''},
        {type: 'text', title: 'Device Id', dataField: 'device_id', placeholder: ''},
        {type: 'text', title: 'Toạ độ văn phòng', dataField: 'toa_do_van_phong', placeholder: ''},
        {type: 'text', title: 'Toạ độ kho', dataField: 'toa_do_kho', placeholder: ''},
        {type: 'other'},
        {type: 'text', title: 'Toạ độ tâm làm việc', dataField: 'toa_do_lam_viec', placeholder: 'vd: 10.7405799,106.7289921'},
        {type: 'text', title: 'Bán kính làm việc', dataField: 'ban_kinh_lam_viec', placeholder: 'DVT: met'},
        {type: 'other'},
      ]
    };
    return tableLocation;
  }
}

