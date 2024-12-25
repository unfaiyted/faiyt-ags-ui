import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";

export interface MusicModuleProps extends Widget.BoxProps {}

export default function Music(musicModuleProps: MusicModuleProps) {
  const { setup, child, ...props } = musicModuleProps;

  return (
    <box
      {...props}
      className="bar-sidemodule"
      setup={(self) => {
        setup?.(self);
      }}
    >
      {child}
      MusicModule
    </box>
  );
}
