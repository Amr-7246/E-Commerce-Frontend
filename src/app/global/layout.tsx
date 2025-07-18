import GlobalNav from "./components/GlobalNavBar";
import Root from "./components/Root";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section>
      <GlobalNav/>
      <div className='page'>{children}</div>
      <Root/>
    </section>
  );
}
