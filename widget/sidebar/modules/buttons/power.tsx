import { Widget, Gtk } from "astal/gtk3";
import MaterialIcon from "../../../utils/icons/material";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";

export const PowerIconButton = (props: Widget.ButtonProps) => {
  return (
    <button
      {...props}
      className="txt-small sidebar-iconbutton"
      tooltipText="Session"
      onClick={() => actions.window.open("session")}
      setup={setupCursorHover}
    >
      <MaterialIcon icon="power_settings_new" size="normal" />
    </button>
  );
};
