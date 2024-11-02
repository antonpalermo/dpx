const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}]
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  setupFiles: ["<rootDir>/setupTests.js"]
};

export default config;
