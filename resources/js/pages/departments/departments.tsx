import ToastHandler from '@/components/toast-handler';
import AppLayout from '@/layouts/app-layout';
import { MainLayout } from '@/layouts/main-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: '/departments',
    },
];

export default function Classes({ departments }: { departments: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />

            <MainLayout>
                <DataTable columns={columns} data={departments} />
            </MainLayout>

            <ToastHandler />
        </AppLayout>
    );
}
