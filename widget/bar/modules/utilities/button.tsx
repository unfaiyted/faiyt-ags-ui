import { Widget, Gtk } from "astal/gtk3";

export interface UtilitiesButtonProps extends Widget.ButtonProps {
  icon: string;
}

export default function UtilitiesButton(props: UtilitiesButtonProps) {
  return (
    <button
      valign={Gtk.Align.CENTER}
      tooltipText={props.name}
      onClicked={props.onClicked}
      className={`bar-util-btn icon-material txt-norm ${props.className}`}
      label={`${props.icon}`}
      {...props}
    ></button>
  );
}

export { UtilitiesButton };
