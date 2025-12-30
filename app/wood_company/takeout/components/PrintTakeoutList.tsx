"use client";
import React from "react";
import { Takeout } from "@/lib/api/wood-takeout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { systemHeader } from "@/app/image/header";

export default function PrintTakeoutList({ data, totalSum }: { data: Takeout[], totalSum: number }) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    // FIX: Ensure data is always an array to prevent "null.map" error
    const safeData = data || [];

    return (
        <div
            className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <table className="w-full border-collapse font-sans text-black table-fixed">
                <colgroup>
                    <col className="w-12" />
                    <col className="w-32" />
                    <col className="w-auto" />
                    <col className="w-32" />
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={4} className="pb-6">
                            <div className="flex justify-center ">
                                <img src={systemHeader} className=" w-full" alt="Header" />
                            </div>
                        </th>
                    </tr>
                    {/* <tr>
                        <th colSpan={4} className="text-center font-bold uppercase text-xl pb-6">
                            {t.takeout.title}
                        </th>
                    </tr> */}
                    <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-xs font-bold w-12">{t.takeout.table.id}</th>
                        <th className={`border border-black p-2 text-xs font-bold w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.takeout.table.date}</th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{t.takeout.table.note}</th>
                        <th className={`border border-black p-2 text-xs font-bold w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.takeout.table.amount}</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="bg-gray-50 font-bold">
                        <td colSpan={3} className={`border border-black p-2 text-xs uppercase ${isRtl ? 'text-left' : 'text-right'}`}>{t.takeout.filters.total_sum}:</td>
                        <td className={`border border-black p-2 text-xs font-mono ${isRtl ? 'text-left' : 'text-right'}`}>{totalSum.toLocaleString()}</td>
                    </tr>
                </tfoot>
                <tbody className="text-xs">
                    {safeData.map((item) => (
                        <tr key={item.id} className="avoid-break">
                            <td className="border border-black p-2 font-mono text-center">{item.id}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}</td>
                            <td className={`border border-black p-2 font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{item.note}</td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'}`}>{item.amount.toLocaleString()}</td>
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
                    tfoot { display: table-footer-group; }
                }
            `}</style>
        </div>
    );
}