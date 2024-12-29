import { App, Gdk } from "astal/gtk3";
// import style from "./scss/style.scss";
import { cycleMode, initialMonitorShellModes } from "./widget/bar/utils";
// import "@phosphor-icons/web/light";
import style from "./scss/main.scss";
import iconStyles from "./node_modules/@phosphor-icons/web/src/regular/style.css";
import Bar from "./widget/bar";
import { BarProps, BarMode } from "./widget/bar/types";
import SideLeft from "./widget/sidebar/views/left";

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
  },
  requestHandler(request: string, res: (response: any) => void) {
    print("Request Received:", request);
    // if (request == "toggle-bar-mode") {
    //   cycleMode();
    //   // call function to toggle bar mode
    //   return res("changing bar mode!");
    // }
    // res("unknown request");
    //
    switch (request) {
      case "toggle-bar-mode":
        cycleMode();
        // call function to toggle bar mode
        return res("changing bar mode!");
      case "toggle-sidebar-left":
        // print("Sidebar left");
        App?.get_window("sidebar-left");
        const windows = App.get_windows();

        windows.map((window) => {
          print("Window name:", window.name);
          if (window.name === "sidebar-left") {
            window.visible = !window.visible;
          }
        });

        return res("changing sidebar left!");
      default:
        return res("unknown request");
    }
  },
});
