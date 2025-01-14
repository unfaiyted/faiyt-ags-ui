import { Widget, Gtk } from "astal/gtk3";
import GLib from "gi://GLib";
import Pango from "gi://Pango";
import { Variable } from "astal";
import MaterialIcon from "../../../utils/icons/material";
import Notifd from "gi://AstalNotifd";
import config from "../../../../utils/config";

export interface NotificationProps extends Widget.RevealerProps {
  notification: Notifd.Notification;
  isPopup: boolean;
}

export interface NotificationIconProps extends Widget.BoxProps {
  notification: Notifd.Notification;
}

export interface NotificationTextProps extends Widget.BoxProps {
  notification: Notifd.Notification;
}

export interface NotificationExpandProps extends Widget.BoxProps {
  notification: Notifd.Notification;
}

const getFriendlyNotifTimeString = (timeObject: number) => {
  const messageTime = GLib.DateTime.new_from_unix_local(timeObject);
  const oneMinuteAgo = GLib.DateTime.new_now_local().add_seconds(-60);
  if (oneMinuteAgo != null && messageTime.compare(oneMinuteAgo) > 0)
    return "Now";
  else if (
    messageTime.get_day_of_year() ==
    GLib.DateTime.new_now_local().get_day_of_year()
  )
    return messageTime.format(config.time.format);
  else if (
    messageTime.get_day_of_year() ==
    GLib.DateTime.new_now_local().get_day_of_year() - 1
  )
    return "Yesterday";
  else return messageTime.format(config.time.dateFormat);
};

export const NotificationIcon = (props: NotificationIconProps) => {
  return (
    <box valign={Gtk.Align.START} homogeneous>
      <overlay overlays={[]}>
        <box
          valign={Gtk.Align.CENTER}
          hexpand
          className={`notif-icon notif-icon-material-${props.notification.urgency}`}
        ></box>
      </overlay>
    </box>
  );
};

export const NotificationText = (props: NotificationTextProps) => {
  const NotifyTextSummary = () => {
    const time = getFriendlyNotifTimeString(props.notification.time);

    return (
      <label
        xalign={0}
        className="txt-small txt-semibold titlefont"
        justify={Gtk.Justification.LEFT}
        hexpand
        maxWidthChars={1}
        truncate={true}
        ellipsize={Pango.EllipsizeMode.END}
        label={time ? time : ""}
      />
    );
  };

  return (
    <box valign={Gtk.Align.CENTER} vertical hexpand>
      <box>
        <NotifyTextSummary />
        {/* <NotifyTextBody /> */}
      </box>
      {/* <NotifyTextPreview /> */}
      {/* <NotifyTextExpanded /> */}
      {props.notification.summary}
    </box>
  );
};

export const NotificationExpandButton = (props: NotificationExpandProps) => {
  // onClick={() => props.notification.expand()}
  //
  return (
    <button valign={Gtk.Align.START} className="notif-expand-btn">
      <box className="spacing-h-5">
        <MaterialIcon
          icon="expand_more"
          size="normal"
          valign={Gtk.Align.CENTER}
        />
      </box>
    </button>
  );
};

export default function Notification(props: NotificationProps) {
  const close = Variable(false);
  const dragging = Variable(false);
  const held = Variable(false);
  const hovered = Variable(false);
  const id = props.notification.id;
  const notification = props.notification;

  notification.dismiss();

  return (
    <revealer
      revealChild={true}
      transitionDuration={config.animations.durationLarge}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      {...props}
    >
      <box homogeneous>
        <box homogeneous>
          <box
            className={`${props.isPopup ? "popup-" : ""}notif-${props.notification.urgency} spacing-h-10`}
          >
            <NotificationIcon notification={props.notification} />
            <box className="spacing-h-5">
              <NotificationText notification={props.notification} />
              <NotificationExpandButton notification={props.notification} />
            </box>
          </box>
        </box>
      </box>
    </revealer>
  );
}
