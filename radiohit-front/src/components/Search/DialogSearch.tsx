"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils/utils";

const DialogSearch = DialogPrimitive.Root;

const DialogSearchTrigger = DialogPrimitive.Trigger;

const DialogSearchPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogSearchPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogSearchOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "dialogOverlay fixed inset-0 z-50 bg-slate-700/20 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ",
      className
    )}
    {...props}
  />
));
DialogSearchOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogSearchContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogSearchPortal>
    <DialogSearchOverlay />
    <div className="flex w-full justify-center">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-[14vh] z-50 w-full max-w-[40rem] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",

          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </div>
  </DialogSearchPortal>
));
DialogSearchContent.displayName = DialogPrimitive.Content.displayName;

const DialogSearchHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogSearchHeader.displayName = "DialogHeader";

const DialogSearchFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogSearchFooter.displayName = "DialogFooter";

const DialogSearchTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogSearchTitle.displayName = DialogPrimitive.Title.displayName;

const DialogSearchDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogSearchDescription.displayName = DialogPrimitive.Description.displayName;

export {
  DialogSearch,
  DialogSearchTrigger,
  DialogSearchContent,
  DialogSearchHeader,
  DialogSearchFooter,
  DialogSearchTitle,
  DialogSearchDescription,
};
