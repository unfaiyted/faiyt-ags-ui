import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import config from "../../../utils/config";
import Workspaces from "../modules/workspaces";
import { getScrollDirection } from "../../../utils/utils";
import Hypr from "gi://AstalHyprland";
import Gio from "gi://Gio";
import { FocusBarContentProps } from "../types";
import SideModule from "../modules/side-module";

export default function FocusBarMode(focusBarModeProps: FocusBarContentProps) {
  const { setup, child, ...props } = focusBarModeProps;

  return (
    <centerbox
      className="bar-bg-focus"
      startWidget={<box />}
      centerWidget={
        <box className="spacing-h-4">
          <SideModule></SideModule>
          <box homogeneous={true}>
            <eventbox {...props}>
              <box homogeneous={true}>
                <box
                  css={`
                    min-width: 2px;
                  `}
                >
                  <Workspaces
                    mode={props.mode}
                    initilized={false}
                    shown={config.workspaces.shown}
                  />
                  focus mode
                </box>
              </box>
            </eventbox>
          </box>
        </box>
      }
      endWidget={<box />}
      // todo: fix battery percentage
      // setup={(self) => {
      //   self.hook(batteryPercentage, (self) => {
      //     if (!battery) return;
      //     self.toggleClassName(
      //       "bar-bg-focus-batterylow",
      //       batteryPercentage.get() <= (config?.battery?.low || 0),
      //     );
      //   });
      // }}
    ></centerbox>
  );
}
