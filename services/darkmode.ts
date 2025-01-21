import Gio from "gi://Gio";
import GLib from "gi://GLib";
import Soup from "gi://Soup?version=3.0";
import { GObject, register, signal, property } from "astal/gobject";
import { fileExists } from "../utils";
import { readFile, writeFile, writeFileAsync } from "astal/file";
import { interval } from "astal/time";
import Astal from "gi://AstalIO";
import { execAsync, exec } from "astal/process";
import config from "../utils/config";
import { DisplayModes, Time } from "../types/config";
import { timeInRange } from "../utils/time";

@register()
export class LightDarkMode extends GObject.Object {
  private _mode: DisplayModes = config.appearance.defaultMode;
  private _isAutoDarkEnabled: boolean = false;

  private _updateModeTimer: Astal.Time | null;

  @property(String)
  get mode() {
    return this._mode;
  }

  set mode(value: DisplayModes) {
    this._mode = value;
    this.emit("changed", this._mode);
  }

  @signal()
  changed() {
    print("Display Mode changed");
  }

  constructor(
    initialMode: DisplayModes = DisplayModes.LIGHT,
    isAutoDarkEnabled = false,
  ) {
    super();
    this._mode = initialMode;
    this._isAutoDarkEnabled = isAutoDarkEnabled;
    this._updateModeTimer = null;

    if (isAutoDarkEnabled) {
      this._startAutoDark();
    }
  }

  _startAutoDark() {
    print("Starting auto dark mode");
    this._updateModeTimer = interval(1000, () => {
      if (!config.appearance.autoDarkMode.enabled) return;
      const fromTime = config.appearance.autoDarkMode.from
        .split(":")
        .map(Number) as Time;
      const toTime = config.appearance.autoDarkMode.to
        .split(":")
        .map(Number) as Time;
      if (fromTime == toTime) return;
      const currentDateTime = GLib.DateTime.new_now_local();
      const currentTime = [
        currentDateTime.get_hour(),
        currentDateTime.get_minute(),
      ] as Time;
      const isDark = timeInRange(currentTime, fromTime, toTime);

      let currMode = this._mode;
      if (isDark) {
        currMode = DisplayModes.DARK;
      }
      if (currMode != this._mode) {
        this.mode = currMode;
      }
    });
  }

  _stopAutoDark() {
    if (this._updateModeTimer != null) this._updateModeTimer.cancel();
  }

  get isDark() {
    return this.mode == DisplayModes.DARK;
  }

  get isLight() {
    return this.mode == DisplayModes.LIGHT;
  }

  get isAutoDarkEnabled() {
    return this._isAutoDarkEnabled;
  }
}
