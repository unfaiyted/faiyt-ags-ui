import { Widget, Gtk } from "astal/gtk3";
import AITab from "./ai";
import Audio from "./audio";
import Bluetooth from "./bluetooth";
import Calendar from "./calendar";
import Wifi from "./wifi";
import Configuration from "./configuration";
import Notifications from "./notifications";
import Tools from "./tools";
import { PhosphorIcons } from "../../utils/icons/types";
import { TabContent } from "../../utils/containers/tabs";

export enum SidebarModule {
  ais = "ais",
  tools = "tools",
  bluetooth = "bluetooth",
  wifi = "wifi",
  config = "config",
}

export const SIDEBAR_MODULES: Record<string, TabContent> = {
  [SidebarModule.ais]: {
    name: SidebarModule.ais,
    content: AITab,
    icon: PhosphorIcons["open-ai-logo"],
  },
  [SidebarModule.tools]: {
    name: SidebarModule.tools,
    content: Tools,
    icon: PhosphorIcons["toolbox"],
  },
  [SidebarModule.bluetooth]: {
    name: SidebarModule.bluetooth,
    content: Bluetooth,
    icon: PhosphorIcons["bluetooth"],
  },
  [SidebarModule.wifi]: {
    name: SidebarModule.wifi,
    content: Wifi,
    icon: PhosphorIcons["wifi-medium"],
  },
  [SidebarModule.config]: {
    name: SidebarModule.config,
    content: Configuration,
    icon: PhosphorIcons["gear"],
  },
};

export const getSidebarTabs = () => {
  const tabs: TabContent[] = [];
  for (const key in SIDEBAR_MODULES) {
    tabs.push(SIDEBAR_MODULES[key]);
  }
  return tabs;
};

export const getSidebarTabByName = (name: string) => {
  let tab: TabContent | null = null;
  for (const key in SIDEBAR_MODULES) {
    if (SIDEBAR_MODULES[key].name === name) {
      tab = SIDEBAR_MODULES[key];
    }
  }

  if (tab == null) {
    throw new Error(`Tab with name ${name} not found`);
  }
  return tab;
};

export const getSidebarTabByKey = (key: string) => {
  return SIDEBAR_MODULES[key];
};
