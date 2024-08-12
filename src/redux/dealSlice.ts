import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal } from "../libs/type/event";

interface DealState {
    deal: Deal | null;
}

const initialState: DealState = {
    deal: null,
};

export const dealSlice = createSlice({
    name: "deal",
    initialState,
    reducers: {
        setDeal: (state, action: PayloadAction<Deal | null>) => {
            state.deal = action.payload;
        }
    },
});

export const { setDeal } = dealSlice.actions;

export default dealSlice.reducer;
