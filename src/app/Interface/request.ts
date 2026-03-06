import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Omit<Request, "user"> {
  user?: JwtPayload & {
    name: string;
    email: string;
    role: string;
  };
}
