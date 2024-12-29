import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SideModule from "./side-module";
import { actions } from "../../../utils/actions";

export interface LeftSideModuleProps extends Widget.EventBoxProps {}

export default function LeftSideModule(
  leftSideModuleProps: LeftSideModuleProps,
) {
  const { setup, child, ...props } = leftSideModuleProps;

  props.onScrollUp = () => actions.brightness.increase();
  props.onScrollDown = () => actions.brightness.decrease();
  props.onPrimaryClick = () => actions.music.toggle();

  return <SideModule {...props}>{child}</SideModule>;
}
