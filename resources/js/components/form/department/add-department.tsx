import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface AddDepartmentProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddDepartment({ open, setOpen }: AddDepartmentProps) {
    const departmentInput = useRef<HTMLInputElement>(null);
    const { data, setData, processing, reset, post, errors, clearErrors } = useForm<Required<{ department_name: string }>>({ department_name: '' });

    const saveDepartment: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('departments.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => departmentInput.current?.focus(),
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
                <DialogTitle>Add Department</DialogTitle>

                <form className="space-y-6" onSubmit={saveDepartment}>
                    <div className="grid gap-2">
                        <Label htmlFor="department_name" className="sr-only">
                            Department Name
                        </Label>

                        <Input
                            id="department_name"
                            type="text"
                            name="department_name"
                            ref={departmentInput}
                            value={data.department_name}
                            onChange={(e) => setData('department_name', e.target.value)}
                            placeholder="Department Name"
                        />

                        <InputError message={errors.department_name} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="default" disabled={processing} asChild>
                            <button type="submit">Save Department</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
