import { apiSlice } from "./apiSlice";
import {
  LOGIN_URL,
  SIGNUP_URL,
  USERS_URL,
  VERIFY_URL,
  LOGOUT_URL,
  PROFILE_URL,
  UPDATE_PASSWORD_URL,
  UPDATE_USERDETAILS_URL,
  UPDATE_USERPHOTO_URL,
  RESENT_VERIFICATION_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL
} from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query(body) {
        return {
          url: `${USERS_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: (page = 1) => ({
        url: `${USERS_URL}?page=${page}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    getUser: builder.query({
      query: (id) => ({ url: `${USERS_URL}/${id}` }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => ({ url: `${PROFILE_URL}` }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: `${UPDATE_PASSWORD_URL}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserDetails: builder.mutation({
      query: ({ updateDetails }) => ({
        url: `${UPDATE_USERDETAILS_URL}`,
        method: "PUT",
        body: updateDetails,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserPhoto: builder.mutation({
      query: (updatePhoto) => ({
        url: `${UPDATE_USERPHOTO_URL}`,
        method: "PUT",
        body: updatePhoto,
      }),
    }),

    deleteUser: builder.mutation({
      query: (Id) => ({ url: `${USERS_URL}/${Id}`, method: "DELETE" }),
    }),

    login: builder.mutation({
      query(body) {
        return {
          url: `${LOGIN_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Login"],
    }),

    signup: builder.mutation({
      query(body) {
        return {
          url: `${SIGNUP_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Signup"],
    }),

    verifyUser: builder.mutation({
      query(body) {
        return {
          url: `${VERIFY_URL}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Login"],
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `${FORGOT_PASSWORD_URL}`,
          method: "POST",
          body,
        };
      },
    }),
    resendVerification: builder.mutation({
      query(body) {
        return {
          url: `${RESENT_VERIFICATION_URL}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Login"],
    }),
    resetPassword: builder.mutation({
      query: ({ resettoken, resetPass }) => {
        return {
          url: `${RESET_PASSWORD_URL}/${resettoken}`,
          method: "PATCH",
          body: resetPass,
        };
      },
    }),
    logout: builder.mutation({
      query() {
        return {
          url: `${LOGOUT_URL}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Logout"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useUpdateUserDetailsMutation,
  useUpdateUserPhotoMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useVerifyUserMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userApiSlice;
