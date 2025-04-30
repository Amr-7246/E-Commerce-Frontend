import { OptionsPage } from "../../style/AdminStyle";
import AllUsers from "./AllUsers";

export default function Page() {
    return (
        <div className={`${OptionsPage}`} >
            <AllUsers/>
        </div>
    );
}