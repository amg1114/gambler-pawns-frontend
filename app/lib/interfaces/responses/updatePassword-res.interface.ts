export interface UpdatePasswordRes {
    status:     boolean;
    statusCode: number;
    path:       string;
    data:       Data;
    timestamp:  Date;
}

interface Data {
    generatedMaps: any[];
    raw:           any[];
    affected:      number;
    message?:      string;
}
