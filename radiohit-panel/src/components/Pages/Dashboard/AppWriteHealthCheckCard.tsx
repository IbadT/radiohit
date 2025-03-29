import * as React from "react";
import {
  DatabaseZap,
  HardDrive,
  HeartPulse,
  Loader2,
  Webhook,
} from "lucide-react";
import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { cn } from "@/lib/utils/utils";

const AppWriteHealthCheckCard = ({
  isLoading,
  storageSystemStatus,
  databaseSystemStatus,
  functionsSystemStatus,
}) => {
  return (
    <div className="w-full h-full bg-white rounded-2xl border-[1px] border-mainBorder flex flex-col px-[1.2rem] py-[1.2rem]">
      <div className="flex flex-row items-center justify-between mb-[0.3rem] px-[0.5rem]">
        <div className="flex flex-col">
          <h2 className="text-[#373738] font-[600] text-[1.2rem]">
            Статус системы
          </h2>
          <p className="text-gray-500 text-[0.9rem] font-[300]">
            Информация о текущем статусе системы
          </p>
        </div>
        <HeartPulse
          strokeWidth={1.4}
          className="h-auto w-[1.6rem] text-gray-600"
        />
      </div>

      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <div className="h-[8.5vw] w-full flex flex-row items-center gap-[1rem] mt-[0.5rem]">
          {/*DB Health*/}
          <div
            className={cn(
              "w-full h-full rounded-xl bg-green-50 flex flex-row items-center justify-center gap-[1rem] border-[1px] border-green-500",
              databaseSystemStatus && "bg-red-50 border-red-500"
            )}
          >
            <DatabaseZap
              strokeWidth={1.6}
              className={cn(
                "h-auto w-[3rem] text-green-700 min-[1200px]:max-[1500px]:w-[2rem]",
                databaseSystemStatus && "text-red-500"
              )}
            />
            <div className="flex flex-col">
              <p
                className={cn(
                  "text-[1rem] text-green-700 font-[600] min-[1200px]:max-[1500px]:text-[0.85rem]",
                  databaseSystemStatus && "text-red-500"
                )}
              >
                База данных
              </p>
              <p
                className={cn(
                  "text-[0.8rem] text-green-700 min-[1200px]:max-[1500px]:text-[0.65rem]",
                  databaseSystemStatus && "text-red-500"
                )}
              >
                {databaseSystemStatus
                  ? "Наблюдаются ошибки в системе"
                  : "Система работает корректно"}
              </p>
            </div>
          </div>

          {/*Disk Health*/}
          <div
            className={cn(
              "w-full h-full rounded-xl bg-green-50 flex flex-row items-center justify-center gap-[1rem] border-[1px] border-green-500",
              storageSystemStatus && "bg-red-50 border-red-500"
            )}
          >
            <HardDrive
              strokeWidth={1.6}
              className={cn(
                "h-auto w-[3rem] text-green-700 min-[1200px]:max-[1500px]:w-[2rem]",
                storageSystemStatus && "text-red-500"
              )}
            />
            <div className="flex flex-col">
              <p
                className={cn(
                  "text-[1rem] text-green-700 font-[600] min-[1200px]:max-[1500px]:text-[0.85rem]",
                  storageSystemStatus && "text-red-500"
                )}
              >
                Хранилище
              </p>
              <p
                className={cn(
                  "text-[0.8rem] text-green-700 min-[1200px]:max-[1500px]:text-[0.65rem]",
                  storageSystemStatus && "text-red-500"
                )}
              >
                {storageSystemStatus
                  ? "Наблюдаются ошибки в системе"
                  : "Система работает корректно"}
              </p>
            </div>
          </div>

          {/*Functions Health Check*/}
          <div
            className={cn(
              "w-full h-full rounded-xl bg-green-50 flex flex-row items-center justify-center gap-[1rem] border-[1px] border-green-500",
              functionsSystemStatus && "bg-red-50 border-red-500"
            )}
          >
            <Webhook
              strokeWidth={1.6}
              className={cn(
                "h-auto w-[3rem] text-green-700 min-[1200px]:max-[1500px]:w-[2rem]",
                functionsSystemStatus && "text-red-500"
              )}
            />
            <div className="flex flex-col">
              <p
                className={cn(
                  "text-[1rem] text-green-700 font-[600] min-[1200px]:max-[1500px]:text-[0.85rem]",
                  functionsSystemStatus && "text-red-500"
                )}
              >
                API Клиент
              </p>
              <p
                className={cn(
                  "text-[0.8rem] text-green-700 min-[1200px]:max-[1500px]:text-[0.65rem]",
                  functionsSystemStatus && "text-red-500"
                )}
              >
                {functionsSystemStatus
                  ? "Наблюдаются ошибки в системе"
                  : "Система работает корректно"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AppWriteHealthCheckCard;

const LoadingSkeleton = () => {
  return (
    <Skeleton className="h-full rounded-2xl text-center align-middle items-center justify-center mt-[0.5rem] flex flex-col gap-[1rem]">
      <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-400" />
      <p className="text-slate-500 text-[1rem]">Загрузка данных...</p>
    </Skeleton>
  );
};
