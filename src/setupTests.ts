import "@testing-library/jest-dom";
import { webcrypto } from "crypto";

Object.defineProperty(global, "crypto", {
  value: webcrypto,
});
