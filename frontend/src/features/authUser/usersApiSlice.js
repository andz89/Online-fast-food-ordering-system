import { apiSlice } from "../api/apiSlice";
const USERS_URL = "/api/users";
const SELLER = "/api/seller";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatePassword`,
        method: "PUT",
        body: data,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `/api/token/refresh`,
        method: "GET",
      }),
    }),

    //seller ------------------
    sellerLogin: builder.mutation({
      query: (data) => ({
        url: `${SELLER}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    sellerLogout: builder.mutation({
      query: () => ({
        url: `${SELLER}/logout`,
        method: "POST",
      }),
    }),
    sellerRegister: builder.mutation({
      query: (data) => ({
        url: `${SELLER}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSeller: builder.mutation({
      query: (data) => ({
        url: `${SELLER}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    sellerImageBg: builder.mutation({
      query: (data) => ({
        url: `${SELLER}/imageBg`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useRefreshMutation,
  useSellerLoginMutation,
  useSellerLogoutMutation,
  useSellerRegisterMutation,
  useUpdateSellerMutation,
  useSellerImageBgMutation,
} = usersApiSlice;
