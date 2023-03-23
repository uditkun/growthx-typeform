import { useCallback, useEffect, useState } from "react";
import debounce from "../src/utils/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  goalChoicesFounder,
  goalChoicesNonFounder,
  roleChoices,
  MAX_SLIDES,
} from "./data/contentObjects";
import {
  faChevronDown,
  faCheck,
  faWarning,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import ButtonBlock from "./components/ButtonBlock";
import QuestionNumber from "./components/QuestionNumber";
import useClickOutside from "./hooks/useClickOutside";

type SlideData = {
  slide: number;
  userData: {
    firstName: string;
    lastName: string;
    industry: string;
    role: string;
    goal: string[];
    email: string;
    phone: number;
  };
};

function App() {
  const [error, setError] = useState<boolean>(false);
  const [slideData, setSlideData] = useState<SlideData>({
    slide: 0,
    userData: {
      firstName: "",
      lastName: "",
      industry: "",
      role: "",
      goal: [],
      email: "",
      phone: 0,
    },
  });
  const [industryList, setIndustryList] = useState(["1", "2", "3", "4"]);
  const [flagList, setFlagList] = useState({
    currentFlag: { code: "in", country: "India" },
    flagList: [],
  });
  const isIndustryListActive = useClickOutside("industry-input");

  //fetch industry list
  useEffect(() => {
    const getIndustrylist = async () => {
      try {
        const data = await fetch(
          "https://gist.github.com/gxt-admin/758c1973293f54322c054bbd8119e80c",
          { mode: "no-cors" }
        ).then((res) => res.json());
        // console.log(data);
        setIndustryList((industryList) => data);
      } catch (err) {
        console.log("error fetching industry list");
      }
    };

    const getFlagslist = async () => {
      try {
        const fetchFlags = await fetch(
          "https://flagcdn.com/en/codes.json"
        ).then((res) => res.json());
        console.log(fetchFlags);
        if (fetchFlags) {
          setFlagList((flags) => {
            return { ...flags, flagList: fetchFlags };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIndustrylist();
    // getFlagslist();
  }, []);
  // const [darkMode, setDarkMode] = useState<boolean>(true);

  const getTranslateValue = (pos: number, slide: number) => {
    //Returns classnames for respective elements in order to facilitate scroll like experience
    let translateValue = slide * 100 - pos * 100;
    return translateValue > 0
      ? `-translate-y-${Math.abs(translateValue)} opacity-0`
      : `translate-y-${Math.abs(translateValue)} opacity-0`;
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //a name attribute on input element is required for this to work
    setSlideData((slideData) => {
      return {
        ...slideData,
        userData: { ...slideData.userData, [e.target.name]: e.target.value },
      };
    });
    setError(false);
  };

  const onEnterSlideChange = () => {
    setSlideData((slideData) => {
      // Check if user can navigate on next slide
      let shouldNav = false;
      if (slideData.slide === 0) {
        shouldNav = true;
      }
      if (slideData.slide === 1) {
        shouldNav = Boolean(slideData.userData.firstName);
      }
      if (slideData.slide === 2) {
        shouldNav = Boolean(slideData.userData.lastName);
      }
      if (slideData.slide === 3) {
        shouldNav = Boolean(slideData.userData.industry);
      }
      if (slideData.slide === 4) {
        shouldNav = Boolean(slideData.userData.role);
      }
      if (slideData.slide === 5) {
        shouldNav = Boolean(slideData.userData.goal);
      }
      if (slideData.slide === 6) {
        shouldNav = Boolean(slideData.userData.email);
      }
      if (slideData.slide === 7) {
        shouldNav = Boolean(slideData.userData.phone);
      }
      //If not then set error to true
      if (!shouldNav) {
        setError(true);
      }
      //handle slide change
      let newSlide =
        slideData.slide < MAX_SLIDES && shouldNav
          ? slideData.slide + 1
          : slideData.slide;
      return { ...slideData, slide: newSlide };
    });
  };

  const handleWheelSlideChange = (e: React.WheelEvent<HTMLFormElement>) => {
    // console.log(e.deltaY);
    //This function is debounced and relies on value of deltaY value of onWheel event
    // If value negative, show previous slide else sholw next slide
    if (e.deltaY < 0) {
      setSlideData((slideData: SlideData) => {
        setError(false);
        let newSlide =
          slideData.slide > 0 ? slideData.slide - 1 : slideData.slide;
        return { ...slideData, slide: newSlide };
      });
    }
    if (e.deltaY > 0) {
      onEnterSlideChange();
    }
  };

  const debounceHandler = useCallback(
    debounce(handleWheelSlideChange, 500),
    []
  );

  const formSubmit = async (e: any) => {
    e.preventDefault();
    if (Object.values(slideData.userData).length === 7) {
      const postData = await fetch("https://eo3oi83n1j77wgp.m.pipedream.net", {
        method: "POST",
        headers: { "Content-type": "application/json ; charset:utf8" },
        body: JSON.stringify(slideData.userData),
      }).then((res) => res.json());
      console.log(postData);
    }
  };

  return (
    <div className="dark">
      <div className="h-screen dark:bg-black relative font-questrial">
        {/* Progress bar */}
        <div className="w-full fixed top-0 z-20">
          <div
            className="h-1 bg-growthXBlue"
            style={{
              width: `${
                (Object.values(slideData.userData).filter((i) => Boolean(i))
                  .length *
                  100) /
                7
              }%`,
            }}
          ></div>
        </div>
        {/* Header/Navbar */}
        <nav className="h-16 sticky top-1 flex justify-between items-center py-3 px-4 z-10">
          <div className="w-[96px]">
            <img
              className="w-full h-auto"
              src={"growthXDark.png"}
              alt="GrowthX Logo"
            />
          </div>

          {/* <button
            className="dark:text-white"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            Toggle Dark
          </button> */}
        </nav>
        {/* Typeform */}
        <form
          className="pt-4 sm:text-xl relative -top-20 w-full h-screen text-gray-800 overflow-hidden"
          onWheel={debounceHandler}
          onKeyDown={(e) => {
            if (e.key === "enter") {
              if (slideData.slide === 7) {
                formSubmit(e);
                return;
              }
              onEnterSlideChange();
            }
          }}
        >
          {/* Intro slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              0,
              slideData.slide
            )}`}
          >
            <div className="max-w-[720px] w-full mx-auto dark:text-[#ffffffb3] flex flex-col justify-center gap-5">
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
                  className="flex items-center justify-center gap-1 px-[14px] p-2 rounded text-white bg-growthXBlue font-semibold w-fit"
                >
                  I agree
                </button>
                <span className="absolute text-xs ml-1 left-24 top-3 dark:text-white">
                  press{" "}
                  <span className="font-semibold tracking-wider ml-[2px]">
                    Enter ↵
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* 1.First name slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              1,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={1} />
                What's your first name?
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>

              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="text"
                name="firstName"
                placeholder="Type your answer here..."
                defaultValue={slideData.userData.firstName}
                onChange={onChangeInput}
                required
              />
              <ButtonBlock
                type="pressEnter"
                error={error}
                func={onEnterSlideChange}
                message="Please enter your first name"
              />
            </div>
          </div>

          {/* 2.Last name slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              2,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={2} />
                and your last name{", " + slideData.userData.firstName}?
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>

              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="text"
                name="lastName"
                onChange={onChangeInput}
                placeholder="Type your answer here..."
                defaultValue={slideData.userData.lastName}
                required
              />
              <ButtonBlock
                type="pressEnter"
                error={error}
                func={onEnterSlideChange}
                message="Please enter your last name"
              />
            </div>
          </div>

          {/* Tried componetizing full slide but variations are many hence just sticking with plain code and only makinf simple components */}
          {/* <TypeformInput type="text" {...dataFlow[0]} slide={slide} userInput={userInput}/>
          <TypeformInput type="text" {...dataFlow[1]} slide={slide} userInput={userInput}/> */}

          {/* 3.Select industry slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              3,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={3} />
                What industry is your company in?{" "}
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>
              <span className="-mt-2">
                We will personalize your learning experience for you
              </span>
              <div id="industry-input" className="relative">
                <input
                  className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] pr-8 placeholder:text-lightWhite"
                  name="industry"
                  placeholder="Type or select an option"
                  defaultValue={slideData.userData.industry}
                  required
                />
                <FontAwesomeIcon
                  className={`absolute top-7 text-white left-[97%] cursor-pointer ${
                    isIndustryListActive ? "drop-icon" : ""
                  }`}
                  size="xs"
                  icon={faChevronDown}
                ></FontAwesomeIcon>
                <ul
                  className={`bg-black absolute z-10 industry w-full mt-2 flex-col gap-1 text-white max-h-80 ${
                    isIndustryListActive ? "flex" : "hidden"
                  }`}
                >
                  {industryList.map((item: any) => {
                    return (
                      <li
                        key={item}
                        className="py-1 px-2 flex items-center justify-between gap-2 shadow-checkbox bg-[#ffffff1a] rounded hover:bg-lightWhite cursor-pointer transition-block"
                        onClick={() => {
                          setSlideData((slideData) => {
                            return {
                              ...slideData,
                              userData: {
                                ...slideData.userData,
                                industry: item,
                              },
                            };
                          });
                          setError(false);
                          onEnterSlideChange();
                        }}
                      >
                        <span>{item}</span>
                        <FontAwesomeIcon
                          className={`text-white ${
                            slideData.userData.industry === item
                              ? "visible"
                              : "invisible"
                          }`}
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <ButtonBlock
                error={error}
                func={onEnterSlideChange}
                message={"Oops! Please make a selection"}
              />
            </div>
          </div>

          {/* 4.Select company role slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              4,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={4} />
                Your role in your company?{" "}
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
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
                          className="hidden input-multiple"
                          type="radio"
                          id={data.description}
                          value={data.description}
                          onChange={(e) => {
                            console.log(
                              slideData.userData.role.includes(e.target.value)
                            );
                            if (
                              slideData.userData.role.includes(e.target.value)
                            ) {
                              setSlideData((slideData) => {
                                return {
                                  ...slideData,
                                  userData: { ...slideData.userData, role: "" },
                                };
                              });
                            } else {
                              onChangeInput(e);
                            }
                            onEnterSlideChange();
                          }}
                          name="role"
                        />
                        <label
                          className={`rounded bg-[#ffffff1a] text-base sm:text-xl text-white hover:bg-lightWhite cursor-pointer p-1 px-2 flex justify-between items-center gap-2 w-full ${
                            slideData.userData.role === data.description
                              ? "shadow-checkboxActive"
                              : "shadow-checkbox"
                          }`}
                          htmlFor={data.description}
                        >
                          <div className="flex justify-center items-center gap-2">
                            <span
                              className={`w-[22px] h-[22px] text-[12px] pt-1 bg-black sm:text-sm flex flex-column justify-center items-center font-semibold shadow-checkbox rounded-sm ${
                                slideData.userData.role === data.description
                                  ? "bg-white text-black"
                                  : ""
                              }`}
                            >
                              {data.id}
                            </span>
                            <span>{data.description}</span>
                          </div>
                          <FontAwesomeIcon
                            className={`text-white ${
                              slideData.userData.role === data.description
                                ? "visible"
                                : "invisible"
                            }`}
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <ButtonBlock
                error={error}
                func={onEnterSlideChange}
                message="Please select your current role"
              />
            </div>
          </div>

          {/* 5.Select goal slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              5,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={5} />
                {slideData.userData.firstName}, what's your professional goal
                for the next 12 months?{" "}
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>
              <fieldset className="-mt-2">
                <legend className="mb-4"></legend>
                <div className="flex flex-col gap-2 mt-4">
                  {(() => {
                    return String(slideData.userData.role)
                      .toLowerCase()
                      .includes("founder")
                      ? goalChoicesFounder
                      : goalChoicesNonFounder;
                  })().map((data) => {
                    return (
                      <div key={data.id}>
                        <input
                          className="hidden"
                          type="checkbox"
                          id={data.description}
                          value={data.description}
                          disabled={
                            !slideData.userData.goal.includes(
                              data.description
                            ) && slideData.userData.goal.length === 2
                          }
                          onChange={(e) => {
                            if (slideData.userData.goal.length >= 2) {
                              return;
                            }
                            setSlideData((slideData) => {
                              const alreadyExists =
                                slideData.userData.goal.includes(
                                  e.target.value
                                );
                              if (alreadyExists) {
                                const newGoal = slideData.userData.goal.filter(
                                  (item) => item.includes(e.target.value)
                                );
                                return {
                                  ...slideData,
                                  userData: {
                                    ...slideData.userData,
                                    goal: newGoal,
                                  },
                                };
                              } else {
                                const newGoal = [
                                  ...slideData.userData.goal,
                                  e.target.value,
                                ];
                                return {
                                  ...slideData,
                                  userData: {
                                    ...slideData.userData,
                                    goal: newGoal,
                                  },
                                };
                              }
                            });
                            // onEnterSlideChange();
                          }}
                          name="goal"
                        />
                        <label
                          className={`rounded bg-[#ffffff1a] text-base sm:text-xl text-white hover:bg-lightWhite cursor-pointer p-1 px-2 flex justify-between items-center gap-2 w-full ${
                            slideData.userData.goal.includes(data.description)
                              ? "shadow-checkboxActive"
                              : "shadow-checkbox"
                          }`}
                          htmlFor={data.description}
                        >
                          <div className="flex justify-center items-center gap-2">
                            <span
                              className={`w-[22px] h-[22px] text-[12px] pt-1 bg-black sm:text-sm flex flex-column justify-center items-center font-semibold shadow-checkbox rounded-sm ${
                                slideData.userData.goal.includes(
                                  data.description
                                )
                                  ? "bg-white text-black"
                                  : ""
                              }`}
                            >
                              {data.id}
                            </span>
                            <span>{data.description}</span>
                          </div>
                          <FontAwesomeIcon
                            className={`text-white ${
                              slideData.userData.role === data.description
                                ? "visible"
                                : "invisible"
                            }`}
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
              <ButtonBlock
                error={error}
                func={onEnterSlideChange}
                message="Please select your goal"
              />
            </div>
          </div>

          {/* 6.Email slide  */}
          <div
            className={`slide transition-block ${getTranslateValue(
              6,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={6} />
                Email you'd like to register with?{" "}
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>
              <span className="-mt-2">
                We will keep all our communications with you through this email.
                Do check your spam inbox if you can't find our application
                received email.
              </span>
              <input
                className="shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={onChangeInput}
                required
              />
              <ButtonBlock
                type="pressEnter"
                error={error}
                func={onEnterSlideChange}
                message="Please enter a valid email"
              />
            </div>
          </div>

          {/* 7.Phone number slide */}
          <div
            className={`slide transition-block ${getTranslateValue(
              7,
              slideData.slide
            )}`}
          >
            <div className="dark:text-[#ffffffb3] flex flex-col justify-center gap-4 max-w-[720px] w-full mx-auto">
              <span className="block w-full text-xl sm:text-2xl relative dark:text-white">
                <QuestionNumber number={7} />
                Your phone number{" "}
                <sup
                  className="absolute top-4 ml-1"
                  title="This question is required *"
                >
                  *
                </sup>
              </span>
              <span className="-mt-2">
                We won't call you unless it is absolutely required to process
                your application.
              </span>
              <div className="flex gap-2">
                <div className="w-fit shadow-input">
                  <span className="flex gap-2 mt-5 pr-2">
                    <img
                      src={`https://flagcdn.com/${flagList.currentFlag.code}.svg`}
                      width="30"
                      alt={flagList.currentFlag.country}
                    />
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      color="white"
                      size="sm"
                    ></FontAwesomeIcon>
                  </span>
                  <ul className="absolute">{}</ul>
                </div>
                <input
                  className="max-w-[450px] shadow-input focus:shadow-inputFocus outline-none dark:border-white dark:text-white w-full mt-4 pb-2 block bg-transparent text-3xl leading-[unset] placeholder:text-lightWhite"
                  type="tel"
                  name="phone"
                  placeholder="1234567899"
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div
                className={`rounded transition-block border border-red-600 bg-red-100 text-red-700 px-2 py-1 flex gap-2 items-center ${
                  error ? "visible" : "invisible"
                }`}
              >
                <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
                <span>Please enter a valid phone number.</span>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  if (
                    String(slideData.userData.phone).length !== 10 &&
                    /\D/.test(String(slideData.userData.phone))
                  ) {
                    setError(true);
                  }
                  formSubmit(e);
                }}
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
