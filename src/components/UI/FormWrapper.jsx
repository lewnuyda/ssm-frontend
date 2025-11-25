import React from "react";

const FormWrapper = ({ onSubmit, children, className = "", ...rest }) => (
  <form onSubmit={onSubmit} className={className} {...rest}>
    {children}
  </form>
);

export default FormWrapper;
