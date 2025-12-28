// src/types/personal.ts

export interface Customer {
    id: number;
    name: string;
    phone: string;
    location: string;
    note: string;
    balance: number;
    is_deleted: boolean;
    created_at: string;
}

export interface Transaction {
    id: number;
    personal_customer_id: number;
    amount: number;
    note: string;
    is_deleted: boolean;
    created_at: string;
}

export interface Meta {
    current_page_balance: number;
    limit: number;
    page: number;
    search: string;
    total_count: number;
    total_global_balance: number;
}

export interface CustomerResponse {
    data: Customer[];
    meta: Meta;
}

export interface CustomerDetailResponse {
    customer: Customer;
    transactions: Transaction[];
}