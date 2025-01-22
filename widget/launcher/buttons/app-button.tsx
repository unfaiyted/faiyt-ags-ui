import { Widget, Gtk } from "astal/gtk3";
import LauncherButton from "./index";
import Apps from "gi://AstalApps";

export interface AppButtonProps extends Widget.ButtonProps {
  app: Apps.Application;
  index: number;
}

export default function AppButton(props: AppButtonProps) {
  return (
    <LauncherButton
      name={props.app.name}
      icon={<icon icon={props.app.iconName} />}
      content={props.app.name}
      onClick={() => props.app.launch()}
      {...props}
    />
  );
}
