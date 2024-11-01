declare module "@/components/ui/input" {
    import React from "react";

    export interface InputProps
      extends React.InputHTMLAttributes<HTMLInputElement> {
      className?: string;
    }

    export const Input: React.ForwardRefExoticComponent<
      InputProps & React.RefAttributes<HTMLInputElement>
    >;
  }

declare module "@/components/ui/button" {
  import * as React from "react";
  import { VariantProps } from "class-variance-authority";

  export const buttonVariants: (props?: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
  }) => string;

  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
  }

  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
}
