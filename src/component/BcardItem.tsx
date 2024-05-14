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
      <div onClick={() => { nav(`/businesscard/${item.id}`) }}
        className="info_section">
        <div className="name">{item.name}</div>
        <div className="hpNum">{item.hpNum}</div>
        <div className="company">{item.company}</div>
        <div className="email">{item.email}</div>
      </div>
    </div>
  )
}

export default BcardItem;