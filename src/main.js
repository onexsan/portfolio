import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/parallax.js";
import "./scripts/skills.js";
import "./scripts/carousel.js";