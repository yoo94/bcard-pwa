import Header from "../component/Header"
import Button from "../component/Button";
import BCardList from "../component/BCardList";
const Home =()=>{
    return(
        <div>
            <Header 
                title={"Get  Business Card!"}
            />
            <BCardList/>
            <Button text="+" onclick={()=>{}} location="footer"/>
        </div>
    )
}

export  default Home;