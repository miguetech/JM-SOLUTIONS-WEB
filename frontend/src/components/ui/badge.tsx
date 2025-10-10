import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-dark text-white hover:bg-primary-dark/80",
        secondary:
          "border-transparent bg-secondary-dark text-text-light hover:bg-secondary-dark/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-text-light border-gray-600",
        success:
          "border-transparent bg-green-500/20 text-green-400 border-green-500/50",
        warning:
          "border-transparent bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        info:
          "border-transparent bg-blue-500/20 text-blue-400 border-blue-500/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }