import CreateApi from "./apiService";

const DashboardService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) =>
        (
            {
                GetDashboardInvoiceList: builder.query(
                    {
                        providesTags: ["dashboard"],
                        query: ({ Id, data }) => (
                            {
                                url: `/dashboard/list`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                GetMonthlyAnalysis: builder.query(
                    {
                        providesTags: ["dashboard","overvieww"],
                        query: ({ Id, data }) => (
                            {
                                url: `/overview/get/${Id}`,
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

export const { useGetDashboardInvoiceListQuery, useGetMonthlyAnalysisQuery } = DashboardService;