import "./BCardList.css"

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
            {data.map(card => (
                <div className={"BCardList"} key={card.id}>
                    <p>Name: {card.name}</p>
                    <p>Phone Number: {card.hpNum}</p>
                    <p>Company: {card.company}</p>
                </div>
            ))}
        </div>
    );
}

export default BCardList;