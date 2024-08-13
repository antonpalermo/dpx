import { toBase64 } from "@/utils";

test("toBase64() should return a base64 string", () => {
  const regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  // mock a sample mid and key auth header
  const value = toBase64("mid:key");
  // expect the value to return true
  expect(regex.test(value)).toBe(true);
});
