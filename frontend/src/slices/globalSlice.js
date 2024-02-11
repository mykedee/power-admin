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
			// const dark = action.payload;
			state.darkMode = !state.darkMode;
			localStorage.setItem("darkMode", state.darkMode);

			// localStorage.setItem("darkMode", darkMode);

			// console.log("true");
			// } else {
			// 	state.darkMode = state.darkMode === "false";
			// 	console.log("false");
			// }

			// if (!dark) {
			// 	localStorage.setItem("darkMode", dark);
			// 	// setDarkMode(true);
			// } else {
			// 	state.darkMode = [...state.darkMode];

			// }
		},
	},
});

export const { toggler } = globalSlice.actions;

export default globalSlice.reducer;
