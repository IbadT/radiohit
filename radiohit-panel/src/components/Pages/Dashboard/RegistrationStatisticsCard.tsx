import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { BarChart4, Loader2 } from "lucide-react";
import * as React from "react";
import { ResponsiveContainer, Tooltip, Area, AreaChart, XAxis } from "recharts";
import { getRegistrationsChartData } from "@/lib/utils/utils";

const RegistrationStatisticsCard = ({
  isLoading,
  usersForLastMonth,
  limitDays,
}) => {
  const currentMonthName = new Date().toLocaleDateString("ru-RU", {
    month: "long",
  });

  return (
    <div className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full px-[1.2rem] pt-[1.2rem] pb-[0.5rem]">
      <div className="flex flex-row items-center justify-between mb-[0.3rem] px-[0.5rem]">
        <div className="flex flex-col">
          <h2 className="text-[#373738] font-[600] text-[1.2rem]">
            Регистрации на платформе
          </h2>
          <p className="text-gray-500 text-[0.9rem] font-[300]">
            Общий график регистраций за текущий месяц
          </p>
        </div>
        <p className="text-gray-600 pl-[0.5rem] text-[1rem] font-[400] capitalize relative top-[-3px]">
          {currentMonthName}
        </p>
      </div>
      <div className="h-[30vh]">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && (
          <RegistrationChart
            usersForLastMonth={usersForLastMonth}
            limitDays={limitDays}
          />
        )}
        {/*{!isLoading && usersForLastMonth.length !== 0 && (*/}
        {/*  <RegistrationChart*/}
        {/*    usersForLastMonth={usersForLastMonth}*/}
        {/*    limitDays={limitDays}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{!isLoading && usersForLastMonth.length === 0 && (*/}
        {/*  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-[1rem]">*/}
        {/*    <BarChart4 strokeWidth={1.5} size={40} />*/}
        {/*    <p className="font-[500] text-[1.2rem]">Нет данных</p>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};
export default RegistrationStatisticsCard;

const LoadingSkeleton = () => {
  return (
    <Skeleton className="h-[28vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex mt-[0.6rem] flex flex-col gap-[1rem]">
      <Loader2 className="mr-2 h-7 w-7 animate-spin text-gray-400" />
      <p className="text-slate-500 text-[1rem]">Загрузка данных...</p>
    </Skeleton>
  );
};

const RegistrationChart = ({ usersForLastMonth, limitDays }) => {
  const data = getRegistrationsChartData(usersForLastMonth, limitDays);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="onlyDayNumber"
          stroke="#94a3b8"
          className="text-[0.9rem]"
        />
        {/*<YAxis />*/}
        <Area type="monotone" dataKey="value" stroke="#a21caf" fill="#c646d3" />

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Регистраций
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                        {/*{payload[0].payload.date}*/}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Дата
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.date}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
