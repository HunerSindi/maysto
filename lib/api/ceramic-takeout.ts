import Cookies from "js-cookie";

// NOTE: Using the exact URL provided in the prompt
const API_BASE = "http://127.0.0.1:8080/cirmaci/sale-takeout";

export interface CeramicTakeout {
    id?: number;
    amount: number;
    note: string;
    created_at?: string;
}

export interface CeramicTakeoutResponse {
    data: CeramicTakeout[];
    meta: {
        limit: number;
        page: number;
        search: string;
        total_count: number;
        total_sum: number;
    };
}

export async function getCeramicTakeouts(
    page = 1,
    limit = 10,
    search = ""
): Promise<CeramicTakeoutResponse | null> {
    try {
        const token = Cookies.get("token");
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search: search
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

export async function createCeramicTakeout(data: CeramicTakeout) {
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

export async function updateCeramicTakeout(id: number, data: CeramicTakeout) {
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

export async function deleteCeramicTakeout(id: number) {
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