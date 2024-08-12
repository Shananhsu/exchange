import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEVTOKEN } from "@/env";
import { TokenCheck } from "../libs/type/token";

interface TokenState {
    token: string;
    state: TokenCheck;
}

const token = localStorage.getItem("token");
const initialState: TokenState = {
    token: token ?? DEVTOKEN,
    state: TokenCheck.Wait,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setState: (state, action: PayloadAction<TokenCheck>) => {
            state.state = action.payload;
        }
    },
});

export const { setToken, setState } = tokenSlice.actions;

export default tokenSlice.reducer;
