import AccountMenuAndHeading from "@/components/Layouts/Acoount/AccountMenuAndHeading";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <div className="w-full flex flex-col mt-[1.2rem] px-[1.5rem] max-[1200px]:px-[1rem] min-[100px]:max-[1200px]:min-h-[80vh]">
      <AccountMenuAndHeading />
      {children}
    </div>
  );
};

export default AccountLayout;
