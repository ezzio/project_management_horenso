# Xây dựng hệ thống quản lý dự án cho sinh viên công nghệ thông tin theo mô hình Kanban và Horenso.

## Quy tắc làm việc trong dự án:
[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/laa6VfksVug)

## Làm việc với GitHub:

Hướng dẫn cơ bản của [Roger Dudler](https://rogerdudler.github.io/git-guide/index.vi.html)

## Messages Commit
### Commit Sample

```
git commit -m "messages"

VD: git commit -m "docs: describe rules of project"
```

> [type](optional scope): [subject]

### Type
Phải là một trong những loại sau:
 * build - Xây dựng các thay đổi liên quan
 * chore - Xây dựng quy trình hoặc thay đổi công cụ phụ trợ
 * docs - Chỉ liên quan đến tài liệu
 * feat - Một tính năng mới
 * fix - Một bản sửa lỗi
 * perf - Thay đổi mã giúp cải thiện hiệu suất
 * refactor - Sự thay đổi mã không sửa được lỗi hoặc thêm tính năng
 * revert - Hoàn nguyên mọi thứ
 * style - Đánh dấu, khoảng trắng, định dạng, thiếu dấu chấm phẩy ...
 * test - Thêm các bài kiểm tra bị thiếu

### Scope (không bắt buộc)
Có thể được cung cấp cho `type` của `commit`, để cung cấp thông tin ngữ cảnh bổ sung và được chứa trong dấu ngoặc đơn, ví dụ: `feat(parser): add ability to parse arrays`

### Subject
Để viết Subject dễ, có thể đặt nó vào câu sau: Nếu được áp dụng, commit này sẽ ... (If applied, this commit will ...). Phần trong dấu "..." chính là Subject.
Chủ đề chứa mô tả thành công về sự thay đổi:
* Sử dụng thì hiện tại mệnh lệnh: "change" not "changed" nor "changes"
* Không có dấu chấm `.` ở cuối.
