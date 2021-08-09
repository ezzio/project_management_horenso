export class AdminClass {
    createTableSuperAdmin() {
        const tableSuperAdmin = {
            columns: [
                {
                    type: 'select',
                    title: 'Phòng ban',
                    dataField: 'child_depart',
                    nameClass: ['sticky-col', 'third-col'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'text',
                    title: 'Email',
                    dataField: 'email',
                    nameClass: ['sticky-col', 'forth-col-admin'],
                    placeholder: '',
                    optionFilter: []
                },
                {type: 'select', title: 'Quyền Admin', dataField: 'per_id', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Loại', dataField: 'super_admin', placeholder: '', optionFilter: []},
            ]
        };
        return tableSuperAdmin;
    }

    createTableAdmin() {
        const tableAdmin = {
            columns: [
                {
                    type: 'select',
                    title: 'Phòng ban',
                    dataField: 'child_depart',
                    nameClass: ['sticky-col', 'third-col'],
                    placeholder: '',
                    optionFilter: []
                },
                {
                    type: 'select',
                    title: 'Email',
                    dataField: 'email',
                    nameClass: ['sticky-col', 'forth-col-admin'],
                    placeholder: '',
                    optionFilter: []
                },
                {type: 'select', title: 'Quyền Admin', dataField: 'per_id', placeholder: '', optionFilter: []},
                // {type: 'select', title: 'Team name', dataField: 'team_name', placeholder: '', optionFilter: []},
                {type: 'select', title: 'Bộ phận', dataField: 'child_depart_right', placeholder: '', optionFilter: []},
            ]
        };
        return tableAdmin;
    }
}
