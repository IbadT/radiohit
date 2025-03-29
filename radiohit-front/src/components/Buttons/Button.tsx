import { cn } from "@/lib/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

//@ts-ignore
const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
        destructive: "text-white bg-red-600 hover:bg-red-300",
        outline:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300",
        subtle: "hover:bg-zinc-200 bg-zinc-100 text-zinc-900",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        search:
          "text-slate-500 bg-white border-[1px] border-gray-200 transition-colors duration-300 hover:border-fuchsia-500 hover:text-fuchsia-600 w-full rounded-2xl",
        searchAlternative: "text-mainAccent bg-white border-[1px] border-mainAccent rounded-xl w-[15rem] bg-white transition-colors duration-300 hover:border-slate-500 hover:text-slate-500",

        login:
            "bg-white border-[1px] border-slate-500 text-slate-500 transition-colors duration-300 hover:bg-white hover:text-slate-400 hover:border-slate-400 rounded-xl",
        register:
            "bg-white border-[1px] border-mainAccent text-mainAccent transition-colors duration-300 hover:bg-white hover:text-slate-400 hover:border-slate-400 rounded-xl",
        mainAccentButton: 'text-white rounded-2xl bg-mainAccent hover:bg-fuchsia-500 transition-colors duration-300',
        mainAccentOutlineButton: 'text-mainAccent rounded-2xl bg-white hover:opacity-70 border-mainAccent border-[1px] transition-opacity duration-300',
        grayAccentOutlineButton: 'text-slate-500 rounded-2xl bg-white hover:opacity-70 border-slate-500 border-[1px] transition-opacity duration-300',

      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
