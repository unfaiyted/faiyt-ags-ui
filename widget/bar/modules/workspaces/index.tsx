export * from "./types";
export * from "./modes/normal";
export * from "./modes/focus";

import { BaseWorkspacesProps } from "./types";
import WorkspaceModeContent from "./modes";
import { BarMode } from "../../types";
import { handleHyprResponse } from "../../../../utils/handlers";
import config from "../../../../utils/config";
import { Variable } from "astal";
import { Widget, Astal, Gdk } from "astal/gtk3";
import { getScrollDirection } from "../../../../utils/utils";
import { ClickButtonPressed } from "../../types";
import Hypr from "gi://AstalHyprland";

export default function Workspaces(workspacesProps: BaseWorkspacesProps) {
  const { setup, mode, ...props } = workspacesProps;

  const hypr = Hypr.get_default();
  const activeBarMode = Variable(config.bar.default);

  const handleScroll = (self: Widget.EventBox, event: Astal.ScrollEvent) => {
    const scrollDirection = getScrollDirection(event);

    // todo: add config option to reverse scroll direction
    if (scrollDirection === Gdk.ScrollDirection.UP) {
      print("scroll up");
      hypr.message_async(`dispatch workspace +1`, handleHyprResponse);
    } else if (scrollDirection === Gdk.ScrollDirection.DOWN) {
      print("scroll down");
      hypr.message_async(`dispatch workspace -1`, handleHyprResponse);
    }
  };

  const handleClick = (self: Widget.EventBox, event: Astal.ClickEvent) => {
    // 1 = left, 2 = middle, 3 = right
    print("event.button: " + event.button);

    if (event.button === ClickButtonPressed.LEFT.valueOf()) {
    } else if (event.button === ClickButtonPressed.MIDDLE.valueOf()) {
      // todo: will need to do after adding osk
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

      hypr.message_async(`dispatch workspace ${wsId}`, handleHyprResponse);
      // Utils.execAsync([
      // `${App.configDir}/scripts/hyprland/workspace_action.sh`,
      // "workspace",
      // `${wsId}`,
      // ]).catch(print);
    });

    self.connect("button-press-event", (self, event: Gdk.EventButton) => {
      if (event.button === ClickButtonPressed.LEFT.valueOf()) {
        clicked = true;

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
    <box homogeneous={true}>
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
            <WorkspaceModeContent
              mode={mode}
              shown={config.workspaces.shown}
              initilized={false}
            />
          </box>
        </box>
      </eventbox>
    </box>
  );
}
