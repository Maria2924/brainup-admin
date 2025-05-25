import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/instructor-app-layout';
import { LessonDetails } from './partials/LessonDetails';
import { LessonActivities } from './partials/LessonActivities'; 

interface Course {
    id: number;
    course_name: string;
    course_code: string;
    description: string;
    lessons: any[];
}

interface Lesson {
    id: number;
    title: string;
    content: string;
    video_url: string;
    activities: any[];
}

interface LessonShowProps {
    lesson: Lesson;
    course: Course;
    activities: any[];
}

export default function Show({ lesson, course, activities }: LessonShowProps) {

    const refetch = () => {
        router.reload({ only: ['lesson', 'activities', 'course'] });
    };

    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: '/instructor/courses',
        },
        {
            title: 'Course Details',
            href: `/instructor/courses/${course.id}/show`,    
        },
        {
            title: 'Lesson Details',
            href: `/instructor/courses/${course.id}/lesson/${lesson.id}/show`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lesson Show" />
            <div className="bg-white p-10"> 
                <div className="text-2xl font-bold">Lesson Details</div>   
                <div className="bg-white p-2 grid lg:grid-cols-2 gap-6"> 
                    <LessonDetails lesson={lesson} refetch={refetch}/>
                    <LessonActivities course={course} lesson={lesson} activities={activities} refetch={refetch}/>
                </div>
            </div>
        </AppLayout>
    );
}
