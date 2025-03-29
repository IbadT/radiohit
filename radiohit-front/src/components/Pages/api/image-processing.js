import sharp from "sharp";
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Получаем изображение по URL
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Проверяем тип контента
    const contentType = response.headers["content-type"];
    if (!contentType.startsWith("image/")) {
      return res.status(400).json({ error: "The requested resource isn't a valid image" });
    }

    // Анализируем исходное изображение
    const originalMetadata = await sharp(response.data).metadata();
    console.log("Исходное изображение:");
    console.log(`- Размер: ${response.data.length} байт`);
    console.log(`- Разрешение: ${originalMetadata.width}x${originalMetadata.height}`);
    console.log(`- Формат: ${originalMetadata.format}`);
    console.log(`- Цветовая модель: ${originalMetadata.space}`);

    // Обрабатываем изображение с помощью sharp
    const processedImage = await sharp(response.data)
      .resize(1200, 800, { fit: "inside" }) // Масштабируем изображение
      .modulate({
        brightness: 1.15, // Увеличиваем яркость
        saturation: 1.3, // Увеличиваем насыщенность
      })
      .sharpen() // Увеличиваем резкость
      .median(3) // Применяем медианный фильтр для уменьшения шума
      .normalize() // Нормализуем контрастность
      .toFormat("webp", {
        quality: 90, // Высокое качество WebP
        lossless: false, // Используем сжатие с потерями (false)
      })
      .toBuffer();

    // Анализируем обработанное изображение
    const processedMetadata = await sharp(processedImage).metadata();
    console.log("Обработанное изображение:");
    console.log(`- Размер: ${processedImage.length} байт`);
    console.log(`- Разрешение: ${processedMetadata.width}x${processedMetadata.height}`);
    console.log(`- Формат: ${processedMetadata.format}`);
    console.log(`- Цветовая модель: ${processedMetadata.space}`);

    // Возвращаем обработанное изображение
    res.setHeader("Content-Type", "image/webp");
    res.send(processedImage);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
}







// export default async function handler(req, res) {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "URL is required" });
//   }

//   try {
//     // Получаем изображение по URL
//     const response = await axios.get(url, { responseType: "arraybuffer" });

//     // Проверяем тип контента
//     const contentType = response.headers["content-type"];
//     if (!contentType.startsWith("image/")) {
//       return res.status(400).json({ error: "The requested resource isn't a valid image" });
//     }

//     // Обрабатываем изображение с помощью sharp
//     const processedImage = await sharp(response.data)
//       .resize(1200, 800, { fit: "inside" }) // Масштабируем изображение
//       .modulate({
//         brightness: 1.15, // Увеличиваем яркость
//         saturation: 1.3, // Увеличиваем насыщенность
//         hue: 0, // Корректируем оттенок (если нужно)
//       })
//       .sharpen() // Увеличиваем резкость
//       .median(3) // Применяем медианный фильтр для уменьшения шума
//       .normalize() // Нормализуем контрастность
//       .toFormat("jpeg", {
//         quality: 95, // Высокое качество JPEG
//         progressive: true, // Прогрессивный формат для лучшей загрузки
//         chromaSubsampling: "4:4:4", // Используем полное цветовое разрешение
//       })
//       .toBuffer();

//     // Возвращаем обработанное изображение
//     res.setHeader("Content-Type", "image/jpeg");
//     res.send(processedImage);
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Failed to process image" });
//   }
// }








// import sharp from "sharp";
// import axios from "axios";

// export default async function handler(req, res) {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "URL is required" });
//   }

//   try {
//     // Получаем изображение по URL
//     const response = await axios.get(url, { responseType: "arraybuffer" });

//     // Проверяем тип контента
//     const contentType = response.headers["content-type"];
//     if (!contentType.startsWith("image/")) {
//       return res.status(400).json({ error: "The requested resource isn't a valid image" });
//     }

//     // Обрабатываем изображение с помощью sharp
//     const processedImage = await sharp(response.data)
//       .resize(1200, 800, { fit: "inside" }) // Масштабируем изображение
//       .modulate({
//         brightness: 1.1, // Увеличиваем яркость
//         saturation: 1.2, // Увеличиваем насыщенность
//       })
//       .toFormat("jpeg", { quality: 90 }) // Конвертируем в JPEG с высоким качеством
//       .toBuffer();

//     // Возвращаем обработанное изображение
//     res.setHeader("Content-Type", "image/jpeg");
//     res.send(processedImage);
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Failed to process image" });
//   }
// }