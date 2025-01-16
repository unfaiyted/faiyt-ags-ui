import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import Network from "gi://AstalNetwork";
import { Variable, bind, Binding } from "astal";
import { NetworkIndicator } from "./indicators";
import { NetworkToggle } from "./network";
import BluetoothToggle from "./bluetooth";
const network = Network.get_default();

export interface TogglesModuleProps extends Widget.ButtonProps {
  handleClick: () => void;
  handleRightClick: () => void;
  indicator: (props: Widget.StackProps) => Gtk.Widget;
  active: Binding<boolean>;
}

export const ToggleIcon = (props: TogglesModuleProps) => {
  const handleClick = (self: Widget.Button, event: Astal.ClickEvent) => {
    if (event.button === Astal.MouseButton.PRIMARY) {
      props.handleClick();
    } else if (event.button === Astal.MouseButton.SECONDARY) {
      props.handleRightClick();
    }
  };

  const buttonSetup = (self: Widget.Button) => {
    setupCursorHover(self);

    props.active.subscribe((active) => {
      self.toggleClassName("sidebar-button-active", active);
    });

    if (props.active.get()) {
      self.toggleClassName("sidebar-button-active", props.active.get());
    }
  };

  return (
    <button
      className="txt-small sidebar-iconbutton"
      tooltipText={props.tooltipText}
      onClick={handleClick}
      setup={buttonSetup}
    >
      {<props.indicator />}
    </button>
  );
};

export default function QuickToggles(props: Widget.BoxProps) {
  return (
    <box
      halign={Gtk.Align.CENTER}
      className="sidebar-togglesbox spacing-h-5"
      {...props}
    >
      <NetworkToggle />
      <BluetoothToggle />
      <NetworkToggle />
      <BluetoothToggle />
    </box>
  );
}
