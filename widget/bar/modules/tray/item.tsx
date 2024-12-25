import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SystemTray from "gi://AstalTray";
import { Variable } from "astal";

export interface TrayItemProps extends Widget.ButtonProps {
  value: SystemTray.TrayItem;
  index?: number;
  array?: SystemTray.TrayItem[];
  key?: string;
}

export default function TrayItem(trayItemProps: TrayItemProps) {
  const { setup, key, child, value, ...props } = trayItemProps;
  const trayItem = Variable(value);

  const handleItemClick = (button: Widget.Button, event: Astal.ClickEvent) => {
    if (event.button === Gdk.BUTTON_PRIMARY)
      trayItem.get().activate(event.x, event.y);

    if (event.button === Gdk.BUTTON_SECONDARY) trayItem.get().get_menu_model();
  };

  return (
    <button
      {...props}
      className="bar-systray-item"
      setup={(self) => {
        setup?.(self);
        self.hook(trayItem, (self) => {
          self.set_tooltip_markup(trayItem.get().get_tooltip_markup());
        });
      }}
      onClick={handleItemClick}
    >
      <icon icon={value.get_icon_name()}></icon>
      {child}
    </button>
  );
}