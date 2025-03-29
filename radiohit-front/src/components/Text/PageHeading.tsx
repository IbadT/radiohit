import { cn } from "@/lib/utils/utils";

const PageHeading = ({ text, classnames }) => {
  return (
    <h2
      className={cn(
        "text-[#363636] font-[600] text-[1.5rem] mb-[0.6rem] pl-[0.3rem]",
        classnames
      )}
    >
      {text}
    </h2>
  );
};

export default PageHeading;
