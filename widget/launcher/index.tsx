import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import PopupWindow, { PopupWindowProps } from "../utils/popup-window";
import CloseRegion from "../utils/containers/close-region";
import { Variable, bind } from "astal";
import config from "../../utils/config";
import actions from "../../utils/actions";

export interface LauncherProps extends PopupWindowProps {
  monitor: number;
}

export default function LauncherBar(launcherProps: LauncherProps) {
  const { setup, child, ...props } = launcherProps;

  const isVisible = Variable(true);
  const placeholderText = Variable("Type to Search");

  const handleKeyPress = (self: Widget.Entry, event: Gdk.Event) => {
    if (self.text.length == 0) {
      placeholderText.set("Type to Search");
      return;
    }
    placeholderText.set("");
  };


  isVisible.subscribe("changed",(v:boolean) => {

  }


  return (
    <PopupWindow
      name={"launcher"}
      className={props.className}
      layer={Astal.Layer.TOP}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      visible={bind(isVisible).as((v) => v)}
      keymode={Astal.Keymode.ON_DEMAND}
      expand
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      css={``}
      application={App}
      {...props}
    >
      <box expand>
        <box vertical css={``}>
          <CloseRegion
            multimonitor={true}
            monitor={props.monitor}
            hexpand
            height="40%"
            handleClose={() => actions.window.close("launcher")}
          />
          <box halign={Gtk.Align.CENTER}>
            <overlay
              overlays={[
                <revealer
                  transitionType={Gtk.RevealerTransitionType.CROSSFADE}
                  transitionDuration={config.animations.durationLarge}
                  revealChild={true}
                  halign={Gtk.Align.START}
                >
                  <label
                    className="txt txt-large icon-material overview-search-icon"
                    label="search"
                  />
                </revealer>,
                <revealer
                  transitionType={Gtk.RevealerTransitionType.CROSSFADE}
                  transitionDuration={config.animations.durationLarge}
                  revealChild={true}
                  halign={Gtk.Align.CENTER}
                >
                  <label className="overview-search-prompt txt-small txt">
                    {bind(placeholderText)}
                  </label>
                </revealer>,
              ]}
            >
              <entry
                setup={(self) => self.grab_focus()}
                onKeyReleaseEvent={handleKeyPress}
                className={"overview-search-box txt-small txt"}
                halign={Gtk.Align.CENTER}
              ></entry>
            </overlay>

            <box className={"overview-search-icon-box"}></box>
            <box
              className={"overview-search-prompt-box"}
              halign={Gtk.Align.CENTER}
            />
          </box>
          <CloseRegion
            hexpand
            height="50%"
            multimonitor={true}
            monitor={props.monitor}
            handleClose={() => actions.window.close("launcher")}
          />
          {/* <WorkspacesOverview /> */}
          {/* <SearchResults/> */}
        </box>
      </box>
    </PopupWindow>
  );
}
