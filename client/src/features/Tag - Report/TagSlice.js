import { createSlice } from '@reduxjs/toolkit'

const initialTags = [
    {
        type: "complated",
        title: "UI Design",
        team: "UI team",
        time: "1 month left",
        members:
            [
                'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
                'https://static.remove.bg/remove-bg-web/3661dd45c31a4ff23941855a7e4cedbbf6973643/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png'
            ],
        process: "47%"
    },
    {
        type: "complated",
        title: "Backend Design",
        team: "Backend",
        time: "2 months left",
        members:
            [
                'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
                'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
                'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
                'https://static.remove.bg/remove-bg-web/3661dd45c31a4ff23941855a7e4cedbbf6973643/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png'
            ],
        process: "47%"
    },
];

const tag = createSlice({
    name: 'tags',
    initialState: initialTags,
    reducers: {
        addTag: (state, action) => {
            const newTag = action.payload;
            state.push(newTag)
        }
    }
})

const { reducer, actions } = tag;
export const { addTag } = actions;
export default reducer;