import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import PopupWindow, { PopupWindowProps } from "../../utils/popup-window";
import SideBar from "../index";
import { SideBarProps, ScreenSide } from "../types";
import types from "../../bar/types";

interface RightSideBarProps extends PopupWindowProps {
  screenSide?: ScreenSide.RIGHT;
}
// name = sidebar-left

export default function LeftSideBar(sideBarProps: RightSideBarProps) {
  const { setup, child, ...props } = sideBarProps;

  return (
    <SideBar {...props} screenSide={ScreenSide.LEFT}>
      <box vexpand={true} css="min-width: 2px;">
        Hello
      </box>
    </SideBar>
  );
}
