"use client";

import React, { useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Search, X } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./command";
import { Button } from "./button";

const Autocomplete = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>
>(({ children, ...props }) => {
  return (
    <Popover {...props}>
      <Command className="h-fit" shouldFilter={false}>
        {children}
      </Command>
    </Popover>
  );
});
Autocomplete.displayName = "Autocomplete";

const AutocompleteInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    display?: React.ReactNode;
    onReset?: () => unknown;
  }
>(({ className, display, onReset, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="flex items-center border border-input rounded-md px-3 bg-transparent"
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />

      <Input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "outline-none h-10 outline-transparent ring-transparent border-none px-1",
          display && "hidden",
          className,
        )}
        {...props}
      />

      <div
        className={cn(
          "h-10 px-1 w-full flex items-center justify-between",
          !display && "hidden",
        )}
      >
        {typeof display === "string" ? (
          <p className="text-sm">{display}</p>
        ) : (
          display
        )}
        <Button
          className="p-0 h-8 w-8 -mr-3"
          size="icon"
          variant="ghost"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
            onReset?.();
          }}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
});
AutocompleteInput.displayName = "AutocompleteInput";

const AutocompleteTrigger = PopoverTrigger;
AutocompleteTrigger.displayName = "AutocompleteTrigger";

const AutocompleteContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      className={cn(
        "max-h-[300px] overflow-y-auto p-0 DropdownPopoverContent",
        className,
      )}
      onCloseAutoFocus={(e) => {
        e.preventDefault();
      }}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
      }}
      {...props}
    />
  );
});
AutocompleteContent.displayName = "AutocompleteContent";

const AutocompleteEmpty = CommandEmpty;
AutocompleteEmpty.displayName = "AutocompleteEmpty";

const AutocompleteGroup = CommandGroup;
AutocompleteGroup.displayName = "AutocompleteGroup";

const AutocompleteItem = CommandItem;
AutocompleteItem.displayName = "AutocompleteItem";

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteEmpty,
};
