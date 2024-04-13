import { atom } from "recoil";

// 세션 스토리지로 변경
// export type previousStateType = string

export const previousState = atom({
  key: "previousState",
  default: "",
});
