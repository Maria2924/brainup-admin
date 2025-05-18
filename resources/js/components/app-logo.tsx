import AppLogoIcon from './app-logo-icon';
import ApplogoIcon from '../assets/images/brain-up-logo.png';

export default function AppLogo() {
    return (
        <>
            <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-10 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-sky-500 text-lg text dark:text-black">Brain Up</span>
            </div>
        </>
    );
}
