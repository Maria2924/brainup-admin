import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/instructor-app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pencil, Plus } from 'lucide-react';
import { LessonsContainer } from './partials/LessonsContainer';
import { AddLessonModal } from './partials/AddLessonModal';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Course {
    id: number;
    course_name: string;
    course_code: string;
    description: string;
    lessons: any[];
}

interface CourseShowProps {
    course: Course;
}

export default function CourseShow({ course }: CourseShowProps) {
    const [showModal, setShowModal] = useState(false);
    const refetch = () => {
            router.reload({ only: [ 'course'] });
        };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Course Management',
            href: '/instructor/courses',
        },
        {
            title: 'Course Details',
            href: `/instructor/courses/${course.id}`,
        },
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title="Course Details" />
            <div className='grid grid-cols-2 gap-6 p-10 bg-gray-100'>
                <div className=" px-7 py-8 bg-gradient-to-br from-blue-300 to-purple-700 rounded-2xl min-w-full">
                    <div className="space-y-6">
                        <div>
                            <label className='text-white text-xs'>Course Name:</label>
                            <h3 className="text-xl leading-6 font-medium text-white">
                                {course.course_name}
                            </h3>
                        </div>
                        <div>
                            <label className='text-white text-xs'>Course Code:</label>
                            <h3 className="mt-1 text-xl text-gray-200">
                                {course.course_code}
                            </h3>
                        </div>
                    </div>
                </div>            
                <div className='py-7'>
                    <label className='text-xs'>Course Description:</label>
                    <p className="mt-1 max-w-2xl text-sm text-gray-600">
                        {course.description}
                    </p>
                </div>
            </div>
            <div className='p-10'>
                <div className='flex justify-between items-baseline mb-6'>
                    <h2 className='text-2xl font-bold'>Lessons</h2>
                    <button onClick={() => setShowModal(true)} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
                        <Plus className="inline-block w-4 h-4" />{" "}
                        Add Lesson
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-6 mt-6 bg-gray-100 px-6 py-3 rounded-lg'>
                <LessonsContainer course={course} />
                <AddLessonModal showModal={showModal} setShowModal={setShowModal} courseId={course.id} refetch={refetch} />
                </div>
            </div>
        </AppLayout>
    );
}
