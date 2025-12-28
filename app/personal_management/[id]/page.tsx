'use client';

import { use, useEffect, useState } from 'react';
import api from '@/utils/api';
import { Customer, Transaction, CustomerDetailResponse } from '@/types/personal';

// Import Components
import CustomerDetailHeader from './components/CustomerDetailHeader'; // NEW
import PrintCustomerStatement from './components/PrintCustomerStatement'; // NEW
import CustomerInfo from './components/CustomerInfo';
import TransactionTable from './components/TransactionTable';
import TransactionModals from './components/TransactionModals';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Data State
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // UI States
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Action State
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [formData, setFormData] = useState({ amount: '', note: '' });

    // Fetch Data
    const fetchDetails = async () => {
        try {
            const res = await api.get<CustomerDetailResponse>(`/personal/customers/${id}`);
            setCustomer(res.data.customer);
            setTransactions(res.data.transactions);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDetails(); }, [id]);

    // Handlers (Add/Edit/Delete)
    const handleAddTx = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/personal/transactions', {
                customer_id: Number(id),
                amount: parseFloat(formData.amount),
                note: formData.note
            });
            setIsAddOpen(false);
            setFormData({ amount: '', note: '' });
            fetchDetails();
        } catch (e) { alert('Error adding'); }
    };

    const handleUpdateTx = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTx) return;
        try {
            await api.put(`/personal/transactions/${selectedTx.id}`, {
                amount: parseFloat(formData.amount),
                note: formData.note
            });
            setIsEditOpen(false);
            fetchDetails();
        } catch (e) { alert('Error updating'); }
    };

    const handleDeleteTx = async () => {
        if (!selectedTx) return;
        try {
            await api.delete(`/personal/transactions/${selectedTx.id}`);
            setIsDeleteOpen(false);
            fetchDetails();
        } catch (e) { alert('Error deleting'); }
    };

    const openEdit = (tx: Transaction) => {
        setSelectedTx(tx);
        setFormData({ amount: tx.amount.toString(), note: tx.note });
        setIsEditOpen(true);
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold uppercase text-gray-500">Loading Details...</div>;
    if (!customer) return <div className="h-screen flex items-center justify-center font-bold uppercase text-red-500">Customer not found</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {/* 1. Header (Sticky & Blue) */}
            <CustomerDetailHeader />

            {/* 2. Main Content (Interactive UI) */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden print:hidden">
                <CustomerInfo customer={customer} />

                <div className="flex-1 min-h-0">
                    <TransactionTable
                        transactions={transactions}
                        onAddClick={() => setIsAddOpen(true)}
                        onEdit={openEdit}
                        onDelete={(tx) => { setSelectedTx(tx); setIsDeleteOpen(true); }}
                    />
                </div>
            </div>

            {/* 3. Print View (Hidden until Print button clicked) */}
            <PrintCustomerStatement customer={customer} transactions={transactions} />

            {/* 4. Modals */}
            <TransactionModals
                isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen}
                isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}
                isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}
                formData={formData} setFormData={setFormData}
                handleAdd={handleAddTx} handleUpdate={handleUpdateTx} handleDelete={handleDeleteTx}
                selectedTx={selectedTx}
            />
        </div>
    );
}