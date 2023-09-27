import { HTMLProps, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type InputProps = HTMLProps<HTMLInputElement> & {
  label: string;
  errors?: FieldError;
};

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <div className="form-control">
      <label className="label" htmlFor={props.name}>
        <span className="label-text text-white ml-4"> {props.label}</span>
      </label>
      <input
        {...props}
        ref={ref}
        className="input input-bordered w-full max-w-md rounded-full bg-purple-brand"
      />
      {props.errors?.message && <p className="text-red-600">{props.errors?.message}</p>}
    </div>
  )
);
