import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";

export interface SystemModuleProps extends Widget.BoxProps {}

export default function System(systemModuleProps: SystemModuleProps) {
  const { setup, child, ...props } = systemModuleProps;

  return (
    <box
      {...props}
      className="bar-sidemodule"
      setup={(self) => {
        setup?.(self);
      }}
    >
      {child}
      SysModule
    </box>
  );
}
