"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils/utils"

const AudioProgressBarHelper = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className,isRadioPlayed, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className={cn("relative h-[7px] max-md:h-[5px] max-md:pointer-events-none w-full grow overflow-hidden rounded-full bg-[#e9e9e9] cursor-pointer transition-all duration-300", isRadioPlayed && '!h-0')}>
            <SliderPrimitive.Range className={cn("absolute h-full bg-fuchsia-600", isRadioPlayed && '!bg-[#e9e9e9]')} />
        </SliderPrimitive.Track>
    </SliderPrimitive.Root>
))
AudioProgressBarHelper.displayName = SliderPrimitive.Root.displayName

export { AudioProgressBarHelper }



