import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

export default function Classes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
        </AppLayout>
    );
}
