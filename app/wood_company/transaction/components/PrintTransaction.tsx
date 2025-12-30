'use client';

import { WoodTransactionDashboard, WoodHistoryItem } from '@/types/wood';
import { systemHeader } from '@/app/image/header';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrintTransaction({ dashboard, history }: { dashboard: WoodTransactionDashboard | null, history: WoodHistoryItem[] }) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    if (!dashboard) return null;

    return (
        <div
            className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <table className="w-full border-collapse font-sans text-black table-fixed">
                <thead>
                    {/* Header Image */}
                    <tr>
                        <th colSpan={5} className="pb-6">
                            <div className="flex justify-center ">
                                <img src={systemHeader} className=" w-full" alt="Header" />
                            </div>
                        </th>
                    </tr>

                    {/* Title
                    <tr>
                        <th colSpan={4} className="text-center font-bold uppercase text-l pb-6 border-b border-black mb-4 block">
                            {t.wood_transaction.print.title}
                        </th>
                    </tr> */}

                    {/* Summary Section (Fake Row for spacing) */}
                    <tr><th colSpan={5} className="h-4"></th></tr>

                    {/* Financial Summary Box */}
                    <tr>
                        <th colSpan={5} className="text-start pb-4">
                            <div className="border border-black p-4 bg-gray-50">
                                <h3 className="uppercase text-sm font-bold border-b border-gray-400 pb-2 mb-2">{t.wood_transaction.print.financial_summary}</h3>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div className="flex justify-between border-b border-dotted pb-1">
                                        <span>{t.wood_transaction.dashboard.store_balance}:</span>
                                        <span className="font-mono font-bold">${dashboard.store_balance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dotted pb-1">
                                        <span>{t.wood_transaction.dashboard.net_cash_flow}:</span>
                                        <span className="font-mono font-bold">${dashboard.net_cash_flow.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dotted pb-1">
                                        <span>{t.wood_transaction.dashboard.effective_payments}:</span>
                                        <span className="font-mono font-bold text-green-700">${dashboard.effective_payments.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dotted pb-1">
                                        <span>{t.wood_transaction.dashboard.active_expenses}:</span>
                                        <span className="font-mono font-bold text-red-700">${dashboard.active_expenses.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>

                    {/* Table Headers */}
                    <tr className="bg-gray-100 border-t-2 border-black">
                        <th className="border border-black p-2 text-center text-xs font-bold w-12">{t.wood_transaction.table.id}</th>
                        <th className={`border border-black p-2 text-xs font-bold w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_transaction.table.date}</th>
                        <th className={`border border-black p-2 text-xs font-bold w-24 ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_transaction.table.change}</th>
                        <th className={`border border-black p-2 text-xs font-bold w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_transaction.table.new_balance}</th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_transaction.table.note}</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="text-xs">
                    {history.map((item) => (
                        <tr key={item.id} className="avoid-break">
                            <td className="border border-black p-2 font-mono text-center">#{item.id}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>{new Date(item.created_at).toLocaleDateString()}</td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'} ${item.amount_added < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {item.amount_added > 0 ? '+' : ''}{item.amount_added.toLocaleString()}
                            </td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'}`}>
                                ${item.new_balance.toLocaleString()}
                            </td>
                            <td className={`border border-black p-2 uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{item.note || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx global>{`
                @media print {
                    @page { margin: 10mm; size: A4; }
                    body { -webkit-print-color-adjust: exact; }
                    .print\\:block { position: fixed !important; inset: 0; width: 100%; height: 100%; }
                    tr { page-break-inside: avoid; }
                    thead { display: table-header-group; }
                }
            `}</style>
        </div>
    );
}