import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import config from "../../../utils/config";
import { NormalBarContentProps } from "../types";
import WindowTitle from "../modules/window-title";
import SideModule from "../modules/side-module";
import System from "../modules/system";
import Music from "../modules/music";
import Workspaces from "../modules/workspaces";

export default function NormalBarMode(barModeProps: NormalBarContentProps) {
  const { setup, child, ...props } = barModeProps;

  return (
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
            <Music />
          </SideModule>
          <Workspaces
            mode={props.mode}
            shown={config.workspaces.shown}
            initilized={false}
          />
          Normal
          <SideModule>
            <System />
          </SideModule>
        </box>
      }
      // endWidget={<Indicators monitors={monitor} />}
      className="bar-bg"
    ></centerbox>
  );
}
