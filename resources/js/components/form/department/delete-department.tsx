import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface DeleteDepartmentProps {
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    departmentToDelete: { id: number; department_name: string } | null;
    setDepartmentToDelete: React.Dispatch<React.SetStateAction<{ id: number; department_name: string } | null>>;
}

export default function DeleteDepartment({ deleteOpen, setDeleteOpen, departmentToDelete, setDepartmentToDelete }: DeleteDepartmentProps) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!departmentToDelete) return;

        destroy(route('departments.destroy', departmentToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setDepartmentToDelete(null);
            },
        });
    };

    return (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p>
                    Are you sure you want to delete <strong>{departmentToDelete?.department_name}</strong>?
                </p>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
