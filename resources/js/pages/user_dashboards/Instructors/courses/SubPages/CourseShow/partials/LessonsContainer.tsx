import { Link } from "@inertiajs/react";
import { Eye, Pencil, Plus } from "lucide-react";

const LessonItem = ({ lesson, courseId }: { lesson: any, courseId: number }) => {
    return (
        <Link href={`/instructor/courses/${courseId}/lesson/${lesson.id}/show`} className='p-4 bg-gradient-to-br from-blue-300 to-purple-700 rounded-lg w-full flex justify-between items-center my-3'>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{lesson.content}</p>
            </div>
            <div className="flex gap-2">
                <Link href={`/instructor/courses/${courseId}/lesson/${lesson.id}/show`}>
                    <button className=" bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Eye className="inline-block mr-2 w-4 h-4" />
                        Show
                    </button>
                </Link>
            </div>
        </Link>
    )
}

export const LessonsContainer = ({ course }: { course: { id: number, course_lessons: { id: number, title: string, content: string }[] } }) => {

    return (
        <div>
            {course.course_lessons.length > 0 ? course.course_lessons.map(lesson => (
                <LessonItem key={lesson.id} lesson={lesson} courseId={course.id} />
            )) : (
                <p className="text-center text-gray-600 p-20">No lessons currently. <Link className="text-blue-600 ms-1 hover:underline border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition hover:text-white" href={`/instructor/courses/${course.id}/lessons/create`}> <Plus className="inline-block w-4 h-4 -mt-1" /> Create Lesson</Link></p>
            )}
        </div>
    )
}