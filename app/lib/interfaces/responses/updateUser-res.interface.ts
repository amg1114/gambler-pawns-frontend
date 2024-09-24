export interface UpdateUserResponse {
  status: boolean;
  statusCode: number;
  path: string;
  data: Data;
  timestamp: Date;
}

export interface Data {
  generatedMaps: any[];
  raw: any[];
  affected: number;
  message: string[];
  error: string;
}
