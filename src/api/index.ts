// Flip this to true once Person A's real /analyze endpoint is live.
const USE_REAL_API = false;

import * as mock from "./mockApi";
import * as real from "./client";

export const api = USE_REAL_API ? real : mock;
