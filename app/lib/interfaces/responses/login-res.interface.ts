export interface LoginResponse {
  status: boolean;
  statusCode: number;
  path: string;
  data: Data;
  timestamp: Date;
}

export interface Data {
  access_token: string;
}
