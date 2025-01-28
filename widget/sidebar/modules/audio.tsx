import { Widget, Gtk, Gdk } from "astal/gtk3";
import MaterialIcon from "../../utils/icons/material";

export const EmptyContent = (props: Widget.BoxProps) => {
  return (
    <box homogeneous {...props}>
      <box className="txt spacing-v-10" vertical valign={Gtk.Align.CENTER}>
        <box vertical className="spacing-v-5 txt-subtext">
          <MaterialIcon icon="brand_awareness" size="gigantic" />
          <label label="No audio sources." className="txt-small" />
        </box>
      </box>
    </box>
  );
};

export const StreamList = (props: Widget.BoxProps) => {
  return <box {...props}>Stream List</box>;
};

export default function AudioModules(props: Widget.BoxProps) {
  return (
    <box className={`spacing-v-5`} vertical {...props}>
      <stack shown={"empty"}></stack>
      <box vertical className={`spacing-v-5`}>
        <EmptyContent name="empty" />
        <StreamList name="list" />
      </box>
    </box>
  );
}
