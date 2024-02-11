import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
	name: "pagination",
	initialState: {
		page: 1,
		pages: null,
		pageSize: 5,
		items: [],
	},
	reducers: {
		nextPage: (state) => {
			state.page = state.page + 1;
		},
		prevPage: (state) => {
			state.page = state.page - 1;
		},
	},
});

export const { nextPage, prevPage } = paginationSlice.actions;

export default paginationSlice.reducer;
