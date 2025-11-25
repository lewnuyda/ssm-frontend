// src/components/CustomModal.jsx
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const CustomModal = ({
  open,
  handler, // function to toggle open/close
  size = "md", // modal size (xs, sm, md, lg, xl, screen, etc.) per Material‑Tailwind :contentReference[oaicite:0]{index=0}
  header, // header content (string or node)
  children, // body content
  footer, // footer (e.g. action buttons)
  className = "", // extra class for Dialog
  animate, // custom animate prop for modal animations :contentReference[oaicite:1]{index=1}
  ...rest // rest of props
}) => {
  return (
    <Dialog
      open={open}
      handler={handler}
      size={size}
      animate={animate}
      className={className}
      {...rest} // pass other props down
    >
      {header && <DialogHeader>{header}</DialogHeader>}
      <DialogBody>{children}</DialogBody>
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </Dialog>
  );
};

export default CustomModal;
