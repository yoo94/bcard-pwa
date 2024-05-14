import Header from "../component/Header"
import BCardList from "../component/BCardList";
import Footer from "../component/Footer"

export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string
}


const Home = () => {

    const mokData: BCardListObj[] = [
        {
            id: 0,
            name: "유재석",
            hpNum: "010-2222-2222",
            company: "유니포스트"
        },
        {
            id: 1,
            name: "유재석2",
            hpNum: "010-2222-2222",
            company: "유니포스트"
        },
        {
            id: 2,
            name: "유재석",
            hpNum: "010-2222-2222",
            company: "유니포스트"
        },

    ]
    return (
        <div>
            <Header title={"Get  Business Card!"} />
            <BCardList data={mokData} />
            <Footer />
        </div>
    )
}

export default Home;