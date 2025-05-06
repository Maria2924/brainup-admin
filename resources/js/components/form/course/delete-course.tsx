import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface DeleteCourseProps {
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    courseToDelete: { id: number; course_name: string } | null;
    setCourseToDelete: React.Dispatch<React.SetStateAction<{ id: number; course_name: string } | null>>;
}

export default function DeleteCourse({ deleteOpen, setDeleteOpen, courseToDelete, setCourseToDelete }: DeleteCourseProps) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!courseToDelete) return;

        destroy(route('courses.destroy', courseToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setCourseToDelete(null);
            },
        });
    };

    return (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <p>
                    Are you sure you want to delete <strong>{courseToDelete?.course_name}</strong>?
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
