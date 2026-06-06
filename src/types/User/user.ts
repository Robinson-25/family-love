export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  emailVerified?: Date;
  image?: {
    id: string;
    url: string;
    public_id: string;
    userId?: string;
  };
};