import { HTMLProps, ReactNode, forwardRef } from "react";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "submit" | "button" | "reset";
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button
      {...props}
      type={props.type}
      ref={ref}
      className="btn bg-gradient-primary rounded-full text-white border-0 !h-4"
    >
      {props.children}
    </button>
  )
);
