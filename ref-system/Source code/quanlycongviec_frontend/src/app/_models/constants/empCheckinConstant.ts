export interface EmpCheckinInterface {
  checkin_id: number;
  MBN_account_name: string;
  emp_code: string;
  checkin_date: string;
  checkin_time: string;
  checkin_day: string;
  checkin_month: string;
  checkin_year: string;
  sheet_time: string;
  workday_factor: string;
  block_name: string;
  checkin_success: string;
  location: string;
  team_name: string;
  emp_name: string;
  email: string;
  note: string;
}
export const EmpCheckinConstant = {
  checkin_id: '',
  MBN_account_name: '',
  emp_code: '',
  checkin_date: '',
  checkin_time: '',
  checkin_day: '',
  checkin_month: '',
  checkin_year: '',
  sheet_time: '',
  workday_factor: '',
  block_name: '',
  checkin_success: '',
  location: '',
  team_name: '',
  emp_name: '',
  note: '',
  workday_convert: ''
};
