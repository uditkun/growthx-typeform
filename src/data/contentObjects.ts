const MAX_SLIDES: number = 7;
const dataFlow = [
  {
    type: "text",
    id: 1,
    heading: "What's your first name?",
  },
  {
    type: "text",
    id: 2,
    heading: "What's your last name?",
  },
  {
    id: 3,
    heading: "What industry is your company in?",
    heading2: "We will personalize your learning experience accordingly",
  },
];
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

export {
  dataFlow,
  goalChoicesFounder,
  goalChoicesNonFounder,
  roleChoices,
  MAX_SLIDES,
};
