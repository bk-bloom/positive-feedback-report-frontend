import { atom } from "recoil";

export const searchResultAtom = atom({
  key: "searchResultAtom",
  default: {
    keyword: "",
    surveyInfo: {},
    result: {},
  },
});

export const checkupProjectListAtom = atom({
  key: "checkupProjectList",
  default: {
    result: [],
  },
});

export const checkupCollectorResponseListAtom = atom({
  key: "checkupCollectorResponseList",
  default: {
    result: [],
  },
});

export const checkupResultAtom = atom({
  key: "checkupResult",
  default: {
    result: {},
  },
});
