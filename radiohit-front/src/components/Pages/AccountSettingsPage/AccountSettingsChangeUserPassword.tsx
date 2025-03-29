import { Separator } from "@/components/ui/Separator/separator";
import ChangePasswordForm from "@/components/Forms/AccountForms/ChangePasswordForm";
import * as React from "react";

const ChangeUserPassword = () => {
  return (
    <div className="flex flex-col bg-white border-[1px] border-mainBorderColor rounded-2xl py-[1.8rem] px-[1.8rem] mt-[1rem] max-lg:mt-0 max-md:px-[1.2rem] mb-[1.5rem]">
      <div className="flex flex-row h-full max-md:flex-col">
        <p className="text-[#39383A] font-[500] text-[1.4rem] max-md:text-[1.2rem] max-md:text-slate-500 w-[20rem]">
          Изменить пароль аккаунта
        </p>
        <Separator
          className="h-auto bg-gray-300 mr-[3rem] max-md:hidden"
          orientation="vertical"
        />
        <Separator
          className="w-auto bg-gray-200 my-[1rem] min-md:hidden"
          orientation="horizontal"
        />
        <div className="w-[50%] max-md:w-full">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};
export default ChangeUserPassword;
