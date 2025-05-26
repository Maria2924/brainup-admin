import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'
import InputError from '@/components/input-error'
import axios from 'axios'

interface AddLessonModalProps {
    courseId: number
    refetch: () => void
    showModal: boolean
    setShowModal: (show: boolean) => void
}

interface AddLessonFormData {
    [key: string]: any; // Index signature
    title: string;
    content: string;
    video_url: string;
    course_id: number;
}

export const AddLessonModal = ({ courseId, refetch, showModal, setShowModal }: AddLessonModalProps) => {
     

    const { data, setData, post, processing, errors } = useForm<AddLessonFormData>({
        title: '',
        content: '',
        video_url: '',
        course_id: courseId
    }, {
        onSuccess: () => {
            toast.success('Lesson created successfully');
            refetch();
            closeModal();
        },
        onError: (errors) => {
            console.error(errors);
        }
    });

    const closeModal = () => {
        setData({
            title: '',
            content: '',
            video_url: '',
            course_id: courseId
        })
        setShowModal(false);
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`/instructor/courses/${courseId}/lesson/store`, data)
            .then((res) => {
                toast.success('Lesson created successfully');
                refetch();
                setShowModal(false);
            })
            .catch((err) => {
                if (err.response.data.errors) {
                    Object.entries(err.response.data.errors).forEach(([key, value]) => {
                        toast.error(`${value}`);
                    });
                }
                console.error(err);
            });
    }

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
            <DialogTitle>Add Lesson</DialogTitle>
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-1"
                                placeholder="Enter title"
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-1"
                                placeholder="Enter content"
                            />
                            <InputError
                                message={errors.content}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="video_url">
                                Video URL
                            </Label>
                            <Input
                                id="video_url"
                                type="text"
                                value={data.video_url}
                                onChange={(e) =>
                                    setData('video_url', e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-1"
                                placeholder="Enter video url"
                            />
                            <InputError
                                message={errors.video_url}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-5">
                        <DialogClose asChild>
                            <button onClick={closeModal} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                                Cancel
                            </button>
                        </DialogClose>

                        <button
                            type="submit"
                            onClick={submit}    
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </DialogContent>
            
        </Dialog>
    )
}
