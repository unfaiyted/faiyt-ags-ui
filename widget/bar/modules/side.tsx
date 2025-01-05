import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import { getScrollDirection } from "../../../utils";
import { ClickButtonPressed } from "../../../types";

export interface SideModuleProps extends Widget.EventBoxProps {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onMiddleClick?: () => void;
  children?: Widget.BoxProps;
}

export default function SideModule(sideModuleProps: SideModuleProps) {
  const { setup, child, children, ...props } = sideModuleProps;

  const handleScroll = (self: Widget.EventBox, event: Astal.ScrollEvent) => {
    const scrollDirection = getScrollDirection(event);

    if (scrollDirection === Gdk.ScrollDirection.UP) {
      print("scroll up");
      props.onScrollUp?.();
    } else if (scrollDirection === Gdk.ScrollDirection.DOWN) {
      print("scroll down");
      props.onScrollDown?.();
    }
  };

  const handleClick = (self: Widget.EventBox, event: Astal.ClickEvent) => {
    // 1 = left, 2 = middle, 3 = right
    print("event.button: " + event.button);

    if (event.button === ClickButtonPressed.LEFT.valueOf()) {
      props.onPrimaryClick?.();
    } else if (event.button === ClickButtonPressed.RIGHT.valueOf()) {
      props.onSecondaryClick?.();
    } else if (event.button === ClickButtonPressed.MIDDLE.valueOf()) {
      props.onMiddleClick?.();
    }
  };

  return (
    <eventbox onScroll={handleScroll} onClick={handleClick}>
      {/* <box homogeneous={false}> */}
      <box className="bar-sidemodule" hexpand={true}>
        {/* <box className="bar-corner-spacing" /> */}
        {/* <overlay> */}
        {/* <box hexpand={true} /> */}
        {/* <box className="bar-sidemodule" hexpand={true}> */}
        {/* <box className="bar-space-button" vertical={true}> */}
        {children || child}
        {/* </box> */}
        {/* </box> */}
        {/* </overlay> */}
      </box>
    </eventbox>
  );
}
