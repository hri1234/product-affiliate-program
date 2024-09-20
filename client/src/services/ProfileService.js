import CreateApi from "./apiService";

const ProfileService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetProfile: builder.query(
                    {
                        providesTags: ['profile'],
                        query: ({ Id, data }) => (
                            {
                                url: `/auth/profile`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                UpdateProfile: builder.mutation(
                    {
                        invalidatesTags: ['profile'],
                        query: ({ Id, data }) => (
                            {
                                url: `/auth/profile-update`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }
                ),
                GetProfileById: builder.query(
                    {
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/user-details/${Id}`,
                                method: "GET",
                                body: data
                            }
                        )
                    }
                )
            }
        )
    }
);

export const { useGetProfileQuery, useUpdateProfileMutation, useGetProfileByIdQuery } = ProfileService;