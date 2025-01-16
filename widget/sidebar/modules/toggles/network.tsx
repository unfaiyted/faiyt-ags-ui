import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import Network from "gi://AstalNetwork";
import { Variable, bind, Binding } from "astal";
import { NetworkIndicator } from "./indicators";
import { ToggleIcon } from "./index";

export const NetworkToggle = (props: Widget.ButtonProps) => {
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

export default NetworkToggle;
