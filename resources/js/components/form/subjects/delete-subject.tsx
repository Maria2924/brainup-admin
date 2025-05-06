import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface DeleteSubjectProps {
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    subjectToDelete: { id: number; name: string; code: string } | null;
    setSubjectToDelete: React.Dispatch<React.SetStateAction<{ id: number; name: string; code: string } | null>>;
}

export default function DeleteSubject({ deleteOpen, setDeleteOpen, subjectToDelete, setSubjectToDelete }: DeleteSubjectProps) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!subjectToDelete) return;

        destroy(route('subjects.destroy', subjectToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setSubjectToDelete(null);
            },
        });
    };

    return (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p>
                    Are you sure you want to delete <strong>{subjectToDelete?.name}</strong>?
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
