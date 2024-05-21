import { Dispatch, SetStateAction } from "react";

const convertToGrayscale = (base64Image: string,setPercentage: Dispatch<SetStateAction<number>>): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create an Image object
    setPercentage(74)
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      setPercentage(76)

      if (!ctx) {
        return reject(new Error('Canvas context could not be obtained'));
      }
      setPercentage(80)
      // Set canvas dimensions to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);
      setPercentage(85)
      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      setPercentage(90)
      // Convert each pixel to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate the grayscale value
        const grayscale = r * 0.3 + g * 0.59 + b * 0.11;

        // Set the RGB channels to the grayscale value
        data[i] = data[i + 1] = data[i + 2] = grayscale;
      }
      setPercentage(91)

      // Put the modified data back into the canvas
      ctx.putImageData(imageData, 0, 0);
      setPercentage(92)

      // Convert the canvas back to a Base64 image
      return resolve(canvas.toDataURL());
    };

    img.onerror = () => {
      reject(new Error('Image could not be loaded'));
    };
  });
}

export default convertToGrayscale;