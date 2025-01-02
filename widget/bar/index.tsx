import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Battery from "gi://AstalBattery";
import { Variable, bind, Binding } from "astal";
import config from "../../utils/config";
import { shellMode } from "./utils";
import { BarProps, BarMode } from "./types";
import BarModeContent from "./modes";

export default function Bar(barProps: BarProps) {
  const { gdkmonitor, monitor, index, ...props } = barProps;
  var barShellMode = Variable<BarMode>(BarMode.Normal);

  // print("Bar created");

  shellMode.subscribe((shellMode) => {
    // print("COMPONENT: Shell mode changed:", shellMode.modes[index as number]);
    barShellMode.set(shellMode.modes[index as number]);
  });

  return (
    <window
      className="Bar"
      name={`bar${index}`}
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
