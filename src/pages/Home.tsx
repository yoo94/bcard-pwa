import Header from "../component/Header"
import BCardList from "../component/BCardList";
import Footer from "../component/Footer";
import { BcardStateContext } from "../App";
import { useContext, useEffect } from "react";
export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string,
    email: string,
}


const Home = () => {
    const data = useContext(BcardStateContext);
    useEffect(()=>{
        alert('r3');
    },[])
    return (
        <div>
            <Header title={"Get  Business Card!"} />
            <BCardList data={data} />
            <Footer />
        </div>
    )
}

export default Home;