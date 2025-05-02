import DashboardNav from "./components/DashboardNav";
import '../style/AdminStyle'
import GlobalNavBar from "@/app/components/GlobalNavBar";
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex flex-wrap bg-stone-900 h-screen ">
            <div className='bg-stone-900 flex flex-center gap-3 p-3 text-stone-300 h-fit sticky w-full  border-b border-stone-600 '>
                <GlobalNavBar/>
            </div>
            <DashboardNav/>
            {children}
        </section>
    );
}