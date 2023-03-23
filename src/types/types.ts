export type SlideData = {
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
  isSubmitted: boolean;
};

export type FlagsList = {
  currentFlag: {
    code: string;
    country: string;
  };
  flagList: {
    [key: string]: string;
  };
};
