import * as React from "react";
import { Loader2, MonitorDot, Smartphone } from "lucide-react";

const UserSessions = ({
  getUserSessionsList,
  hasHydrated,
  isAuthenticated,
}) => {
  const [userSessionsList, setUserSessionsList] = React.useState([]);

  React.useEffect(() => {
    if (!hasHydrated && !isAuthenticated) return;
    getUserSessionsList().then((result) => {
      setUserSessionsList(result);
    });
  }, [hasHydrated]);

  //Get session Date
  const convertUTCtoLocalDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  //Get session time
  const convertUTCtoLocalTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <>
      <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl p-[1rem] mt-[1rem] max-lg:mt-0 max-lg:flex-col max-lg:mt-[1rem] mb-[1.5rem]">
        <p className="text-[#39383A] font-[500] text-[1.2rem] lg:pl-[0.5rem]">
          Текущие сеансы аккаунта
        </p>
        {userSessionsList && userSessionsList.length == 0 && (
          <div className="flex flex-row w-full align-middle items-center justify-center h-[6rem]">
            <Loader2
              strokeWidth={1}
              className="h-[2.5rem] w-[2.5rem] animate-spin text-slate-300"
            />
          </div>
        )}
        {userSessionsList && userSessionsList.map((session, index) => {
          return (
            <div
              key={session.$id}
              className="w-full text-slate-500 grid grid-cols-4 p-[1rem] bg-slate-50 rounded-2xl mt-[1rem] max-md:p-[0.6rem] max-md:flex max-md:flex-row max-md:items-center max-md:justify-between max-md:text-[0.8rem] max-md:text-slate-[700]"
            >
              <div className="flex flex-row items-center">
                {session.deviceName == "desktop" && (
                  <MonitorDot strokeWidth={1.5} size={20} />
                )}
                {session.deviceName == "smartphone" && (
                  <Smartphone strokeWidth={1.5} size={20} />
                )}
                <p className="ml-[1rem]">{session.clientName}</p>
              </div>
              <div className="flex flex-row">
                <p className="mr-[0.5rem] max-md:hidden">IP Адрес</p>
                <p>{session.ip}</p>
              </div>
              <div className="flex flex-row">
                <p className="mr-[0.5rem] max-md:hidden">Дата</p>
                <p>{convertUTCtoLocalDate(session.$createdAt)}</p>
              </div>
              <div className="flex flex-row max-md:hidden">
                <p className="mr-[0.5rem]">Время</p>
                <p>{convertUTCtoLocalTime(session.$createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserSessions;
