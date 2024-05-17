import { useEffect, useRef, useState } from 'react';
import "./File.css"

interface FileProps {
  setImage: React.Dispatch<React.SetStateAction<{
    name: string;
    hpNum: string;
    company: string;
    email: string;
    image: string;
  }>>;
}

const File: React.FC<FileProps> = ({ setImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(''); // Changed to string

  useEffect(() => {
    const loadImage = async () => {
      const response = await fetch("./images/1.gif");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]; // Get base64 string
        if (base64String) {
          setPreviewImg(base64String);
        }
      };
      reader.readAsDataURL(blob); // Read the file as data URL
    };
    loadImage();
  }, []);

  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const fileArr = e.target.files;
    if (fileArr && fileArr.length > 0) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]; // Get base64 string
        if (base64String) {
          setImage((prevState) => ({
            ...prevState,
            image: base64String
          }));
          setPreviewImg(base64String);
          setImage((prevState) => ({
            ...prevState,
            // image: URL.createObjectURL(fileArr[0])
            image: base64String
          }));
        }
      };

      reader.readAsDataURL(fileArr[0]); // Read the file as data URL
    }
  }

  const handleFileSectionClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='File'>
      <section className="file_section" onClick={handleFileSectionClick}>
        <img className="preview" alt='' src={"data:image/gif;base64,"+previewImg} />
        <div>
          <label htmlFor="file"></label> {/* Added id for file input */}
          <div className="hidden">
            <input id="file" ref={fileInputRef} type="file" multiple accept="image/*" onChange={uploadFile} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default File;