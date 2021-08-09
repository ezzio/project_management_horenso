export const ContractList = ['HĐLĐ Xác định thời hạn 12T', 'HĐLĐ Không xác định thời hạn', 'HĐLĐ XĐTH trên 12T đến 36T', 'Hợp đồng khoán (TIN/PNC)',
    'Hợp đồng Đào tạo nghề', 'Hợp đồng Thử việc', 'Chưa có hợp đồng'];

export const JobTitle = ['CB Kỹ thuật TKBT', 'Kỹ Thuật viên Điều hành', 'CB Thu cước', 'CB Kỹ thuật hạ tầng', 'CB Hỗ trợ KH qua tổng đài',
    'CB Hỗ trợ kỹ thuật từ xa', 'Giảng viên nội bộ', 'CB Hỗ trợ kỹ thuật tại nhà KH', 'CB Kỹ thuật FTTH', 'CB Xử lý sự cố',
    'CB Quản lý CB 1', 'Giao dịch viên', 'Phó phòng kỹ thuật', 'CB Quản lý thuê bao', 'Trưởng phòng kỹ thuật', 'Thanh tra viên', 'TTEC01',
    'CB Kiểm tra thiết bị', '0', 'CB Đảm bảo chất lượng 1', 'CB Kế toán 1', 'CB Khảo sát thiết kế hạ tầng', 'Quản lý USER', 'CB Quản lý nghiệp vụ thuê bao',
    'IFTO01', 'QL Triển khai bảo trì thuê bao', '', 'Nhân viên', 'CB Tuyển dụng 1', 'Chức danh khác', 'CB Truyền thông nội bộ 1', 'CB Hành chính tổng hợp',
    'CB Quản lý đào tạo', 'CB Thiết kế 1', 'CB Hành chính nhân sự', 'CB Quản trị hành chính hạ tầng', 'Thủ kho', 'CB Bảo hiểm', 'CB Lập trình 1', 'CB Hoàn ứng vật tư',
    'Phụ kho', 'CB Kinh doanh',
    'CB Vận hành dự án', 'CB Điều hành hệ thống mạng', 'BICO01', 'CB Quản lý CB'
];

export class EmployeeClass{
    createEmployeeItem() {
        const employeeItem = {
            emp_name: '',
            emp_code: '',
            email: '',
            birthday: '',
            day: '',
            month: '',
            year: '',
            job_title: '',
            child_depart: '',
            mobile_phone: '',
            mstcn: '',
            dependent_info: '',
            contract_type: '',
            contract_begin: '',
            contract_end: '',
            account_number: '',
            type_salary: '',
            sex: '',
            status_working: 0,
            cmnd: '',
            date_join_company: '',
            date_quit_job: '',
        };
        return employeeItem;
    }

    createTableEmployee() {
        const tableEmployee = {
            columns: [
                {
                    type: 'text',
                    title: 'Họ và tên',
                    dataField: 'emp_name',
                    nameClass: ['sticky-col', 'second-col-nonefrt'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'text',
                    title: 'Mã nhân viên',
                    dataField: 'emp_code',
                    nameClass: ['sticky-col', 'third-col-nonefrt'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'date',
                    title: 'Ngày sinh',
                    dataField: 'birthday',
                    default: 1,
                    nameClass: ['sticky-col', 'forth-col-nonefrt'],
                    placeholder: '',
                    optionFilter: []
                },
                {type: 'text', title: 'Số CMND', dataField: 'cmnd', placeholder: '', optionFilter: []},
                {type: 'textfix', title: 'Email', dataField: 'email', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Chuyên môn', dataField: 'job_title', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Giới tính', dataField: 'sex', options: ['M', 'F'], placeholder: '', optionFilter: []},
                {type: 'select', title: 'Loại hợp đồng', dataField: 'contract_type', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Bộ phận', dataField: 'child_depart', placeholder: '', optionFilter: []},
                {type: 'text', title: 'Điện thoại', dataField: 'mobile_phone', placeholder: '', optionFilter: []},
                {type: 'text', title: 'MST TNCN', dataField: 'mstcn', placeholder: '', optionFilter: []},
                {type: 'date', title: 'Ngày bắt đầu hợp đồng', dataField: 'contract_begin', default: 1, placeholder: '', optionFilter: []},
                {type: 'date', title: 'Ngày kết thúc hợp đồng', dataField: 'contract_end', default: 1, placeholder: '', optionFilter: []},
                // {type: 'text', title: 'Số tài khoản', dataField: 'account_number', placeholder: '', optionFilter: []},
                // {type: 'select', title: 'Loại lương', dataField: 'type_salary', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Trạng thái làm việc', dataField: 'status_working', options: [1, 0], placeholder: '', optionFilter: []},
                {type: 'date', title: 'Ngày vào Cty', dataField: 'date_join_company', default: 1, placeholder: '', optionFilter: []},
                {type: 'date', title: 'Ngày nghỉ việc', dataField: 'date_quit_job', default: 1, placeholder: '', optionFilter: []},
            ]
        };
        return tableEmployee;
    }
}
