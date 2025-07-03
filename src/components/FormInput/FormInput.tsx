import type { FormInputProps } from "@/components/FormInput/FormInput.types";
import { Asterisk, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const defaultValidStyle = `flex
          flex-row
          items-center
          border
          border-[var(--color-text)]
          rounded-xl
          p-1
          transition-all
          duration-200
          focus-within:border-[var(--color-primary)]`;

const defaultInvalidStyle = `flex
          flex-row
          items-center
          border
          border-red-500
          rounded-xl
          p-1
          transition-all
          duration-200
          focus-within:border-[var(--color-primary)]`;

function FormInput(props: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const handleOnBlur = () => {
    const isValid = props.isValid(props.value);

    if (isValid) {
      setHasErrors(false);
    } else {
      setHasErrors(true);
    }
  };

  return (
    <div className="mb-2">
      <div
        className="
          flex
          flex-row
          mb-2
          items-center
          justify-start
          gap-0.5">
        <label className="text-lg">{props.label}</label>
        {props.required && (
          <Asterisk
            color="red"
            size="1rem"
            className="self-start"
          />
        )}
      </div>
      <div
        style={hasErrors ? props.invalidStyle : props.validStyle}
        className={hasErrors ? (props.invalidStyle ? "" : defaultInvalidStyle) : props.validStyle ? "" : defaultValidStyle}>
        {props.icon}
        <input
          name={props.name}
          type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
          className="
            ml-2
            my-1
            rounded-md
            border-none
            w-[85%]
            h-8
            focus:outline-none
            placeholder:text-gray-500"
          placeholder={props.placeHolder}
          value={props.value?.toString()}
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
          onBlur={handleOnBlur}
        />
        {props.type === "password" && (
          <button
            type="button"
            autoFocus={false}
            className="cursor-pointer bg-transparent border-none"
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <EyeOffIcon
                color="var(--color-text)"
                width={20}
                height={20}
              />
            ) : (
              <EyeIcon
                color="var(--color-text)"
                width={20}
                height={20}
              />
            )}
          </button>
        )}
      </div>
      {hasErrors && (
        <div
          className="
            text-red-500">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default FormInput;
