import { atom } from "recoil";

export const searchResultAtom = atom({
  key: "searchResultAtom",
  default: {
    keyword: "",
    surveyInfo: {},
    result: {},
  },
});
