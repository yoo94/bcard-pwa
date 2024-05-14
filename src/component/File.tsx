import { useRef, useState } from 'react';

const File = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSectionClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div>
      <label htmlFor=""></label>
      <section className="file_section" onClick={handleFileSectionClick}>
        <div>
          <label htmlFor="file">+ 명함첨부</label>
          <div className="hidden">
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default File;