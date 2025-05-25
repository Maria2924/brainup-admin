import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { MinusCircle, Pencil, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from 'axios';
import Swal from 'sweetalert2';

interface LessonActivitiesProps {
    course: any;
    lesson: any;
    activities: any;
    refetch: () => void;
}

export const LessonActivities = ({ course, lesson, activities, refetch }: LessonActivitiesProps) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [activity, setActivity] = useState<any>({
        question: '',
        type: 'short_answer',
        answer: ''
    });
    const [options, setOptions] = useState<string[]>([]);

    const openEditModal = (existing: any) => {
        setIsEditMode(true);

        setActivity({ ...existing });
        try {
            setOptions(Object.entries(JSON.parse(existing.options || '{"option1": ""}')).map(([_, value]) => String(value)));
        } catch {
            setOptions([]);
        }
        setShowModal(true);
    };

    const openDeleteModal = (question: any) => {
        Swal.fire({
            title: `Delete activity question: ${question.question}`,
            text: "Are you sure you want to delete this?",
            icon: "warning",
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "Delete",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        }).then(async (willDelete) => {
            if (willDelete) {
                await axios.delete(`/instructor/courses/${course.id}/lesson/${lesson.id}/question/${question}/destroy`);
                toast.success('Question deleted successfully');
                refetch();
            }
        });
    };

    const openCreateModal = () => {
        setIsEditMode(false);
        setActivity({ question: '', type: 'short_answer', answer: '' });
        setOptions([]);
        setShowModal(true);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => setOptions([...options, '']);
    const handleRemoveOption = (index: number) => setOptions(options.filter((_, i) => i !== index));

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('question', activity.question);
        formData.append('lesson_id', lesson.id);
        formData.append('type', activity.type);
        formData.append('answer', activity.answer);
        formData.append('options', JSON.stringify(options));

        const endpoint = isEditMode
            ? `/instructor/courses/${course.id}/lesson/${lesson.id}/question/${activity.id}/update`
            : `/instructor/courses/${course.id}/lesson/${lesson.id}/question/store`;

        if (isEditMode) {
            formData.append('question_id', activity.id);
        }

        axios.post(endpoint, formData)
            .then(res => {
                toast.success(`Activity ${isEditMode ? 'updated' : 'created'} successfully`);
                setShowModal(false);
                refetch();
            })
            .catch(err => {
                const messages = err.response?.data?.error?.message;
                if (messages) {
                    (Array.isArray(messages) ? messages : [messages]).forEach((msg: string) => toast.error(msg));
                } else {
                    toast.error('Something went wrong');
                }
            });
    };

    return (
        <div className='p-5 bg-gradient-to-bl from-blue-300 to-purple-700 shadow-lg border rounded-lg w-full my-3'>
            <div className='flex justify-between items-baseline mb-6'>
                <div className='text-2xl font-bold'>Activities</div>
                <Button onClick={openCreateModal} className='flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition'>
                    <Plus className="mr-1 h-4 w-4" /> Add Question
                </Button>
            </div>

            <div className='flex flex-col gap-3 min-h-200 p-2 border rounded-lg overflow-y-scroll'>
                {activities.length > 0 ? activities.map((a: any) => (
                    <div key={a.id} className='shadow-lg border p-2 bg-gradient-to-br from-gray-50 to-gray-300 opacity-90 px-4 py-2 rounded-lg transition'>
                        <div className='cursor-pointer flex justify-between items-center'>
                            <div className='flex flex-col gap-2'>
                                <div><span className='font-bold'>Question:</span> {a.question}</div>
                                <div><span className='font-bold'>Type:</span> {a.type}</div>
                                <div><span className='font-bold'>Answer:</span> {a.answer}</div>
                            </div>
                            <div className='flex gap-2'>
                                <button onClick={() => openEditModal(a)} className="p-2 bg-white rounded-md border-2">
                                    <Pencil className="mr-1 min-w-5 min-h-5" />
                                </button>
                                <button onClick={() => openDeleteModal(a.id)} className="p-2 bg-red-500 text-white rounded-md border-2">
                                    <Trash className="mr-1 min-w-5 min-h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className='shadow-lg border p-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
                        No Activities Found
                    </div>
                )}
            </div>

            {showModal && (
                <>
                    <div className='fixed inset-0 bg-gray-800 opacity-20 blur-xl z-50' onClick={() => setShowModal(false)} />
                    <div
                        className='p-4 bg-white rounded-md border-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[400px]'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <h1 className="text-xl font-bold">{isEditMode ? 'Edit' : 'Create'} Question</h1>
                            <button onClick={() => setShowModal(false)} className="p-1 bg-white rounded-md border-2">
                                <X className="min-w-3 min-h-3" />
                            </button>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                            <label>Type:</label>
                            <select
                                value={activity.type}
                                onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                                className="p-2 border-2 rounded-md"
                            >
                                <option value="multiple_choice">Multiple Choice</option>
                                <option value="single_choice">Single Choice</option>
                                <option value="short_answer">Short Answer</option>
                                <option value="long_answer">Long Answer</option>
                                <option value="true_false">True/False</option>
                            </select>

                            <label>Question:</label>
                            <input
                                type="text"
                                value={activity.question}
                                onChange={(e) => setActivity({ ...activity, question: e.target.value })}
                                className="p-2 border-2 rounded-md"
                            />                            

                            {(activity.type === 'multiple_choice' || activity.type === 'single_choice') && (
                                <div>
                                    <label>Options:</label>
                                    <div className="flex flex-col gap-2 border rounded-md p-2">
                                        {options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2 w-full">
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    className="p-2 border-2 rounded-md w-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOption(index)}
                                                    className="text-sm text-red-600"
                                                >
                                                    <MinusCircle />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleAddOption}
                                            className="text-sm text-blue-600 "
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                </div>
                            )}

                            <label>Answer:</label>
                            <input
                                type="text"
                                value={activity.answer}
                                onChange={(e) => setActivity({ ...activity, answer: e.target.value })}
                                className="p-2 border-2 rounded-md"
                            />

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                {isEditMode ? 'Update' : 'Create'}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};
