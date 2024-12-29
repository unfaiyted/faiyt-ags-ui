import { App, Astal, Gtk, Gdk } from "astal/gtk3";

import { enableClickthrough } from "../../../utils/utils";

export const BarCornerTopleft = (monitor = 0) => (
  <window
    monitor={monitor}
    name={`barcornertl${monitor}`}
    layer={Astal.Layer.TOP}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    visible={true}
    // child= RoundedCorner('topleft', { className: 'corner', }),
    setup={enableClickthrough}
  />
);

export const BarCornerTopRight = (monitor = 0) => (
  <window
    monitor={monitor}
    name={`barcornertr${monitor}`}
    layer={Astal.Layer.TOP}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    visible={true}
    // child= RoundedCorner('topleft', { className: 'corner', }),
    setup={enableClickthrough}
  />
);
