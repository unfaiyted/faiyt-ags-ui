import { Widget, Gtk, Astal, App } from "astal/gtk3";
import MaterialIcon from "../../utils/icons/material";
import { Variable } from "astal";
import { UIWindows } from "../../../types";
import { bind } from "astal";

// const pinButton = Button({
//     attribute: {
//         'enabled': false,
//         'toggle': (self) => {
//             self.attribute.enabled = !self.attribute.enabled;
//             self.toggleClassName('sidebar-pin-enabled', self.attribute.enabled);
//
//             const sideleftWindow = App.getWindow('sideleft');
//             const sideleftContent = sideleftWindow.get_children()[0].get_children()[0].get_children()[1];
//
//             sideleftContent.toggleClassName('sidebar-pinned', self.attribute.enabled);
//
//             if (self.attribute.enabled) {
//                 sideleftWindow.exclusivity = 'on-demad';
//             }
//             else {
//                 sideleftWindow.exclusivity = 'normal';
//             }
//         },
//     },
//     vpack: 'start',
//     className: 'sidebar-pin',
//     child: MaterialIcon('push_pin', 'larger'),
//     tooltipText: 'Pin sidebar (Ctrl+P)',
//     onClicked: (self) => self.attribute.toggle(self),
//     setup: (self) => {
//         setupCursorHover(self);
//         self.hook(App, (self, currentName, visible) => {
//             if (currentName === 'sideleft' && visible) self.grab_focus();
//         })
//     },
// })

export interface PinButtonProps extends Widget.ButtonProps {
  icon: string;
  windowName: UIWindows;
}

export default function PinButton(props: PinButtonProps) {
  const enabled = Variable(false);

  const currWindow = App.get_window(props.windowName);
  // const currWindowContent = currWindow?.get_children()

  const handleClick = (self: Widget.Button, event: Astal.ClickEvent) => {
    enabled.set(!enabled.get());
    // if (currWindow)
    // currWindow. = enabled.get() ? Astal.Keymode.ON_DEMAND : Astal.Keymode.NONE;
  };

  return (
    <button
      valign={Gtk.Align.START}
      tooltipText={props.name}
      onClick={handleClick}
      className={`sidebar-pin ${props.className}`}
      label={`${props.icon}`}
      {...props}
    >
      <MaterialIcon icon="push_pin" size="larger" />
    </button>
  );
}
