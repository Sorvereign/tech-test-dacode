import { HTMLProps, forwardRef } from "react";

type InputProps = HTMLProps<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      className="checkbox checkbox-primary bg-gray-400/60 rounded-none h-5 w-5"
    />
  )
);
