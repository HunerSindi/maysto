'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Expense, ExpenseMeta, ExpenseResponse } from '@/types/ciramic';
import { useLanguage } from "@/lib/i18n/LanguageContext";

import CiramicHeader from '../components/CiramicHeader';
import ActionSidebar from './components/ActionSidebar';
import FilterSection from './components/FilterSection';
import ExpensesTable from './components/ExpensesTable';
import ExpenseModals from './components/ExpenseModals';
import PrintExpenses from './components/PrintExpenses';

export default function CiramicExpensesPage() {
    const { t } = useLanguage();
    const [data, setData] = useState<Expense[]>([]);
    const [meta, setMeta] = useState<ExpenseMeta | null>(null);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [history, setHistory] = useState(false);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [formData, setFormData] = useState({ category: '', amount: '', note: '' });
    const [deleteCode, setDeleteCode] = useState('');
    const [userDeleteInput, setUserDeleteInput] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get<ExpenseResponse>('/cirmaci/expenses', {
                params: { page, limit, search, history: history.toString() }
            });
            setData(res.data.data || []);
            setMeta(res.data.meta);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const t = setTimeout(fetchData, 300);
        return () => clearTimeout(t);
    }, [page, limit, search, history]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/cirmaci/expenses', { ...formData, amount: parseFloat(formData.amount) });
            setIsAddOpen(false);
            setFormData({ category: '', amount: '', note: '' });
            fetchData();
        } catch (e) { alert(t.ceramic_expenses.alerts.add_error); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedExpense) return;
        try {
            await api.put(`/cirmaci/expenses/${selectedExpense.id}`, { ...formData, amount: parseFloat(formData.amount) });
            setIsEditOpen(false);
            fetchData();
        } catch (e) { alert(t.ceramic_expenses.alerts.update_error); }
    };

    const handleDelete = async () => {
        if (!selectedExpense) return;
        try {
            await api.delete(`/cirmaci/expenses/${selectedExpense.id}`);
            setIsDeleteOpen(false);
            fetchData();
        } catch (e) { alert(t.ceramic_expenses.alerts.delete_error); }
    };

    const openEdit = (ex: Expense) => {
        setSelectedExpense(ex);
        setFormData({ category: ex.category, amount: ex.amount.toString(), note: ex.note });
        setIsEditOpen(true);
    };

    const openDelete = (ex: Expense) => {
        setSelectedExpense(ex);
        setDeleteCode(Math.floor(1000 + Math.random() * 9000).toString());
        setUserDeleteInput('');
        setIsDeleteOpen(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            <CiramicHeader />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 flex-1 overflow-hidden print:hidden">
                <div className="col-span-1">
                    <ActionSidebar meta={meta} onAddClick={() => setIsAddOpen(true)} />
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col h-full overflow-hidden">
                    <FilterSection
                        search={search} setSearch={setSearch}
                        limit={limit} setLimit={setLimit}
                        history={history} setHistory={setHistory}
                    />
                    <div className="flex-1 min-h-0">
                        <ExpensesTable
                            data={data} meta={meta} loading={loading}
                            onEdit={openEdit} onDelete={openDelete} onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            <PrintExpenses data={data} meta={meta} />

            <ExpenseModals
                isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen}
                isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}
                isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}
                formData={formData} setFormData={setFormData}
                handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
                selectedExpense={selectedExpense} deleteCode={deleteCode} userDeleteInput={userDeleteInput} setUserDeleteInput={setUserDeleteInput}
            />
        </div>
    );
}