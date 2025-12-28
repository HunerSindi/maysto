'use client';

import { Customer } from '@/types/personal';

interface PrintProps {
    data: Customer[];
}

export default function PrintPersonalCustomer({ data }: PrintProps) {

    // Calculate total balance for the printed list
    const totalBalance = data.reduce((acc, curr) => acc + curr.balance, 0);

    return (
        <div className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] p-0 m-0">
            <table className="w-full border-collapse font-sans text-black">

                {/* Header Image - Will repeat on new pages if browser supports it */}
                <thead>
                    <tr>
                        <th colSpan={5} className="w-full pb-4">
                            {/* Make sure this image exists in public/print/header.png */}
                            the Personal Management
                        </th>
                    </tr>

                    {/* Columns */}
                    <tr className="border border-black bg-gray-100">
                        <th className="text-center text-[10px] uppercase p-2 border-r border-black w-12">
                            #
                        </th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black">
                            Customer Name
                        </th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black w-32">
                            Phone
                        </th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black w-48">
                            Location
                        </th>
                        <th className="text-right text-[10px] uppercase p-2 w-32">
                            Balance
                        </th>
                    </tr>
                </thead>



                {/* Body */}
                <tbody className="text-[10px]">
                    {data.map((item, idx) => (
                        <tr key={item.id} className="border border-black avoid-break">
                            <td className="p-2 border-r border-black font-mono text-center">
                                {idx + 1}
                            </td>
                            <td className="p-2 border-r border-black">
                                <div className="font-bold uppercase">{item.name}</div>
                                {item.note && <div className="text-[8px] text-gray-500 italic">{item.note}</div>}
                            </td>
                            <td className="p-2 border-r border-black font-mono">
                                {item.phone}
                            </td>
                            <td className="p-2 border-r border-black uppercase">
                                {item.location || '-'}
                            </td>
                            <td className={`p-2 text-right font-mono font-bold ${item.balance < 0 ? 'text-red-700' : 'text-black'}`}>
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
                    /* Prevent page breaks inside rows */
                    tr { page-break-inside: avoid; }
                    /* Ensure header repeats on new pages */
                    thead { display: table-header-group; } 
                    tfoot { display: table-footer-group; }
                }
            `}</style>
        </div>
    );
}