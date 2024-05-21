import { removeBackground } from "@imgly/background-removal";

// 예상되는 입력 타입 정의
type ImageSource = ImageData | ArrayBuffer | Uint8Array | Blob | URL | string;

const RemoveBg = async (image_src: ImageSource): Promise<string> => {
  try {
    // removeBackground를 호출합니다.
    const blob: Blob = await removeBackground(image_src);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("배경 제거 중 오류 발생:", error);
    throw error; // 오류를 기록한 후 다시 던지기
  }
};

export default RemoveBg;
