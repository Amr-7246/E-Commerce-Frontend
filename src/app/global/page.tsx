"use client"
import { UseGetEntities } from "@/APIs/GetEntitiy";
import Hero from "./components/Hero";
import Cards from "./store/components/Cards";
import Categories from "./store/components/Categories";
import Root from "./components/Root";
import { useWhichCatigoryContext } from "@/context/store/WhichCatigoryContext";

export default function Page() {
    const {data} = UseGetEntities('categories')
    const categories = data?.data.docs
    const {WhichCatigory} = useWhichCatigoryContext()
return (
    <div className='page'>
      <Hero/>
      <div>
        <Categories/>
        <Cards category={WhichCatigory} limit={7} isAll= {false} discription={''} />
      </div>
    </div>
);
}
