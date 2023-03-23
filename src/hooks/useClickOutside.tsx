import { useEffect, useState } from "react";

const useClickOutside = (parentId: string) => {
  //   useEffect for adding click event
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const elementIsInside = document
        .querySelector(`#${parentId}`)
        ?.contains(e.target);
      if (!elementIsInside) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [parentId]);

  return isActive;
};

export default useClickOutside;
