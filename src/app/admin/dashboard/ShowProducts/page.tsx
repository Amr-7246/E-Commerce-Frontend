import { OptionsPage } from "../../style/AdminStyle";
import GetProductes from "./GetProducts";

export default function Page() {
    return (
        <div className={`${OptionsPage} md:!max-h-[90vh] !h-fit`}>
            <GetProductes/>
        </div>
    );
}