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
