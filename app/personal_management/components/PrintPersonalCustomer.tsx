'use client';

import { Customer } from '@/types/personal';
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { systemHeader } from '@/app/image/header';

interface PrintProps {
    data: Customer[];
}

export default function PrintPersonalCustomer({ data }: PrintProps) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    if (!data) return null;

    // Calculate total balance for the footer
    const totalBalance = data.reduce((acc, curr) => acc + curr.balance, 0);

    return (
        <div
            className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <table className="w-full border-collapse font-sans text-black table-fixed">
                {/* Fixed: Removed comments to prevent hydration error */}
                <colgroup>
                    <col className="w-12" />
                    <col className="w-auto" />
                    <col className="w-32" />
                    <col className="w-48" />
                    <col className="w-32" />
                </colgroup>

                <thead>
                    {/* Header Image */}
                    {/* <tr>
                        <th colSpan={5} className="w-full pb-6">
                            <div className="flex justify-center w-full">
                                <img src={systemHeader} className="w-full h-auto max-h-40 object-contain" alt="Header" />
                            </div>
                        </th>
                    </tr> */}

                    {/* Title */}
                    <tr>
                        <th colSpan={5} className="text-center font-bold uppercase text-xl pb-6">
                            {t.personal.header.title}
                        </th>
                    </tr>

                    {/* Table Headers */}
                    <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-xs font-bold">
                            {t.personal.table.id}
                        </th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                            {t.personal.table.name}
                        </th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                            {t.personal.table.phone}
                        </th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                            {t.personal.table.location}
                        </th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-left' : 'text-right'}`}>
                            {t.personal.table.balance}
                        </th>
                    </tr>
                </thead>

                {/* Footer */}
                <tfoot>
                    <tr className="bg-gray-50 font-bold">
                        <td colSpan={4} className={`border border-black p-2 text-xs uppercase ${isRtl ? 'text-left' : 'text-right'}`}>
                            {t.personal.actions.net_balance}:
                        </td>
                        <td className={`border border-black p-2 text-xs font-mono ${isRtl ? 'text-left' : 'text-right'} ${totalBalance < 0 ? 'text-red-700' : 'text-black'}`}>
                            {totalBalance.toLocaleString()}
                        </td>
                    </tr>
                </tfoot>

                {/* Body */}
                <tbody className="text-xs">
                    {data.map((item, idx) => (
                        <tr key={item.id} className="avoid-break">
                            <td className="border border-black p-2 font-mono text-center">
                                {idx + 1}
                            </td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                <div className="font-bold uppercase">{item.name}</div>
                                {item.note && <div className="text-[10px] text-gray-600 italic">{item.note}</div>}
                            </td>
                            <td className="border border-black p-2 font-mono">
                                {item.phone}
                            </td>
                            <td className={`border border-black p-2 uppercase ${isRtl ? 'text-right' : 'text-left'}`}>
                                {item.location || '-'}
                            </td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'} ${item.balance < 0 ? 'text-red-700' : 'text-black'}`}>
                                {item.balance.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx global>{`
                @media print {
                    @page { margin: 10mm; size: A4; }
                    body { -webkit-print-color-adjust: exact; }
                    
                    /* Force container to fill page safely */
                    .print\\:block { 
                        position: fixed !important;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }

                    tr { page-break-inside: avoid; }
                    thead { display: table-header-group; } 
                    tfoot { display: table-footer-group; }
                }
            `}</style>
        </div>
    );
}