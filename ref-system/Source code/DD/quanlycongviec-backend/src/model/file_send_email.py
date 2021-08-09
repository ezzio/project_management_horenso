#
import smtplib
# server = smtplib.SMTP('smtp.gmail.com', 587)
# server.starttls()
# server.login("phamnhutoanuser1@gmail.com", "Phamnhutoan@user1")
# msg = "lafiqwhfiwhfighqeuoigfowiufgewhi"
# a = server.sendmail("phamnhutoanuser1@gmail.com", "phamnhutoan03041998@gmail.com", msg)
# # print(1,a)
# server.quit()

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
def send_email(email_send,body):
    print(112222222222222222222222222)
    _msg = MIMEMultipart()
    _msg['From'] = 'phamnhutoanuser1@gmail.com'
    _msg['To'] = email_send
    _msg['Subject'] = 'Thông báo công việc mới'

    _msg.attach(MIMEText(body,'plain'))

    text = _msg.as_string()
    text = text.encode('utf-8')
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login('phamnhutoanuser1@gmail.com','Phamnhutoan@user1')
    email_user = "phamnhutoanuser1@gmail.com"
    # email_send = to
    server.sendmail(email_user,email_send,text)
    # server.quit()
# if __name__ == '__main__':
#     email_send = "phamnhutoan03041998@gmail.com"
#     title = "Python is Good"
#     link_task = "https://mytinpnc.vn/api/auth/accountuser/kpi/board"
#     body = 'Bạn đã nhận được công việc mới: {}, vui lòng kiểm tra trên hệ thống. Kiểm tra tại {}'.format(title,link_task)
#     send_email(email_send,body)