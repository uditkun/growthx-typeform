import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const roleChoices = [
    { id: "A", description: "Founder or CXO" },
    { id: "B", description: "Product Team" },
    { id: "C", description: "Marketing Team" },
    { id: "D", description: "VC" },
    { id: "E", description: "Other" },
  ];
  const goalChoicesFounder = [
    { id: "A", description: "Structued Approach to Growth" },
    {
      id: "B",
      description: "Build a growth team",
    },
    {
      id: "C",
      description: "Connect with like-minded people",
    },
  ];
  const goalChoicesNonFounder = [
    { id: "A", description: "Get Hired" },
    { id: "B", description: "Get Promoted" },
    {
      id: "C",
      description: "Connect with like-minded people",
    },
    { id: "D", description: "Structued Approach to Growth" },
    {
      id: "E",
      description: "Build a growth team",
    },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen dark:bg-black relative">
        {/* Progress bar */}
        <div className="w-full fixed top-0 z-20">
          <div className="h-1 bg-growthXBlue" style={{ width: `${20}%` }}></div>
        </div>
        {/* Header/Navbar */}
        <nav className="h-16 sticky top-1 flex justify-between items-center py-3 px-4 z-10">
          <div className="w-[96px]">
            <img
              className="w-full h-auto"
              src={darkMode ? "growthXDark.png" : "growthXLight.png"}
              alt="GrowthX Logo"
            />
          </div>

          <button
            className="dark:text-white"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            Toggle Dark
          </button>
        </nav>
        {/* Typeform */}
        <form className="pt-4 sm:text-xl relative -top-20 w-full h-screen text-gray-800">
          <div className="slide">
            <div className="slideBox">
              <div className="flex flex-col gap-2">
                <span className="text-xl sm:text-2xl dark:text-white">
                  Up-skilling requires time commitment
                </span>
                <span className="text-left">
                  The GrowthX experience is designed by keeping in mind the
                  working hours founders & full time operators typically work
                  in.
                </span>
              </div>
              <span>
                You will spend
                <br />- 6 hours/week for the first 5 weeks
                <br />- 15 hours/week for the last 3 weeks
              </span>
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 px-[14px] pt-1 pb-2 rounded text-white bg-growthXBlue font-semibold w-fit"
                >
                  I agree
                </button>
                <span className="absolute text-sm ml-1 left-24 top-2 dark:text-white">
                  press <span className="font-semibold">Enter ↵</span>
                </span>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                What's your first name?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="text"
                placeholder="Type your answer here..."
                required
              />
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 px-[14px] pt-1 pb-2 rounded text-white bg-growthXBlue font-semibold w-fit"
                >
                  OK{" "}
                  <FontAwesomeIcon
                    className="mt-1"
                    fontWeight={100}
                    icon={faCheck}
                  ></FontAwesomeIcon>
                </button>
                <span className="absolute text-sm ml-2 left-20 top-2 dark:text-white">
                  press <span className="font-semibold">Enter ↵</span>
                </span>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                What's your last name?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="text"
                placeholder="Type your answer here..."
                required
              />
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 px-[14px] pt-1 pb-2 rounded text-white bg-growthXBlue font-semibold w-fit"
                >
                  OK{" "}
                  <FontAwesomeIcon
                    className="mt-1"
                    fontWeight={100}
                    icon={faCheck}
                  ></FontAwesomeIcon>
                </button>
                <span className="absolute text-sm ml-2 left-20 top-2 dark:text-white">
                  press <span className="font-semibold">Enter ↵</span>
                </span>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                What industry is your company in?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <span className="-mt-2">
                We will personalize your learning experience for you
              </span>
              <div className="relative">
                <input
                  className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] pr-8 placeholder:text-lightWhite"
                  list="industry"
                  name="industry"
                  placeholder="Type or select an option"
                  required
                />
                <FontAwesomeIcon
                  className="absolute bottom-4 left-[97%] cursor-pointer"
                  size="xs"
                  icon={faChevronDown}
                ></FontAwesomeIcon>
              </div>
              <ul
                id="industry"
                className="w-full -mt-2 flex flex-col gap-1 text-white max-h-80"
              >
                <li className="py-1 px-2 shadow-checkbox rounded hover:bg-lightWhite cursor-pointer transition-block">
                  1
                </li>
                <li className="py-1 px-2 shadow-checkbox rounded hover:bg-lightWhite cursor-pointer transition-block">
                  2
                </li>
                <li className="py-1 px-2 shadow-checkbox rounded hover:bg-lightWhite cursor-pointer transition-block">
                  3
                </li>
                <li className="py-1 px-2 shadow-checkbox rounded hover:bg-lightWhite cursor-pointer transition-block">
                  4
                </li>
              </ul>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                Your role in your company?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <fieldset className="-mt-2">
                <legend className="mb-4">
                  We want to understand how you spend your time right now.
                </legend>
                <div className="flex flex-col gap-2 mt-4">
                  {roleChoices.map((data) => {
                    return (
                      <div key={data.id} className="max-w-[256px]">
                        <input
                          className="hidden peer input-multiple"
                          type="radio"
                          id={data.description}
                          value={data.description}
                          name="role"
                        />
                        <label
                          className="rounded bg-[#ffffff1a] text-base sm:text-xl text-white peer-hover:bg-lightWhite cursor-pointer shadow-checkbox peer-checked:shadow-checkboxActive p-1 px-2 flex justify-between items-center gap-2 w-full"
                          htmlFor={data.description}
                        >
                          <div className="flex justify-center items-center gap-2">
                            <span className="w-[22px] h-[22px] text-[12px] bg-black sm:text-sm flex flex-column justify-center items-center font-semibold shadow-checkbox rounded-sm alphabet">
                              {data.id}
                            </span>
                            <span>{data.description}</span>
                          </div>
                          <FontAwesomeIcon
                            className="invisible check-icon"
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <button
                type="button"
                className="flex items-center justify-center gap-1 px-[14px] pt-1 pb-2 text-white rounded bg-growthXBlue font-semibold w-fit"
              >
                OK{" "}
                <FontAwesomeIcon
                  className="mt-1"
                  fontWeight={100}
                  icon={faCheck}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                Your role in your company?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <fieldset className="-mt-2">
                <legend className="mb-4"></legend>
                <div className="flex flex-col gap-2 mt-4">
                  {roleChoices.map((data) => {
                    return (
                      <div key={data.id} className="max-w-[256px]">
                        <input
                          className="hidden peer"
                          type="radio"
                          id={data.description}
                          value={data.description}
                          name="role"
                        />
                        <label
                          className="rounded bg-[#ffffff1a] text-base sm:text-xl text-white peer-hover:bg-lightWhite cursor-pointer shadow-checkbox peer-checked:shadow-checkboxActive p-1 px-2 flex justify-between items-center gap-2 w-full"
                          htmlFor={data.description}
                        >
                          <div className="flex justify-center items-center gap-2">
                            <span className="w-[22px] h-[22px] text-[12px] bg-black sm:text-sm flex flex-column justify-center items-center font-semibold shadow-checkbox rounded-sm peer-checked:bg-white">
                              {data.id}
                            </span>
                            <span>{data.description}</span>
                          </div>
                          <FontAwesomeIcon
                            className="invisible peer-checked:visible"
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <button
                type="button"
                className="flex items-center justify-center gap-1 px-[14px] pt-1 pb-2 text-white rounded bg-growthXBlue font-semibold w-fit"
              >
                OK{" "}
                <FontAwesomeIcon
                  className="mt-1"
                  fontWeight={100}
                  icon={faCheck}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                Email you'd like to register with?{" "}
                <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <span className="-mt-2">
                We will keep all our communications with you through this email.
                Do check your spam inbox if you can't find our application
                received email.
              </span>
              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="email"
                placeholder="name@example.com"
                required
              />
              <button
                type="button"
                className="flex text-white items-center justify-center gap-1 px-[14px] pt-1 pb-2 rounded bg-growthXBlue font-semibold w-fit"
              >
                OK{" "}
                <FontAwesomeIcon
                  className="mt-1"
                  fontWeight={100}
                  icon={faCheck}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>

          <div className="slide">
            <div className="slideBox">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <span className="absolute right-full mr-3">1) </span>
                Your phone number <sup className="absolute top-4 ml-1">*</sup>
              </span>
              <span className="-mt-2">
                We won't call you unless it is absolutely required to process
                your application.
              </span>
              <input
                className="max-w-[450px] shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="tel"
                placeholder="1234567899"
                required
              />

              <button
                type="submit"
                className="px-3 py-2 rounded bg-growthXBlue text-white font-semibold self-center w-full sm:w-fit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
