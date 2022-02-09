import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: [
      {
          id: 1,
          name: 'Minh',
          email: 'minhn465@gmail.com',
          password: 'minh2001'
      },
      {
          id: 2,
          name: 'Jeff',
          email: 'jeff123@gmail.com',
          password: 'lmao1234'
      },
      {
          id: 3,
          name: 'Nadhir',
          email: 'farfa420@gmail.com',
          password: 'sussy1234'
      }
    ],
    currentUser:{
      id: 0,
      name: '',
      email: '',
      password: ''
    },
}

export const forgotSlice = createSlice({
    name: 'forgot',
    initialState,
    reducers: {
        forgotPassword: (state, action) => {
            let exist = false
            action.payload.setError('')
            for (let i = 0; i < state.account.length; i++){
                if (action.payload.email === state.account[i].email){
                    exist = true
                    console.log('user located!')
                    state.currentUser = state.account[i]
                    break;
                }
            }
            if (exist === false){
                console.log('account doesnt exist')
                action.payload.setError('Email does not exist. Please try again later!')   
            }
        },
        resetPassword: (state, action) => {
            state.currentUser.password = action.payload.password
        }
    }
})

export default forgotSlice.reducer
export const { forgotPassword, resetPassword } = forgotSlice.actions