export class CtpClass {
  constructor() {
  }
  createNewElement() {
    const ctpElement = {
      task_id: '',
      task_time: '',
      ngay_tao: '',
      ng_tao: '',
      ng_di_ct: '',
      bp_ng_di_ct: '',
      noi_di: '',
      noi_den: '',
      dien_giai: '',
      tong_tien: '',
      so_tien_tam_ung: '',
      so_tien_chi_them: '',
      so_tien_nop_lai: '',
      email_tam_ung: '',
      cac_khoan_tam_ung: '',
      tai_khoan_chuyen_khoan: '',
      ng_huong_loi: '',
      ngan_hang: '',
      chi_nhanh_ngan_hang: '',
      so_tien_chuyen_khoan: '',
      su_dung: '',
      nguon_su_dung: '',
      step: '',
      result: '',
      ng_quan_ly: '',
      tieu_de: '',
      ng_dang_duyet: ''
    };
    return ctpElement;
  }
  createTableGeneralTicket() {
    const table = {
      columns: [
        // {
        //   type: '',
        //   title: 'Số đơn',
        //   dataField: 'task_time',
        //   placeholder: '',
        //   optionFilter: [],
        //   openButton: true
        // },
        {
          type: '', title: 'Loại chi phí', dataField: 'tieu_de',
          placeholder: '', shortTable: true,
        },
        {
          type: '',
          title: 'Ngày tạo',
          dataField: 'ngay_tao',
          placeholder: '',
          shortTable: true,
        },
        {
          type: '',
          title: 'Diễn giải',
          dataField: 'title',
          placeholder: '',
          shortTable: true,
        },
        {
          type: '',
          title: 'Người đề nghị',
          dataField: 'ng_tao',
          placeholder: '',
          shortTable: true,
        },
        {
          type: '',
          title: 'Phòng ban',
          dataField: 'phong_ban',
          placeholder: '',
          shortTable: true,
        },
        {type: '', title: 'Step', dataField: 'step', placeholder: '', notShowInEmail: true, shortTable: true},
      ],
    };
    return table;
  }
  createTableCtp() {
    const table = {
      columns: [
        {
          type: '',
          title: 'Số đơn',
          dataField: 'task_time',
          placeholder: '',
          optionFilter: [],
          shortTable: true,
          stickyCol: true,
          widthCustom: 'w-90',
          openButton: true,
        },
        {
          type: '', title: 'Người tạo đơn', dataField: 'ng_tao',
          placeholder: '', shortTable: true, stickyCol: true, widthCustom: 'w-90'
        },
        {
          type: '',
          title: 'Ngày tạo',
          dataField: 'ngay_tao',
          placeholder: '',
          formatDate: 'dd/MM/yyyy',
          shortTable: true,
        },
        {type: 'text', title: 'Họ tên người đi công tác', dataField: 'ng_di_ct', placeholder: '', optionFilter: []},
        {type: 'select', title: 'Phòng ban', dataField: 'bp_ng_di_ct', placeholder: '', optionFilter: []},
        {type: 'text', title: 'Email trưởng phòng', dataField: 'ng_quan_ly', placeholder: '', optionFilter: [], required: true},
        {type: 'text', title: 'Nơi đi', dataField: 'noi_di', placeholder: '', optionFilter: []},
        {type: 'text', title: 'Nơi đến', dataField: 'noi_den', placeholder: '', optionFilter: []},
        {type: 'text', title: 'Diễn giải', dataField: 'dien_giai', placeholder: '', optionFilter: [], shortTable: true, required: true},
        {
          type: '',
          title: 'Tổng tiền',
          dataField: 'tong_tien',
          placeholder: '',
          formatCurrency: 'VND',
          optionFilter: [],
          shortTable: true,
          widthCustom: 'w-90'
        },
        {
          type: '',
          title: 'Tạm ứng ',
          dataField: 'so_tien_tam_ung',
          placeholder: '',
          formatCurrency: 'VND',
          optionFilter: [],
          shortTable: true,
          widthCustom: 'w-90'
        },
        {
          type: '',
          title: 'Chi thêm',
          dataField: 'so_tien_chi_them',
          placeholder: '',
          formatCurrency: 'VND',
          optionFilter: [],
          shortTable: true,
          widthCustom: 'w-90'
        },
        {
          type: '',
          title: 'Nộp lại',
          dataField: 'so_tien_nop_lai',
          placeholder: '',
          formatCurrency: 'VND',
          optionFilter: [],
          shortTable: true,
          widthCustom: 'w-90'
        },
        {type: '', title: 'Step', dataField: 'step', placeholder: '', notShowInEmail: true, shortTable: true},
        {
          type: '',
          title: 'Status',
          dataField: 'result',
          placeholder: '',
          notShowInEmail: true,
          optionFilter: [],
          shortTable: true,
          widthCustom: 'w-90'
        },
      ],
    };
    return table;
  }
}

export class HoaDonInfoClass {
  constructor() {
  }

