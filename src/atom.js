import { atom } from "recoil";

export const searchResultAtom = atom({
  key: "searchResultAtom",
  default: {
    keyword: "",
    result: {},
  },
});
