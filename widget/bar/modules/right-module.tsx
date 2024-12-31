import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";

export interface RightSideModuleProps extends Widget.EventBoxProps {}

export default function RightSideModule(
  rightSideModuleProps: RightSideModuleProps,
) {
  const { setup, child, ...props } = rightSideModuleProps;

  return (
    <eventbox>
      <box homogeneous={true} className="bar-sidemodule">
        <box className="bar-corner-spacing" />
        <overlay>
          <box hexpand={true} />
          <box className="bar-sidemodule" hexpand={true}>
            <box className="bar-space-button">{child}</box>
          </box>
        </overlay>
      </box>
    </eventbox>
  );
}
