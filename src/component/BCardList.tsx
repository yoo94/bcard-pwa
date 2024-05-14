import { useState } from "react";
import "./BCardList.css"
import BcardItem from "./BcardItem";

export interface BCardListObj {
    id: number,
    name: string,
    hpNum: string,
    company: string
}

interface BCardListProps {
    data: BCardListObj[];
}

const BCardList: React.FC<BCardListProps> = ({ data }) => {
    const [search, setSearch] = useState<string>("");

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const getFilteredData = () => {
        if (search === "") return data
        return data.filter((item) => {
            return (item.name.includes(search) || item.hpNum.includes(search))
        })
    }

    const filteredData = getFilteredData();

    return (
        <div>
            <div className="BCardList">
                <input
                    className="SearchBar"
                    placeholder="찾을 사람이나 이름을 입력하세요"
                    value={search}
                    onChange={onChangeSearch}
                />
                <div className="list_wrapper">
                    {filteredData.map((item) => {
                        return <BcardItem key={item.id} {...item} />
                    })}
                </div>
            </div>

        </div>
    );
}

export default BCardList;