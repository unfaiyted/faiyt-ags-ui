import { Gdk } from "astal/gtk3";
import { Variable } from "astal";
import Hypr from "gi://AstalHyprland";
import config from "./config";
import { BarMode } from "../widget/bar/types";

const hypr = Hypr.get_default();

const shellMode = Variable<BarMode[]>([BarMode.Normal]); // normal, focus

// Global vars for external control (through keybinds)
export const initialMonitorShellModes = () => {
  const numberOfMonitors = Gdk.Display.get_default()?.get_n_monitors() || 1;
  const monitorBarConfigs = [];
  for (let i = 0; i < numberOfMonitors; i++) {
    if (config.bar.modes[i]) {
      monitorBarConfigs.push(config.bar.modes[i]);
    } else {
      monitorBarConfigs.push("normal");
    }
  }
  return monitorBarConfigs;
};

// Mode switching
const updateMonitorShellMode = (monitor: number, mode: BarMode) => {
  const newValue = [...shellMode.get()];
  newValue[monitor] = mode;
  shellMode.set(newValue);
};

export const cycleMode = () => {
  const monitor = hypr.get_focused_monitor().id || 0;

  if (shellMode.get()[monitor] === BarMode.Normal) {
    updateMonitorShellMode(monitor, BarMode.Focus);
  } else if (shellMode.get()[monitor] === BarMode.Focus) {
    updateMonitorShellMode(monitor, BarMode.Nothing);
  } else {
    updateMonitorShellMode(monitor, BarMode.Normal);
  }
};

export const getFocusedShellMode = () => {
  const monitor = hypr.get_focused_monitor().id || 0;

  // check if initial monitor modes are set
  if (shellMode.get().length === 0) {
    initialMonitorShellModes();
  }
  const monitorShellMode = shellMode.get()[monitor];
  return monitorShellMode;
};

//
// // Window controls
// const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
// globalThis['toggleWindowOnAllMonitors'] = (name) => {
//     range(Gdk.Display.get_default()?.get_n_monitors() || 1, 0).forEach(id => {
//         App.toggleWindow(`${name}${id}`);
//     });
// }
// globalThis['closeWindowOnAllMonitors'] = (name) => {
//     range(Gdk.Display.get_default()?.get_n_monitors() || 1, 0).forEach(id => {
//         App.closeWindow(`${name}${id}`);
//     });
// }
// globalThis['openWindowOnAllMonitors'] = (name) => {
//     range(Gdk.Display.get_default()?.get_n_monitors() || 1, 0).forEach(id => {
//         App.openWindow(`${name}${id}`);
//     });
// }
//
// globalThis['closeEverything'] = () => {
//     const numMonitors = Gdk.Display.get_default()?.get_n_monitors() || 1;
//     for (let i = 0; i < numMonitors; i++) {
//         App.closeWindow(`cheatsheet${i}`);
//         App.closeWindow(`session${i}`);
//     }
//     App.closeWindow('sideleft');
//     App.closeWindow('sideright');
//     App.closeWindow('overview');
// };
