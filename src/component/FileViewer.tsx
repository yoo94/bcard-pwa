// import { useEffect } from "react";

const FileViewr = ({ data }: any) => {
  // useEffect(()=>{
  //   if (!data.image) {
  //     const previewElements = document.getElementsByClassName('preview') as HTMLCollectionOf<HTMLImageElement>;
  //     if (previewElements.length > 0) {
  //       previewElements[0].src = "./images/1.gif";
  //     }
  //   }
  // },[])
  return (
    <div className='File'>
      <section className="file_section">
        <img className="preview" alt='이미지 준비중' src={data.image ? data.image : "../images/1.gif"} />
      </section>
    </div>
  )
}
export default FileViewr;
