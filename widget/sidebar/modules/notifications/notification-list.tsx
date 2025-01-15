import { Widget, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { VarMap } from "../../../../types/var-map";
import Notification from "./notification";
import { Variable, Binding, bind } from "astal";
const notifd = Notifd.get_default();

// export interface NotificationListProps extends Widget.ScrollableProps {
//   notifications: Notifd.Notification[];
// }

export const NotificationList = (props: Widget.ScrollableProps) => {
  const notifications = notifd.get_notifications();
  const notificationDisplay = new VarMap<number, Gtk.Widget>([]);
  const changeCount = Variable(0);

  for (const n of notifications) {
    // print("Notification:", i, n.summary, n.body);
    notificationDisplay.set(
      n.id,
      <Notification isPopup={false} notification={n} />,
    );
  }

  notifd.connect("notified", (_notifd, id) => {
    print("Adding Notification:", id);
    // notifd.notifications[id];

    const currentNotification = notifd.get_notification(id);
    print("currentNotification", currentNotification.summary);

    notificationDisplay.set(
      id,
      <Notification isPopup={false} notification={currentNotification} />,
    );

    print("changeCount", changeCount.get());
    changeCount.set(changeCount.get() + 1);
  });

  notifd.connect("resolved", (_notifd, id) => {
    print("Resolved:", id);
    notificationDisplay.delete(id);
  });

  return (
    <scrollable
      hexpand
      vscroll={Gtk.PolicyType.AUTOMATIC}
      hscroll={Gtk.PolicyType.NEVER}
      vexpand
      {...props}
    >
      <box vexpand homogeneous>
        <box className="spacing-v-5-revealer" valign={Gtk.Align.START} vertical>
          {bind(notificationDisplay).as((v) => {
            // print("Notification Display:", v[1]);
            return v.map(([num, w]) => w);
          })}
        </box>
        {/* {bind(changeCount).as((v) => (v > 0 ? v : <box />))} */}
      </box>
    </scrollable>
  );
};
