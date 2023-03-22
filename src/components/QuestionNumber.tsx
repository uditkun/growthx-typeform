import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionNumber = ({ number }: { number: number }) => {
  return (
    <span className="absolute right-full mr-3 text-sm sm:text-base mt-1 inline-flex gap-[2px]">
      {number}
      <FontAwesomeIcon
        className="mt-1 sm:mt-[6px]"
        size="sm"
        icon={faArrowRight}
      ></FontAwesomeIcon>
    </span>
  );
};

export default QuestionNumber;
