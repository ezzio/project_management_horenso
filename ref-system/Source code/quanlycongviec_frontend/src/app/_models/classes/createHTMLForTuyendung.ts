export class CreateHTMLForTuyendung {
    emailReceiver: any;
    emailContent: any;

    constructor(emailReceiver, emailContent) {
        this.emailContent = emailContent;
        this.emailReceiver = emailReceiver;
    }

    public getDynamicTemplate() {
        const dynamicTemplateParsed =
            `
             <!DOCTYPE html>
             <html>
             <head>
             <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />
             <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />
             <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />
             <style>
               body {
               font-size: 17px;
               line-height: 20px;
               }
             </style>
             <body>
             <div style="display: inline-block">
             <img/>
             <h4 style="text-align: center">CÔNG TY TNHH MTV DỊCH VỤ VIỄN THÔNG PHƯƠNG NAM</h4>
             <img/>
             </div>
             <h5>(Đối tác độc quyền FPT Telecom)</h5>
             <hr style="border-top: 1px dotted black;">
             <h3 style="text-align: center">THƯ MỜI TEST & PHỎNG VẤN</h3>
             <p style="text-align: center"><i>Thân gửi bạn: Võ Thanh Tú</i></p>
             <p>Lời đầu tiên, Phương Nam Telecom xin cảm ơn bạn đã dành sự quan tâm của mình cho công ty chúng tôi.<br>
                Xin được giới thiệu: Phương Nam là đối tác độc quyền chuyên triển khai và bảo trì dịch vụ Internet,
truyền hình của FPT Telecom được thành lập từ năm 2010. Sau hơn 08 năm hoạt động,
Phương Nam Telecom đã trở thành một trong những nhà cung cấp dịch vụ triển khai viễn thông và
Internet hàng đầu trong nước với trên 3.000 nhân viên, hiện tại có 09 chi nhánh tại TP.HCM và
29 chi nhánh trải dài từ Quảng Nam đến Cà Mau. <br>
                Qua quá trình chọn lọc hồ sơ, chúng tôi nhận thấy bạn rất phù hợp với vị trí Kỹ thuật viên hỗ trợ
tại nhà khách hàng của Phương Nam. <br>
                Phương Nam Telecom thân mời bạn tham gia buổi test trực tiếp tại văn phòng công ty để chúng tôi có thể
trao đổi cụ thể hơn về công việc cũng như các chế độ chính sách dành cho bạn.</p>
             <p>Thông tin chi tiết như sau:</p>
             <ul>
             <li>Địa điểm: Số 130 Đường 40, KDC Tân Quy Đông, Phường Tân Phong, Quận 7, TPHCM</li>
             <li>Thời gian: 08h00, Thứ 5 ngày 08/10/2020</li>
             <li>Link điền thông tin: https://mytinpnc.vn/api/auth/tuyendung/form</li>
             </ul>
             <p>(Bạn click vào link điền các thông tin vào form trong đó chọn đăng nhập bằng gmail)</p>
             <p><u>Nội dụng bài test:</u> Network căn bản, các dịch vụ mạng, IP, DHCP, DNS, VLAN,…
             <p><u>Mô tả công việc</u><p>
             <ul>
                <li>Hỗ trợ kỹ thuật trực tiếp tại nhà khách hàng.</li>
                <li>Xử lý các lỗi liên quan đến:
                <ul>
                <liKết nối internet.</li>
                <li>Email.</li>
                <li>Mạng LAN, máy tính,..</li>
                <li>Các thiết bị di động (Smart phone, Ipad…), smart TV… không thể kết nối internet hoặc không thể
sử dụng các ứng dụng, dịch vụ trên internet.</li>
                <li>IP camera.</li>
                <li>Truyền hình FPT.</li>
                </ul>
                </li>
                <li>Xử lý thông tin, hỗ trợ kỹ thuật cho các bộ phận trong nội bộ Công ty. </li>
             </ul>
             <p>Các chế độ chính sách khi trở thành CBNV Công ty Phương Nam:</p>
             <ul>
             <li>Môi trường làm việc chuyên nghiệp, nhiều cơ hội phát triển.</li>
             <li>Làm việc khu vực gần nhà</li>
             <li>Lương chính thức 7 -15 triệu/tháng, cùng rất nhiều cơ hội tăng thu nhập.</li>
             <li>Lương tháng 13</li>
             <li>Thưởng thi đua.</li>
             <li>Thưởng Top nhân viên xuất sắc.</li>
             <li>Được đóng bảo hiểm đầy đủ theo quy định Nhà nước.</li>
             <li>Du lịch hàng năm.</li>
             <li>Khám sức khỏe định kỳ hàng năm.</li>
             <li>Thường xuyên được tham gia các khóa đào tạo nâng cao năng lực, phát triển bản thân về chuyên môn, kỹ năng mềm.</li>
             </ul>
             <p>Phương Nam Telecom luôn đồng hành và sẵn sàng chào đón bạn.<br>
               Để buổi phỏng vấn chỉnh chu hơn bạn vui lòng xác nhận lại với chúng tôi về khả năng tham gia phỏng vấn qua email hoặc liên hệ điện thoại:<br>
               Phone: 028 7300 2222 – Ext: 80954/80965 <br>
               Hotline: 0908 391 465 – Ms.Nhi <br>
               Trân trọng. <br>
               Chỉ dẫn đến văn phòng:
             </p>
             </body>
            </html>`;
    }
}
