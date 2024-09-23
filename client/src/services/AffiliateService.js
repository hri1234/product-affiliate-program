import CreateApi from "./apiService";

const AffiliateService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetAffiliateList: builder.query(
                    {
                        providesTags: ["links","adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/list`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                GetIndividualAffiliateList: builder.query(
                    {
                        providesTags: ["links"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/affiliate/user/${Id}`,
                                method: "POST",
                                body: data
                            }
                        ),
                    }
                ),
                AddAffiliateLink: builder.mutation(
                    {
                        invalidatesTags: ["links"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/add`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                

            }
        )
    }
);

export const { useGetAffiliateListQuery, useAddAffiliateLinkMutation, useGetIndividualAffiliateListQuery } = AffiliateService; 