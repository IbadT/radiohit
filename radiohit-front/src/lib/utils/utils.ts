import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {getUserImageURL} from "@/lib/appwrite/common/appwrite.helper";

export const defaultImageAvatar = getUserImageURL('default_user_image');

//Classnames helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Normalize input => without whitespaces at start & end
export function deleteWhitespacesOnSides(Text) {
  return Text.replace(/^\s+|\s+$/g, "");
}

//Convert seconds to HMS
export function secondsToHms(duration) {
  duration = Number(duration);
  let m = Math.floor(duration % 3600 / 60);
  let s = Math.floor(duration % 3600 % 60).toFixed(0);
  //@ts-ignore
  if(s < 10) {
    s = '0' + s;
  }
  return  `${m}:${s}`;
}


//Get audio duration from file upload
export async function getDuration(file) {
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.muted = true;
    const source = document.createElement("source");
    source.src = url;
    audio.preload= "metadata";
    audio.appendChild(source);
    audio.onloadedmetadata = function(){
      // resolve(audio.duration)
      const stringDuration = secondsToHms(audio.duration)
      resolve(stringDuration)
    };
  });
}


//Get current UTC Date
export function getCurrentUTCDate() {
  const utcDay = new Date().getUTCDate()
  const utcMonth = new Date().getUTCMonth()
  const utcYear = new Date().getUTCFullYear()

  return `${utcDay}/${utcMonth}/${utcYear}`
}
