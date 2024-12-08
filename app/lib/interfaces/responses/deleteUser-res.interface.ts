export interface DeleteUserRes {
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
  message?: string[];
}
