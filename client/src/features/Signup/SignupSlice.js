import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    account: [
      {
        id: 1,
        userName: 'DilucSimp420',
        faceName: 'Minh Nguyen',
        email: 'minhn465@gmail.com',
        password: 'minh2001',
        createAt: '26-9-2022 12:40:30'
      },
      {
        id: 2,
        userName: 'Jeff Jefferson',
        faceName: 'Jeff Jefferson',
        email: 'jeff123@gmail.com',
        password: 'lmao1234',
        createAt: '25-4-2022 8:15:15'
      },
      {
        id: 3,
        userName: 'FarfaYGO',
        faceName: 'Nadhir Mazouni',  
        email: 'farfa420@gmail.com',
        password: 'sussy1234',
        createAt: '10-10-2022 18:20:45'
      }
    ],
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        userSignUp: (state, action) => {
            let isRegistered = false
            const newUser = {
                id: state.account.length + 1,
                userName: action.payload.fullName,
                faceName: action.payload.fullName,
                email: action.payload.email,
                password: action.payload.password,
                createAt: action.payload.createAt
            }
            for (let i = 0; i < state.account.length; i++){
                if (state.account[i].email === action.payload.email){
                    action.payload.setError('Email already taken')
                    isRegistered = true
                    break;
                }
            }
            if (!isRegistered) {
                state.account.push(newUser);
                console.log('Sign up sucessfully!')
            }
        }
    }
})

export default signUpSlice.reducer
export const { userSignUp } = signUpSlice.actions