// Flip this to true once Person A's real /analyze endpoint is live.
// Every component imports from here, never directly from mockApi or client,
// so this is the only line that needs to change.
const USE_REAL_API = false;

import * as mock from "./mockApi";
import * as real from "./client";

export const api = USE_REAL_API ? real : mock;
