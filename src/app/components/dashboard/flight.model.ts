export interface IFlightInformation {
    airportCode: string;
    adi: string;
    flightDate: string;
    flightRecord: IFlightRecord[];
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
}

export interface IOperatingCarrier {
    airlineCode: string;
    flightNumber: string;
    airline: string;
}
