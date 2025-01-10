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

export const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

export const fileExists = (path: string) =>
  GLib.file_test(path, GLib.FileTest.EXISTS);

export const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format)!;

/**
 * Parses a command from a message.
 * @param message The message to parse.
 * @returns An object containing the command and its arguments.
 */
export const parseCommand = (
  message: string,
): { command: string; args: string } => {
  if (!message.startsWith("/")) return { command: "", args: "" };

  const parts = message.split(" ");
  const command = parts[0].slice(1); // Remove the '/'
  const args = parts.slice(1).join(" ");

  return { command, args };
};
