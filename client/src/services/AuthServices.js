import CreateApi from "./apiService";

const AuthServices = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {

                Login: builder.mutation(
                    {
                        invalidatesTags: ["auth"],
                        query: ({ data }) => (
                            {
                                url: '/auth/login',
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                Register: builder.mutation(
                    {
                        invalidatesTags: ["auth"],
                        query: ({ data }) => (
                            {
                                url: '/auth/register',
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                ForgotPassword: builder.mutation(
                    {
                        invalidatesTags: ["auth"],
                        query: ({ data }) => (
                            {
                                url: '/auth/forget-password',
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                ResetPassword: builder.mutation(
                    {
                        invalidatesTags: ["auth"],
                        query: ({ data, Id }) => (
                            {
                                url: `/auth/reset-password/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }),
                UpdatePassword: builder.mutation(
                    {
                        invalidatesTags: ["auth"],
                        query: ({ data, Id }) => (
                            {
                                url: `/auth/updatePassword`,
                                method: "PUT",
                                body: data
                            }
                        )
                    })
            }
        )
    }
)

export const { useLoginMutation, useRegisterMutation, useResetPasswordMutation, useForgotPasswordMutation ,useUpdatePasswordMutation } = AuthServices;