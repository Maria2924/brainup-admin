import { Link } from "@inertiajs/react";
import { Pencil } from "lucide-react";

const LessonItem = ({ lesson, courseId }: { lesson: any, courseId: number }) => {
    return (
        <div className='p-4 bg-gradient-to-br from-blue-300 to-purple-700 rounded-lg w-full flex justify-between items-center my-3'>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{lesson.content}</p>
            </div>
            <div>
                <Link href={`/instructor/courses/${courseId}/lessons/${lesson.id}/edit`}>
                    <button className=" bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Pencil className="inline-block mr-2 w-4 h-4" />
                        Edit
                    </button>
                </Link>
            </div>
        </div>
    )
}

export const LessonsContainer = ({ course }: { course: any }) => {
    return (
        <div>
            {course?.course_lessons && course?.course_lessons.map((lesson: any) => (
                <LessonItem key={lesson.id} lesson={lesson} courseId={course.id} />
            )) || (
                <p>No lessons found</p>
            )}
        </div>
    )
}