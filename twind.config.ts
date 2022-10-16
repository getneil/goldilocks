import { Options } from "$fresh/plugins/twind.ts";

import * as colors from "https://esm.sh/twind@0.16.16/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      yellow: colors.yellow
    }
  }
} as Options;
