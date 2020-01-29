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
  name: string;
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

export interface TransactionActor {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
}

export interface Transaction {
  id: number;
  amount: number;
  from: TransactionActor;
  to: TransactionActor;
  transfer: boolean;
}

export enum LoginStatus {
  NO_USER, ERROR
}
