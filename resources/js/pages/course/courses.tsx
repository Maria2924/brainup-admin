import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/course',
    },
];

export default function courses() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
        </AppLayout>
    );
}
