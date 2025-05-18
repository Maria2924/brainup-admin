import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/instructor-app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

const Profile = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess: () => console.log('Profile updated'),
        });
    };

    return (
        <AppLayout>
            <Head title="Profile settings" />
            <SettingsLayout>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full"
                            placeholder="Name"
                        />
                        <InputError message={errors.name} />

                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full"
                            placeholder="Email"
                        />
                        <InputError message={errors.email} />

                        <Label htmlFor="password">New password</Label>
                        <Input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full"
                            placeholder="New password"
                        />
                        <InputError message={errors.password} />

                        <Label htmlFor="password_confirmation">
                            Confirm new password
                        </Label>
                        <Input
                            type="password"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="block w-full"
                            placeholder="Confirm new password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Profile;
