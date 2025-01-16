import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import Bluetooth from "gi://AstalBluetooth";
import { Variable, bind, Binding } from "astal";
import { BluetoothIndicator } from "./indicators";
import { ToggleIcon } from "./index";

export const BluetoothToggle = (props: Widget.ButtonProps) => {
  const bt = Bluetooth.get_default();
  const isEnabled = Variable(bt.isPowered);
  const tooltipText = Variable("Bluetooth | Right-Click to configure");

  print("Bluetooth toggle created,");
  print("bt details: bt.isPowered:", bt.isPowered, bt.isConnected);
  print("bt details: bt.devices", bt.get_devices());
  print("bt details: bt.adapter", bt.get_adapter());

  bt.connect("notify", (_bt) => {
    isEnabled.set(bt.isPowered);
  });

  return (
    <ToggleIcon
      tooltipText={bind(tooltipText)}
      handleClick={() => {
        !isEnabled.get()
          ? actions.bluetooth.enable()
          : actions.bluetooth.disable();
        isEnabled.set(!isEnabled.get());
      }}
      handleRightClick={actions.app.bluetooth}
      indicator={BluetoothIndicator}
      active={bind(isEnabled)}
    />
  );
};

export default BluetoothToggle;
