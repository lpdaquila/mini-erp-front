import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User, UserEnterpriseDetail } from "src/models/Auth";

type AuthState = {
    user: User | null;
    enterprise: UserEnterpriseDetail | null;
};

const initialState: AuthState = {
    user: null,
    enterprise: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setUserEnterprise: (state, action: PayloadAction<UserEnterpriseDetail | null>) => {
            state.enterprise = action.payload
        }
    }
})

export const { setUser, setUserEnterprise } = authSlice.actions;

export default authSlice.reducer;