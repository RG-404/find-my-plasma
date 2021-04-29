import { Fragment } from "react";

const Toast = ({ show, message, className, children }) => {
  return (
    <Fragment>
      {show ? (
        <div className={className}>
          <div className="px-4 py-4 flex items-center bg-green-600 text-white font-semibold">
            <div className={children ? "mr-2" : "hidden"}>{children}</div>
            {message}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Toast;
