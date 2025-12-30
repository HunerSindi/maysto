"use client";

import { useEffect, useState } from "react";
import { getTakeouts, createTakeout, updateTakeout, deleteTakeout, Takeout } from "@/lib/api/wood-takeout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Plus, Printer } from "lucide-react";

// --- IMPORTS ---
import WoodHeader from "@/app/wood_company/components/WoodHeader";
import TakeoutTable from "./components/TakeoutTable";
import TakeoutFilter from "./components/TakeoutFilter";
import TakeoutFormDialog from "./components/TakeoutFormDialog";
import PrintTakeoutList from "./components/PrintTakeoutList";

export default function WoodTakeoutPage() {
    const { t } = useLanguage();

    // State
    const [data, setData] = useState<Takeout[]>([]);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total_sum: 0, total_count: 0 });
    const [loading, setLoading] = useState(true);

    // Filters State
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);     // New: Rows per page
    const [history, setHistory] = useState(false); // New: Active/History toggle

    // Modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Takeout | null>(null);

    // Fetch Data
    useEffect(() => {
        // Debounce slightly to prevent double firing on rapid state changes
        const timer = setTimeout(() => {
            loadData();
        }, 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, limit, history]); // Re-run when any of these change

    const loadData = async () => {
        setLoading(true);
        // Pass all params to API
        const res = await getTakeouts(page, limit, search, history);
        if (res) {
            setData(res.data);
            setMeta(res.meta);
        }
        setLoading(false);
    };

    // Handlers
    const handleSave = async (item: Takeout) => {
        if (selectedItem && selectedItem.id) {
            await updateTakeout(selectedItem.id, item);
        } else {
            await createTakeout(item);
        }
        setIsFormOpen(false);
        loadData();
    };

    const handleDelete = async (id: number) => {
        if (confirm(t.takeout.dialog.delete_confirm)) {
            await deleteTakeout(id);
            loadData();
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 font-sans overflow-hidden">

            <WoodHeader />

            <div className="flex-1 flex overflow-hidden p-2 gap-2 print:hidden">

                {/* Left: Filter & Table */}
                <div className="flex-[4] flex flex-col h-full overflow-hidden">
                    <TakeoutFilter
                        search={search}
                        setSearch={(v) => { setSearch(v); setPage(1); }}
                        limit={limit}
                        setLimit={(v) => { setLimit(v); setPage(1); }}
                        history={history}
                        setHistory={(v) => { setHistory(v); setPage(1); }}
                    />

                    <div className="flex-1 overflow-hidden mt-2">
                        <TakeoutTable
                            data={data}
                            loading={loading}
                            page={page}
                            limit={meta.limit}
                            totalCount={meta.total_count}
                            onPageChange={setPage}
                            onEdit={(item) => { setSelectedItem(item); setIsFormOpen(true); }}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>

                {/* Right: Sidebar Actions */}
                <div className="flex-1 bg-white border border-gray-400 p-2 flex flex-col gap-4 h-fit">
                    <div className="bg-gray-50 border border-gray-200 p-3 text-center">
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Actions</h3>
                        <button
                            onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}
                            className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 font-bold hover:bg-blue-800 border border-blue-900 mb-2"
                        >
                            <Plus size={18} /> {t.takeout.actions.add}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 font-bold hover:bg-gray-800 border border-black"
                        >
                            <Printer size={18} /> {t.takeout.actions.print}
                        </button>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-3">
                        <h3 className="text-xs font-bold uppercase text-red-700 mb-1">
                            {t.takeout.filters.total_sum}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900 border-b-2 border-black pb-1 mb-1">
                            {meta.total_sum.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialogs & Print */}
            <TakeoutFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleSave}
                initialData={selectedItem}
                isEditing={!!selectedItem}
            />

            <PrintTakeoutList data={data} totalSum={meta.total_sum} />
        </div>
    );
}