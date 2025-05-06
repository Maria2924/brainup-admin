import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface DeleteClassSectionProps {
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    classSectionToDelete: { id: number; section_name: string } | null;
    setClassSectionToDelete: React.Dispatch<React.SetStateAction<{ id: number; section_name: string } | null>>;
}

export default function DeleteClassSection({ deleteOpen, setDeleteOpen, classSectionToDelete, setClassSectionToDelete }: DeleteClassSectionProps) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!classSectionToDelete) return;

        destroy(route('classes.destroy', classSectionToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setClassSectionToDelete(null);
            },
        });
    };

    return (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p>
                    Are you sure you want to delete <strong>{classSectionToDelete?.section_name}</strong>?
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
