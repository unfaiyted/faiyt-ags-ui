import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import Hypr from "gi://AstalHyprland";
import { Variable } from "astal";

export interface WindowTitleProps extends Widget.ScrollableProps {}

export default function WindowTitle(windowTitleProps: WindowTitleProps) {
  const { setup, child, ...props } = windowTitleProps;

  const hypr = Hypr.get_default();
  const client = Variable(hypr.get_focused_client());
  const workspace = Variable(hypr.get_focused_workspace());

  hypr.connect("event", (source, event, args) => {
    print("Hyprland event:", event);
    if (event === "activewindow" || event === "activewindowv2") {
      client.set(hypr.get_focused_client());
    } else if (event === "workspace" || event === "workspacev2") {
      workspace.set(hypr.get_focused_workspace());
    }
  });

  return (
    <scrollable
      {...props}
      hexpand={true}
      vexpand={true}
      hscroll={Gtk.PolicyType.AUTOMATIC}
      vscroll={Gtk.PolicyType.NEVER}
      setup={(self) => {
        setup?.(self);
      }}
    >
      <box vertical={true}>
        <label
          xalign={0}
          truncate={true}
          maxWidthChars={1}
          className="txt-smaller bar-wintitle-topdesc txt"
          setup={(self) => {
            self.hook(client, (label) => {
              label.label =
                client.get().class.length === 0
                  ? "Desktop"
                  : client.get().class;
            });
          }}
        ></label>
        <label
          xalign={0}
          truncate={true}
          maxWidthChars={1}
          className="txt-smallie bar-wintitle-txt"
          setup={(self) => {
            self.hook(client, (label) => {
              label.label =
                client.get().title.length === 0
                  ? `Workspace ${workspace.get().id}`
                  : client.get().title;
            });
          }}
        ></label>
      </box>
    </scrollable>
  );
}
