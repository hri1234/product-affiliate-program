import CreateApi from "./apiService";

const AdminService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetUserList: builder.query(
                    {
                        providesTags: ['admin', 'assignCustomer'],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/allUsers`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                AddInvoice: builder.mutation(
                    {
                        invalidatesTags: ['admin'],
                        query: ({ Id, data }) => (
                            {
                                url: `/invoice/createInvoice`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                GetIndividualInvoiceList: builder.query(
                    {
                        providesTags: ["admin"],
                        query: ({ Id, data }) => (
                            {
                                url: `/invoice/userInvoiceList/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                UpdateInvoiceStatus: builder.mutation(
                    {
                        invalidatesTags: ['admin', "overvieww"],
                        query: ({ Id, data }) => (
                            {
                                url: `/invoice/updateStatus/${Id}`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }
                ),
                GetAffiliateAvailableUsers: builder.query(
                    {
                        providesTags: ["adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/affiliate/not-assigned-customers-list/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                AssignAffiliate: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate", "assignCustomer"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/assign-affiliate/add/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                GetAssignedCustomerList: builder.query(
                    {
                        providesTags: ["adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/assigned-customers-list/${Id}`,
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

export const { useGetUserListQuery, useAddInvoiceMutation, useGetIndividualInvoiceListQuery, useUpdateInvoiceStatusMutation, useGetAffiliateAvailableUsersQuery, useAssignAffiliateMutation, useGetAssignedCustomerListQuery } = AdminService;