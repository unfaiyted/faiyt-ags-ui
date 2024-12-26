import { App, Gdk } from "astal/gtk3";
// import style from "./scss/style.scss";
import { cycleMode, initialMonitorShellModes } from "./widget/bar/utils";

import style from "./scss/main.scss";
import Bar from "./widget/bar";
import { BarProps, BarMode } from "./widget/bar/types";

// Init shell modes for all active monitors
initialMonitorShellModes();

App.start({
  css: style,
  main() {
    App.get_monitors().map((gdkmonitor, index, array) =>
      Bar({ gdkmonitor: gdkmonitor, index, mode: BarMode.Normal }),
    );
  },
  requestHandler(request: string, res: (response: any) => void) {
    if (request == "toggle-bar-mode") {
      cycleMode();
      // call function to toggle bar mode
      return res("changing bar mode!");
    }
    res("unknown request");
  },
});
