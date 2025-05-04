import AppLayout from '@/layouts/app-layout';
import { MainLayout } from '@/layouts/main-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/course',
    },
];

export default function Courses({ courses, departments }: { courses: { data: any[] }; departments: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />

            <MainLayout>
                <DataTable columns={columns} data={courses.data} departments={departments} />
            </MainLayout>
        </AppLayout>
    );
}
