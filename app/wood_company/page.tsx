import { redirect } from 'next/navigation';

export default function WoodCompanyDefault() {
    // Server-side redirect
    redirect('/wood_company/expenses');
}