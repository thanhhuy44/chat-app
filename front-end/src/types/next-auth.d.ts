export declare module "next-auth" {
  export interface User {
    _id: string;
    fullName: string;
    email: string;
  }
  export interface Session {
    user: User;
  }
}
