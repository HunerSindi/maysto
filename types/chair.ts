// src/types/chair.ts

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


// src/types/chair.ts

// ... Existing Expense types ...

export interface Sale {
    id: number;
    amount: number;
    note: string;
    is_hidden: boolean;
    is_deleted: boolean;
    created_at: string;
}

export interface SaleMeta {
    current_page_balance: number;
    is_history_view: boolean;
    limit: number;
    page: number;
    search: string;
    total_count: number;
    total_sales: number;
}

export interface SaleResponse {
    data: Sale[];
    meta: SaleMeta;
}

// src/types/chair.ts

// ... Existing Expense/Sale types ...

export interface TransactionDashboardData {
    active_expenses: number;
    active_sales: number;
    net_profit: number;
    store_balance: number;
}

export interface TransactionHistoryItem {
    id: number;
    amount_added: number;
    new_balance: number;
    note: string;
    created_at: string;
}

export interface TransactionMeta {
    limit: number;
    page: number;
    total_count: number;
}

export interface HistoryResponse {
    data: TransactionHistoryItem[];
    meta: TransactionMeta;
}