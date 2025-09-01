import type { Destination, Ports } from "@type/Carnival";
import CarnivalApi from "..";

interface ShipList {
    [index: string]: {
        shipCode: string;
        destinations: Destination[],
        ports: Ports[]
    }
}

const ShipsEndpoints = CarnivalApi.injectEndpoints({
    endpoints: (builder) => ({
        getShips: builder.query({
            query: () => ({
                url: '/explore-ships-service/GetResults',
                method: "GET"
            }),
            transformResponse: ({ Results }) => {
                const Ships: ShipList = {};
                if (Results instanceof Array) {
                    Results.forEach(({ name, shipCode, destinations, ports }) =>
                        Ships[name] = {
                            shipCode,
                            destinations,
                            ports
                        }
                    );
                }
                return Ships;
            }
        })
    })
});

export const {
    useGetShipsQuery
} = ShipsEndpoints;