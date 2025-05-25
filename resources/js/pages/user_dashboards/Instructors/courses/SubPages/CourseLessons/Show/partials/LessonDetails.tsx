import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface LessonDetailsProps {
    lesson: any;
    refetch: () => void;
}

export const LessonDetails = ({ lesson, refetch }: LessonDetailsProps) => {
    const { data, setData, post, processing, errors } = useForm({
        title: lesson.title,
        content: lesson.content,
        video_url: lesson.video_url,
    });

    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    const submit = (e: any) => {
        e.preventDefault();
        axios
            .patch(`/instructor/courses/${lesson.course_id}/lesson/${lesson.id}/update`, data)
            .then((res) => {
                closeModal();
                toast.success(res.data.message);

                console.log(res.data);
                refetch();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="p-4 bg-gradient-to-br from-blue-300 to-purple-700 rounded-lg w-full my-3">
            <div className="flex justify-between items-baseline mb-6">
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <Button variant="default" onClick={openModal}>
                    Edit
                </Button>
            </div>
            <div className="mt-4">
                <div className="mt-4">
                    <div className="font-medium text-gray-900 text-lg">Content:</div>
                    <textarea
                        className="text-lg bg-white rounded p-2 max-h-60 overflow-y-scroll min-h-60"
                        style={{ width: "100%" }}
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <div className="font-medium text-gray-900 text-lg">Video:</div>
                    {/* <div className="text-white cursor-pointer hover:underline">{lesson.video_url}</div> */}
                </div>
                <div className="">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-2xl"
                            src={lesson.video_url}
                            title={lesson.title}
                            width="100%"
                            height="500em"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTitle>Edit Lesson</DialogTitle>
                <DialogContent>
                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                {errors.title && (
                                    <InputError>{errors.title}</InputError>
                                )}
                            </div>

                            <div>
                                <Label>Content:</Label>
                                <br/>   
                                <textarea
                                    className="text-lg bg-white rounded p-2 max-h-60 overflow-y-scroll min-h-60 w-full border rounded"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                ></textarea>
                                {errors.content && (
                                    <InputError>{errors.content}</InputError>
                                )}
                            </div>

                            <div>
                                <Label>Video URL</Label>
                                <Input
                                    type="text"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData("video_url", e.target.value)
                                    }
                                />

                                {errors.video_url && (
                                    <InputError>
                                        {errors.video_url}
                                    </InputError>
                                )}
                                <div className="mt-4">
                                    <Label>Preview:</Label>
                                    <br/>
                                    <iframe
                                        className="rounded-2xl"
                                        src={data.video_url}
                                        title={data.title}
                                        width="100%"
                                        height="200em"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex justify-between mt-3">
                            <DialogClose asChild>
                                <Button
                                    variant="default"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};