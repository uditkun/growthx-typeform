import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
type Button = {
  type?: string;
  error?: boolean;
  message?: string;
  func: MouseEventHandler<HTMLElement>;
};

const ButtonBlock = ({ type, error, message, func }: Button) => {
  switch (type) {
    case "pressEnter": {
      return (
        <div className="relative h-[50px]">
          <div
            className={
              error
                ? "hidden transition-block relative"
                : "block transition-block relative"
            }
          >
            <button
              type="button"
              className="flex items-center justify-center gap-1 px-[14px] py-2 rounded text-white bg-growthXBlue font-semibold w-fit"
              onClick={func}
            >
              OK{" "}
              <FontAwesomeIcon
                // className="mt-1"
                fontWeight={100}
                icon={faCheck}
              ></FontAwesomeIcon>
            </button>
            <span className="absolute text-xs ml-2 left-20 top-2 dark:text-white">
              press{" "}
              <span className="font-semibold tracking-wider ml-[2px]">
                Enter ↵
              </span>
            </span>
          </div>
          <div
            className={`rounded absolute transition-block border border-red-600 bg-red-50 text-red-700 px-2 py-1 flex gap-2 items-center text-sm w-full sm:w-fit font-[sans-serif] ${
              error ? "visible" : "invisible"
            }`}
          >
            <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
            <span>{message}</span>
          </div>
        </div>
      );
    }

    default: {
      return (
        <div className="relative h-[50px]">
          <button
            type="button"
            className={`flex items-center justify-center gap-1 px-[14px] py-2 rounded text-white bg-growthXBlue font-semibold w-fit transition-block ${
              error ? "hidden" : "flex"
            }`}
            onClick={func}
          >
            OK{" "}
            <FontAwesomeIcon
              // className="mt-1"
              fontWeight={100}
              icon={faCheck}
            ></FontAwesomeIcon>
          </button>
          <div
            className={`rounded transition-block border border-red-600 bg-red-50 text-red-700 px-2 py-1 flex gap-2 items-center text-sm w-fill sm:w-fit font-[sans-serif] ${
              error ? "visible" : "invisible"
            }`}
          >
            <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
            <span>{message}</span>
          </div>
        </div>
      );
    }
  }
};

export default ButtonBlock;
