import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/instructor-app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instructor Dashboard',
        href: '/instructor/dashboard',
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

export default function ProfessorDashboard({ courses }: Props) {
    const hasCourses = courses.length > 0;

    return (
        <><AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="Profile settings" />
                    {/* <SettingsLayout> */}
            <Head title="My Courses" />
            <div className="mx-10 px-4 py-8">
                
            </div>
            {/* </SettingsLayout> */}
            </AppLayout>
        </>
    );
}
