import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import newWorker from "../tesseract/createWorker";
import getTextOcr from "../tesseract/getText";
// import RemoveBg from '../filterOCR/RemoveBg';
import convertToGrayscale from '../filterOCR/GreyScale';

import "./File.css";

interface FileProps {
  setImage: React.Dispatch<React.SetStateAction<{
    name: string;
    hpNum: string;
    company: string;
    email: string;
    image: string;
  }>>;
  setPercentage?: Dispatch<SetStateAction<number>>;
}

const File: React.FC<FileProps> = ({ setImage, setPercentage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>('');

  useEffect(() => {
    setPreviewImg("/images/1.gif");
  }, []);

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (setPercentage) {
      const fileArr = e.target.files;
      if (fileArr && fileArr.length > 0) {
        const fileRead = new FileReader();
        fileRead.onload = async function () {
          const result = fileRead.result;
          if (typeof result === 'string') {
            setPreviewImg(result);
            setImage((prevState) => ({
              ...prevState,
              image: result
            }));
            // const bgRemoveResult = await RemoveBg(result,setPercentage);
            const greyScaleResult = await convertToGrayscale(result);
            setPreviewImg(result);
            setImage((prevState) => ({
              ...prevState,
              image: result
            }));
            const ocrData = await newWorker(greyScaleResult, setPercentage);
            console.log(ocrData);
            setImage((prevState) => ({
              ...prevState,
              ...getTextOcr(ocrData ?? '')
            }));
          }
        };
        fileRead.readAsDataURL(fileArr[0]);
      }
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
          <label htmlFor="file"></label>
          <div className="hidden">
            <input id="file" ref={fileInputRef} type="file" multiple accept="image/*" onChange={uploadFile} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default File;
