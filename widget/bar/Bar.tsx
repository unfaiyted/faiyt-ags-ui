import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Battery from "gi://AstalBattery";
import { Variable, bind } from "astal";
import config from "../../utils/config";
import { getFocusedShellMode } from "../../utils/mode-switcher";
import { enableClickthrough } from "../../utils/utils";
import SideModule from "./modules/SideModule";
import WindowTitle from "./modules/WindowTitle";
import MusicModule from "./modules/Music";
import SystemModule from "./modules/System";
import { BarMode } from "../../types/config";
import NormalBarMode from "./modes/NormalBarMode";

const time = Variable("").poll(1000, "date");

export default function Bar(monitor: Gdk.Monitor) {
  const battery = Battery.get_default();
  const batteryPercentage = bind(battery, "percentage").as((v) => v);
  const shellMode = Variable(getFocusedShellMode());

  const normalBarContent = (
    <centerbox
      setup={(self) => {
        const styleContext = self.get_style_context();
        const minHeight = styleContext.get_property(
          "min-height",
          Gtk.StateFlags.NORMAL,
        );
      }}
      startWidget={<WindowTitle />}
      centerWidget={
        <box className="spacing-h-4">
          <SideModule>
            <MusicModule />
          </SideModule>
          <box homogeneous={true}>{<NormalBarMode />}</box>
          <SideModule>
            <SystemModule />
          </SideModule>
        </box>
      }
      // endWidget={<Indicators monitors={monitor} />}
      className="bar-bg"
    ></centerbox>
  );

  const focusedBarContent = (
    <centerbox
      className="bar-bg-focus"
      startWidget={<box />}
      centerWidget={
        <box className="spacing-h-4">
          <SideModule></SideModule>
          <box homogeneous={true}>{/* <FocusOptionalWorkspaces /> */}</box>
        </box>
      }
      endWidget={<box />}
      setup={(self) => {
        self.hook(batteryPercentage, (self) => {
          if (!battery) return;
          self.toggleClassName(
            "bar-bg-focus-batterylow",
            batteryPercentage.get() <= (config?.battery?.low || 0),
          );
        });
      }}
    ></centerbox>
  );

  const nothingContent = <box className="bar-bg-nothing"></box>;

  return (
    <window
      className="Bar"
      name={`bar${monitor}`}
      gdkmonitor={monitor}
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
        {shellMode.get() === BarMode.Normal ? normalBarContent : null}
        {shellMode.get() === BarMode.Focus ? focusedBarContent : null}
        {shellMode.get() === BarMode.Nothing ? nothingContent : null}
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
