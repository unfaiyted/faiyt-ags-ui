import { Widget, Gtk, Gdk } from "astal/gtk3";
import LauncherButton from "./index";
import Apps from "gi://AstalApps";

export interface AppButtonProps extends Widget.ButtonProps {
  app: Apps.Application;
  index: number;
}

export default function AppButton(props: AppButtonProps) {
  const handleKeyPress = (self: Widget.Button, event: Gdk.Event) => {
    print("eventKey:", event.get_keyval()[1]);
    switch (event.get_keyval()[1]) {
      case Gdk.KEY_Return:
      case Gdk.KEY_KP_Enter:
        props.app.launch();
        break;
      default:
        break;
    }
  };

  return (
    <LauncherButton
      name={props.app.name}
      icon={<icon icon={props.app.iconName} />}
      content={props.app.name}
      onKeyPressEvent={handleKeyPress}
      onClick={() => props.app.launch()}
      {...props}
    />
  );
}
