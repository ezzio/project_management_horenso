import {salaryType} from './salaryTypes';
import {TableName} from './tableName';

const pathFormArray =
    ['formLuongTKBT-PNC.xlsx', 'formLuongTF-PNC.xlsx', 'formLuongDH-PNC.xlsx', 'formLuongFTI.xlsx',
        'formLuongINDO.xlsx', 'formLuongKeyINDO.xlsx', 'formLuongTNOS.xlsx', 'formLuongABCD.xlsx',
        'formLuongINF.xlsx', 'formLuongThucuoc.xlsx', 'formLuongHachToan.xlsx', 'formLuongDH-TIN.xlsx',
        'formLuongSO-PNC.xlsx', 'formLuongTESTTB-PNC.xlsx', 'formLuongTF-TIN.xlsx', 'formLuongTKBT-TIN.xlsx'];
export const CategorySalary = [
    {
        name: 'INF',
        value: 'salaryINF',
        tableData: TableName.salaryTb.luongInfTb,
        table: salaryType.salaryINF,
        path: pathFormArray[8],
        branch: 'Chung'
    },
    {
        name: 'Thu cước',
        value: 'salaryThuCuoc',
        tableData: TableName.salaryTb.luongThucuocTb,
        table: salaryType.salaryThuCuoc,
        path: pathFormArray[9], branch: 'Chung'
    },
    {
        name: 'Hạch toán',
        value: 'salaryHachToan',
        tableData: TableName.salaryTb.luongHoachToanTb,
        table: salaryType.salaryHachToan,
        path: pathFormArray[10], branch: 'Chung'
    },
    {
        name: 'TKBT',
        value: 'salaryTKBT',
        tableData: TableName.salaryTb.luongTkBtTb,
        table: salaryType.salaryTKBT,
        path: pathFormArray[0],
        branch: 'PNC'
    },
    {
        name: 'TF',
        value: 'salaryTF',
        tableData: TableName.salaryTb.luongTfTb,
        table: salaryType.salaryTF,
        path: pathFormArray[1],
        branch: 'PNC'
    },
    {
        name: 'ĐH',
        value: 'salaryDH',
        tableData: TableName.salaryTb.luongDhTb,
        table: salaryType.salaryDH,
        path: pathFormArray[2],
        branch: 'PNC'
    },
    {
        name: 'FTI',
        value: 'salaryFTI',
        tableData: TableName.salaryTb.luongFtiTb,
        table: salaryType.salaryFTI,
        path: pathFormArray[3],
        branch: 'Chung'
    },
    {
        name: 'INDO',
        value: 'salaryINDO',
        tableData: TableName.salaryTb.luongIndoTb,
        table: salaryType.salaryINDO,
        path: pathFormArray[4],
        branch: 'Chung'
    },
    {
        name: 'Key INDO',
        value: 'salaryKeyINDO',
        tableData: TableName.salaryTb.luongKeyIndoTb,
        table: salaryType.salaryKeyINDO,
        path: pathFormArray[5], branch: 'Chung'
    },
    {
        name: 'TN OS',
        value: 'salaryTNOS',
        tableData: TableName.salaryTb.luongTNOSTb,
        table: salaryType.salaryTNOS,
        path: pathFormArray[6],
        branch: 'Chung'
    },
    {
        name: 'Nhóm ABCD',
        value: 'salaryABCD',
        tableData: TableName.salaryTb.luongAbcdTb,
        table: salaryType.salaryABCD,
        path: pathFormArray[7], branch: 'Chung'
    },
    {
        name: 'SO PNC',
        value: 'salarySOPNC',
        tableData: TableName.salaryTb.luongSOPNCTb,
        table: salaryType.salarySOPNC,
        path: pathFormArray[12], branch: 'PNC'
    },
    {
        name: 'Test TB',
        value: 'salaryTestTB',
        tableData: TableName.salaryTb.luongTestTBTb,
        table: salaryType.salaryTestTB,
        path: pathFormArray[13], branch: 'PNC'
    },
    {
        name: 'ĐH TIN',
        value: 'salaryDHTIN',
        tableData: TableName.salaryTb.luongDHTINTb,
        table: salaryType.salaryDHTIN,
        path: pathFormArray[11], branch: 'TIN',
    },
    {
        name: 'TF TIN',
        value: 'salaryTFTIN',
        tableData: TableName.salaryTb.luongTFTINTb,
        table: salaryType.salaryTFTIN,
        path: pathFormArray[14], branch: 'TIN'
    },
    {
        name: 'TKBT TIN',
        value: 'salaryTKBTTIN',
        tableData: TableName.salaryTb.luongTKBTTINTb,
        table: salaryType.salaryTKBTTIN,
        path: pathFormArray[15], branch: 'TIN'
    },
];
