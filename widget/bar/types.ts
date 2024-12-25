import { Widget, Gdk, Astal } from "astal/gtk3";

export enum ClickButtonPressed {
  LEFT = 1,
  MIDDLE = 2,
  RIGHT = 3,
}

export enum BarMode {
  Normal = "normal",
  Focus = "focus",
  Nothing = "nothing",
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
  mode: BarMode;
}
export interface NormalBarContentProps extends BaseBarContentProps {}
export interface FocusBarContentProps extends BaseBarContentProps {}
export interface NothingBarContentProps extends BaseBarContentProps {}

//
