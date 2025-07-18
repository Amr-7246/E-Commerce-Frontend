import DashboardNav from "./components/DashboardNav";
import GlobalNavBar from "@/app/components/GlobalNavBar";
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="admin-main-page">
          <DashboardNav />
          {children}
        </section>
    );
}