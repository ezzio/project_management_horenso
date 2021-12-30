import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Duong Huu Thang",
    avatar:
      "https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png",
    email: "dht@gmail.com",
    phone_number: "0949000111",
    tag: "Leader",
  },
  {
    id: 2,
    name: "Duong Dang Khoa",
    avatar:
      "https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png",
    email: "ddk@gmail.com",
    phone_number: "0919444555",
    tag: "Project Manager",
  },
  {
    id: 3,
    name: "Dang Nguyen Phu Nguyen",
    avatar:
      "https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png",
    email: "dnpn@gmail.com",
    phone_number: "0949123456",
    tag: "Member",
  },
  {
    id: 4,
    name: "Nguyen Ngoc Tuong Minh",
    avatar:
      "https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png",
    email: "nntm@gmail.com",
    phone_number: "0908676818",
    tag: "Member",
  },
  {
    id: 5,
    name: "Le Chanh Nhut",
    avatar:
      "https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png",
    email: "lcn@gmail.com",
    phone_number: "0929023024",
    tag: "Member",
  },
];

export const teammateSlice = createSlice({
  name: "teammate",
  initialState,
  reducers: {
    addNewTeammate: (state, action) => {
      state.teammate.push(action.payload);
    },
  },
});

export const { addNewTeammate } = teammateSlice.actions;
export default teammateSlice.reducer;
