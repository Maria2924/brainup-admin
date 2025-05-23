// import AppLogoIcon from './app-logo-icon';
import ApplogoIcon from '../assets/images/brain-up-logo.png';

export default function AppLogo() {
    return (
        <>
            {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div> */}
            <img src={ApplogoIcon} className="h-12 fill-current" />
            {/* <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Laravel Starter Kit</span>
            </div> */}
        </>
    );
}
