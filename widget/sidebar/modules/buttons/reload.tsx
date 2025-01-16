import { Widget, Gtk } from "astal/gtk3";
import MaterialIcon from "../../../utils/icons/material";
import { actions } from "../../../../utils/actions";
import { setupCursorHover } from "../../../utils/buttons";

export const ReloadIconButton = (props: Widget.ButtonProps) => {
  return (
    <button
      className="txt-small sidebar-iconbutton"
      tooltipText="Reload Environment config"
      onClick={actions.system.reload}
      setup={setupCursorHover}
    >
      <MaterialIcon icon="refresh" size="normal" />
    </button>
  );
};
