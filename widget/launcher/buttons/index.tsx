import { Widget, Gtk } from "astal/gtk3";
import MaterialIcon from "../../utils/icons/material";

export interface LauncherButtonProps extends Widget.ButtonProps {
  icon: Gtk.Widget | Widget.Icon;
  content: string;
  index?: number;
}

export default function LauncherButton(props: LauncherButtonProps) {
  return (
    <button
      {...props}
      className={`overview-search-result-btn txt ${props.className}`}
      onClick={props.onClick}
    >
      <box>
        <box vertical={false}>
          {props.icon}
          <box vertical>
            <label
              halign={Gtk.Align.START}
              label={props.name}
              truncate={true}
              className={`overview-search-results-txt txt-smallie txt-subtext`}
            />
            <label
              halign={Gtk.Align.START}
              label={props.content}
              className={`overview-search-results-txt txt-norm`}
              truncate={true}
            />
            <label
              halign={Gtk.Align.END}
              label={props.index?.toString()}
              className={`overview-search-results-txt txt-norm`}
              truncate={true}
            />
          </box>
          <box hexpand></box>
        </box>
      </box>
    </button>
  );
}
