import GlobalNavBar from "./components/GlobalNavBar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="">
          {/* <GlobalNavBar/> */}
          {children}
        </section>
    );
}