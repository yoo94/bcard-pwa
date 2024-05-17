import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header";
import useBcard from "../customHook/useBcard";
import Viewr from "../component/Viewer";
import Button from "../component/Button";
import FileViewr from "../component/FileViewer";

const BusinessCard = () => {
    const params = useParams<{ id: string }>();
    const nav = useNavigate();

    const curBcardItm = useBcard(params.id);

    if (!curBcardItm) return <div>데이터 로딩중 ...</div>;

    return (
        <div>
            <Header title="상세보기" />
            <Viewr data={curBcardItm} />
            <FileViewr data={curBcardItm} />
            <footer>
                <Button text={'뒤로가기'} type='RED' location={'footer_harf'} onclick={() => { nav(-1) }} />
                <Button text={'수정'} type='GREEN' location={'footer_harf'} onclick={() => { }} />
            </footer>
        </div>
    );
};

export default BusinessCard;
