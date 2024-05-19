import { useContext } from "react";
import { BcardDispatchContext } from "../App";
import Editor from "../component/Editor";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";

export interface InputType {
    name: string;
    hpNum: string;
    company: string;
    email: string;
    image: string;
}

const New = () => {
    const { onCreate } = useContext(BcardDispatchContext);
    const nav = useNavigate();
    const  onsubmit=(input:InputType)=>{
        if(!input.name||!input.hpNum){
            alert('이름과 번호는 필수 입니다.');
            return;
        }
        alert('r3')
        onCreate(
            input.name,
            input.hpNum,
            input.company,
            input.email,
            input.image
        );
        nav('/')
    }
    return (
        <div>
            <Header title="명함 등록" />
            <Editor onsubmit={onsubmit}/>
        </div>
    )
}

export default New;