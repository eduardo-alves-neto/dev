import { userType } from "../types";

export interface userTypeResponse extends userType{}

export interface userTypeRequest extends Partial<userType> {}