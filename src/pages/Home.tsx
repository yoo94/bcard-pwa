import Header from "../component/Header"
import BCardList from "../component/BCardList";
import Footer from "../component/Footer";
import { BcardStateContext } from "../App";
import { useContext } from "react";
export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string,
    email: string,
}


const Home = () => {
    const data = useContext(BcardStateContext);
    return (
        <div>
            <Header title={"Get  Business Card!"} />
            <BCardList data={data} />
            <Footer />
        </div>
    )
}

export default Home;