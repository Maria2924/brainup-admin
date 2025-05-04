import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface EditDepartmentProps {
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    department: {
        id: number;
        department_name: string;
    } | null;
}

export default function EditDepartment({ editOpen, setEditOpen, department }: EditDepartmentProps) {
    const departmentInput = useRef<HTMLInputElement>(null);
    const { data, setData, processing, reset, patch, errors, clearErrors } = useForm<Required<{ department_name: string }>>({ department_name: '' });

    useEffect(() => {
        if (editOpen && department) {
            setData('department_name', department.department_name);
        }
    }, [editOpen, department]);

    const updateDepartment: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('departments.update', department?.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => departmentInput.current?.focus(),
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
                <DialogTitle>Edit Department</DialogTitle>

                <form className="space-y-6" onSubmit={updateDepartment}>
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
                            <button type="submit">Update Department</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
