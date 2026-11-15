import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-press hover:brightness-105 active:translate-y-px",
  secondary:
    "bg-surface-raised text-foreground border border-border shadow-raised hover:bg-muted",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-7 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-display font-semibold",
        "transition-[filter,background-color,color,transform] duration-150 ease-out-expo",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
