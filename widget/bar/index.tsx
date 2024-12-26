import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Battery from "gi://AstalBattery";
import { Variable, bind, Binding } from "astal";
import config from "../../utils/config";
import { getFocusedShellMode, getMonitorShellMode, shellMode } from "./utils";
import { enableClickthrough } from "../../utils/utils";
import { BarProps, BarMode } from "./types";
import BarModeContent from "./modes";

export default function Bar(barProps: BarProps) {
  const { gdkmonitor, monitor, index, ...props } = barProps;
  // const battery = Battery.get_default();
  // const batteryPercentage = bind(battery, "percentage").as((v) => v);
  var barShellMode = Variable<BarMode>(BarMode.Normal);

  // const currShellMode = getMonitorShellMode(monitor);
  print("Bar created");
  // bind(shellMode)
  // print("Current shell mode:", currShellMode);

  // const mode = () =>
  //   bind(shellMode).as((v) => {
  //     print(`COMPOENENT: Shell mode for monitor ${index}:`, mode);
  //     return v.modes[index as number];
  //   });

  // const barMode = initShellMode[initMonitor];

  shellMode.subscribe((shellMode) => {
    print("COMPONENT: Shell mode changed:", shellMode.modes[index as number]);
    barShellMode.set(shellMode.modes[index as number]);
  });

  return (
    <window
      className="Bar"
      name={`bar${monitor}`}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      visible={true}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <stack
        homogeneous={false}
        transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
        transitionDuration={config.animations.durationLarge}
      >
        <BarModeContent mode={bind(barShellMode)} />
      </stack>
    </window>
  );
}

export const BarCornerTopleft = (monitor = 0) => (
  <window
    monitor={monitor}
    name={`barcornertl${monitor}`}
    layer={Astal.Layer.TOP}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    visible={true}
    // child= RoundedCorner('topleft', { className: 'corner', }),
    setup={enableClickthrough}
  />
);

export const BarCornerTopRight = (monitor = 0) => (
  <window
    monitor={monitor}
    name={`barcornertr${monitor}`}
    layer={Astal.Layer.TOP}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    visible={true}
    // child= RoundedCorner('topleft', { className: 'corner', }),
    setup={enableClickthrough}
  />
);
