import * as React from "react";
import { cn } from "../../shared/utils/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          // 🩷 Softer, rounded input style
          "flex h-10 w-full rounded-xl border border-[hsl(20,30%,88%)] bg-[hsl(18,100%,95%)] px-4 py-2 text-base text-[hsl(15,27%,29%)] placeholder:text-[hsl(15,25%,55%)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(243,29%,60%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
