export class NotificationClass {
    constructor() {
    }
    createElement(){
        const el = {
            email: '', loai: '', title: '', noi_dung:''
        };
        return el
    }
    createTable(){
        const tb = [
            {type: 'text', title: 'Email', dataField: 'email'},
            {type: 'text', title: 'Loại', dataField: 'loai'},
            {type: 'text', title: 'Tiêu đề', dataField: 'title'},
            {type: 'text', title: 'Nội dung', dataField: 'noi_dung'},
        ];
        return {columns: tb};
    }
}
