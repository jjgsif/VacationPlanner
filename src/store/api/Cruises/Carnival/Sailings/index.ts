import { FetchArgs } from "@reduxjs/toolkit/query";
import { Sailing, SailingsQuery } from "@type/Carnival";
import CarnivalApi from "..";

const SailingsQueryFunction =  (args: SailingsQuery): FetchArgs => {
    const {
        durdays,
        ...rest
    } = args;

    if (!durdays || durdays.length === 0) {
        return {
            url: `/cruisesearch/api/search?durdays=${Array.from(Array(30).keys()).map(v => v + 1).join(",")}`,
            params: {
                ...rest,
                pageSize: 100
            }
        }
    } else {
        return {
            url: `/cruisesearch/api/search?durdays=${durdays.join(',')}`,
            params: {
                ...rest,
                pageSize: 100
            }
        }
    }
}

const SailingsEndpoints = CarnivalApi.injectEndpoints({
    endpoints: builder => ({
        searchSailings: builder.query<Sailing[], SailingsQuery>({
            query: SailingsQueryFunction,
            transformResponse: (response: {results?: {itineraries?: Sailing[]}}) => {
                if (response && typeof response === 'object' && typeof response.results === 'object') {
                    return response.results.itineraries ?? [];
                }
                return [];
            },
        }), 
    }),
    overrideExisting: true
});

export const {
    useSearchSailingsQuery
} = SailingsEndpoints;