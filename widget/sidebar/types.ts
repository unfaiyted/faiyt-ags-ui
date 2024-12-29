import { PopupWindowProps } from "../utils/popup-window";

export enum ScreenSide {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export interface SideBarProps extends PopupWindowProps {
  screenSide: ScreenSide;
}