  createNewElement() {
    const hoaDonInfo = [{
      task_time: '',
      so_hoa_don: '',
      ky_hieu_hoa_don: '',
      loai_chung_tu: '',
      ngay_chung_tu: '',
      ten_cong_ty: '',
      mst: '',
      up_file: '',
      chi_phi: '',
      dvt: '',
      don_gia: '',
      so_luong: '',
      thanh_tien: '',
      tong: '',
      thue: '',
      note: ''
    }];
    return hoaDonInfo;
  }

  createTableThongTinCK() {
    const table = {
      columns: [
        {type: 'text', title: 'Tài khoản chuyển khoản', dataField: 'tai_khoan_chuyen_khoan', optionFilter: []},
        {type: 'text', title: 'Người hưởng lợi', dataField: 'ng_huong_loi', optionFilter: []},
        {type: 'select', title: 'Ngân hàng', dataField: 'ngan_hang', optionFilter: [], classSelect: 'select-form'},
        {type: 'select', title: 'Chi nhánh ngân hàng', dataField: 'chi_nhanh_ngan_hang', optionFilter: []},
        {type: '', title: 'Số tiền chuyển khoản', dataField: 'so_tien_chuyen_khoan', formatCurrency: 'VND', optionFilter: []},
        // {type: 'text', title: 'Sử dụng', dataField: 'su_dung', optionFilter: []},
        // {type: 'text', title: 'Nguồn sử dụng', dataField: 'nguon_su_dung', optionFilter: []},

      ]
    };
    return table;
  }
}

export const TableTTHoaDonCtp = {
  columns: [
    {
      type: '',
      title: 'Đơn CTP',
      dataField: 'task_time',
      placeholder: '',
      nameClass: ['sticky-col', 'second-col-nonefrt'],
      optionFilter: []
    },
    {
      type: 'text',
      title: 'Số hoá đơn',
      dataField: 'so_hoa_don',
      placeholder: '',
      nameClass: ['sticky-col', 'third-col-nonefrt'],
      optionFilter: []
    },
    {type: 'text', title: 'Ký hiệu hoá đơn', dataField: 'ky_hieu_hoa_don', placeholder: ''},
    {
      type: 'select',
      title: 'Loại chứng từ',
      dataField: 'loai_chung_tu',
      placeholder: '',
      options: ['Hoá đơn tài chính', 'Hoá đơn lẻ'],
      optionFilter: []
    },
    {type: 'sdate', title: 'Ngày chứng từ', dataField: 'ngay_chung_tu', placeholder: '', formatDate: 'dd/MM/yyyy', optionFilter: []},
    {type: 'text', title: 'Tên công ty', dataField: 'ten_cong_ty', placeholder: '', optionFilter: []},
    {type: 'text', title: 'MST', dataField: 'mst', placeholder: '', optionFilter: []},
    {type: 'upload', title: 'Up file', dataField: 'up_file', notShowInEmail: true, placeholder: '', optionFilter: []},
    {
      type: 'select',
      title: 'Loại chi phí',
      dataField: 'loai_chi_phi',
      options: ['Vé xe', 'Vé tàu', 'Vé máy bay', 'Phí khách sạn', 'Phí điện', 'Phí nước'],
      multiple: false,
      placeholder: '',
      optionFilter: []
    },
    {type: 'text', title: 'Diễn giải chi phí', dataField: 'dien_giai_chi_phi', placeholder: '', optionFilter: []},
    {type: 'text', title: 'Đơn vị tính', dataField: 'dvt', placeholder: '', optionFilter: []},
    {type: 'text', title: 'Số lượng', dataField: 'so_luong', placeholder: '', optionFilter: []},
    {type: 'currency', title: 'Đơn giá', dataField: 'don_gia', placeholder: '', optionFilter: []},
    {type: 'text', title: 'Ghi chú', dataField: 'note', placeholder: '', optionFilter: []},
    {type: '', title: 'Thành tiền', dataField: 'thanh_tien', placeholder: '', formatCurrency: 'VND', optionFilter: []},
    {type: '', title: 'Thuế', dataField: 'thue', options: ['Không thuế', '5%', '10%'], placeholder: '', optionFilter: []},
  ]
};
// export const TableThongTinCK = {
//     columns: [
//         {type: 'text', title: 'Tài khoản chuyển khoản', dataField: 'tai_khoan_chuyen_khoan', optionFilter: []},
//         {type: 'text', title: 'Người hưởng lợi', dataField: 'ng_huong_loi', optionFilter: []},
//         {type: 'text', title: 'Ngân hàng', dataField: 'ngan_hang', optionFilter: []},
//         {type: 'text', title: 'Chi nhánh ngân hàng', dataField: 'chi_nhanh_ngan_hang', optionFilter: []},
//         {type: '', title: 'Số tiền chuyển khoản', dataField: 'so_tien_chuyen_khoan', formatCurrency: 'VND', optionFilter: []},
//     ]
// };
export const TableThongTinTamUng = {
  columns: [
    {type: 'text', title: 'Email tạm ứng', dataField: 'email_tam_ung', optionFilter: []},
    {type: 'select', title: 'Các khoản tạm ứng', dataField: 'cac_khoan_tam_ung', multiple: true, optionFilter: []},
  ]
};
