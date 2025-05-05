import DashboardNav from "./components/DashboardNav";
import GlobalNavBar from "@/app/components/GlobalNavBar";
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex flex-col min-h-screen gap-0 h-fit relative bg-stone-900 ">
            <div className='bg-stone-900 flex flex-center gap-3 pb-3 text-stone-300 h-fit sticky w-full  border-b border-stone-600 '>
                <GlobalNavBar/>
            </div>
            <div className='flex-row min:h-screen h-auto gap-0 flex'>
                <DashboardNav />
                {children}
            </div>
        </section>
    );
}