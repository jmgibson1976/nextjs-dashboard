// import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
// import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {

    // run the three functions in waterfall (serial/sequential) order
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices();
    // const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

    // run the three functions in parallel
    // const data = await Promise.all([fetchRevenue(), fetchLatestInvoices(), fetchCardData()]);
    // const data = await Promise.all([fetchLatestInvoices(), fetchCardData()]);
    const data = await Promise.all([fetchCardData()]);

    // const revenue = data[0];
    // const latestInvoices = data[1];
    // const latestInvoices = data[0];
    const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = data[0];

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
                /> */}
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {/* <RevenueChart revenue={revenue}  /> */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}