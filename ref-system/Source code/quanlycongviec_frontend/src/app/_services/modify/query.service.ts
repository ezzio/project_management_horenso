import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TableName} from '../../_models/constants/tableName';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class QueryService {
    empCheckinTb = TableName.empCheckinTb;
    employeesTb = TableName.employeeTb;
    userRightTb = TableName.adminTb;
    accountTb = TableName.accountTb;
    atldTb = TableName.atldTb;
    departmentTb = TableName.departmentTb;
    readonly baseUrl = environment.backendUrl;

    constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {
    }

    // getQueryForCheckin(searchItem) {
    //     let s = '';
    //     let date;
    //     let fromDate;
    //     let toDate;
    //     for (const key in searchItem) {
    //         if (searchItem[key] !== '' || searchItem[key].length > 0) {
    //             if (key === 'isNoted') {
    //                 if (searchItem[key] === 'yes') {
    //                     s = s + 'a.note != \'NULL\' and ';
    //                 } else {
    //                     s = s + 'a.note = \'\'\' and';
    //                 }
    //             }
    //             if (key === 'empChosen') {
    //                 const keyOfEmpCheckin = Object.keys(searchItem[key]);
    //                 // @ts-ignore
    //                 if (searchItem[key][keyOfEmpCheckin] !== '' || searchItem[key][keyOfEmpCheckin] !== null) {
    //                     if (keyOfEmpCheckin[0] === 'emp_name') {
    //                         s = s + 'b.emp_name' + '=\'' + searchItem[key].emp_name + '\'' + ' and ';
    //                     } else if (keyOfEmpCheckin[0] !== 'emp_name' && searchItem[key][keyOfEmpCheckin[0]]) {
    //                         s = s + 'a.' + keyOfEmpCheckin + '=\'' + searchItem[key][keyOfEmpCheckin[0]] + '\'' + ' and ';
    //                     }
    //                 }
    //             }
    //             if (key === 'selectRegion') {
    //                 const a = Object.keys(searchItem[key]);
    //                 // @ts-ignore
    //                 const arr = searchItem.selectRegion[a];
    //                 if (a[0] === 'region') {
    //                     this.toastr.error('Chọn thêm đối tác!');
    //                 }
    //                 if (arr) {
    //                     if (typeof (arr[0]) !== 'string') {
    //                         let condition = '';
    //                         for (const i of arr[0]) {
    //                             condition = condition + '\"' + i + '\"' + ', ';
    //                         }
    //                         condition = condition.substr(0, condition.length - 2);
    //                         s = s + 'a.' + a + ' in (' + condition + ') and ';
    //                     } else {
    //                         let cond = '';
    //                         if (arr) {
    //                             for (const i of arr) {
    //                                 cond = cond + '\"' + i + '\"' + ', ';
    //                             }
    //                             cond = cond.substr(0, cond.length - 2);
    //                             s = s + 'a.' + a + ' in (' + cond + ') and ';
    //                         }
    //                     }
    //                 }
    //             }
    //             if (key !== 'selectRegion' && key !== 'rangeDate' && key !== 'empChosen' && key !== 'isNoted') {
    //                 s = s + 'a.' + key + '=\'' + searchItem[key] + '\'' + ' and ';
    //             }
    //             if (key !== 'selectRegion' && key === 'rangeDate') {
    //                 date = searchItem[key];
    //                 if (date.dateFrom && date.dateTo) {
    //                     fromDate = date.dateFrom.year + '/' + date.dateFrom.month + '/' + date.dateFrom.day;
    //                     toDate = date.dateTo.year + '/' + date.dateTo.month + '/' + date.dateTo.day;
    //                     s = s + 'a.checkin_date >= \'' + fromDate + '\' and a.checkin_date <= \'' + toDate + '\'' + ' and ';
    //                 }
    //             }
    //         }
    //     }
    //     s = s.substr(0, s.length - 5);
    //     return s;
    // }

    // getQueryForPTQ(searchItem) {
    //     let s = '';
    //     Object.keys(searchItem).forEach((key) => {
    //         if (searchItem[key] && searchItem[key].length > 0) {
    //             let condition = '';
    //             for (const i of searchItem[key]) {
    //                 condition = condition + '\"' + i + '\"' + ', ';
    //             }
    //             condition = condition.substr(0, condition.length - 2);
    //             if (key === 'email' || key === 'child_depart') {
    //                 s = s + 'b.' + key + ' in (' + condition + ') and ';
    //             } else if (key === 'parent_depart') {
    //                 s = s + 'c.' + key + ' in (' + condition + ') and ';
    //             } else if (key === 'duration_check') {
    //                 s = s + 'a.' + key + ' >= \'' + searchItem[key] + '\' and ';
    //             } else if (key === 'date_check') {
    //                 s = s + 'a.' + key + ' = \'' + searchItem[key] + '\' and ';
    //             } else {
    //                 s = s + 'a.' + key + ' in (' + condition + ') and ';
    //             }
    //         }
    //     });
    //     s = s.substr(0, s.length - 5);
    //     const query = {
    //         query: 'Select a.* from ' + TableName.ptqTb + ' a left join ' + TableName.employeeTb
    //             + ' b on a.emp_code=b.emp_code' + ' left join ' + TableName.departmentTb + ' c on' +
    //             ' b.child_depart=c.child_depart where ' + s,
    //     };
    //     return query;
    // }

    getQueryForEmp(searchItem) {
        let s = '';
        Object.keys(searchItem).forEach((key) => {
            if (searchItem[key] && searchItem[key] !== '' && searchItem[key].length > 0) {
                if (key === 'emp_code') {
                    s = s + key + ' = \'' + searchItem[key] + '\' and ';
                } else {
                    if (searchItem[key].length > 0) {
                        const arr = searchItem[key];
                        let cond = '';
                        if (arr) {
                            for (const i of arr) {
                                cond = cond + '\"' + i + '\"' + ', ';
                            }
                            cond = cond.substr(0, cond.length - 2);
                            s = s + key + ' in (' + cond + ') and ';
                        }
                    }
                }

            }
        });
        s = s.substr(0, s.length - 5);

        return s;
    }

    getQueryFindRecentBlock(empCode) {
        const query = 'Select block_name from ' + this.empCheckinTb + ' Where checkin_success= \'OK\' and emp_code= \''
            + empCode + '\' ORDER BY checkin_id DESC LIMIT 1';
        return query;
    }

    getEmailAdminFollowChildDepartQuery(arr) {
        let cond = '';
        if (arr) {
            for (const i of arr) {
                cond = cond + '\"' + i + '\"' + ', ';
            }
            cond = cond.substr(0, cond.length - 2);
        }
        const query = 'Select a.email from ' + this.userRightTb + ' a inner join ' + this.employeesTb + ' b on a.email = lower(b.email) Where b.child_depart in (' + cond + ')';
        return query;
    }

    getEmailFollowChildDepartQuery(arr) {
        let cond = '';
        let query;
        if (arr && Array.isArray(arr)) {
            for (const i of arr) {
                cond = cond + '\"' + i + '\"' + ', ';
            }
            cond = cond.substr(0, cond.length - 2);
            query = 'Select email, emp_code, emp_name from ' + this.employeesTb + '  Where child_depart in (' + cond + ')';
        }
        if (arr && typeof (arr) === 'string') {
            query = 'Select email, emp_code, emp_name from ' + this.employeesTb + '  Where child_depart = \'' + arr + '\'';
        }
        return query;
    }

    getQueryForAdminRightAndATLD(str, searchItem) {
        let s = '';
        Object.keys(searchItem).forEach((key) => {
            if (key === 'per_id' || key === 'super_admin') {
                if (Array.isArray(searchItem[key]) && searchItem[key].length > 0) {
                    let cond = '';
                    searchItem[key].forEach((i) => {
                        cond = cond + i + '|';
                    });
                    cond = cond.substr(0, cond.length - 1);
                    s = s + 'a.' + key + ' RLIKE \'' + cond + '\' and ';
                }
            }
            if (key === 'email' || key === 'child_depart' || key === 'tinh_trang_the_chung_chi') {
                if (searchItem[key] && searchItem[key] !== '' && searchItem[key].length > 0) {
                    const arr = searchItem[key];
                    let cond = '';
                    if (arr) {
                        for (const i of arr) {
                            cond = cond + '\"' + i + '\"' + ', ';
                        }
                        cond = cond.substr(0, cond.length - 2);
                        if (key !== 'child_depart') {
                            s = s + 'a.' + key + ' in (' + cond + ') and ';
                        } else {
                            s = s + 'b.' + key + ' in (' + cond + ') and ';
                        }
                    }
                }
            }
            if (key === 'emp_code' && searchItem[key] && searchItem[key] !== '') {
                s = s + 'a.' + key + ' = \'' + searchItem[key] + '\' and ';
            }
        });
        s = s.substr(0, s.length - 5);
        let query = '';
        if (str === 'admin') {
            query = 'Select a.*, b.child_depart  from ' + this.userRightTb + ' a inner join ' + this.employeesTb + ' b on a.email = lower(b.email)' + ' where ' + s;
        } else {
            query = 'SELECT a.*, b.*, c.* FROM ' + this.atldTb + ' a LEFT JOIN ' + this.employeesTb + ' b on a.emp_code = b.emp_code LEFT JOIN ' + this.departmentTb + ' c on b.child_depart = c.child_depart' + ' where ' + s;
        }
        return query;
    }

    getInfoLocation(searchItem) {
        let s = '';
        Object.keys(searchItem).forEach((key) => {
            if (searchItem[key] && searchItem[key] !== '' && searchItem[key].length > 0) {
                const arr = searchItem[key];
                let cond = '';
                if (arr) {
                    for (const i of arr) {
                        cond = cond + '\"' + i + '\"' + ', ';
                    }
                    cond = cond.substr(0, cond.length - 2);
                    if (key === 'branch') {
                        s = s + 'c.' + key + ' in (' + cond + ') and ';
                    } else if (key === 'child_depart' || key === 'contract_type') {
                        s = s + 'b.' + key + ' in (' + cond + ') and ';
                    } else if (key === 'emp_code') {
                        s = s + 'a.' + key + ' = \'' + searchItem[key] + '\' and ';
                    }
                }
            }
        });
        s = s.substr(0, s.length - 5);
        let query = '';
        query = 'Select a.* from ' + this.accountTb + ' a inner join ' + this.employeesTb +
            ' b on a.emp_code = b.emp_code inner join ' + this.departmentTb + ' c on b.child_depart = c.child_depart where ' + s;
        return query;

    }

    // getQueryForCheckinNew(searchItem) {
    //     let s = '';
    //     let date;
    //     let fromDate;
    //     let toDate;
    //     for (const key in searchItem) {
    //         if (typeof (searchItem[key]) === 'string' && searchItem[key] !== '' && searchItem[key] !== null) {
    //             if (key === 'isNoted') {
    //                 if (searchItem[key] === 'yes') {
    //                     s = s + 'a.note != \'NULL\' and ';
    //                 } else {
    //                     s = s + 'a.note = \'\'\' and';
    //                 }
    //             } else {
    //                 s = s + 'a.' + key + '=\'' + searchItem[key] + '\' and ';
    //             }
    //         } else if (typeof (searchItem[key]) !== 'string') {
    //             if (Array.isArray(searchItem[key]) && searchItem[key].length > 0) {
    //                 if (key === 'child_depart' || key === 'parent_depart' || key === 'emp_name') {
    //                     let condition = '';
    //                     for (const i of searchItem[key]) {
    //                         condition = condition + '\"' + i + '\"' + ', ';
    //                     }
    //                     condition = condition.substr(0, condition.length - 2);
    //                     if (key === 'emp_name') {
    //                         s = s + 'b.' + key + ' in (' + condition + ') and ';
    //                     } else {
    //                         s = s + 'c.' + key + ' in (' + condition + ') and ';
    //                     }
    //                 }
    //             } else if (!Array.isArray(searchItem[key]) && searchItem[key] !== null) {
    //                 if (key === 'empChosen') {
    //                     // @ts-ignore
    //                     const keyOfEmpCheckin = Object.keys(searchItem[key])[0];
    //                     if (searchItem[key][keyOfEmpCheckin] !== '' && searchItem[key][keyOfEmpCheckin] !== null) {
    //                         if (keyOfEmpCheckin === 'emp_name') {
    //                             s = s + 'b.emp_name' + '=\'' + searchItem[key].emp_name + '\'' + ' and ';
    //                         } else if (keyOfEmpCheckin !== 'emp_name' && searchItem[key][keyOfEmpCheckin]) {
    //                             s = s + 'a.' + keyOfEmpCheckin + '=\'' + searchItem[key][keyOfEmpCheckin] + '\'' + ' and ';
    //                         }
    //                     }
    //                 } else if (key === 'rangeDate') {
    //                     date = searchItem[key];
    //                     if (date.dateFrom && date.dateTo) {
    //                         fromDate = date.dateFrom.year + '/' + date.dateFrom.month + '/' + date.dateFrom.day;
    //                         toDate = date.dateTo.year + '/' + date.dateTo.month + '/' + date.dateTo.day;
    //                         s = s + 'a.checkin_date >= \'' + fromDate + '\' and a.checkin_date <= \'' + toDate + '\'' + ' and ';
    //                     }
    //                 }
    //             }
    //         }
    //
    //     }
    //     s = s.substr(0, s.length - 5);
    //     return s;
    // }

    queryForSalaryFilter(searchItem) {
        let s = '';
        // tslint:disable-next-line:forin
        for (const key in searchItem) {
            if (searchItem[key] && searchItem[key].length > 0) {
                let condition = '';
                for (const i of searchItem[key]) {
                    condition = condition + '\"' + i + '\"' + ', ';
                }
                condition = condition.substr(0, condition.length - 2);
                if (key === 'parent_depart') {
                    s = s + 'c.parent_depart in (' + condition + ') and ';
                }
                if (key === 'child_depart') {
                    s = s + 'b.child_depart in (' + condition + ') and ';
                }
                if (key === 'email') {
                    s = s + 'a.email in (' + condition + ') and ';
                }
            }
            if (searchItem[key] && searchItem[key] !== '') {
                if (key === 'formMonth' && searchItem.year !== '') {
                    s = s + 'a.month >=\'' + searchItem[key] + '-' + searchItem.year + '\' and ';
                }
                if (key === 'toMonth' && searchItem.year !== '') {
                    s = s + 'a.month <=\'' + searchItem[key] + '-' + searchItem.year + '\' and ';
                }
            }
        }
        s = s.substr(0, s.length - 5);
        let query;
        let table;
        if (searchItem.type_salary === 'ht') {
            table = TableName.salaryTb.luongHoachToanTb;
        } else {
            table = TableName.lichsuLuongTb;
        }
        query = {
            query: 'Select a.*, b.child_depart from ' + table + ' a inner join '
                + TableName.employeeTb + ' b on a.email=b.email inner join ' + TableName.departmentTb + ' c on b.child_depart=c.child_depart'
                + ' where ' + s,
        };
        return query;
    }

    getQueryForUngVienInfo(searchEl) {
        let s = '';
        // tslint:disable-next-line:forin
        for (const key in searchEl) {
            if ((key === 'place' || key === 'email' || key === 'ho_ten') && searchEl[key].length > 0) {
                let condition = '';
                for (const i of searchEl[key]) {
                    condition = condition + '\"' + i + '\"' + ', ';
                }
                condition = condition.substr(0, condition.length - 2);
                if (key === 'place') {
                    s = s + 'khu_vuc_tuyen in (' + condition + ') and ';
                }
                if (key === 'email' || key === 'ho_ten') {
                    s = s + key + ' in (' + condition + ') and ';
                }
            }
            if (key === 'timeFrom' && searchEl[key] !== '') {
                const a = searchEl[key].split('/');
                const strDate = [a[2], a[1], a[0]].join('-');
                s = s + 'ngay_nhap >= \'' + strDate + '\' and ';
            }
            if (key === 'timeTo' && searchEl[key] !== '') {
                const a = searchEl[key].split('/');
                const strDate = [a[2], a[1], a[0]].join('-');
                s = s + 'ngay_nhap <= \'' + strDate + '\' and ';
            }
        }
        s = s.substr(0, s.length - 5);
        return s;
    }

    getQueryForXepHang(searchItem) {
        let s = '';
        // tslint:disable-next-line:forin
        for (const key in searchItem) {
            if (key !== 'duration' && searchItem[key] && Array.isArray(searchItem[key]) && searchItem[key].length > 0) {
                let condition = '';
                for (const i of searchItem[key]) {
                    condition = condition + '\"' + i + '\"' + ', ';
                }
                condition = condition.substr(0, condition.length - 2);
                if (key === 'emp_code') {
                    s = s + 'a.' + key + ' in (' + condition + ') and ';
                }
                if (key === 'child_depart') {
                    s = s + 'b.' + key + ' in (' + condition + ') and ';
                }
                if (key === 'parent_depart') {
                    s = s + 'c.' + key + ' in (' + condition + ') and ';
                }
            } else if (key === 'duration') {
                s = s + '(a.nam - 1)*12 +  a.thang >=' + searchItem.duration.fromTime + ' and ' +
                    '(a.nam - 1)*12 +  a.thang <= ' + searchItem.duration.toTime + ' and ';
            } else if (key === 'emp_code_text' && searchItem[key] !== ''){
                s = s + 'a.emp_code = \'' + searchItem[key] + '\' and ';
            }
        }
        s = s.substr(0, s.length - 5);
        const query = {
            query: 'Select a.* from ' + TableName.xephangTb + ' a inner join '
                + TableName.employeeTb + ' b on a.emp_code=b.emp_code inner join ' + TableName.departmentTb + ' c on b.child_depart=c.child_depart'
                + ' where ' + s,
        };
        return query;
    }

    getQueryForGameQuaySo(searchItem) {
        let s = '';
        for (const key in searchItem) {
            if (searchItem[key]) {
                if (Array.isArray(searchItem[key]) && searchItem[key].length > 0) {
                    let condition = '';
                    for (let i of searchItem[key]) {
                        if (key === 'email') {
                            i = i.toLowerCase();
                        }
                        condition = condition + '\"' + i + '\"' + ', ';
                    }
                    condition = condition.substr(0, condition.length - 2);
                    if (key === 'email') {
                        s = s + 'a.' + key + ' in (' + condition + ') and ';
                    }
                    if (key === 'emp_code' || key === 'child_depart') {
                        s = s + 'b.' + key + ' in (' + condition + ') and ';
                    }
                    if (key === 'parent_depart') {
                        s = s + 'c.' + key + ' in (' + condition + ') and ';
                    }

                }
                if (typeof(searchItem[key]) === 'string' && searchItem[key].length > 0 && key === 'emailText') {
                    s = s + 'a.email = \'' + searchItem[key] + '\' and ';
                }

            }
        }
        s = s.substr(0, s.length - 5);
        const query = {
            query: 'Select a.*, b.child_depart from ' + TableName.gameQuaySoTb + ' a inner join '
                + TableName.employeeTb + ' b on a.email=b.email inner join ' + TableName.departmentTb + ' c on b.child_depart=c.child_depart'
                + ' where ' + s,
        };
        return query;
    }

        getQueryForTBVP(type, searchItem) {
        let s = '';
        for (const key in searchItem) {
            if (searchItem[key]) {
                if (Array.isArray(searchItem[key]) && searchItem[key].length > 0) {
                    let condition = '';
                    for (let i of searchItem[key]) {
                        condition = condition + '\"' + i + '\"' + ', ';
                    }
                    condition = condition.substr(0, condition.length - 2);
                    if (key === 'ng_tao' || key === 'noi_dung_de_xuat' || key === 'dien_giai') {
                        s = s + 'a.' + key + ' in (' + condition + ') and ';
                    }
                    if (key === 'child_depart' || key === 'parent_depart') {
                        s = s + 'b.' + key + ' in (' + condition + ') and ';
                    }
                } else if (typeof (searchItem[key]) === 'string' && searchItem[key] !== '') {
                    if (key === 'so_tien' || key === 'so_tien_chi_them'){
                        if(searchItem[key].includes('-')){
                            const a = searchItem[key].split(' - ');
                            s = s + 'a.' + key + ' >= ' + Number(a[0]) + ' and a.' + key + ' <= ' + Number(a[1]) + ' and ';
                        } else if (searchItem[key].includes('<')){
                            const b = Number(searchItem[key].substr(1, searchItem[key].length));
                            s = s + 'a.' + key + ' <= ' + b + ' and ';
                        } else if (searchItem[key].includes('>')){
                            const b = Number(searchItem[key].substr(1, searchItem[key].length));
                            s = s + 'a.' + key + ' >=' + b + ' and ';
                        }
                    } else {
                        s = s + 'a.' + key + ' =\'' + searchItem[key] + '\' and ';
                    }
                } else if (key === 'date') {
                    s = s + 'a.ngay_tao >= \'' + searchItem[key].dateFrom + '\' and a.ngay_tao <= \'' + searchItem[key].dateTo + '\' and ';
                }
            }
        }
        s = s.substr(0, s.length - 5);
        const query = {
            query: 'Select a.* from ' + type + ' a inner join '
                + TableName.employeeTb + ' b on a.ng_tao=b.email where ' + s,
        };
        return query;
    }

    getQueryForStatusTicket(type, tableName){
      const query = {
        query: 'Select * from ' + tableName + ' where result = \'' + type + '\' and ng_tao = \'' + this.authService.getEmailUser() + '\'',
      };
      console.log(query);
      return query;
    }
    getQueryForKQGameQuaySo(searchItem) {
        let s = ''; let s1 = '';
        for (const key in searchItem) {
            if (searchItem[key] && searchItem[key] !== ''){
                s = s + key + '= \'' + searchItem[key] + '\' and ';
            }
            if (searchItem[key] && searchItem[key] !== '' && key !== 'giai_quay'){
                s1 = s1 + key + '= \'' + searchItem[key] + '\' and '
            }
        }
        s = s.substr(0, s.length - 5);
        s1 = s1.substr(0, s1.length - 5);
        const query = {
            query: 'Select * from ' + TableName.gameKQQuaySoTb + ' where ' + s,
        };
        const query1 = {
            query: 'Select * from ' + TableName.gameKQQuaySoTb + ' where ' + s1,
        };
        return {queryFull:  query, queryInput: query1};
    }
}
