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
      email: ''
    },
    error: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            for (let i = 0; i < state.account.length; i++){ 
                if (action.payload.email === state.account[i].email && 
                    action.payload.password === state.account[i].password) //check if email and password match user account
                {
                    console.log('Login successfully')
                    state.currentUser.id = state.account[i].id
                    state.currentUser.email = state.account[i].email
                    state.currentUser.name = state.account[i].name
                    //set current user state
                    state.error = ''
                    break;
                }
            }
            if (state.currentUser.id <= 0) {
                console.log('Login failed')
                state.error = 'Email or password does not match. Please try again!'
            }
            action.payload.setError(state.error)
        }
    }
})

export default loginSlice.reducer
export const { userLogin } = loginSlice.actions