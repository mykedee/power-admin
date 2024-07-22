import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	darkMode: localStorage.getItem("darkMode")
		? JSON.parse(localStorage.getItem("darkMode"))
		: false,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggler: (state) => {
			state.darkMode = !state.darkMode;
			localStorage.setItem("darkMode", state.darkMode);
		},
	},
});

export const { toggler } = globalSlice.actions;

export default globalSlice.reducer;
