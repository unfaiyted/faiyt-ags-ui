import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";

export interface SideModuleProps extends Widget.BoxProps {}

export default function SideModule(sideModuleProps: SideModuleProps) {
  const { setup, child, ...props } = sideModuleProps;

  return (
    <box
      {...props}
      className="bar-sidemodule"
      setup={(self) => {
        setup?.(self);
      }}
    >
      {child}
    </box>
  );
}
