import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddClassSectionProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    courses: any[];
}

export default function AddClassSection({ open, setOpen, courses }: AddClassSectionProps) {
    const { data, setData, processing, reset, post, errors, clearErrors } = useForm<
        Required<{ section_name: string; course_id: string | number; year: string | number }>
    >({
        section_name: '',
        course_id: '',
        year: '',
    });

    const saveCourse: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('classes.store'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                reset();
            },
            // onFinish: () => reset(),
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
                <DialogTitle>Add Class Section</DialogTitle>

                <form className="space-y-6" onSubmit={saveCourse}>
                    <div className="grid gap-4">
                        <Label htmlFor="department_name" className="sr-only">
                            Section Name
                        </Label>
                        <Input
                            id="section_name"
                            type="text"
                            name="section_name"
                            value={data.section_name}
                            onChange={(e) => setData('section_name', e.target.value)}
                            placeholder="Section Name"
                        />
                        <InputError message={errors.section_name} />

                        <Select
                            onValueChange={(value) => {
                                setData('course_id', Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__" disabled>
                                    Select Course
                                </SelectItem>
                                {courses?.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.course_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.course_id} />

                        <Select
                            onValueChange={(value) => {
                                setData('year', Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__" disabled>
                                    Select Year
                                </SelectItem>
                                <SelectItem value={'1'}>1st Year</SelectItem>
                                <SelectItem value={'2'}>2nd Year</SelectItem>
                                <SelectItem value={'3'}>3rd Year</SelectItem>
                                <SelectItem value={'4'}>4th Year</SelectItem>
                                <SelectItem value={'5'}>5th Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.year} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="default" disabled={processing} asChild>
                            <button type="submit">Save Class Section</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
