import { Link } from "@inertiajs/react"
import { BookOpen, Plus } from "lucide-react"


function NoCourseState() {
  return (
    <div className="text-center py-20 bg-white shadow rounded-lg px-10">
                        <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-700">No Courses Being Taught</h2>
                        <p className="mt-2 text-gray-500">Start by adding a course to begin managing your teaching schedule.</p>
                        
                        <Link href="/instructor/courses/create">
                            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                <Plus className="inline-block mr-2 w-4 h-4" />
                                Add Your First Course
                            </button>
                        </Link>
                    </div>
  )
}

export default NoCourseState