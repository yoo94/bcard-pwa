import { createWorker } from 'tesseract.js';

const newWorker = async (imageUrl: string) => {
    const worker = await createWorker();
    try {
        await worker.loadLanguage('eng+kor');
        await worker.initialize('eng+kor');
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const { data: { text } } = await worker.recognize(blob);
        if(text){
          return text
        } 
    } catch (error) {
        console.error("OCR 중 오류 발생:", error);
    } finally {
        await worker.terminate();
    }
    
};

export default newWorker;
