import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import WorkspaceContents from "../modules/workspaces/WorkspaceContents";
import config from "../../../utils/config";
import { getScrollDirection } from "../../../utils/utils";
import Hypr from "gi://AstalHyprland";
import Gio from "gi://Gio";
export interface NormalBarModeProps extends Widget.EventBoxProps {}

enum ClickButtonPressed {
  LEFT = 1,
  MIDDLE = 2,
  RIGHT = 3,
}

export default function NormalBarMode(normalBarModeProps: NormalBarModeProps) {
  const { setup, child, ...props } = normalBarModeProps;

  const hypr = Hypr.get_default();

  const handleHyprResponse: Gio.AsyncReadyCallback<Hypr.Hyprland> = (
    source,
    response,
    data,
  ) => {
    print(data);
  };

  const handleScroll = (self: Widget.EventBox, event: Astal.ScrollEvent) => {
    const scrollDirection = getScrollDirection(event);

    if (scrollDirection === Gdk.ScrollDirection.UP) {
      print("scroll up");
      hypr.message_async(`dispatch workspace -1`, handleHyprResponse);
    } else if (scrollDirection === Gdk.ScrollDirection.DOWN) {
      print("scroll down");
      hypr.message_async(`dispatch workspace +1`, handleHyprResponse);
    }
  };

  const handleClick = (self: Widget.EventBox, event: Astal.ClickEvent) => {
    // 1 = left, 2 = middle, 3 = right
    print("event.button: " + event.button);

    if (event.button === ClickButtonPressed.LEFT.valueOf()) {
    } else if (event.button === ClickButtonPressed.MIDDLE.valueOf()) {
      // toggleWindowOnAllMonitors('osk'); // on screen keyboard
    } else if (event.button === ClickButtonPressed.RIGHT.valueOf()) {
      // App.toggleWindow('overview');
    }
  };

  const eventBoxSetup = (self: Widget.EventBox) => {
    setup?.(self);

    let clicked = false;

    self.add_events(Gdk.EventMask.POINTER_MOTION_MASK);

    self.connect("motion-notify-event", (self, event: Gdk.EventMotion) => {
      if (!clicked) return;

      const widgetWidth = self.get_allocation().width;
      const wsId = Math.ceil((event.x * config.workspaces.shown) / widgetWidth);
      // Utils.execAsync([
      // `${App.configDir}/scripts/hyprland/workspace_action.sh`,
      // "workspace",
      // `${wsId}`,
      // ]).catch(print);
    });
    self.connect("button-press-event", (self, event: Gdk.EventButton) => {
      if (event.button === ClickButtonPressed.LEFT.valueOf()) {
        const clicked = true;

        const widgetWidth = self.get_allocation().width;
        const wsId = Math.ceil(
          (event.x * config.workspaces.shown) / widgetWidth,
        );
        //   Utils.execAsync([
        //     `${App.configDir}/scripts/hyprland/workspace_action.sh`,
        //     "workspace",
        //     `${wsId}`,
        //   ]).catch(print);
      } else if (event.button === 8) {
        hypr.message_async(
          `dispatch togglespecialworkspace`,
          handleHyprResponse,
        );
      }
    });
    self.connect("button-release-event", (self) => (clicked = false));
  };

  return (
    <eventbox
      {...props}
      onScroll={handleScroll}
      onClick={handleClick}
      setup={eventBoxSetup}
    >
      <box homogeneous={true} className="bar-group-margin">
        <box
          className="bar-group bar-group-standalone bar-group-pad"
          css={`
            min-width: 2px;
          `}
        >
          <WorkspaceContents shown={config.workspaces.shown} />
        </box>
      </box>
      Normal bar mode
    </eventbox>
  );
}
