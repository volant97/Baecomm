import { atom } from "recoil";

export const previousState = atom({
  key: "previousState",
  default: [],
});
