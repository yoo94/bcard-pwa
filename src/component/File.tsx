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

  useEffect(()=>{
    setPreviewImg("./images/1.gif")
  },[])
  
  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const fileArr = e.target.files;
    if (fileArr && fileArr.length > 0) {
      // setPostImg({ file: URL.createObjectURL(fileArr[0]) }); // Store the file URL
      
      const fileRead = new FileReader();
      fileRead.onload = function() {
        const result = fileRead.result;
        if (typeof result === 'string') {
          setPreviewImg(result);
          setImage((prevState) => ({
            ...prevState,
            image: result
          }));
        }
      };
      
      fileRead.readAsDataURL(fileArr[0]); // Read the file as data URL
    }
  }
  

  const handleFileSectionClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='File'>
      <section className="file_section" onClick={handleFileSectionClick}>
        <img className="preview" alt='' src={previewImg} />
        <div>
          <label htmlFor="file"></label> {/* Added id for file input */}
          <div className="hidden">
            <input id="file" ref={fileInputRef} type="file" multiple accept="image/*" onChange={uploadFile} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default File;
