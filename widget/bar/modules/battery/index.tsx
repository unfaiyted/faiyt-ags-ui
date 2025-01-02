import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import BarGroup from "../../utils/bar-group";

export interface BatteryModuleProps extends Widget.BoxProps {}

export default function BatteryModule(batteryModuleProps: BatteryModuleProps) {
  const { setup, child, ...props } = batteryModuleProps;

  return (
    <BarGroup>
      <box
        {...props}
        setup={(self) => {
          setup?.(self);
        }}
      >
        BATTERY!
      </box>
    </BarGroup>
  );
}
