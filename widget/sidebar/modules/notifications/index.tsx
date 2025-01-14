import { Widget, Gtk } from "astal/gtk3";
import config from "../../../../utils/config";
import MaterialIcon from "../../../utils/icons/material";
import Notifd from "gi://AstalNotifd";
import { VarMap } from "../../../../types/var-map";
import Notification from "./notification";
import { Variable, Binding, bind } from "astal";

const notifd = Notifd.get_default();

export const NotificationListEmpty = (props: Widget.BoxProps) => {
  return (
    <box homogeneous {...props}>
      <box vertical valign={Gtk.Align.CENTER} className="txt spacing-v-10">
        <box vertical className="spacing-v-5 txt-subtext">
          <MaterialIcon icon="notifications_active" size="gigantic" />
          <label label="No notifications" className="txt-small" />
        </box>
      </box>
    </box>
  );
};

export interface NotificationListProps extends Widget.ScrollableProps {
  notifications: Notifd.Notification[];
}

export const NotificationList = (props: Widget.ScrollableProps) => {
  const notifications = notifd.get_notifications();
  const notificationDisplay = new VarMap<number, Gtk.Widget>([]);

  let i = 0;
  for (const n of notifications) {
    print("Notification:", i, n.summary, n.body);
    notificationDisplay.set(
      i,
      <Notification isPopup={false} notification={n} />,
    );
    i++;
  }

  notifd.connect("notified", (_notifd, id) => {
    print("Notification:", id);
    // notifd.notifications[id];
    notificationDisplay.set(
      id,
      <Notification
        isPopup={false}
        notification={notifd.get_notifications()[id]}
      />,
    );
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
      </box>
    </scrollable>
  );
};

export interface NotificationCountProps extends Widget.BoxProps {
  count: Binding<number>;
}

export const NotificationCount = (props: NotificationCountProps) => {
  const count = Variable(0);

  props.count.subscribe((c) => {
    count.set(c);
  });

  return (
    <label
      hexpand
      xalign={0}
      className="txt-small margin-left-10"
      label={bind(count).as((v) => v.toString())}
    />
  );
};

export function NotificationModule(props: Widget.BoxProps) {
  const notifications = notifd.get_notifications();
  const empty = Variable(true);
  const count = Variable(notifications.length);

  notifd.connect("notified", (notifd, id) => {
    const n = notifd.get_notification(id);
    const notifications = notifd.get_notifications();
    empty.set(false);
    print(`not.len`, notifications.length);
    count.set(notifications.length);
    print("Notification:", n.summary, n.body);
  });

  empty.set(notifications.length === 0);

  return (
    <box {...props} className="spacing-v-5" vertical>
      <stack
        transitionDuration={config.animations.durationLarge}
        transitionType={Gtk.StackTransitionType.CROSSFADE}
        shown={bind(empty).as((v) => (v ? "empty" : "list"))}
      >
        <NotificationListEmpty name="empty" />
        <NotificationList name="list" />
      </stack>
      <box className="txt spacing-h-5" valign={Gtk.Align.START}>
        <NotificationCount count={bind(count)} />
      </box>
    </box>
  );
}

export default NotificationModule;
