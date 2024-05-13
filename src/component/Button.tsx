import "./Button.css"

interface buttonObj {
    text:string,
    type?:string,
    location?:string,
    onclick:(event: React.SyntheticEvent) => void;
}

const Button =(obj : buttonObj)=>{
    return(
        <button className={`Button Button_${obj.location} ${obj.type} `} onClick={obj.onclick}>{obj.text}</button>
    )
}

export default Button;