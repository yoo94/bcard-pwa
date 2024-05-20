import { useEffect, useRef, useState } from 'react';
import newWorker from "../tesseract/createWorker"

import "./File.css";

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
  const [previewImg, setPreviewImg] = useState<string>('');
  const [ocrData, setOcrData] = useState<string>(''); // OCR 결과를 저장할 상태 변수

  useEffect(() => {
    setPreviewImg("/images/1.gif");
  }, []);

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
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
          const ocrData = await newWorker(result); // newWorker 함수 실행 결과를 기다림
          console.log(ocrData);
          setOcrData(ocrData ?? ''); // OCR 결과를 상태 변수에 저장
        }
      };
      fileRead.readAsDataURL(fileArr[0]); // 파일을 data URL 형식으로 읽기
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
      {/* OCR 결과를 출력 */}
      {ocrData && (
        <div>
          <h2>OCR 결과:</h2>
          <p>{ocrData}</p>
        </div>
      )}
    </div>
  );
}

export default File;
