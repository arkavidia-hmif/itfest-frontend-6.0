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
  point?: number;
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
  username?: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  id: number;
  createdAt: string;
  amount: number;
  type: string;
  from: TransactionActor;
  to: TransactionActor;
}

export interface TransactionPagination {
  transactions: Transaction[];
  page: number;
  itemPerPage: number;
  total: number;
}

export interface TenantReview {
  score: number;
  praise: string[];
  comment?: string;
}

export enum LoginStatus {
  NO_USER, ERROR
}

export interface Qrcode {
  qrid: string;
  name?: string;
}
