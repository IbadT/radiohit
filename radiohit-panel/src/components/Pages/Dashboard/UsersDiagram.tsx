import { Pie, ResponsiveContainer, Tooltip, PieChart, Cell } from "recharts";
import { Skeleton } from "@/components/LoadingSkeletons/SkeletonPrimitive";
import { Loader2 } from "lucide-react";
import * as React from "react";

const UsersDiagram = ({ isLoading, allUsersCollection }) => {
  const artistsCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "artist").length;
  const usersCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "user").length;
  const radioUsersCount =
    !isLoading &&
    allUsersCollection[0].documents.filter((el) => el.role == "radio").length;

  const data = [
    { name: "Радиостанции", value: radioUsersCount },
    { name: "Пользователи", value: usersCount },
    { name: "Исполнители", value: artistsCount },
  ];

  const COLORS = ["#FFBB28", "#36aaff", "#de32ee"];

  return (
    <div className="bg-white rounded-2xl border-[1px] border-mainBorder color flex flex-col w-full px-[1.2rem] pt-[1.2rem] pb-[1.2rem] w-full">
      <div className="flex flex-col">
        <h2 className="text-[#373738] font-[600] text-[1.1rem] pl-[0.5rem]">
          Диаграмма пользователей
        </h2>
        <p className="text-gray-500 text-[0.9rem] font-[300] pl-[0.5rem] mb-[0.5rem]">
          Соотношение пользователей платформы
        </p>
        {isLoading && <LoadingSkeleton />}
        {!isLoading && (
          <div className="w-full h-[30vh] flex flex-col items-center justify-center align-center scale-[1.2] relative top-[20px]">
            <ResponsiveContainer width="100%" height="100%">
              {/*@ts-ignore*/}
              <PieChart width="100%" height="100%">
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground text-[0.5rem]">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold text-muted-foreground text-[0.9rem]">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default UsersDiagram;

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[32vh] rounded-2xl mb-[1rem] text-center align-middle items-center justify-center flex mt-[0.6rem] flex flex-col gap-[1rem]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-400" />
        <p className="text-slate-500 text-[0.8rem]">Загрузка данных...</p>
      </Skeleton>
    </>
  );
};
