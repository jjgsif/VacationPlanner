import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CarnivalApi = createApi({
    reducerPath: 'carnival',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.carnival.com',
        prepareHeaders(headers, api) {
            headers.set('content-type', 'application/json');
        },
        mode: 'no-cors'
    }),
    endpoints: () => ({})
});

export default CarnivalApi;