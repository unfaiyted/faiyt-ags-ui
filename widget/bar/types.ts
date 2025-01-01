import { Widget, Gdk, Astal } from "astal/gtk3";
import { Binding } from "astal";
import * as WorkspaceTypes from "./modules/workspaces/types";
import * as TrayTypes from "./modules/tray/types";
import * as ClockTypes from "./modules/clock/types";

export enum ClickButtonPressed {
  LEFT = 1,
  MIDDLE = 2,
  RIGHT = 3,
}

export enum UIWindows {
  SIDEBAR_LEFT = "sidebar-left",
  SIDEBAR_RIGHT = "sidebar-right",
  TOP_BAR = "bar",
}

export enum BarMode {
  Normal = "normal",
  Focus = "focus",
  Nothing = "nothing",
}

export interface RgbaColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

const mainBoxClasses = {
  [BarMode.Normal]: "bar-group-margin",
  [BarMode.Focus]: "",
  [BarMode.Nothing]: "",
};

const nestedBoxClasses = {
  [BarMode.Normal]: "bar-group bar-group-standalone bar-group-pad",
  [BarMode.Focus]: "",
  [BarMode.Nothing]: "",
};

// Main top bar
export interface BarProps extends Widget.WindowProps {
  mode: BarMode;
  index?: number;
  gdkmonitor: Gdk.Monitor;
}

export interface BaseBarContentProps extends Widget.EventBoxProps {
  mode: Binding<BarMode>;
}
export interface NormalBarContentProps extends BaseBarContentProps {}
export interface FocusBarContentProps extends BaseBarContentProps {}
export interface NothingBarContentProps extends BaseBarContentProps {}

export default {
  ...WorkspaceTypes,
  ...ClockTypes,
  ...TrayTypes,
};
