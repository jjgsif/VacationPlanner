export type Destination = {
    name: string;
    url: string;
}

export type Ports = {
    name: string;
    url: string;
}

export type SailingsQuery = {
    durdays?: number[];
    port: string[];
    shipcode: string[];
    dates?: string[]
}

export interface Sailing {
    shipName: string;
    dur: number;
    departurePortName: string;
    code: string;
    specialScoops: Array<any>
    id: string;
    itineraryTitle: string;
}

