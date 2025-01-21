import { Widget, Gtk, Astal } from "astal/gtk3";
import { BrightnessIndicator } from "./indicators/brightness";
import { VolumeIndicator } from "./indicators/volume";
import Indicators from "./indicators/index";
import PopupNotifications from "./popup-notifications";
// import { MusicControls } from "./music";
// import { Notifications } from "./notifications";
// import { ColorSchemeSwitcher } from "./scheme-switcher";

export interface SystemOverlayProps extends Widget.WindowProps {}

export const SystemOverlays = (props: SystemOverlayProps) => {
  return (
    <window
      {...props}
      name={`system-overlays-${props.monitor}`}
      monitor={props.monitor}
      className="indicator"
      layer={Astal.Layer.OVERLAY}
      visible
      anchor={Astal.WindowAnchor.TOP}
    >
      <eventbox onHover={() => {}}>
        <box vertical className="osd-window" css={"min-height: 2px;"}>
          <Indicators>
            <BrightnessIndicator />
            <VolumeIndicator />
          </Indicators>

          {/* <MusicControls /> */}
          <PopupNotifications />
          {/* <ColorSchemeSwitcher /> */}
        </box>
      </eventbox>
    </window>
  );
};

export default SystemOverlays;
