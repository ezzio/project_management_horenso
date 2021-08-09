export const RightAdmin = [
    '0.Admin all', '1.Điểm danh - Xem',
    '2.Điểm danh - Xem và chỉnh sửa',
    '3.Chế tài - Xem', '4.Chế tài - Xem và chỉnh sửa',
    '5.Nhân viên - Xem', '6.Nhân viên - Xem và chỉnh sửa',
    '7.Lương - Xem', '8.Lương - Xem và chỉnh sửa',
    '9.Truyền thông', '10.Thư viện', '11.Tuyển dụng', '12.Đào tạo', '13.An toàn lao động', '14.Ticket', '15.Game'
];

export const RightSuperAdmin = [
    {value: 'ALL', title: 'Tất cả', permission: ['0', RightAdmin[0]], box: ['region', 'depart']},
    {value: 'DIEMDANH', title: 'Điểm danh', permission: [RightAdmin[1], RightAdmin[2]], box: ['region']},
    {value: 'CHETAI', title: 'Chế tài', permission: [RightAdmin[3], RightAdmin[4]], box: ['depart']},
    {value: 'NHANVIEN', title: 'Nhân viên', permission: [RightAdmin[5], RightAdmin[6]], box: ['depart']},
    {value: 'LUONG', title: 'Lương', permission: [RightAdmin[7], RightAdmin[8]], box: ['depart']},
    {value: 'TRUYENTHONG', title: 'Truyền thông', permission: ['0', RightAdmin[9]]},
    {value: 'THUVIEN', title: 'Thư viện', permission: ['0', RightAdmin[10]]},
    {value: 'TUYENDUNG', title: 'Tuyển dụng', permission: ['0', RightAdmin[11]]},
    {value: 'DAOTAO', title: 'Đào tạo', permission: ['0', RightAdmin[12]]},
    {value: 'ANTOANLAODONG', title: 'An toàn lao động', permission: ['0', RightAdmin[13]]},
    {value: 'TICKET', title: 'Ticket', permission: ['0', RightAdmin[14]]},
    {value: 'GAME', title: 'Game', permission: ['0', RightAdmin[15]]},
];
