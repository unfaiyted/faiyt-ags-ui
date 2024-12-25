import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Battery from "gi://AstalBattery";
import { Variable, bind } from "astal";
import config from "../../utils/config";
import { getFocusedShellMode } from "../../utils/mode-switcher";
import { enableClickthrough } from "../../utils/utils";
import { BarProps } from "./types";
import BarModeContent from "./modes";

const time = Variable("").poll(1000, "date");

export default function Bar(barProps: BarProps) {
  const { gdkmonitor, monitor, ...props } = barProps;
  const battery = Battery.get_default();
  const batteryPercentage = bind(battery, "percentage").as((v) => v);

  // todo: fix this to be reactive probably isnt going to work right
  const shellMode = Variable(getFocusedShellMode());

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
        <BarModeContent mode={shellMode.get()} />
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
