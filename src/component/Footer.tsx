import "./Footer.css"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
const Footer = () => {
  const nav = useNavigate();
  return (
    <footer className="Footer">
      <Button text="추가하기+" onclick={() => { nav("/new") }} location="footer" />
    </footer>
  )
}

export default Footer