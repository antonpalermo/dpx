import { Config } from "jest";

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
