// src/types/wood.ts

export interface Expense {
    id: number;
    category: string;
    amount: number;
    note: string;
    is_hidden: boolean;
    is_deleted: boolean;
    created_at: string;
}

export interface ExpenseMeta {
    current_page_balance: number;
    is_history_view: boolean;
    limit: number;
    page: number;
    search: string;
    total_count: number;
    total_expenses: number;
}

export interface ExpenseResponse {
    data: Expense[];
    meta: ExpenseMeta;
}

// src/types/wood.ts

// ... Existing Expense types ...

export interface WoodCustomer {
    id: number;
    name: string;
    phone: string;
    location: string;
    note: string;
    balance: number;
    is_deleted: boolean;
    created_at: string;
}

export interface WoodTransaction {
    id: number;
    wood_customer_id: number;
    amount: number;
    note: string;
    created_at: string;
}

export interface WoodCustomerMeta {
    current_page_balance: number;
    limit: number;
    page: number;
    search: string;
    total_count: number;
    total_global_balance: number;
}

export interface WoodCustomerResponse {
    data: WoodCustomer[];
    meta: WoodCustomerMeta;
}

export interface WoodCustomerDetailResponse {
    customer: WoodCustomer;
    transactions: WoodTransaction[];
}


// src/types/wood.ts

// ... Existing definitions ...

export interface WoodSale {
    id: number;
    wood_customer_id: number;
    amount: number;
    note: string;
    is_hidden: boolean;
    is_deleted: boolean;
    created_at: string;
    // Extra fields from join
    customer_name?: string;
    customer_phone?: string;
}

export interface WoodSaleMeta {
    current_page_balance: number;
    is_history_view: boolean;
    limit: number;
    page: number;
    search: string;
    total_count: number;
    total_sales: number;
}

export interface WoodSaleResponse {
    data: WoodSale[];
    meta: WoodSaleMeta;
}

// src/types/wood.ts
export interface WoodTransactionDashboard {
    store_balance: number;      // Total accumulated
    raw_payments: number;       // Total cash collected
    effective_payments: number; // Cash counted for safe
    active_expenses: number;    // Business expenses
    active_takeouts: number;    // Personal withdrawals
    net_cash_flow: number;      // The final calculation
}

export interface WoodHistoryItem {
    id: number;
    amount_added: number;
    new_balance: number;
    note: string | null;
    created_at: string;
}

export interface WoodTransactionMeta {
    limit: number;
    page: number;
    total_count: number;
}

export interface WoodHistoryResponse {
    data: WoodHistoryItem[];
    meta: WoodTransactionMeta;
}