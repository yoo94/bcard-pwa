import { removeBackground } from "@imgly/background-removal";
import { Dispatch, SetStateAction } from "react";

// 예상되는 입력 타입 정의
type ImageSource = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string;

const RemoveBg = async (image_src: ImageSource,setPercentage: Dispatch<SetStateAction<number>>): Promise<string> => {
  try {
    // removeBackground를 호출합니다.
    setTimeout(() => {
      for (let i = 17; i < 70; i++) {
        setTimeout(() => {
          setPercentage(i);
        }, 700 * i); // 각각의 setTimeout이 0.1초씩 증가하는 간격을 가지도록 함
      }
    }, 700);
    
    const blob: Blob = await removeBackground(image_src);
    setPercentage(70);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("배경 제거 중 오류 발생:", error);
    throw error; // 오류를 기록한 후 다시 던지기
  }
};

export default RemoveBg;
