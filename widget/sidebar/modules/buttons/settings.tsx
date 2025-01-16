import { Widget, Gtk } from "astal/gtk3";
import MaterialIcon from "../../../utils/icons/material";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";

export const SettingsIconButton = (props: Widget.ButtonProps) => {
  return (
    <button
      className="txt-small sidebar-iconbutton"
      tooltipText="Open Settings"
      onClick={() => actions.app.settings()}
      setup={setupCursorHover}
    >
      <MaterialIcon icon="settings" size="normal" />
    </button>
  );
};
