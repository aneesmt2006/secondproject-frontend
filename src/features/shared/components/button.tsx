import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../shared/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(243,29%,60%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 🌸 Main solid button (Coral tone)
        default:
          "bg-[hsl(15,85%,65%)] text-white hover:bg-[hsl(12,75%,58%)] shadow-md hover:shadow-lg",
        
        // ❌ Destructive action (red tone)
        destructive:
          "bg-[hsl(0,84.2%,60.2%)] text-white hover:bg-[hsl(0,70%,50%)] shadow-md",

        // 🩵 Outline button (light periwinkle border + hover)
        outline:
          "border border-[hsl(20,30%,88%)] bg-[hsl(18,100%,95%)] text-[hsl(15,27%,29%)] hover:bg-[hsl(243,29%,60%)/0.1] hover:text-[hsl(243,29%,60%)] shadow-sm",

        // 🍑 Secondary (soft peach style)
        secondary:
          "bg-[hsl(20,100%,88%)] text-[hsl(15,27%,29%)] hover:bg-[hsl(22,95%,82%)] shadow-md hover:shadow-lg",

        // 👻 Ghost (transparent background)
        ghost:
          "text-[hsl(15,27%,29%)] hover:bg-[hsl(243,29%,60%)/0.08] hover:text-[hsl(243,29%,60%)]",

        // 🔗 Link style
        link:
          "text-[hsl(15,85%,65%)] underline-offset-4 hover:underline hover:text-[hsl(12,75%,58%)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
