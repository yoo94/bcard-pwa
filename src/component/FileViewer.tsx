import { useEffect } from "react";

const FileViewr = ({ data }: any) => {
  useEffect(() => {
    if (!data.image) {
      const loadImage = async () => {
        const response = await fetch("../../images/1.gif");
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result?.toString().split(',')[1]; // Get base64 string
          if (base64String) {
            const previewElements = document.getElementsByClassName('preview') as HTMLCollectionOf<HTMLImageElement>;
            if (previewElements.length > 0) {
              previewElements[0].src = "data:image/gif;base64," + base64String;
            }
          }
        };
        reader.readAsDataURL(blob); // Read the file as data URL
      };
      loadImage();
    }
  }, [data.image]);

  return (
    <div className='File'>
      <section className="file_section">
        <img className="preview" alt='이미지 준비중' src={data.image ? `data:image/gif;base64,${data.image}` : ""} />
      </section>
    </div>
  )
}
export default FileViewr;
