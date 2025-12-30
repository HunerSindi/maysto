'use client';

import { use, useEffect, useState } from 'react';
import api from '@/utils/api';
import { Customer, Transaction, CustomerDetailResponse } from '@/types/personal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

import CustomerDetailHeader from './components/CustomerDetailHeader';
import PrintCustomerStatement from './components/PrintCustomerStatement';
import CustomerInfo from './components/CustomerInfo';
import TransactionTable from './components/TransactionTable';
import TransactionModals from './components/TransactionModals';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { t } = useLanguage();

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [formData, setFormData] = useState({ amount: '', note: '' });

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
        } catch (e) { alert(t.personal_detail.alerts.add_err); }
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
        } catch (e) { alert(t.personal_detail.alerts.update_err); }
    };

    const handleDeleteTx = async () => {
        if (!selectedTx) return;
        try {
            await api.delete(`/personal/transactions/${selectedTx.id}`);
            setIsDeleteOpen(false);
            fetchDetails();
        } catch (e) { alert(t.personal_detail.alerts.delete_err); }
    };

    const openEdit = (tx: Transaction) => {
        setSelectedTx(tx);
        setFormData({ amount: tx.amount.toString(), note: tx.note });
        setIsEditOpen(true);
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold uppercase text-gray-500">{t.personal_detail.alerts.loading}</div>;
    if (!customer) return <div className="h-screen flex items-center justify-center font-bold uppercase text-red-500">{t.personal_detail.alerts.not_found}</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <CustomerDetailHeader />

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

            <PrintCustomerStatement customer={customer} transactions={transactions} />

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