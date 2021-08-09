export class CreateHTML {
    typeTicket: string;
    tableConfig: any;
    tableContent: any;
    listElContent: any;
    listElConfig: any;

    constructor(typeTicket: string, tableContent: any, tableConfig: any, listElContent?: any, listElConfig?: any) {
        this.typeTicket = typeTicket;
        this.tableContent = tableContent;
        this.tableConfig = tableConfig;
        this.listElConfig = listElConfig;
        this.listElContent = listElContent;
    }

    thousands_separators(num) {
        if (num){
            if (typeof (num) === 'string') {
                // tslint:disable-next-line:radix
                num = parseInt(num);
            }
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        else {
            return num;
        }
    }

    public getDynamicTemplate() {
        let rowCol = ``;
        let rowHeadEl = ``;
        let rowBodyEl = ``;
        let bodyEl = ``;
        let htmlAdd = ``;
        this.tableConfig.columns.forEach((i) => {
            if (!i.notShowInEmail && this.tableContent[i.dataField]) {
                if (i.formatCurrency) {
                    rowCol = rowCol + `<tr><td class="title">${i.title}</td>
                 <td>${this.thousands_separators(this.tableContent[i.dataField])} VND</td></tr>`;
                } else {
                    rowCol = rowCol + `<tr><td class="title">${i.title}</td>
                 <td>${this.tableContent[i.dataField]}</td></tr>`;
                }
            }
        });
        const table = `<div class="cus"><table>` + rowCol + `</table></div>`;
        htmlAdd = htmlAdd + table;

        if (this.listElContent && this.listElConfig) {
            this.listElConfig.columns.forEach((i) => {
                rowHeadEl = rowHeadEl + `<td>${i.title}</td>`;
            });
            this.listElContent.forEach((i) => {
                rowBodyEl = ``;
                this.listElConfig.columns.forEach((j) => {
                    if (i[j.dataField] !== '') {
                        rowBodyEl = rowBodyEl + `<td>${i[j.dataField]}</td>`;
                    }
                });
                bodyEl = bodyEl + `<tr>` + rowBodyEl + `</tr>`;
            });
            const tableList = `<div class="cus"><table><thead><tr>` + rowHeadEl + `</tr></thead><tbody>` + bodyEl + `</tbody></table></div>`;
            htmlAdd = htmlAdd + `<p>Thông tin chi tiết: </p>` + tableList;
        }
        let linkToAns = '';
        if (this.typeTicket === 'TU') {
            linkToAns = `<a href='https://mytinpnc.vn/api/auth/hanhchinh/tbvp/tamung/${this.tableContent.task_time}'> tại đây</a>`;
        } else if (this.typeTicket === 'CTP') {
            linkToAns = `<a href='https://mytinpnc.vn/api/auth/hanhchinh/tbvp/ctp/${this.tableContent.task_time}'> tại đây</a>`;
        }
        const dynamicTemplateParsed = `
   <html>
     <style>
      .cus{
      padding: 0 5%;
      }
      table {
      width: 100%;
      font-size: 16px;
      margin: 0 auto;
      cellpadding: 0;
      cellspacing: 0;
      }
      td ,th {
      border: 1px solid #ddd;
      padding: 2%;
      }
      td {
       overflow-wrap: break-word;
      }
      tr:nth-child(even){background-color: #f2f2f2;}
      tr:hover {background-color: #ddd;}
      td.title{
        width: 30%;
      }
      body {
      background-color: white; font-size: 16px; border:1px solid darkorange;
      }
      h2, h3{
      font-weight: bold; border:1px solid; background-color: darkorange; color: white; text-align: center;
      }
      p {
      margin: 2%;
      }
      button{
      border-radius: 10px;  font-size: 16px; float: right;
      border: none;
      margin-bottom: 2%;
      padding: 10px;
      width: 100px;
      }
      .btn-submit {
      background-color: midnightblue; color: white;
      }
      .btn-cancel{
      background-color: darkred; color: white;
      }
     </style>
     <body>
     <div>
       <h2>
         Đơn xin duyệt chi phí
       </h2>
       <p>Dear anh/chị</p>
       <p>Đơn xin duyệt chi phí có nội dung như sau:</p>`
            + htmlAdd +
            `<p>Anh/Chị vào link để xem xét và phản hồi` + linkToAns + ` </p>
     </div>
     </body>
   </html>
  `;
        return dynamicTemplateParsed;
    }

}
