import Cairo from "gi://cairo";
import { Astal, Gdk } from "astal/gtk3";
import GLib from "gi://GLib";

export const dummyRegion = new Cairo.Region();

export const enableClickthrough = (self) =>
  self.input_shape_combine_region(dummyRegion);

//this is because direction does not seem to work in event.direction
export const getScrollDirection = (
  event: Astal.ScrollEvent,
): Gdk.ScrollDirection => {
  if (event.delta_y > 0) {
    return Gdk.ScrollDirection.UP;
  } else {
    return Gdk.ScrollDirection.DOWN;
  }
};

const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format)!;
