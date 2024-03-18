export declare module "next-auth" {
  export interface User {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    token?: string;
  }
  export interface Session {
    user: User;
  }

  export interface JWT {
    user?: User;
  }
}
