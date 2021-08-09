export class AtldClass {
    constructor() {
    }

    createNewElement() {
        const atldElement = {
            atld_id: '',
            emp_code: '',
            nhom_dao_tao: '',
            cap_the_chung_chi: '',
            ngay_cap_the_ATLD: '',
            ngay_het_han_ATLD: '',
            ngay_bat_dau_dao_tao: '',
            ngay_ket_thuc_dao_tao: '',
            tinh_trang_the_chung_chi: '',
            hinh_anh_the_chung_nhan: ''
        };
        return atldElement;
    }

    createTable() {
        const tableAtld = {
            columns: [
                {type: 'text', title: 'Mã nhân viên', dataField: 'emp_code', optionFilter: []},
                {
                    type: 'select',
                    title: 'Nhóm đào tạo',
                    dataField: 'nhom_dao_tao',
                    options: ['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 4'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'select',
                    title: 'Cấp thẻ/chứng chỉ',
                    dataField: 'cap_the_chung_chi',
                    options: ['Chứng nhận', 'Thẻ', 'Ghi sổ'],
                    placeholder: '',
                    optionFilter: []
                },
                {type: 'sdatev2', title: 'Ngày cấp thẻ ATLĐ', dataField: 'ngay_cap_the_ATLD', placeholder: '', optionFilter: []},
                {type: 'sdatev2', title: 'Ngày hết hạn ATLĐ', dataField: 'ngay_het_han_ATLD', placeholder: '', optionFilter: []},
                {type: 'sdatev2', title: 'Ngày bắt đầu đào tạo', dataField: 'ngay_bat_dau_dao_tao', placeholder: '', optionFilter: []},
                {type: 'sdatev2', title: 'Ngày kết thúc đào tạo', dataField: 'ngay_ket_thuc_dao_tao', placeholder: '', optionFilter: []},
                {
                    type: 'select',
                    title: 'Tình trạng thẻ/chứng chỉ',
                    dataField: 'tinh_trang_the_chung_chi',
                    options: ['Còn hạn', 'Hết hạn', 'Chưa cấp'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'upload',
                    title: 'Hình ảnh thẻ/chứng nhận',
                    dataField: 'hinh_anh_the_chung_nhan',
                    linkDownload: 'img',
                    placeholder: '',
                    optionFilter: []
                },
            ]
        };
        return tableAtld;
    }
}

export const AtldElement = {
    atld_id: '',
    emp_code: '',
    nhom_dao_tao: '',
    cap_the_chung_chi: '',
    ngay_cap_the_ATLD: '',
    ngay_het_han_ATLD: '',
    ngay_bat_dau_dao_tao: '',
    ngay_ket_thuc_dao_tao: '',
    tinh_trang_the_chung_chi: '',
    hinh_anh_the_chung_nhan: ''
};
export const TableAtld = {
    columns: [
        {type: 'text', title: 'Mã nhân viên', dataField: 'emp_code', optionFilter: []},
        // {
        //     type: 'select',
        //     title: 'Nhóm đào tạo',
        //     dataField: 'nhom_dao_tao',
        //     options: ['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 4'],
        //     placeholder: '',
        //     optionFilter: []
        // },
        // {
        //     type: 'select',
        //     title: 'Cấp thẻ/chứng chỉ',
        //     dataField: 'cap_the_chung_chi',
        //     options: ['Chứng nhận', 'Thẻ', 'Ghi sổ'],
        //     placeholder: '',
        //     optionFilter: []
        // },
        {type: 'date', title: 'Ngày cấp thẻ ATLĐ', dataField: 'ngay_cap_the_ATLD', placeholder: '', optionFilter: []},
        {type: 'date', title: 'Ngày hết hạn ATLĐ', dataField: 'ngay_het_han_ATLD', placeholder: '', optionFilter: []},
        {type: 'date', title: 'Ngày bắt đầu đào tạo', dataField: 'ngay_bat_dau_dao_tao', placeholder: '', optionFilter: []},
        {type: 'date', title: 'Ngày kết thúc đào tạo', dataField: 'ngay_ket_thuc_dao_tao', placeholder: '', optionFilter: []},
        // {
        //     type: 'select',
        //     title: 'Tình trạng thẻ/chứng chỉ',
        //     dataField: 'tinh_trang_the_chung_chi',
        //     options: ['Còn hạn', 'Hết hạn', 'Chưa cấp'],
        //     placeholder: '',
        //     optionFilter: []
        // },
        {
            type: 'upload',
            title: 'Hình ảnh thẻ/chứng nhận',
            dataField: 'hinh_anh_the_chung_nhan',
            linkDownload: 'img',
            placeholder: '',
            optionFilter: []
        },
    ]
};

export const TableAtldForResult = {
    columns: [
        {
            type: 'text',
            title: 'Mã nhân viên',
            dataField: 'emp_code',
            nameClass: ['sticky-col', 'third-col'],
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'select',
            title: 'Nhóm đào tạo',
            dataField: 'nhom_dao_tao',
            options: ['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 4'],
            nameClass: ['sticky-col', 'forth-col'],
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'select',
            title: 'Cấp thẻ/chứng chỉ',
            dataField: 'cap_the_chung_chi',
            options: ['Chứng nhận', 'Thẻ', 'Ghi sổ'],
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'sdate',
            title: 'Ngày cấp thẻ ATLĐ',
            dataField: 'ngay_cap_the_ATLD',
            // formatDate: 'dd/MM/yyyy',
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'sdate',
            title: 'Ngày hết hạn ATLĐ',
            dataField: 'ngay_het_han_ATLD',
            // formatDate: 'dd/MM/yyyy',
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'sdate',
            title: 'Ngày bắt đầu đào tạo',
            dataField: 'ngay_bat_dau_dao_tao',
            // formatDate: 'dd/MM/yyyy',
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'sdate',
            title: 'Ngày kết thúc đào tạo',
            dataField: 'ngay_ket_thuc_dao_tao',
            // formatDate: 'dd/MM/yyyy',
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'select',
            title: 'Tình trạng thẻ/chứng chỉ',
            dataField: 'tinh_trang_the_chung_chi',
            options: ['Còn hạn', 'Hết hạn', 'Chưa cấp'],
            placeholder: '',
            optionFilter: []
        },
        {
            type: 'upload',
            title: 'Hình ảnh thẻ/chứng nhận',
            dataField: 'hinh_anh_the_chung_nhan',
            linkDownload: 'img',
            placeholder: '',
            optionFilter: []
        },
    ]
};
