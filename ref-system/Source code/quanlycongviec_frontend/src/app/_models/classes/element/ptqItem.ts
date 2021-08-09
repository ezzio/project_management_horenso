export class PTQClass {
    constructor() {
    }
    createPTQItem(){
        const ptqItem = {
            ptq_id: '',
            region: '',
            partner: '',
            block_name: '',
            emp_name: '',
            MBN_account_name: '',
            emp_code: '',
            contract: '',
            date_complete: '',
            duration_check: '',
            date_check: '',
            error_type: '',
            error_group: '',
            error_main: '',
            error_description: '',
            error_detail: '',
            error_number: '',
            explanation: '',
            recorded: '',
            punishment: '',
            deadline: '',
        };
        return ptqItem;
    }
    createTablePTQ() {
        const tb = {
            columns: [
                {type: '', title: 'Vùng', dataField: 'region', stickyCol: true, optionFilter: [], widthCustom: 'w-90'},
                {type: '', title: 'Chi nhánh', dataField: 'partner', stickyCol: true, optionFilter: [], widthCustom: 'w-90'},
                {type: '', title: 'Block', dataField: 'block_name', stickyCol: true,  optionFilter: [], widthCustom: 'w-90'},
                {type: '', title: 'Nhân viên', dataField: 'emp_name', stickyCol: true,  optionFilter: [], widthCustom: 'w-160'},
                {type: '', title: 'Acct', dataField: 'MBN_account_name', stickyCol: true,  optionFilter: [], widthCustom: 'w-160'},
                {type: '', title: 'MNV', dataField: 'emp_code', stickyCol: true, optionFilter: [], widthCustom: 'w-90'},
                {type: 'text', title: 'SHD', dataField: 'contract', stickyCol: true, optionFilter: [], widthCustom: 'w-90'},
                {type: 'text', title: 'Loại phiếu (PTC-CL)', dataField: 'error_type', optionFilter: [], widthCustom: 'w-90'},
                {type: 'sdatetime', title: 'Ngày hoàn tất', dataField: 'date_complete', formatDate: 'dd/MM/yyyy', optionFilter: []},
                {type: 'text', title: 'Kỳ kiểm soát', dataField: 'duration_check', optionFilter: [], widthCustom: 'w-160'},
                {type: 'sdate', title: 'Ngày kiểm soát', dataField: 'date_check', formatDate: 'dd/MM/yyyy', optionFilter: []},
                {type: 'select', title: 'Nhóm lỗi', dataField: 'error_group', multiple: false, optionFilter: [], widthCustom: 'w-160'},
                {type: 'select', title: 'Lỗi chính', dataField: 'error_main', multiple: false, optionFilter: [], widthCustom: 'w-160'},
                {type: 'text', title: 'Mô tả lỗi', dataField: 'error_description', optionFilter: [], widthCustom: 'w-160'},
                {type: 'text', title: 'Chi tiết ghi nhận vi phạm', dataField: 'error_detail', optionFilter: [], widthCustom: 'w-160'},
                {type: 'text', title: 'Số lần vi phạm', dataField: 'error_number', optionFilter: [], widthCustom: 'w-90'},
                {type: 'text', title: 'Mức chế tài (dự kiến)', dataField: 'punishment', optionFilter: [], widthCustom: 'w-110'},
                {type: 'sdate', title: 'Hạn nhận giải trình', dataField: 'deadline', formatDate: 'dd/MM/yyyy', optionFilter: []},
                {type: 'text', title: 'Giải trình', dataField: 'explanation', optionFilter: [], widthCustom: 'w-160'},
                // {type: 'text', title: 'Duyệt giải trình', dataField: 'recorded'},
            ]
        };
        return tb;

    }

    createTablePTQShort() {
        const tb = {
            columns: [
                {type: '', title: 'Vùng', dataField: 'region', stickyCol: true, optionFilter: []},
                {type: '', title: 'Chi nhánh', dataField: 'partner', stickyCol: true, optionFilter: []},
                {type: '', title: 'Block', dataField: 'block_name', stickyCol: true, optionFilter: []},
                {type: '', title: 'Nhân viên', dataField: 'emp_name', stickyCol: true,optionFilter: []},
                {type: '', title: 'Acct', dataField: 'MBN_account_name', stickyCol: true, optionFilter: []},
                {type: '', title: 'Mã nhân viên', dataField: 'emp_code', stickyCol: true, optionFilter: []},
                {type: 'text', title: 'SHD', dataField: 'contract', stickyCol: true, optionFilter: []},
                {type: 'text', title: 'Loại phiếu (PTC-CL)', dataField: 'error_type', optionFilter: []},
                {type: 'datetime', title: 'Ngày hoàn tất', dataField: 'date_complete'},
                {type: 'text', title: 'Kỳ kiểm soát', dataField: 'duration_check', optionFilter: []},
                {type: 'date', title: 'Ngày kiểm soát', dataField: 'date_check'},
                {type: 'select', title: 'Nhóm lỗi', dataField: 'error_group', multiple: false, optionFilter: []},
                {type: 'select', title: 'Lỗi chính', dataField: 'error_main', multiple: false, optionFilter: []},
                {type: 'text', title: 'Mô tả lỗi', dataField: 'error_description', optionFilter: []},
                {type: 'text', title: 'Chi tiết ghi nhận vi phạm (cột ghi chú trên mobiqc)', dataField: 'error_detail', optionFilter: []},
                {type: 'text', title: 'Số lần vi phạm', dataField: 'error_number', optionFilter: []},
                {type: 'text', title: 'Mức chế tài (dự kiến)', dataField: 'punishment', optionFilter: []},
                {type: 'date', title: 'Hạn nhận giải trình', dataField: 'deadline'},
                {type: 'text', title: 'Giải trình', dataField: 'explanation', optionFilter: []},
                {type: 'text', title: 'Duyệt giải trình', dataField: 'recorded', optionFilter: []},
            ]
        };
        return tb;
    }
}
