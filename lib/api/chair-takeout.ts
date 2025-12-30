import Cookies from "js-cookie";

const API_BASE = "http://127.0.0.1:8080/chair/sale-takeout";

export interface ChairTakeout {
    id?: number;
    amount: number;
    note: string;
    created_at?: string;
}

export interface ChairTakeoutResponse {
    data: ChairTakeout[];
    meta: {
        limit: number;
        page: number;
        search: string;
        total_count: number;
        total_sum: number;
    };
}

export async function getChairTakeouts(
    page = 1,
    limit = 10,
    search = ""
): Promise<ChairTakeoutResponse | null> {
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

export async function createChairTakeout(data: ChairTakeout) {
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

export async function updateChairTakeout(id: number, data: ChairTakeout) {
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

export async function deleteChairTakeout(id: number) {
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