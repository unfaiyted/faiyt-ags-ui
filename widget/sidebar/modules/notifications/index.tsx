import { Widget, Gtk } from "astal/gtk3";
import config from "../../../../utils/config";
import gobject from "gi://GObject";
import MaterialIcon from "../../../utils/icons/material";
import Notifd from "gi://AstalNotifd";
import { VarMap } from "../../../../types/var-map";
import Notification from "./notification";
import { Variable, Binding, bind } from "astal";
import {
  NotificationSilenceButton,
  NotificationClearButton,
} from "./notification-buttons";
import { NotificationList } from "./notification-list";

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

export interface NotificationCountProps extends Widget.BoxProps {
  count: Binding<number>;
}

export const NotificationCount = (props: NotificationCountProps) => {
  const count = Variable(props.count.get());

  props.count.subscribe((c) => {
    count.set(c);
  });

  return (
    <label
      hexpand
      xalign={0}
      className="txt-small margin-left-10"
      label={bind(count).as(
        (v) => v.toString() + (v == 1 ? " notification" : " notifications"),
      )}
    />
  );
};

export function NotificationModule(props: Widget.BoxProps) {
  const notifications = notifd.get_notifications();

  print("notifications.length", notifications.length);

  const empty = Variable(notifications.length === 0);
  const count = Variable(notifications.length);

  notifd.connect("notified", (_notifd, id) => {
    const n = _notifd.get_notification(id);
    const notifications = _notifd.get_notifications();
    empty.set(notifications.length === 0);
    count.set(notifications.length);
    print("Notification:", n.summary, n.body);
  });

  notifd.connect("resolved", (_notifd, id) => {
    const n = _notifd.get_notification(id);
    const notifications = _notifd.get_notifications();
    empty.set(notifications.length === 0);
    count.set(notifications.length);
  });

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
        <NotificationSilenceButton />
        <NotificationClearButton />
      </box>
    </box>
  );
}

export default NotificationModule;
