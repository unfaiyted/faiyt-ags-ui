import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import Network from "gi://AstalNetwork";
import { Variable, bind, Binding } from "astal";
import { NetworkIndicator } from "./indicators";

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

export const ToggleWifi = (props: Widget.ButtonProps) => {
  const network = Network.get_default();
  const isEnabled = Variable(network.get_wifi()?.get_enabled() ?? false);
  const tooltipText = Variable("Wifi | Right-Click to configure");

  network.connect("notify", (_network) => {
    isEnabled.set(_network.get_wifi()?.get_enabled() ?? false);
  });

  return (
    <ToggleIcon
      tooltipText={bind(tooltipText)}
      handleClick={actions.network.toggleWifi}
      handleRightClick={actions.app.wifi}
      indicator={NetworkIndicator}
      active={bind(isEnabled)}
    />
  );
};

export default function QuickToggles(props: Widget.BoxProps) {
  return (
    <box
      halign={Gtk.Align.CENTER}
      className="sidebar-togglesbox spacing-h-5"
      {...props}
    >
      <ToggleWifi />
      <ToggleWifi />
      <ToggleWifi />
      <ToggleWifi />
    </box>
  );
}
