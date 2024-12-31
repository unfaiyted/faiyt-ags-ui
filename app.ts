import { App, Gdk } from "astal/gtk3";
// import style from "./scss/style.scss";
import { cycleMode, initialMonitorShellModes } from "./widget/bar/utils";
// import "@phosphor-icons/web/light";
import style from "./scss/main.scss";
import iconStyles from "./node_modules/@phosphor-icons/web/src/regular/style.css";
import Bar from "./widget/bar";
import { BarProps, BarMode } from "./widget/bar/types";
import SideLeft from "./widget/sidebar/views/left";
import SideRight from "./widget/sidebar/views/right";
import cliRequestHandler from "./handlers/cli";
import {
  BarCornerTopLeft,
  BarCornerTopRight,
} from "./widget/bar/utils/bar-corners";

// Init shell modes for all active monitors
initialMonitorShellModes();

App.start({
  css: style,
  main() {
    // Windows
    App.get_monitors().map((gdkmonitor, index, array) =>
      Bar({ gdkmonitor: gdkmonitor, index, mode: BarMode.Normal }),
    );

    SideLeft({ gdkmonitor: App.get_monitors()[0] });
    SideRight({ gdkmonitor: App.get_monitors()[0] });

    BarCornerTopLeft({ gdkmonitor: App.get_monitors()[0], index: 0 });
    BarCornerTopRight({ gdkmonitor: App.get_monitors()[0], index: 0 });
    // App.get_monitors().map((gdkmonitor, index, array) =>
    //   // BarCornerTopLeft({ gdkmonitor: gdkmonitor, index }),
    // );
    // App.get_monitors().map((gdkmonitor, index, array) =>
    //   BarCornerTopRight({ gdkmonitor: gdkmonitor, index }),
    // );
  },
  requestHandler(request: string, res: (response: any) => void) {
    cliRequestHandler(request, res);
  },
});
