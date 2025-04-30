import { OptionsPage } from "../../style/AdminStyle";
import CreatProduct from "./CreatProduct";

export default function Page() {
    return (
        <div className={`${OptionsPage}  md:!max-h-[90vh] !h-fit `}>
            <CreatProduct/>
        </div>
    );
}