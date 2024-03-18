export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
  token?: string;
};

export type User = {
  _id: string;
  fullName: string;
  avatar: string;
  isOnline: boolean;
};
