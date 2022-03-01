import { createSlice  } from "@reduxjs/toolkit";
import { createChannelSlice } from "features/ListChannel/ListChannelSlice";
import moment from "moment";

const initialState = {
    loading: false,
    meetingRooms: [
        {
            id: '291adw',
            name: 'Phân tích giai đoạn xây dựng giao diện người dùng',
            description:
                'Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúng Cuộc họp được lên khi chúngta cần thảo luận về hướng giải quyết và phát triển của dự án ở giai đoạn một. Với 2 nhiệm vụ chính trong giai đoạn này là thiết kế mô hình ứng dụng và nghiên cứu API / Liberty liên quan',
            startTime: '19:00 12/06/2021',
            endTime: '19:30 12/06/2021',
            members: [
                {
                    name: 'Khoa', 
                },
                {
                    name: 'Thang',
                },
            ],
            duration: [
                moment('19:00 12/06/2022', 'HH:mm DD/MM/YYYY'),
                moment('19:30 12/06/2022', 'HH:mm DD/MM/YYYY'),
            ]
        },
        {
            id: '291a2dw',
            name: 'Phân tích giai đoạn 1',
            description:
                'Cuộc họp được lên khi chúng ta cần thảo luận về hướng giải quyết và phát triển của dự án ở giai đoạn một. Với 2 nhiệm vụ chính trong giai đoạn này là thiết kế mô hình ứng dụng và nghiên cứu API / Liberty liên quan',
            startTime: '19:00 12/06/2021',
            endTime: '19:00 12/06/2021',
            members: [
                {
                    name: 'Khoa', 
                },
                {
                    name: 'Thang',
                },
            ],
            duration: [
                moment('19:00 12/06/2021', 'HH:mm DD/MM/YYYY'),
                moment('19:30 12/06/2021', 'HH:mm DD/MM/YYYY'),
            ]
        },
    ],
    teamMembers: [
        {   
            id: 1,
            name: 'Khoa',
        },
        {   
            id: 2,
            name: 'Thang',
        },
        {   
            id: 3,
            name: 'Nguyen',
        },
        {   
            id: 4,
            name: 'Nhut',
        },
        {   
            id: 5,
            name: 'Minh',
        },
    ],
}

export const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        createMeeting: (state, action) => {
            const newMeeting = {
                id: '291adw',
                name: action.payload.name,
                description: action.payload.description,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
                duration: action.payload.duration,
                members: action.payload.members,
            }
            console.log(newMeeting)
            state.meetingRooms.push(newMeeting)
        },
    },
})

export const {
    createMeeting,
} = meetingSlice.actions;
export default meetingSlice.reducer;