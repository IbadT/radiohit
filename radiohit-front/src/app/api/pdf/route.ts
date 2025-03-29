import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const saveAsPdf = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: "shell",
    ignoreDefaultArgs: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-extensions",
    ],
  });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const result = await page.pdf({
    format: "a4",
  });
  await browser.close();

  return result;
};

export async function POST(req: Request) {
  try {
    const mainURL = "https://radiohit.by";

    const {
      artistName,
      artistImageURL,
      artistCountry,
      artistDescription,
      songName,
      songImageURL,
    } = await req.json();

    const pdf = await saveAsPdf(
      `${mainURL}/pdf-templates/SongInfo.html?artistName=${artistName}&artistImageURL=${artistImageURL}&artistCountry=${artistCountry}&artistDescription=${artistDescription}&songName=${songName}&songImageURL=${songImageURL}`
    );

    const response = new NextResponse(pdf);

    response.headers.set(
      "Content-Disposition",
      `attachment; filename="info.pdf"`
    );
    response.headers.set("Content-Type", "application/pdf");

    return response;
  } catch (err:any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message, success: false });
  }
}
