import { Widget, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { VarMap } from "../../types/var-map";
import { bind, Variable, Binding } from "astal";
// TODO: Needto move these notification objects somewhere that makes more sense for a shared component
import Notification from "../sidebar/modules/notifications/notification";
const notifd = Notifd.get_default();

export const PopupNotifications = (props: Widget.BoxProps) => {
  const notificationDisplay = new VarMap<number, Gtk.Widget>([]);

  notifd.connect("notified", (_notifd, id) => {
    if (_notifd.dontDisturb || !id) return;
    if (!_notifd.get_notification(id)) return;

    notificationDisplay.set(
      id,
      <Notification
        notification={_notifd.get_notification(id)}
        isPopup={true}
      />,
    );
  });

  notifd.connect("resolved", (_notifd, id) => {
    notificationDisplay.delete(id);
  });

  return (
    <box
      vertical
      halign={Gtk.Align.CENTER}
      className="osd-notifs spacing-v-5-revealer"
      {...props}
    >
      {bind(notificationDisplay).as((v) => {
        return v.map(([_num, w]) => w);
      })}
    </box>
  );
};

export default PopupNotifications;
