// src/components/UI/TextInput.jsx
import React from "react";
import { Input } from "@material-tailwind/react";

const TextInput = React.forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      error = false,
      errorMessage = "",
      autoComplete = "off", // ✅ Dynamic and default to "off"
      ...rest
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        <Input
          type={type}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          crossOrigin=""
          autoComplete={autoComplete} // ✅ Dynamic prop usage
          inputRef={ref}
          {...rest}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default TextInput;
