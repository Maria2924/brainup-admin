import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface EditSubjectProps {
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    subject: {
        id: number;
        name: string;
        code: string;
    } | null;
}

export default function EditSubject({ editOpen, setEditOpen, subject }: EditSubjectProps) {
    const departmentInput = useRef<HTMLInputElement>(null);
    const { data, setData, processing, reset, patch, errors, clearErrors } = useForm<Required<{ name: string; code: string }>>({
        name: '',
        code: '',
    });

    useEffect(() => {
        if (editOpen && subject) {
            setData({
                name: subject.name,
                code: subject.code,
            });
        }
    }, [editOpen, subject]);

    const updateDepartment: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('subjects.update', subject?.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setEditOpen(false);
        clearErrors();
        reset();
    };

    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogTitle>Edit Subject</DialogTitle>

                <form className="space-y-6" onSubmit={updateDepartment}>
                    <div className="grid gap-4">
                        <Label htmlFor="name" className="sr-only">
                            Subject Name
                        </Label>

                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Subject Name"
                        />

                        <InputError message={errors.name} />

                        <Label htmlFor="code" className="sr-only">
                            Subject Code
                        </Label>

                        <Input
                            id="code"
                            type="text"
                            name="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="Subject Code"
                        />

                        <InputError message={errors.code} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="default" disabled={processing} asChild>
                            <button type="submit">Update Subject</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
