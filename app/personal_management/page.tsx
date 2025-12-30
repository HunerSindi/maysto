'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Customer, Meta } from '@/types/personal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

import PersonalHeader from './components/PersonalHeader';
import ActionSidebar from './components/ActionSidebar';
import FilterSection from './components/FilterSection';
import CustomerTable from './components/CustomerTable';
import CustomerModals from './components/CustomerModals';
import PrintPersonalCustomer from './components/PrintPersonalCustomer';

export default function PersonalCustomersList() {
    const { t } = useLanguage();

    // --- State Management ---
    const [data, setData] = useState<Customer[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [sort, setSort] = useState<'asc' | 'desc'>('desc');

    // Modal Visibility
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Data for Actions
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', location: '', note: '' });

    // Security
    const [deleteCode, setDeleteCode] = useState('');
    const [userDeleteInput, setUserDeleteInput] = useState('');

    // --- API Logic ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/personal/customers', {
                params: { page, limit, sort, search }
            });
            setData(res.data.data);
            setMeta(res.data.meta);
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(fetchData, 300);
        return () => clearTimeout(timeout);
    }, [page, limit, sort, search]);

    // --- Event Handlers ---

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/personal/customers', formData);
            setIsAddOpen(false);
            setFormData({ name: '', phone: '', location: '', note: '' });
            fetchData();
        } catch (err) { alert(t.personal.alerts.add_fail); }
    };

    const openEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setFormData({ name: customer.name, phone: customer.phone, location: customer.location, note: customer.note });
        setIsEditOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomer) return;
        try {
            await api.put(`/personal/customers/${selectedCustomer.id}`, formData);
            setIsEditOpen(false);
            fetchData();
        } catch (err) { alert(t.personal.alerts.update_fail); }
    };

    const openDelete = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDeleteCode(Math.floor(1000 + Math.random() * 9000).toString());
        setUserDeleteInput('');
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedCustomer || userDeleteInput !== deleteCode) return;
        try {
            await api.delete(`/personal/customers/${selectedCustomer.id}`);
            setIsDeleteOpen(false);
            fetchData();
        } catch (err) { alert(t.personal.alerts.delete_fail); }
    };

    // --- Render ---
    return (
        <div>
            <div className="font-sans text-gray-800 print:hidden">
                <PersonalHeader />

                {/* Grid Layout: Left Sidebar (1 col) | Right Main Content (3 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 p-3">

                    {/* LEFT SIDE: Actions & Stats */}
                    <div className="col-span-1">
                        <ActionSidebar
                            meta={meta}
                            onAddClick={() => setIsAddOpen(true)}
                        />
                    </div>

                    {/* RIGHT SIDE: Filters & Table */}
                    <div className="col-span-1 lg:col-span-3">
                        <FilterSection
                            search={search} setSearch={setSearch}
                            limit={limit} setLimit={setLimit}
                            sort={sort} setSort={setSort}
                        />

                        <CustomerTable
                            data={data}
                            meta={meta}
                            loading={loading}
                            onEdit={openEdit}
                            onDelete={openDelete}
                            onPageChange={setPage}
                        />
                    </div>
                </div>

                <CustomerModals
                    isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen}
                    isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}
                    isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}
                    formData={formData} setFormData={setFormData}
                    handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
                    deleteCode={deleteCode} userDeleteInput={userDeleteInput} setUserDeleteInput={setUserDeleteInput}
                    selectedCustomer={selectedCustomer}
                />
            </div>
            <PrintPersonalCustomer data={data} />
        </div>
    );
}