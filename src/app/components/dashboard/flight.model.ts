export interface IFlightInformation {
    airportCode: string;
    adi: string;
    flightDate: string;
    flightRecord: IFlightRecord[];
    id: number;
}

export interface IFlightRecord {
    airportCode: string;
    scheduled: string;
    estimated: string;
    gate: string;
    status: string;
    statusText: string;
    city: string;
    operatingCarrier: IOperatingCarrier;
    remark: string;
    id: number;
}

export interface IOperatingCarrier {
    airlineCode: string;
    flightNumber: string;
    airline: string;
    id: number;
}
