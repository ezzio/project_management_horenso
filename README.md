# Xây dựng hệ thống quản lý dự án cho sinh viên công nghệ thông tin theo mô hình Kanban và Horenso.

## Quy tắc làm việc trong dự án:
[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/laa6VfksVug)

## Làm việc với GitHub:

[Hướng dẫn cơ bản cho người mới bắt đầu của Roger Dudler](https://rogerdudler.github.io/git-guide/index.vi.html)

## Messages Commit
### Commit Sample

```
git commit -m "messages"

VD: git commit -m "docs: describe rules of project"
```

> [type](optional scope): [subject]

### Type
Phải là một trong những loại sau:
* feat: thêm một feature
* fix: fix bug cho hệ thống
* refactor: sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
* docs: thêm/thay đổi document
* chore: những sửa đổi nhỏ nhặt không liên quan tới code
* style: những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
* perf: code cải tiến về mặt hiệu năng xử lý
* vendor: cập nhật version cho các dependencies, packages.

### Scope (không bắt buộc)
Có thể được cung cấp cho `type` của `commit`, để cung cấp thông tin ngữ cảnh bổ sung và được chứa trong dấu ngoặc đơn, ví dụ: `feat(parser): add ability to parse arrays`

### Subject
Để viết Subject dễ, có thể đặt nó vào câu sau: Nếu được áp dụng, commit này sẽ ... (If applied, this commit will ...). Phần trong dấu "..." chính là Subject.
Chủ đề chứa mô tả thành công về sự thay đổi:
* Sử dụng thì hiện tại mệnh lệnh: "change" not "changed" nor "changes"
* Không có dấu chấm `.` ở cuối.
