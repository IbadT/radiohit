// import axios from 'axios';
// import sharp from 'sharp';

// export default async function handler(req, res) {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ 
//       error: "URL is required",
//       details: "Please provide a valid image URL"
//     });
//   }

//   try {
//     // Получаем изображение по URL с таймаутом
//     const response = await axios.get(url, { 
//       responseType: "arraybuffer",
//       timeout: 10000, // 10 секунд таймаут
//       maxContentLength: 10 * 1024 * 1024 // Максимум 10MB
//     });

//     // Проверяем тип контента
//     const contentType = response.headers["content-type"] || '';
//     if (!contentType.startsWith("image/")) {
//       return res.status(400).json({ 
//         error: "Invalid content type",
//         details: `Expected image but got ${contentType}` 
//       });
//     }

//     // Проверяем размер изображения
//     if (response.data.length > 10 * 1024 * 1024) {
//       return res.status(400).json({
//         error: "Image too large",
//         details: "Maximum allowed size is 10MB"
//       });
//     }

//     // Обрабатываем изображение с улучшенной обработкой ошибок
//     let processedImage;
//     try {
//       // Анализируем исходное изображение
//       const originalMetadata = await sharp(response.data)
//         .metadata()
//         .catch(() => null);

//       // Обработка изображения с fallback-параметрами
//       processedImage = await sharp(response.data)
//         .resize({
//           width: 1200,
//           height: 800,
//           fit: 'inside',
//           withoutEnlargement: true // Не увеличиваем маленькие изображения
//         })
//         .modulate({
//           brightness: 1.15,
//           saturation: 1.3
//         })
//         .sharpen({ sigma: 1.5 })
//         .median(3)
//         .normalize()
//         .toFormat("webp", {
//           quality: 90,
//           lossless: false,
//           alphaQuality: 90, // Качество альфа-канала
//           effort: 6 // Уровень оптимизации (1-6)
//         })
//         .toBuffer();
//     } catch (sharpError) {
//       console.error("Sharp processing error:", sharpError);
//       // Fallback: возвращаем оригинальное изображение, если обработка не удалась
//       res.setHeader("Content-Type", contentType);
//       return res.send(response.data);
//     }

//     // Возвращаем обработанное изображение
//     res.setHeader("Content-Type", "image/webp");
//     res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
//     return res.send(processedImage);

//   } catch (error) {
//     console.error("Image processing failed:", error);
    
//     const statusCode = error.response?.status || 500;
//     const errorDetails = {
//       error: "Image processing failed",
//       details: error.message,
//       ...(error.response && { 
//         status: error.response.status,
//         statusText: error.response.statusText
//       })
//     };

//     return res.status(statusCode).json(errorDetails);
//   }
// }








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
    // res.setHeader("Content-Type", "image/webp");
    // res.send(processedImage);
    return new Response(processedImage, {
      status: 200,
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
}



// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const url = searchParams.get("url");

//   if (!url) {
//     return new Response(JSON.stringify({ error: "URL is required" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     // Получаем изображение по URL
//     const response = await axios.get(url, { responseType: "arraybuffer" });

//     // Проверяем тип контента
//     const contentType = response.headers["content-type"];
//     if (!contentType.startsWith("image/")) {
//       return new Response(JSON.stringify({ error: "The requested resource isn't a valid image" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
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
//     return new Response(processedImage, {
//       status: 200,
//       headers: { "Content-Type": "image/jpeg" },
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     return new Response(JSON.stringify({ error: "Failed to process image" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }