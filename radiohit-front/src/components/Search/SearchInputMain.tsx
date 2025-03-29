import * as React from "react";
import { cn } from "@/lib/utils/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInputMain = React.forwardRef<HTMLInputElement, InputProps>(
    //@ts-ignore
    ({ className,boxClassName, type, ...props }, ref) => {
        return (
            <div className={cn("flex flex-row items-center", boxClassName)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-[15px] h-5 w-5 text-[#667181]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
                <input
                    type={type}
                    className={cn(
                        "transition-border flex h-[48px] w-full bg-transparent px-3 py-2 text-sm ring-offset-background duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
SearchInputMain.displayName = "Input";

export { SearchInputMain };



//
// import * as React from "react";
// import { X } from "lucide-react";
//
// import { cn } from "@/lib/utils/utils";
//
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/Select/select"
//
// export interface InputProps
//     extends React.InputHTMLAttributes<HTMLInputElement> {}
//
// const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
//     ({ className, closeAction, handleSelect,selectValue, type, ...props }, ref) => {
//         return (
//             <div className="flex flex-row items-center rounded-xl border-none bg-white shadow-2xl ">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="ml-[15px] h-5 w-5 text-[#667181]"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//                     />
//                 </svg>
//                 <input
//                     type={type}
//                     className={cn(
//                         "transition-border flex h-[48px] w-full bg-transparent px-3 py-2 text-sm ring-offset-background duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
//                         className
//                     )}
//                     ref={ref}
//                     {...props}
//                 />
//                 <Select onValueChange={(val)=>handleSelect(val)} defaultValue={selectValue} classname='border-none outline-none'>
//                     <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Искать по" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             <SelectItem value="songs">Треки</SelectItem>
//                             <SelectItem value="news">Новости</SelectItem>
//                             <SelectItem value="artists">Исполнители</SelectItem>
//                             <SelectItem value="events">Мероприятия</SelectItem>
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//                 <X
//                     className="mr-[15px] h-4 w-4 cursor-pointer"
//                     onClick={() => closeAction(false)}
//                 />
//             </div>
//         );
//     }
// );
// SearchInput.displayName = "Input";
//
// export { SearchInput };
