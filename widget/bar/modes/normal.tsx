import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import config from "../../../utils/config";
import { NormalBarContentProps } from "../types";
import WindowTitle from "../modules/window-title";
import SideModule from "../modules/side-module";
import System from "../modules/system";
import Music from "../modules/music";
import Workspaces from "../modules/workspaces";
import Clock from "../modules/clock";
import Tray from "../modules/tray";
import LeftModule from "../modules/left-module";
import RightModule from "../modules/right-module";
import Battery from "../modules/battery";

export default function NormalBarMode(barModeProps: NormalBarContentProps) {
  const { setup, child, ...props } = barModeProps;

  return (
    <centerbox
      startWidget={
        <LeftModule>
          <WindowTitle />
        </LeftModule>
      }
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
          <SideModule>
            <Clock />
            <Battery />
            {/* <Weather /> */}
            {/* <Utilities> */}
            {/*   <UtilButton /> */}
            {/* </Utilities> */}
          </SideModule>
        </box>
      }
      endWidget={
        <RightModule>
          <Tray />
        </RightModule>
      }
      className="bar-bg"
    ></centerbox>
  );
}
