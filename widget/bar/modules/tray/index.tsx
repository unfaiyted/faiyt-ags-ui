import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SystemTray from "gi://AstalTray";
import { Variable } from "astal";
import TrayItem from "./item";

export interface TrayModuleProps extends Widget.BoxProps {}

export default function Tray(trayModuleProps: TrayModuleProps) {
  const { setup, child, ...props } = trayModuleProps;

  const tray = Variable(SystemTray.get_default());

  tray.get().connect("item-added", () => {
    tray.set(SystemTray.get_default());
  });
  tray.get().connect("item-removed", () => {
    tray.set(SystemTray.get_default());
  });

  const mapTrayItem = (value: SystemTray.TrayItem) => {
    return <TrayItem value={value} key={value.get_id()} />;
  };

  const trayContent = (
    <box
      className="margin-right-5 spacing-h-15"
      setup={(self) => {
        self.hook(tray, () => {
          self.children = tray.get().items.map(mapTrayItem);
        });
      }}
    ></box>
  );

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
