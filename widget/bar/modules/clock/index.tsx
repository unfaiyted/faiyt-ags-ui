import { Widget, Gtk } from "astal/gtk3";
import { Binding } from "astal";
import config from "../../../../utils/config";
import { ClockModuleProps } from "./types";
import { Variable, bind } from "astal";
import GLib from "gi://GLib";
import BarGroup from "../../utils/bar-group";

export default function ClockModule(clockModuleProps: ClockModuleProps) {
  const time = Variable("").poll(
    config.time.interval,
    () => GLib.DateTime.new_now_local().format(config.time.format) || "",
  );

  const date = Variable("").poll(
    config.time.dateInterval,
    () =>
      GLib.DateTime.new_now_local().format(config.time.dateFormatLong) || "",
  );

  return (
    <BarGroup>
      <box valign={Gtk.Align.CENTER} className="bar-clock-box">
        <label className="bar-time" label={bind(time)} />
        <label className="txt-norm txt-onLayer1" label="•" />
        <label className="txt-smallie bar-date" label={bind(date)} />
      </box>
    </BarGroup>
  );
}
