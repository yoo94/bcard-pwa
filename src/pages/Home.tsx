import Header from "../component/Header"
import BCardList from "../component/BCardList";
import Footer from "../component/Footer"
const Home = () => {
    return (
        <div>
            <Header
                title={"Get  Business Card!"}
            />
            <BCardList />
            <Footer />
        </div>
    )
}

export default Home;