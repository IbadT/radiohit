"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils/utils";

const VolumeSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
    >(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center group",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="cursor-pointer relative h-[6px] bg-[#e8e8e9] group-hover:h-[7px] transition-size duration-200 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-fuchsia-600" />
        </SliderPrimitive.Track>
    </SliderPrimitive.Root>
));
VolumeSlider.displayName = SliderPrimitive.Root.displayName;

export { VolumeSlider };
