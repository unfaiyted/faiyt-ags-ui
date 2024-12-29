import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";

export interface BatteryModuleProps extends Widget.BoxProps {}

export default function BatteryModule(batteryModuleProps: BatteryModuleProps) {
  const { setup, child, ...props } = batteryModuleProps;

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
