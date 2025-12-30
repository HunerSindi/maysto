import Cookies from "js-cookie";

const API_BASE = "http://127.0.0.1:8080/wood/sale-takeout";

export interface Takeout {
    id?: number;
    amount: number;
    note: string;
    is_hidden?: boolean;
    created_at?: string;
}

export interface TakeoutResponse {
    data: Takeout[];
    meta: {
        limit: number;
        page: number;
        search: string;
        total_count: number;
        total_sum: number;
    };
}

export async function getTakeouts(
    page = 1,
    limit = 10,
    search = "",
    history = false // New parameter
): Promise<TakeoutResponse | null> {
    try {
        const token = Cookies.get("token");

        // Build query params
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search: search,
            history: history.toString() // Sends "true" or "false"
        });

        const res = await fetch(`${API_BASE}?${params.toString()}`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}
export async function createTakeout(data: Takeout) {
    try {
        const token = Cookies.get("token");
        const res = await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return res.ok;
    } catch (e) {
        return false;
    }
}

export async function updateTakeout(id: number, data: Takeout) {
    try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return res.ok;
    } catch (e) {
        return false;
    }
}

export async function deleteTakeout(id: number) {
    try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.ok;
    } catch (e) {
        return false;
    }
}