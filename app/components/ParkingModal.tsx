"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import ContentfulImage from "@/lib/contentful-image";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "dark:bg-neutral-950/80 fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "dark:border-neutral-800 dark:bg-neutral-950 fixed left-[50%] top-[50%] z-50 grid w-screen max-w-7xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-transparent p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400 absolute right-6 top-4 rounded-sm hover:opacity-80 focus:outline-none disabled:pointer-events-none">
        <div className="h-12 w-12 rounded-full bg-white">
          <span className="material-symbols-outlined icon-48">close</span>
          <span className="sr-only">Close</span>
        </div>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export default function ParkingModal() {
  const url =
    "https://images.ctfassets.net/r9ulzvk6fhkd/12SEqVv6aXGxlUhtEmSGN9/c0717f01ec86a2eae28783cc9847ac69/parking.png";

  return (
    <Dialog>
      <DialogTrigger>
        <p className="small mb-2.5 flex cursor-pointer items-center uppercase">
          <span className="material-symbols-outlined icon-24 mr-2">
            visibility
          </span>
          View Parking Instructions
        </p>
      </DialogTrigger>
      <DialogContent>
        <ContentfulImage
          alt="parking map"
          priority
          width={1000}
          height={500}
          quality={100}
          className="h-full w-full rounded-br-[30px] rounded-tl-[30px] pt-14"
          src={url}
        />
      </DialogContent>
    </Dialog>
  );
}
