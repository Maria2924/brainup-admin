import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface AddCourseProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCourse({ open, setOpen }: AddCourseProps) {
    // const departmentInput = useRef<HTMLInputElement>(null);
    const { data, setData, processing, reset, post, errors, clearErrors } = useForm<
        Required<{ course_name: string; course_code: string; description: string; department_id: number | null }>
    >({
        course_name: '',
        course_code: '',
        description: '',
        department_id: null,
    });

    const saveCourse: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('courses.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onError: () => departmentInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setOpen(false);
        clearErrors();
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle>Add Course</DialogTitle>

                <form className="space-y-6" onSubmit={saveCourse}>
                    <div className="grid gap-4">
                        <Label htmlFor="department_name" className="sr-only">
                            Course Name
                        </Label>
                        <Input
                            id="course_name"
                            type="text"
                            name="course_name"
                            value={data.course_name}
                            onChange={(e) => setData('course_name', e.target.value)}
                            placeholder="Course Name"
                        />
                        <InputError message={errors.course_name} />

                        <Input
                            id="course_code"
                            type="text"
                            name="course_code"
                            value={data.course_code}
                            onChange={(e) => setData('course_code', e.target.value)}
                            placeholder="Course Code"
                        />
                        <InputError message={errors.course_code} />
                        <Input
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="default" disabled={processing} asChild>
                            <button type="submit">Save Course</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
