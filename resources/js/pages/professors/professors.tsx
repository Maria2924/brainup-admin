import AppLayout from '@/layouts/app-layout';
import { MainLayout } from '@/layouts/main-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professors',
        href: '/professors',
    },
];

interface ProfessorsData {
    data: any[];
}

export default function Classes({ professors }: { professors: ProfessorsData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Professors" />

            <MainLayout>
                <DataTable columns={columns} data={professors.data} />
            </MainLayout>
        </AppLayout>
    );
}
