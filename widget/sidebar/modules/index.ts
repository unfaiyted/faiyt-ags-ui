import { Widget, Gtk } from "astal/gtk3";
import AITab from "./ai";
import Audio from "./audio";
import Bluetooth from "./bluetooth";
import Calendar from "./calendar";
import Wifi from "./wifi";
import Configuration from "./configuration";
import Notifications from "./notifications";
import Tools from "./tools";

import { TabContent } from "../../utils/containers/tabs";

export const sidebarModules: Record<string, TabContent> = {
  apis: {
    name: "AIs",
    content: AITab,
    icon: "api",
  },
  tools: {
    name: "tools",
    content: Tools,
    icon: "home_repair_service",
  },
  bluetooth: {
    name: "bluetooth",
    content: Bluetooth,
    icon: "bluetooth",
  },
  wifi: {
    name: "wifi",
    content: Wifi,
    icon: "wifi",
  },
  config: {
    name: "config",
    content: Configuration,
    icon: "settings",
  },
};

export const getSidebarTabs = () => {
  const tabs: TabContent[] = [];
  for (const key in sidebarModules) {
    tabs.push(sidebarModules[key]);
  }
  return tabs;
};

export const getSidebarTabByName = (name: string) => {
  let tab: TabContent | null = null;
  for (const key in sidebarModules) {
    if (sidebarModules[key].name === name) {
      tab = sidebarModules[key];
    }
  }

  if (tab == null) {
    throw new Error(`Tab with name ${name} not found`);
  }
  return tab;
};

export const getSidebarTabByKey = (key: string) => {
  return sidebarModules[key];
};
