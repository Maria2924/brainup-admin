import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/instructor-app-layout';
import SettingsLayout from '@/layouts/settings/layout';

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
        <><AppLayout>
                    <Head title="Profile settings" />
                    {/* <SettingsLayout> */}
            <Head title="My Courses" />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Courses</h1>
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Course
                    </button>
                </div>

                {hasCourses ? (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Code</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Semester</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800">{course.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{course.code}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{course.semester}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-800 mr-4">
                                                <Pencil className="inline-block w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="inline-block w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white shadow rounded-lg">
                        <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-700">No Courses Being Taught</h2>
                        <p className="mt-2 text-gray-500">Start by adding a course to begin managing your teaching schedule.</p>
                        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <Plus className="inline-block mr-2 w-4 h-4" />
                            Add Your First Course
                        </button>
                    </div>
                )}
            </div>
            {/* </SettingsLayout> */}
            </AppLayout>
        </>
    );
}
