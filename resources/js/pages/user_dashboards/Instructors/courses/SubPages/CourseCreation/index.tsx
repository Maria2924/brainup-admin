import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/instructor-app-layout';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Course',
        href: '/instructor/courses/create',
    },
];
interface Course {
    id: number;
    name: string;
    code: string;
    description: string;
}

interface Props {
}

export default function CourseCreation() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // post('/instructor/courses');
        post('/instructor/courses/store', {
            onSuccess: () => {
                toast.success('Course created successfully');
                setData({
                    name: '',
                    code: '',
                    description: '',
                });
            },
        });
    };

    return (
        <><AppLayout breadcrumbs={breadcrumbs}>
                    
                    
            <Head title="Course Creation" />
            <div className="flex flex-col gap-6 justify-center items-center p-20">
              <div className=" mx-10 px-4 py-8 max-w-full lg:min-w-200 min-w-full  border-2 border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold">Course Creation</h1>
                      
                  </div>
                  <form className="space-y-6" onSubmit={submit}>
                      <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Course Name
                          </label>
                          <div className="mt-1">
                              <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 p-2 rounded-md"
                                  placeholder="Enter Course Name"
                                  value={data.name}
                                  onChange={(e) => setData('name', e.target.value)}
                              />
                          </div>
                      </div>
                      <div>
                          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                              Course Code
                          </label>
                          <div className="mt-1">
                              <input
                                  type="text"
                                  name="code"
                                  id="code"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 p-2 rounded-md"
                                  placeholder="Enter Course Code"
                                  value={data.code}
                                  onChange={(e) => setData('code', e.target.value)}
                              />
                          </div>
                      </div>
                      <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                              Course Description
                          </label>
                          <div className="mt-1">
                              <textarea
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 p-2 rounded-md"
                                  placeholder="Enter Course Description"
                                  value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}
                              />
                          </div>
                      </div>
                      <div className="flex justify-end gap-2">
                          <Link href="/instructor/courses">
                              <button
                                  type="button"
                                  className="inline-flex justify-center py-2 px-4 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 cursor-pointer hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                              >
                                  Back
                              </button>
                          </Link>
                          <button
                              type="submit"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                              Create Course
                          </button>
                      </div>
                  </form>
                  
              </div>
            </div>
            </AppLayout>
        </>
    );
}
