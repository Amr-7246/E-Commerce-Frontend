import GlobalNavBar from "../components/GlobalNavBar";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        redirect("/admin/dashboard")
    );
}