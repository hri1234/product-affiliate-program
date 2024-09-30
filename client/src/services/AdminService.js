import CreateApi from "./apiService";

const AdminService = CreateApi.injectEndpoints(
    {
        endpoints: (builder) => (
            {
                GetUserList: builder.query(
                    {
                        providesTags: ['admin', 'assignCustomer', "userstatus", "updatecommission"],
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
                        invalidatesTags: ['admin', "analysis"],
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
                        providesTags: ["adminAffiliate", "updatecommission"],
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
                DeAssignAffiliate: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate", "assignCustomer"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/affiliate/assign-delete/${Id}`,
                                method: "DELETE",
                                body: data
                            }
                        )
                    }
                ),
                GetAssignedCustomerList: builder.query(
                    {
                        providesTags: ["adminAffiliate", "updatecommission"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/assigned-customers-list/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                EditAffiliate: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/updateAffiliate/${Id}`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }
                ),
                GetSingleAffiliate: builder.query(
                    {
                        providesTags: ["adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/getAffiliateById/${Id}`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                UploadImage: builder.mutation(
                    {
                        providesTags: ["image"],
                        query: ({ Id, data }) => (
                            {
                                url: `/affiliate/upload`,
                                method: "POST",
                                body: data
                            }
                        )
                    }
                ),
                DeleteAffiliate: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/affiliate/${Id}`,
                                method: "DELETE",
                                body: data
                            }
                        )
                    }
                ),
                UserStatus: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate", "userstatus"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/user-status/${Id}`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }
                ),
                UpdateCommission: builder.mutation(
                    {
                        invalidatesTags: ["adminAffiliate", "updatecommission"],
                        query: ({ Id, data }) => (
                            {
                                url: `/admin/commission/${Id}`,
                                method: "PUT",
                                body: data
                            }
                        )
                    }
                ),

            }
        )
    }
);

export const { useUpdateCommissionMutation, useGetUserListQuery, useAddInvoiceMutation, useGetIndividualInvoiceListQuery, useUpdateInvoiceStatusMutation, useGetAffiliateAvailableUsersQuery, useAssignAffiliateMutation, useGetAssignedCustomerListQuery, useEditAffiliateMutation, useGetSingleAffiliateQuery, useUploadImageMutation, useDeleteAffiliateMutation, useDeAssignAffiliateMutation, useUserStatusMutation } = AdminService;