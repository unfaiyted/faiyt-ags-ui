import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import { Variable, bind } from "astal";
import { timeout } from "astal/time";

export const ChatView = (props: Widget.BoxProps) => {
  const scrollableSetup = (self: Widget.Scrollable) => {
    self.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC);
    const vScrollBar = self.get_vscrollbar();
    vScrollBar.get_style_context().add_class("sidebar-scrollbar");

    // timeout(1, () => {
    //   // self.child.set_focus_vadjustment(vScrollBar.get_adjustment());
    // });

    const adjustment = self.get_vadjustment();
    adjustment.connect("changed", () =>
      timeout(1, () => {
        // print("Adjustment changed:", adjustment.get_value());
        // if (!ChatInput.hasFocus) return;
        adjustment.set_value(
          adjustment.get_upper() - adjustment.get_page_size(),
        );
      }),
    );
  };

  return (
    <box homogeneous>
      <scrollable
        vexpand
        setup={scrollableSetup}
        className="sidebar-chat-viewport"
      >
        <box vertical>{props.children || props.child}</box>
      </scrollable>
    </box>
  );
};

export default ChatView;
