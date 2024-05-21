import { Dispatch, SetStateAction } from 'react';
import { createWorker } from 'tesseract.js';

// 이미지 전처리 함수 (예: Canvas를 사용한 대비 조정)
const preprocessImage = async (imageUrl: string): Promise<Blob> => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // 간단한 대비 조정 (추가 전처리 가능)
    ctx.filter = 'contrast(1.5)';
    ctx.drawImage(canvas, 0, 0);

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Canvas toBlob failed'));
            }
        });
    });
};

function convertToPercentage(num: number): number {
    return parseFloat((num * 100).toFixed(1));
}

const newWorker = async (imageUrl: string, setPercentage: Dispatch<SetStateAction<number>>) => {
    const worker = await createWorker({
        // WebAssembly 경로 명시
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@latest/tesseract-core.wasm.js',
        logger: (m) => {
            console.log(m);
            setPercentage(convertToPercentage(m.progress));
        }
    });

    try {
        await worker.loadLanguage('eng+kor');
        await worker.initialize('eng+kor');

        const preprocessedBlob = await preprocessImage(imageUrl);
        const { data: { text } } = await worker.recognize(preprocessedBlob);

        if (text) {
            return text;
        }
    } catch (error) {
        console.error("OCR 중 오류 발생:", error);
    } finally {
        await worker.terminate();
    }
};

export default newWorker;
