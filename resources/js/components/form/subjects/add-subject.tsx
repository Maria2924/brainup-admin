import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface AddSubjectProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddSubject({ open, setOpen }: AddSubjectProps) {
    const { data, setData, processing, reset, post, errors, clearErrors } = useForm<Required<{ name: string; code: string }>>({ name: '', code: '' });

    const saveSubject: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('subjects.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
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
                <DialogTitle>Add Subject</DialogTitle>

                <form className="space-y-6" onSubmit={saveSubject}>
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
                            <button type="submit">Save Subject</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
