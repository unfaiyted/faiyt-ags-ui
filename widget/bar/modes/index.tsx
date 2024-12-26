import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import config from "../../../utils/config";
import { getScrollDirection } from "../../../utils/utils";
import Hypr from "gi://AstalHyprland";
import { Variable } from "astal";
import { handleHyprResponse } from "../../../utils/handlers";
import { BaseBarContentProps, BarMode, ClickButtonPressed } from "../types";
import NormalBarContent from "./normal";
import FocusBarContent from "./focus";
import NothingBarContent from "./nothing";
import { bind } from "astal";

export default function BarModeContent(baseBarProps: BaseBarContentProps) {
  const { setup, child, ...props } = baseBarProps;

  const getModeContent = () => {
    switch (props.mode.get()) {
      case BarMode.Normal:
        return <NormalBarContent {...props} />;
      case BarMode.Focus:
        return <FocusBarContent {...props} />;
      case BarMode.Nothing:
      default:
        return <NothingBarContent {...props} />;
    }
  };
  const barContent = Variable(getModeContent());

  props.mode.subscribe(() => {
    barContent.set(getModeContent());
  });

  return <box>{bind(barContent).as((v) => v)}</box>;
}
