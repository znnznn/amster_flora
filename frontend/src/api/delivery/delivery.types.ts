export interface CitiesQueryParams {
    search: string
}

export interface WarehousesQueryParams {
    search: string
    city: string
}

export interface DeliveryResponse {
    success: boolean
    data: Data[]
    errors: any[]
    warnings: any[]
    info: Info
    messageCodes: any[]
    errorCodes: any[]
    warningCodes: any[]
    infoCodes: any[]
}

export interface Data {
    Description: string
    DescriptionRu: string
    Ref: string
    Delivery1: string
    Delivery2: string
    Delivery3: string
    Delivery4: string
    Delivery5: string
    Delivery6: string
    Delivery7: string
    Area: string
    SettlementType: string
    IsBranch: string
    PreventEntryNewStreetsUser: string
    CityID: string
    SettlementTypeDescription: string
    SettlementTypeDescriptionRu: string
    SpecialCashCheck: number
    AreaDescription: string
    AreaDescriptionRu: string
}

export interface Info {
    totalCount: number
}
