import { Widget, Astal, Gtk } from "astal/gtk3";
import { ClickButtonPressed } from "../../../../types";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";
import { Variable, bind, Binding } from "astal";
import { ToggleIcon } from "./index";
import MaterialIcon from "../../../utils/icons/material";

export const IdleInhibitorToggle = (props: Widget.ButtonProps) => {
  const isEnabled = Variable(false);
  const tooltipText = Variable("Idle Inhibitor | Not working probably");

  return (
    <ToggleIcon
      tooltipText={bind(tooltipText)}
      handleClick={(self: Widget.Button) => {
        isEnabled.set(!isEnabled.get());
        self.toggleClassName("sidebar-button-active", isEnabled.get());
        if (isEnabled.get()) {
          actions.system.idleInhibitor.start();
        } else {
          actions.system.idleInhibitor.stop();
        }
      }}
      handleRightClick={actions.app.settings}
      indicator={() => <MaterialIcon icon="coffee" />}
      active={bind(isEnabled)}
    />
  );
};

export default IdleInhibitorToggle;
