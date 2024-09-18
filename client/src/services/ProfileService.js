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
                                url:`/auth/profile`,
                                method:"POST",
                                body:data
                            }
                        )
                    }
                ), 
                UpdateProfile: builder.mutation(
                    {
                        providesTags: ['profile'],
                        query: ({ Id, data }) => (
                            {
                                url:`/auth/profile-update`,
                                method:"PUT",
                                body:data
                            }
                        )
                    }
                )
            }
        )
    }
);

export const { useGetProfileQuery ,useUpdateProfileMutation} = ProfileService;