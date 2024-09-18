import CreateApi from "./apiService";

const AnalyticsService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetAnalyticsDetails: builder.query(
                    {
                        providesTags: ["analytics"],
                        query: ({ Id, data }) => (
                            {
                                url: `/click-and-purchases/list/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                )
            }
        )
    }
);

export const { useGetAnalyticsDetailsQuery } = AnalyticsService; 