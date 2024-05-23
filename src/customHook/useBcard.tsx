import { useNavigate } from "react-router-dom";
import { BCardListObj, BcardStateContext } from '../App';
import { useContext, useEffect, useState } from "react";

const useBcard = (id: string | undefined) => {
    const nav = useNavigate();
    const data = useContext(BcardStateContext);
    const [curBcardItem, setCurBcardItem] = useState<BCardListObj | undefined>(); // Specify type

    useEffect(() => {
        if (id) {
            const findBcardItem = data.find((item) => String(item._id) === id);
            if (!findBcardItem) {
                window.alert("존재하지 않는 등록");
                nav('/', { replace: true });
            } else {
                setCurBcardItem(findBcardItem);
            }
        }
    }, [id, data, nav]);

    return curBcardItem;
};

export default useBcard;
