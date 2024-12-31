import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import SystemTray from "gi://AstalTray";
import { Variable } from "astal";
import PhosphorIcon from "../../../utils/icons/phosphor";
import { PhosphorIcons } from "../../../utils/icons/types";

export interface TrayItemProps extends Widget.ButtonProps {
  item: SystemTray.TrayItem;
  index?: number;
  array?: SystemTray.TrayItem[];
  key?: string;
}

export default function TrayItem(trayItemProps: TrayItemProps) {
  const { setup, key, child, item, ...props } = trayItemProps;

  const trayItem = Variable(item);

  const handleItemClick = (_button: Widget.Button, event: Astal.ClickEvent) => {
    // print("TrayItem clicked.");
    if (event.button == Gdk.BUTTON_PRIMARY) {
      // print(`Gdk.BUTTON_PRIMARY: ${Gdk.BUTTON_PRIMARY}`);
      // print(`event.button: ${event.button}`);
      trayItem.get().activate(event.x, event.y);
    }

    if (event.button == Gdk.BUTTON_SECONDARY) trayItem.get().get_menu_model();
  };

  const markup = trayItem.get().get_tooltip_markup();

  return (
    <button
      {...props}
      className="bar-systray-item"
      tooltip-markup={item.tooltip_markup || item.id}
      onClick={handleItemClick}
    >
      {item?.iconName == "" ? (
        <PhosphorIcon icon={PhosphorIcons["question-mark"]} size={16} />
      ) : (
        <icon
          icon={item?.iconName == "" ? "missing-symbolic" : item.iconName}
        ></icon>
      )}
    </button>
  );
}

export { TrayItem };
