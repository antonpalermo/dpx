const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}]
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  openHandlesTimeout: 0
};

export default config;
