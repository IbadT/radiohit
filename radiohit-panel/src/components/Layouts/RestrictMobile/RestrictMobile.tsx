import { MonitorCheck } from "lucide-react";

const RestrictMobile = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center py-[2rem] px-[4rem]">
      <MonitorCheck strokeWidth={1.2} size={80} />
      <p className="text-[1.4rem] font-[300] mt-[1rem] text-center max-md:text-[1.2rem]">
        Панель доступна только в десктопной версии сайта
      </p>
    </div>
  );
};
export default RestrictMobile;
