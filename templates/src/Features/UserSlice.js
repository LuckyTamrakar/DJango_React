import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  email:"",
  name:"",
}

export const userAuthSlice = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    setUserInfo:(state,action)=>{
        state.email=action.payload.email
        state.name=action.payload.name
    },
    unSetUserInfo:(state,action)=>{
        state.email=action.payload.access_token
        state.name=action.payload.name
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,unSetUserInfo } = userAuthSlice.actions

export default userAuthSlice.reducer