import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BookUser, Folder, GraduationCap, LayoutGrid, UserRoundIcon } from 'lucide-react';
import AppLogo from '../app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/instructor/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Classes',
    //     href: '/classes',
    //     icon: BookCopy,
    // },
    {
        title: 'Courses',
        href: '/instructor/courses',
        icon: GraduationCap,
    },

    // {
    //     title: 'Subjects',
    //     href: '/subjects',
    //     icon: BookOpenCheckIcon,
    // },
    // {
    //     title: 'Departments',
    //     href: '/departments',
    //     icon: Group,
    // },
    // {
    //     title: 'Instructors',
    //     href: '/instructors',
    //     icon: UsersRound,
    // },

    // {
    //     title: 'Profile',
    //     href: '/instructor/profile',
    //     icon: UserRoundIcon,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
