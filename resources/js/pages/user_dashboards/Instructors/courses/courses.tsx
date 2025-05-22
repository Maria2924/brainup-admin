import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2, BookOpen, Settings } from 'lucide-react';
import AppLayout from '@/layouts/instructor-app-layout';
import { type BreadcrumbItem } from '@/types';
import NoCourseState from './partials/NoCourseState';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/instructor/courses',
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
                    
                    
            <Head title="My Courses" />
            <div className=" mx-10 px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    <Link href="/instructor/courses/create">
                        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" >
                            <Plus className="mr-2 h-5 w-5" />
                            Add Course
                        </button>
                    </Link>
                </div>

                {hasCourses ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <Link key={course.id} href={`/instructor/courses/${course.id}/show`} className={`bg-gradient-to-tr from-violet-800 to-indigo-400 shadow-lg rounded-lg overflow-hidden`}>
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-200 mb-2">{course?.course?.course_name}</h2>
                                    <p className="text-sm text-gray-200">{course?.course?.course_code}</p>
                                </div>
                                <div className="px-6 py-4 flex justify-end bg-gray-100">
                                    <Link href={`/instructor/courses/${course.id}`} className='bg-gray-200 px-2 py-1 flex items-center justify-center rounded-lg hover:bg-gray-600 transition'>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Settings className="inline-block w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <NoCourseState />
                )}
            </div>
            </AppLayout>
        </>
    );
}
