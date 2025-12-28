'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { WoodSale, WoodSaleMeta, WoodSaleResponse } from '@/types/wood';

import WoodHeader from '../components/WoodHeader';
import SalesSidebar from './components/SalesSidebar';
import SalesFilter from './components/SalesFilter';
import SalesTable from './components/SalesTable';
import SalesModals from './components/SalesModals';
import PrintSales from './components/PrintSales';

export default function WoodSalesPage() {
    const [data, setData] = useState<WoodSale[]>([]);
    const [meta, setMeta] = useState<WoodSaleMeta | null>(null);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [history, setHistory] = useState(false);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedSale, setSelectedSale] = useState<WoodSale | null>(null);
    const [formData, setFormData] = useState({ customer_id: 0, amount: '', note: '' });
    const [deleteCode, setDeleteCode] = useState('');
    const [userDeleteInput, setUserDeleteInput] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get<WoodSaleResponse>('/wood/sales', {
                params: { page, limit, search, history: history.toString() }
            });
            setData(res.data.data || []);
            setMeta(res.data.meta);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { const t = setTimeout(fetchData, 300); return () => clearTimeout(t); }, [page, limit, search, history]);

    // Create Sale (Requires customer_id)
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/wood/sales', {
                customer_id: formData.customer_id,
                amount: parseFloat(formData.amount),
                note: formData.note
            });
            setIsAddOpen(false);
            setFormData({ customer_id: 0, amount: '', note: '' });
            fetchData();
        } catch (e) { alert('Error creating sale'); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSale) return;
        try {
            await api.put(`/wood/sales/${selectedSale.id}`, { amount: parseFloat(formData.amount), note: formData.note });
            setIsEditOpen(false);
            fetchData();
        } catch (e) { alert('Error updating sale'); }
    };

    const handleDelete = async () => {
        if (!selectedSale) return;
        try {
            await api.delete(`/wood/sales/${selectedSale.id}`);
            setIsDeleteOpen(false);
            fetchData();
        } catch (e) { alert('Error deleting sale'); }
    };

    const openEdit = (s: WoodSale) => {
        setSelectedSale(s);
        setFormData({ customer_id: s.wood_customer_id, amount: s.amount.toString(), note: s.note });
        setIsEditOpen(true);
    };

    const openDelete = (s: WoodSale) => {
        setSelectedSale(s);
        setDeleteCode(Math.floor(1000 + Math.random() * 9000).toString());
        setUserDeleteInput('');
        setIsDeleteOpen(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            <WoodHeader />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 flex-1 overflow-hidden print:hidden">
                <div className="col-span-1">
                    <SalesSidebar meta={meta} onAddClick={() => setIsAddOpen(true)} />
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col h-full overflow-hidden">
                    <SalesFilter search={search} setSearch={setSearch} limit={limit} setLimit={setLimit} history={history} setHistory={setHistory} />
                    <div className="flex-1 min-h-0">
                        <SalesTable data={data} meta={meta} loading={loading} onEdit={openEdit} onDelete={openDelete} onPageChange={setPage} />
                    </div>
                </div>
            </div>

            <PrintSales data={data} meta={meta} />

            <SalesModals
                isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen}
                isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}
                isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}
                formData={formData} setFormData={setFormData}
                handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
                selectedSale={selectedSale} deleteCode={deleteCode} userDeleteInput={userDeleteInput} setUserDeleteInput={setUserDeleteInput}
            />
        </div>
    );
}