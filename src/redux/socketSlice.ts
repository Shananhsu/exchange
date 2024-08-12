import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
    isConnected: boolean;
}

const initialState: SocketState = {
    isConnected: false,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setIsConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        }
    },
});

export const { setIsConnected } = socketSlice.actions;

export default socketSlice.reducer;
