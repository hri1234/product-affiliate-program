import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const CreateApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://d832-49-249-2-6.ngrok-free.app/api/v1",
        prepareHeaders: (headers) => {
            const user = Cookies.get('isLogged');
            if (user) {
                headers.set("Authorization", `Bearer ${user}`);
            } else {
                console.warn("Token is missing or empty");
            }
            return headers;
        },
        mode: 'cors', // Ensure mode is set to 'cors'
    }),
    endpoints: () => ({}),
    tagTypes: ["adminPanel", "links", "adminAffiliate", "assignCustomer", "profile"]
});

export default CreateApi;