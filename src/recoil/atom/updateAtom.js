import { atom } from "recoil";

export const updateAtom = atom({
  key: "updated",
  default: false,
});
