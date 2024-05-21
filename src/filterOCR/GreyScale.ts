
const convertToGrayscale = (base64Image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create an Image object
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Canvas context could not be obtained'));
      }
      // Set canvas dimensions to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);
      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
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

      // Put the modified data back into the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas back to a Base64 image
      return resolve(canvas.toDataURL());
    };

    img.onerror = () => {
      reject(new Error('Image could not be loaded'));
    };
  });
}

export default convertToGrayscale;