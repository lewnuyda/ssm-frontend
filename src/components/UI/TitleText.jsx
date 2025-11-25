import React from "react";
import { Typography } from "@material-tailwind/react";

const TitleText = ({
  children,
  variant = "small",
  color = "blue-gray",
  className = "",
  ...rest
}) => {
  return (
    <Typography
      variant={variant}
      color={color}
      className={`block font-sans antialiased leading-tight tracking-normal ${className}`}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default TitleText;
