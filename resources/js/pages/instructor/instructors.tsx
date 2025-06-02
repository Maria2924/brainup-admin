import AppLayout from '@/layouts/app-layout';
import { MainLayout } from '@/layouts/main-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instructors',
        href: '/instructors',
    },
];

interface InstructorsData {
    data: any[];
}


export default function Instructors({ instructors }: { instructors: InstructorsData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Instructors" />

            <MainLayout>
                <DataTable columns={columns} data={instructors.data} />
            </MainLayout>
        </AppLayout>
    );
}
