import React, { useState } from 'react';
import Header from './components/Header/Header';
import WorkPlace from './components/WorkPlace/WorkPlace';

function KanbanDashBoard() {
    const member = [
        'https://www.w3schools.com/howto/img_avatar2.png',
        'https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png'
    ];



    return (
        <div>
            {/* <Header /> */}
            <WorkPlace
                title='Important Fix'
                level='High'
                chart='35%'
                member={member}
            />
        </div>
    )
}

export default KanbanDashBoard
