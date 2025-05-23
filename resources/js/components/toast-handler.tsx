import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

export default function ToastHandler() {
    const page = usePage();

    const flash = (page.props.flash ?? {}) as {
        success?: string;
        error?: string;
    };

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash.success, flash.error]);

    return <Toaster toastOptions={{ className: 'z-50' }} closeButton />;
}
