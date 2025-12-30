'use client';

import { Customer, Transaction } from '@/types/personal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PrintProps {
    customer: Customer;
    transactions: Transaction[];
}

export default function PrintCustomerStatement({ customer, transactions }: PrintProps) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';
    const safeTransactions = transactions || [];

    // --- FIX: SAFE ACCESS TO FIRST TRANSACTION ---
    // We grab the first transaction safely. If list is empty, we default to 0 to prevent crash.
    const firstTx = safeTransactions.length > 0 ? safeTransactions[0] : null;
    const firstAmount = firstTx ? firstTx.amount : 0;

    // Your specific logic:
    // If > 0: Customer received money (Name goes in "Receiver").
    // If < 0: Customer gave money (Name goes in "Received From").
    const isPositive = firstAmount > 0;
    const absAmount = Math.abs(firstAmount);

    return (
        <div
            className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <table className="w-full border-collapse font-sans text-black table-fixed mb-4">
                <colgroup>
                    <col className="w-12" />
                    <col className="w-32" />
                    <col className="w-auto" />
                    <col className="w-32" />
                </colgroup>

                <thead>
                    {/* Customer Info Block */}
                    <tr>
                        <th colSpan={4} className="text-start pb-4">
                            <div className="border border-black p-3 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-sm font-bold uppercase">{t.personal_detail.print.statement}</h2>
                                        <p className="text-[10px] uppercase mt-1">{t.personal_detail.print.name} <span className="font-bold">{customer.name}</span></p>
                                        <p className="text-[10px] uppercase">{t.personal_detail.print.phone} {customer.phone}</p>
                                        <p className="text-[10px] uppercase">{t.personal_detail.print.location} {customer.location || '-'}</p>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-[10px] uppercase">{t.personal_detail.print.date} {new Date().toLocaleDateString()}</p>
                                        <p className="text-[10px] uppercase">#{customer.id}</p>
                                        <div className="mt-1 border border-black p-1 px-2 inline-block bg-white">
                                            <p className="text-[10px] font-bold uppercase">{t.personal_detail.print.balance_label}</p>
                                            <p className={`text-sm font-mono font-bold ${customer.balance < 0 ? 'text-red-700' : 'text-black'}`}>
                                                ${customer.balance.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>

                    {/* Column Headers */}
                    <tr className="border border-black bg-gray-100">
                        <th className="text-center text-[10px] uppercase p-2 border-r border-black w-12">{t.personal_detail.transactions.table.id}</th>
                        <th className={`text-[10px] uppercase p-2 border-r border-black w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.personal_detail.transactions.table.date}</th>
                        <th className={`text-[10px] uppercase p-2 border-r border-black ${isRtl ? 'text-right' : 'text-left'}`}>{t.personal_detail.transactions.table.desc}</th>
                        <th className={`text-[10px] uppercase p-2 border-r border-black w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.personal_detail.transactions.table.amount}</th>
                    </tr>
                </thead>

                <tfoot>
                    <tr className="border border-black font-bold bg-gray-50">
                        <td colSpan={3} className={`p-2 text-xs uppercase border-r border-black ${isRtl ? 'text-left' : 'text-right'}`}>
                            {t.personal_detail.print.closing_balance}
                        </td>
                        <td className={`p-2 text-xs font-mono ${isRtl ? 'text-left' : 'text-right'}`}>
                            {customer.balance.toLocaleString()}
                        </td>
                    </tr>
                </tfoot>

                <tbody className="text-[10px]">
                    {safeTransactions.length === 0 ? (
                        <tr className="border border-black">
                            <td colSpan={4} className="p-4 text-center italic">{t.personal_detail.transactions.table.empty}</td>
                        </tr>
                    ) : (
                        safeTransactions.map((tx, idx) => (
                            <tr key={tx.id} className="border border-black avoid-break">
                                <td className="p-2 border-r border-black font-mono text-center">{idx + 1}</td>
                                <td className={`p-2 border-r border-black whitespace-nowrap ${isRtl ? 'text-right' : 'text-left'}`}>{new Date(tx.created_at).toLocaleDateString()}</td>
                                <td className={`p-2 border-r border-black uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{tx.note}</td>
                                <td className={`p-2 border-r border-black font-mono font-bold ${isRtl ? 'text-left' : 'text-right'}`}>
                                    {tx.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* --- AGREEMENT / TRUST RECEIPT SECTION --- */}
            {/* We only render this if there is at least one transaction to avoid empty data logic, or you can keep it and it will show default dashes */}
            <div className="mt-2 border border-black p-2 avoid-break text-[10px]" dir="rtl">
                <div className="flex justify-between items-center border-b border-black/20 pb-1 mb-1">
                    <h3 className="font-bold">سەنەدا وەرگرتنا پاران (وەسلا ئیمانەتێ)</h3>
                    <span>رێکەوت: <span dir="ltr">{new Date().toLocaleDateString()}</span></span>
                </div>

                <div className="leading-5">
                    <p>
                        ناڤێ وەرگرێ پاران:
                        <span className="font-bold px-1">
                            {/* LOGIC: If first amount > 0, User is Receiver. Else dashes. */}
                            {isPositive ? customer.name : '........................................'}
                        </span>
                        ، دانپێدانێ دکەم کو من کۆژمێ
                        (
                        <span className="font-bold font-mono px-1 dir-ltr inline-block">
                            ${absAmount.toLocaleString()}
                        </span>
                        )
                        وەرگرت.
                    </p>
                    <p>
                        وەرگرتن ژ بەرێز:
                        <span className="font-bold px-1">
                            {/* LOGIC: If first amount > 0, Shop gave money (dashes). Else User gave money. */}
                            {isPositive ? '........................................' : customer.name}
                        </span>
                    </p>
                    <p className="mt-1 text-justify opacity-90">
                        ئەڤ پارە ل دەڤ من ئیمانەتە (أمانة)، و ئەز بەڵێنێ ددەم هەر دەمێ خودانێ وێ داخواز بکەت، بۆ بزڤرینم بێی کێماسی.
                    </p>
                </div>

                <div className="flex justify-end mt-4 px-2">
                    <div className="text-center w-32">
                        <p className="mb-6">ناڤ و واژۆ (توقيع)</p>
                        <div className="border-b border-black"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 10mm; size: A4; }
                    body { -webkit-print-color-adjust: exact; }
                    .print\\:block { position: fixed !important; inset: 0; width: 100%; height: 100%; }
                    tr, .avoid-break { page-break-inside: avoid; }
                    thead { display: table-header-group; } 
                    tfoot { display: table-footer-group; }
                    .dir-ltr { direction: ltr; }
                }
            `}</style>
        </div>
    );
}