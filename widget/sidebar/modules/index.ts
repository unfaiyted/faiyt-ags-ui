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
  AIS = "ais",
  TOOLS = "tools",
  AUDIO = "audio",
  BLUETOOTH = "bluetooth",
  WIFI = "wifi",
  CONFIG = "config",
  NOTIFICATIONS = "notifications",
}

export const SIDEBAR_MODULES: Record<string, TabContent> = {
  [SidebarModule.AIS]: {
    name: SidebarModule.AIS,
    content: AITab,
    icon: PhosphorIcons["open-ai-logo"],
  },
  [SidebarModule.NOTIFICATIONS]: {
    name: SidebarModule.NOTIFICATIONS,
    content: Notifications,
    icon: PhosphorIcons["bell"],
  },
  [SidebarModule.AUDIO]: {
    name: SidebarModule.AUDIO,
    content: Audio,
    icon: PhosphorIcons["bell"],
  },
  [SidebarModule.TOOLS]: {
    name: SidebarModule.TOOLS,
    content: Tools,
    icon: PhosphorIcons["toolbox"],
  },
  [SidebarModule.BLUETOOTH]: {
    name: SidebarModule.BLUETOOTH,
    content: Bluetooth,
    icon: PhosphorIcons["bluetooth"],
  },
  [SidebarModule.WIFI]: {
    name: SidebarModule.WIFI,
    content: Wifi,
    icon: PhosphorIcons["wifi-medium"],
  },
  [SidebarModule.CONFIG]: {
    name: SidebarModule.CONFIG,
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
