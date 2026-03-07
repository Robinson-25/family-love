import { Image } from "../Image/image";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  emailVerified?: Date;
  image?: Image;
};
