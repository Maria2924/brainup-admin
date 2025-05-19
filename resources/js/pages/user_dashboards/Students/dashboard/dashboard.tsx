import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';

import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/student-app-layout';   

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/student/dashboard',
    },
];
interface Course {
    id: number;
    title: string;
    code: string;
    semester: string;
}

interface Props {
    courses: Course[];
}

export default function StudentDashboard({ courses }: Props) {
    // const hasCourses = courses.length > 0;

    return (
        <><AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Dashboard" />
            <div className="mx-10 px-4 py-8">
                Hey
            </div>
            </AppLayout>
        </>
    );
}
