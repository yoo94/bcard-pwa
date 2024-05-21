import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import newWorker from "../tesseract/createWorker";
import getTextOcr from "../tesseract/getText";
import RemoveBg from '../filterOCR/RemoveBg';
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
      setPercentage(0)
      const fileArr = e.target.files;
      if (fileArr && fileArr.length > 0) {
        const fileRead = new FileReader();
        setPercentage(5)
        fileRead.onload = async function () {
          const result = fileRead.result;
          if (typeof result === 'string') {
            setPercentage(9)
            setPreviewImg(result);
            setPercentage(10);
            setImage((prevState) => ({
              ...prevState,
              image: result
            }));
            setPercentage(11);
            const bgRemoveResult = await RemoveBg(result,setPercentage);
            setPercentage(73);
            const greyScaleResult = await convertToGrayscale(bgRemoveResult,setPercentage);
            setPercentage(93)
            setPreviewImg(bgRemoveResult);
            setImage((prevState) => ({
              ...prevState,
              image: bgRemoveResult
            }));
            setPercentage(94)
            const ocrData = await newWorker(greyScaleResult);
            setPercentage(98)
            console.log(ocrData);
            setImage((prevState) => ({
              ...prevState,
              ...getTextOcr(ocrData ?? '')
            }));
            setPercentage(100)
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
