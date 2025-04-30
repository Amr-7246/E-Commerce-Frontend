import GlobalNavBar from "../components/GlobalNavBar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="bg-stone-900 min-h-screen flex items-center flex-col gap-5">
            <GlobalNavBar/>
            {children}
        </section>
    );
}