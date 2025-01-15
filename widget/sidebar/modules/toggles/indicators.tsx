import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import Network from "gi://AstalNetwork";
import { Variable, bind, Binding } from "astal";
import config from "../../../../utils/config";

const network = Network.get_default();

// const SimpleNetworkIndicator = () =>
//   Widget.Icon({
//     setup: (self) =>
//       self.hook(Network, (self) => {
//         const icon = Network[Network.primary || "wifi"]?.iconName;
//         self.icon = icon || "";
//         self.visible = icon;
//       }),
//   });
//

export const SimpleNetworkIndicator = (props: Widget.LabelProps) => {
  const icon = network.primary == Network.Primary.WIFI ? "wifi" : "lan";

  return <icon icon={icon} visible />;
};

export const NetworkWiredIndicator = () => {
  const shown = Variable("fallback");

  if (!network.wired) return <stack />;

  switch (network.wifi.internet) {
    case Network.Internet.CONNECTED:
      shown.set("connected");
      break;
    case Network.Internet.DISCONNECTED:
      shown.set("disconnected");
      break;
    case Network.Internet.CONNECTING:
      shown.set("connecting");
    default:
      shown.set("fallback");
      break;
  }

  if (network.connectivity !== Network.Connectivity.FULL)
    shown.set("disconnected");

  return (
    <stack
      transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
      transitionDuration={config.animations.durationSmall}
      shown={bind(shown)}
    >
      <SimpleNetworkIndicator name="fallback" />
      <label
        name="unknown"
        className="txt-norm icon-material"
        label="wifi_off"
      />
      <label
        name="disconnected"
        className="txt-norm icon-material"
        label="signal_wifi_off"
      />
      <label name="connected" className="txt-norm icon-material" label="lan" />
      <label
        name="connecting"
        className="txt-norm icon-material"
        label="settings_ethernet"
      />
    </stack>
  );
};
export const NetworkWifiIndicator = () => {
  const shown = Variable("disabled");

  if (!network.wifi) return <stack />;

  switch (network.wifi.internet) {
    case Network.Internet.CONNECTED:
      const signalStrength = String(Math.ceil(network.wifi.strength / 25));
      shown.set(signalStrength);
      break;
    case Network.Internet.DISCONNECTED:
      shown.set("disconnected");
      break;
    case Network.Internet.CONNECTING:
      shown.set("connecting");
    default:
      shown.set("disabled");
      break;
  }

  return (
    <stack
      transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
      transitionDuration={config.animations.durationSmall}
      shown={bind(shown)}
    >
      <label
        name="disabled"
        className="txt-norm icon-material"
        label="wifi_off"
      />
      <label
        name="disconnected"
        className="txt-norm icon-material"
        label="signal_wifi_off"
      />
      <label
        name="connecting"
        className="txt-norm icon-material"
        label="settings_ethernet"
      />
      <label
        name="0"
        className="txt-norm icon-material"
        label="signal_wifi_0_bar"
      />
      <label
        name="1"
        className="txt-norm icon-material"
        label="network_wifi_1_bar"
      />
      <label
        name="2"
        className="txt-norm icon-material"
        label="network_wifi_2_bar"
      />
      <label
        name="3"
        className="txt-norm icon-material"
        label="network_wifi_3_bar"
      />
      <label
        name="4"
        className="txt-norm icon-material"
        label="signal_wifi_4_bar"
      />
    </stack>
  );
};

export const NetworkIndicator = (props: Widget.StackProps) => {
  const shown = Variable("fallback");

  if (network.primary == Network.Primary.WIFI) {
    shown.set("wifi");
  } else if (network.primary == Network.Primary.WIRED) {
    shown.set("wired");
  } else {
    shown.set("fallback");
  }

  return (
    <stack
      transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
      transitionDuration={config.animations.durationSmall}
      shown={bind(shown)}
    >
      <SimpleNetworkIndicator name="fallback" />
      <NetworkWifiIndicator name="wifi" />
      <NetworkWiredIndicator name="wired" />
    </stack>
  );
};
