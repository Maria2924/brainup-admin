import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: '/departments',
    },
];

export default function Classes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />
        </AppLayout>
    );
}
