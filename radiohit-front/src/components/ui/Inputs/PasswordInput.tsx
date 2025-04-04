"use client";
import * as React from "react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/Buttons/Button";
import { Input, type InputProps } from "@/components/ui/Inputs/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          autoComplete="true"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 cursor-pointer" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4 cursor-pointer" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

export default PasswordInput;
