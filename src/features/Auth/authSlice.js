import { createSlice } from '@reduxjs/toolkit'
import LocalStorageService from '../../app/localStorageService'

const initialState = {
    isLoggedIn: LocalStorageService.getAccessToken()? true : false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
	}
})

export const {
    setIsLoggedIn,
} = authSlice.actions


export const getIsLoggedIn = (state) => state.auth.isLoggedIn

export default authSlice.reducer