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
  // nameMultiplier: 2,
  // entryMultiplier: 1,
  // executableMultiplier: 2,
});

export default function LauncherResults(props: LauncherResultsProps) {
  const appResults = new VarMap<number, Apps.Application>([]);
  const hasResults = Variable(false);

  const updateResults = (searchText: string) => {
    print("LauncherResults/Searching for:", searchText);

    appResults.deleteAll();

    if (searchText.length > 1) {
      const resultApps = apps.fuzzy_query(searchText);

      resultApps.forEach((app, index) => {
        print("RESULT-App:", app.name);
        print("APPINDEX", index);
        appResults.set(index, app);
      });

      hasResults.set(resultApps.length > 0);
    }
  };

  const debouncedUpdate = debounce(updateResults, 200);
  const sub = props.searchText.subscribe(debouncedUpdate);

  const setupResults = (self: Widget.Revealer) => {};

  return (
    <revealer
      setup={setupResults}
      transitionDuration={config.animations.durationLarge}
      revealChild={bind(hasResults)}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      halign={Gtk.Align.CENTER}
    >
      <box className="overview-search-results" vertical>
        {bind(appResults).as((v) => {
          return v.map(([num, app]) => <AppButton index={num} app={app} />);
        })}
      </box>
    </revealer>
  );
}
