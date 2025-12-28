'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { WoodCustomer, WoodCustomerMeta, WoodCustomerResponse } from '@/types/wood';

import WoodHeader from '../components/WoodHeader';
import CustomerSidebar from './components/CustomerSidebar';
import CustomerFilter from './components/CustomerFilter';
import CustomerTable from './components/CustomerTable';
import CustomerModals from './components/CustomerModals';
import PrintCustomers from './components/PrintCustomers';

export default function WoodCustomersPage() {
    const [data, setData] = useState<WoodCustomer[]>([]);
    const [meta, setMeta] = useState<WoodCustomerMeta | null>(null);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState<WoodCustomer | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', location: '', note: '', balance: '0' });
    const [deleteCode, setDeleteCode] = useState('');
    const [userDeleteInput, setUserDeleteInput] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get<WoodCustomerResponse>('/wood/customers', { params: { page, limit, search } });
            setData(res.data.data || []);
            setMeta(res.data.meta);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { const t = setTimeout(fetchData, 300); return () => clearTimeout(t); }, [page, limit, search]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/wood/customers', { ...formData, balance: parseFloat(formData.balance) });
            setIsAddOpen(false); setFormData({ name: '', phone: '', location: '', note: '', balance: '0' }); fetchData();
        } catch (e) { alert('Failed'); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomer) return;
        try {
            await api.put(`/wood/customers/${selectedCustomer.id}`, { name: formData.name, phone: formData.phone, location: formData.location, note: formData.note });
            setIsEditOpen(false); fetchData();
        } catch (e) { alert('Failed'); }
    };

    const handleDelete = async () => {
        if (!selectedCustomer) return;
        try { await api.delete(`/wood/customers/${selectedCustomer.id}`); setIsDeleteOpen(false); fetchData(); } catch (e) { alert('Failed'); }
    };

    const openEdit = (c: WoodCustomer) => { setSelectedCustomer(c); setFormData({ name: c.name, phone: c.phone, location: c.location, note: c.note, balance: c.balance.toString() }); setIsEditOpen(true); };
    const openDelete = (c: WoodCustomer) => { setSelectedCustomer(c); setDeleteCode(Math.floor(1000 + Math.random() * 9000).toString()); setUserDeleteInput(''); setIsDeleteOpen(true); };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            <WoodHeader />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 flex-1 overflow-hidden print:hidden">
                <div className="col-span-1"><CustomerSidebar meta={meta} onAddClick={() => setIsAddOpen(true)} /></div>
                <div className="col-span-1 lg:col-span-3 flex flex-col h-full overflow-hidden">
                    <CustomerFilter search={search} setSearch={setSearch} limit={limit} setLimit={setLimit} />
                    <div className="flex-1 min-h-0"><CustomerTable data={data} meta={meta} loading={loading} onEdit={openEdit} onDelete={openDelete} onPageChange={setPage} /></div>
                </div>
            </div>
            <PrintCustomers data={data} meta={meta} />
            <CustomerModals isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} formData={formData} setFormData={setFormData} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} selectedCustomer={selectedCustomer} deleteCode={deleteCode} userDeleteInput={userDeleteInput} setUserDeleteInput={setUserDeleteInput} />
        </div>
    );
}