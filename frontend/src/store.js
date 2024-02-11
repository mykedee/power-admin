import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import globalSliceReducer from "./slices/globalSlice";
import authSliceReducer from "./slices/authSlice";
import paginationSliceReducer from "./slices/paginationSlice";

const store = configureStore({
	reducer: {
		// Add the generated RTK Query "API slice" caching reducer
		[apiSlice.reducerPath]: apiSlice.reducer,
		darkMode: globalSliceReducer,
		auth: authSliceReducer,
		pagination: paginationSliceReducer,
		// Add any other reducers
		// users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
