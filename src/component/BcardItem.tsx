import "./BcardItem.css"
import { useNavigate } from "react-router-dom";
import { BCardListObj } from "../pages/Home"


const BcardItem: React.FC<BCardListObj> = (item) => {
  const nav = useNavigate()
  return (
    <div className="BcardItem">
      <div
        onClick={() => { }}>
      </div>
      <div onClick={() => { nav(`/businesscard/${item._id}`) }}
        className="info_section">
        <img className="image" src={item.image || "./images/1.gif"} alt="business card" />
        <div className="name">이름 : {item.name}</div>
        <div className="hpNum">번호 : {item.hpNum}</div>
        <div className="company">회사 : {item.company}</div>
        <div className="email">이메일 : {item.email}</div>
      </div>
    </div>
  )
}

export default BcardItem;