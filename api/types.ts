export interface UserData {
  id?: number;
  email?: string;
  username: string;
  name: string;
  dob?: string;
  gender?: number;
  interest?: string[];
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export enum UserRole {
  ADMIN = "admin",
  TENANT = "tenant",
  VISITOR = "visitor"
}

export enum Gender {
  MALE = 1, FEMALE = 2
}

export interface VisitorAccount {
  email: string;
  password: string;
  voucher: string;
  dob: string;
  gender: Gender;
  interest: string[];
}

export interface TenantAccount {
  email: string;
  password: string;
  name: string;
}
