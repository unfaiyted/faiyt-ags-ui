import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SideModule from "./side-module";
import { actions } from "../../../utils/actions";
import { UIWindows } from "../types";

export interface RightSideModuleProps extends Widget.EventBoxProps {}

export default function RightSideModule(
  rightSideModuleProps: RightSideModuleProps,
) {
  const { setup, child, ...props } = rightSideModuleProps;

  props.onScrollUp = () => actions.audio.increase();
  props.onScrollDown = () => actions.audio.decrease();
  props.onPrimaryClick = () => actions.window.toggle(UIWindows.SIDEBAR_RIGHT);

  return (
    <box homogeneous={false}>
      <box className="bar-corner-spacing" />
      <overlay
        overlay={
          <box hexpand={true}>
            <SideModule {...props}>
              <box vertical className="bar-space-button">
                {child}
              </box>
            </SideModule>
          </box>
        }
      ></overlay>
    </box>
  );
}
