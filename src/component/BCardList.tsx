import "./BCardList.css"
import { useState } from 'react'

const BCardList =()=>{

    const [search,setSearch] = useState("");

    return(
        <div className="BCardList">
            <input
            className="SearchBar"
            placeholder="찾을 사람을 입력하세요"
            value={search}
            onChange={()=>{}}
            />
        </div>
    )
}

export default BCardList;