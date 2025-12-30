import { ceramicExpensesTranslations } from './translations/ceramic_expenses_translations';
import { ceramicHeaderTranslations } from './translations/ceramic_header_translations';
import { ceramicSalesTranslations } from './translations/ceramic_sales_translations';
import { ceramicTakeoutTranslations } from './translations/ceramic_takeout_translations';
import { ceramicTransactionTranslations } from './translations/ceramic_transaction_translations';
import { chairExpensesTranslations } from './translations/chair_expenses_translations';
import { chairHeaderTranslations } from './translations/chair_header_translations';
import { chairSalesTranslations } from './translations/chair_sales_translations';
import { chairTakeoutTranslations } from './translations/chair_takeout_translations';
import { chairTransactionTranslations } from './translations/chair_transaction_translations';
import { dashboardTranslations } from './translations/dashboard_translations';
import { loginTranslations } from './translations/login_translations';
import { personalDetailTranslations } from './translations/personal_detail_translations';
import { personalTranslations } from './translations/personal_translations';
import { takeoutTranslations } from './translations/takeout_translations';
import { woodCustomerDetailTranslations } from './translations/wood_customer_detail_translations';
import { woodCustomersTranslations } from './translations/wood_customers_translations';
import { woodExpensesTranslations } from './translations/wood_expenses_translations';
import { woodHeaderTranslations } from './translations/wood_header_translations';
import { woodSalesTranslations } from './translations/wood_sales_translations';
import { woodTransactionTranslations } from './translations/wood_transaction_translations';

export const translations = {
    en: {
        login: loginTranslations.en,
        dashboard: dashboardTranslations.en,
        takeout: takeoutTranslations.en,
        wood_expenses: woodExpensesTranslations.en,
        wood_sales: woodSalesTranslations.en,
        wood_customers: woodCustomersTranslations.en,
        wood_customer_detail: woodCustomerDetailTranslations.en,
        wood_transaction: woodTransactionTranslations.en,
        wood_header: woodHeaderTranslations.en,
        chair_takeout: chairTakeoutTranslations.en,
        ceramic_takeout: ceramicTakeoutTranslations.en,
        chair_expenses: chairExpensesTranslations.en,
        ceramic_expenses: ceramicExpensesTranslations.en,
        chair_sales: chairSalesTranslations.en,
        ceramic_sales: ceramicSalesTranslations.en,
        chair_transaction: chairTransactionTranslations.en,
        ceramic_transaction: ceramicTransactionTranslations.en,
        chair_header: chairHeaderTranslations.en,
        ceramic_header: ceramicHeaderTranslations.en,
        personal: personalTranslations.en,
        personal_detail: personalDetailTranslations.en
    },
    ar: {
        login: loginTranslations.ar,
        dashboard: dashboardTranslations.ar,
        takeout: takeoutTranslations.ar,
        wood_expenses: woodExpensesTranslations.ar,
        wood_sales: woodSalesTranslations.ar,
        wood_customers: woodCustomersTranslations.ar,
        wood_customer_detail: woodCustomerDetailTranslations.ar,
        wood_transaction: woodTransactionTranslations.ar,
        wood_header: woodHeaderTranslations.ar,
        chair_takeout: chairTakeoutTranslations.ar,
        ceramic_takeout: ceramicTakeoutTranslations.ar,
        chair_expenses: chairExpensesTranslations.ar,
        ceramic_expenses: ceramicExpensesTranslations.ar,
        chair_sales: chairSalesTranslations.ar,
        ceramic_sales: ceramicSalesTranslations.ar,
        chair_transaction: chairTransactionTranslations.ar,
        ceramic_transaction: ceramicTransactionTranslations.ar,
        chair_header: chairHeaderTranslations.ar,
        ceramic_header: ceramicHeaderTranslations.ar,
        personal: personalTranslations.ar,
        personal_detail: personalDetailTranslations.ar
    },
    ku: {
        login: loginTranslations.ku,
        dashboard: dashboardTranslations.ku,
        takeout: takeoutTranslations.ku,
        wood_expenses: woodExpensesTranslations.ku,
        wood_sales: woodSalesTranslations.ku,
        wood_customers: woodCustomersTranslations.ku,
        wood_customer_detail: woodCustomerDetailTranslations.ku,
        wood_transaction: woodTransactionTranslations.ku,
        wood_header: woodHeaderTranslations.ku,
        chair_takeout: chairTakeoutTranslations.ku,
        ceramic_takeout: ceramicTakeoutTranslations.ku,
        chair_expenses: chairExpensesTranslations.ku,
        ceramic_expenses: ceramicExpensesTranslations.ku,
        chair_sales: chairSalesTranslations.ku,
        ceramic_sales: ceramicSalesTranslations.ku,
        chair_transaction: chairTransactionTranslations.ku,
        ceramic_transaction: ceramicTransactionTranslations.ku,
        chair_header: chairHeaderTranslations.ku,
        ceramic_header: ceramicHeaderTranslations.ku,
        personal: personalTranslations.ku,
        personal_detail: personalDetailTranslations.ku
    }
};

// Derive the type from the English structure (acts as the master schema)
export type TranslationType = typeof translations.en;