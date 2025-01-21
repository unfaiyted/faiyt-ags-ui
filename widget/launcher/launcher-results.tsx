import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { Widget } from "astal/gtk3";
import PopupWindow, { PopupWindowProps } from "../utils/popup-window";
import CloseRegion from "../utils/containers/close-region";
import { Variable, bind, Binding } from "astal";
import GLib from "gi://GLib";
import config from "../../utils/config";
import actions from "../../utils/actions";
import { VarMap } from "../../types/var-map";
import AppButton from "./buttons/app-button";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      GLib.source_remove(timeoutId);
    }

    timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, delay, () => {
      func(...args);
      return false;
    });
  };
};

export interface LauncherResultsProps extends Widget.BoxProps {
  searchText: Binding<string>;
}

const apps = new Apps.Apps({
  nameMultiplier: 2,
  entryMultiplier: 1,
  executableMultiplier: 2,
});

export default function LauncherResults(props: LauncherResultsProps) {
  const appResults = new VarMap<number, Gtk.Widget>([]);

  const updateResults = (searchText: string) => {
    print("LauncherResults/Searching for:", searchText);

    if (searchText.length > 1) {
      const resultApps = apps.fuzzy_query(searchText);

      resultApps.forEach((app, index) => {
        print("App:", app.name);
        appResults.set(index, <AppButton app={app} />);
      });
    }
  };

  const debouncedUpdate = debounce(updateResults, 200);
  props.searchText.subscribe(debouncedUpdate);

  return (
    <revealer
      transitionDuration={config.animations.durationLarge}
      revealChild={true}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      halign={Gtk.Align.CENTER}
    >
      <box className="overview-search-results" vertical>
        {bind(appResults).as((v) => {
          return v.map(([num, app]) => app);
        })}
      </box>
    </revealer>
  );
}
