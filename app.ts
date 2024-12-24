import { App } from "astal/gtk3";
// import style from "./scss/style.scss";

import style from "./scss/main.scss";
import Bar from "./widget/bar/Bar";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
  },
});
