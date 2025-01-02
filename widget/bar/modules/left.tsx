import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SideModule from "./side";
import { actions } from "../../../utils/actions";
import { UIWindows } from "../types";

export interface LeftSideModuleProps extends Widget.EventBoxProps {}

export default function LeftSideModule(
  leftSideModuleProps: LeftSideModuleProps,
) {
  const { setup, child, ...props } = leftSideModuleProps;

  props.onScrollUp = () => actions.brightness.increase();
  props.onScrollDown = () => actions.brightness.decrease();
  props.onPrimaryClick = () => actions.window.toggle(UIWindows.SIDEBAR_LEFT);

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
//
// <eventbox onScroll={handleScroll} onClick={handleClick}>
//   {/* <box homogeneous={false}> */}
//   <box className="bar-sidemodule">
//     ,{/* <box className="bar-corner-spacing" /> */}
//     {/* <overlay> */}
//     {/* <box hexpand={true} /> */}
//     {/* <box className="bar-sidemodule" hexpand={true}> */}
//     {/* <box className="bar-space-button" vertical={true}> */}
//     {child}
//     {/* </box> */}
//     {/* </box> */}
//     {/* </overlay> */}
//   </box>
// </eventbox>;
