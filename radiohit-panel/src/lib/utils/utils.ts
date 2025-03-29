import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {getUserImageURL} from "@/lib/appwrite/common/appwrite.helper";
import {subDays} from "date-fns";
export const defaultImageAvatar = getUserImageURL('64be92ff271c0650971b');

//SWR Fetcher
export const fetcher = (...args) => fetch(...args).then(res => res.json())

//Classnames helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Normalize input
export function deleteWhitespacesOnSides(Text) {
  return Text.replace(/^\s+|\s+$/g, "");
}

//Convert seconds to HMS
export function secondsToHms(duration) {
  duration = Number(duration);
  let m = Math.floor(duration % 3600 / 60);
  let s = Math.floor(duration % 3600 % 60).toFixed(0);
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


//Registrations by full Month
export const getRegistrationsChartData = (usersForLastMonth, limitDays) => {
  const finalData = [];

  const date = new Date();
  const currentMonth = date.toLocaleDateString("ru-RU", {
    month: "2-digit",
  });
  const currentYear = date.getFullYear();
  const monthDays = [];
  const registrationCounts = [];

  //Create array with month dates and empty register counts
  for (let i = 0; i < limitDays; i++) {
    monthDays.push(
        subDays(new Date(currentYear, parseInt(currentMonth)), i)
            .toISOString()
            .substring(0, 10)
    );
    registrationCounts.push(0);
  }

  const registrationDatesArray = usersForLastMonth.map((el) => {
    return el.registration.substring(0, 10);
  });

  const registrationCountsByDate = registrationDatesArray.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
  );

  const registrationCountsByDateArray = Object.entries(
      registrationCountsByDate
  );

  //New array of registration dates
  for (let i = 0; i < monthDays.length; i++) {
    if (registrationCountsByDateArray.find((el) => el[0] == monthDays[i])) {
      registrationCounts[i] = registrationCountsByDateArray
          .map((el) => {
            if (monthDays[i] == el[0]) {
              return el[1];
            }
          })
          .filter(Boolean)
          .shift();
    }
  }

  const sumOfAverage = registrationCounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue
  );

  const maxValue = Math.max(...registrationCounts);

  //Final push data
  for (let i = 0; i < monthDays.length; i++) {
    finalData.push({
      date: monthDays[i],
      onlyDayNumber: monthDays[i].substring(8, 10),
      value: registrationCounts[i],
      average:Math.random()
    });
  }


  return finalData.reverse();
};
