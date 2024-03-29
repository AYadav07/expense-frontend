import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userAtom = atom({
  key: "users",
  default: {
    userId: "",
    username: "",
    email: "",
    name: "",
    profile_pic: "",
  },
  effects_UNSTABLE: [localStorageEffect("user")],
});
