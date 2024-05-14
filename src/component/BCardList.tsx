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
    return (
        <div>
            {data.map((item) => {
                return <BcardItem key={item.id} {...item} />
            })}
        </div>
    );
}

export default BCardList;