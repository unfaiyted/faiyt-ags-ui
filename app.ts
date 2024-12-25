import { App, Gdk } from "astal/gtk3";
// import style from "./scss/style.scss";

import style from "./scss/main.scss";
import Bar from "./widget/bar";
import { BarProps, BarMode } from "./widget/bar/types";

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor, index, array) =>
      Bar({ gdkmonitor: monitor, index, mode: BarMode.Normal }),
    );
  },
});
