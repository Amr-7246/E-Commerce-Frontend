import DashboardNav from "./components/DashboardNav";
import '../style/AdminStyle'
import GlobalNav from "./components/AdminGlobalNav";
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex flex-wrap h-screen ">
            <GlobalNav/>
            <DashboardNav/>
            {children}
        </section>
    );
}