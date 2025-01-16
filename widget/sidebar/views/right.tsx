import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { getSidebarTabs } from "../modules";
import { SideBarProps, ScreenSide } from "../types";
import PhosphorIcon from "../../utils/icons/phosphor";
import { PhosphorIcons, PhosphorWeight } from "../../utils/icons/types";
import SideBar from "../";
import Tabs from "../../utils/containers/tabs";
import { getSidebarTabByName } from "../modules";
import { bind } from "astal";
import { Variable } from "astal";
import QuickToggles from "../modules/toggles";
import { PopupWindowProps } from "../../utils/popup-window";
import { SIDEBAR_MODULES, SidebarModule } from "../modules";
import HeaderModule from "../modules/header";

interface RighSideBarProps extends PopupWindowProps {
  screenSide?: ScreenSide.RIGHT;
}
// name = sidebar-right

export default function RightSideBar(sideBarProps: RighSideBarProps) {
  const { setup, child, ...props } = sideBarProps;

  const enabledTabs = [
    SidebarModule.NOTIFICATIONS,
    SidebarModule.AUDIO,
    SidebarModule.BLUETOOTH,
    SidebarModule.WIFI,
  ];

  const sidebarTabs = getSidebarTabs().filter((tab) =>
    enabledTabs.includes(tab.name.toLowerCase()),
  );

  print("Sidebar tabs:", sidebarTabs);

  sidebarTabs.map((tab) => print("Tab name:", tab.name));

  return (
    <SideBar {...props} screenSide={ScreenSide.RIGHT} application={App}>
      <box className="sidebar-right spacing-v-15" vertical vexpand>
        <box vertical className="spacing-v-5">
          <HeaderModule />
          <QuickToggles />
        </box>
        <box className="sidebar-group">
          <Tabs tabs={sidebarTabs} active={0} />
        </box>
      </box>
    </SideBar>
  );
}
