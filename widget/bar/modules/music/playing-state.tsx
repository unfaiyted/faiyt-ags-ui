import { Widget, Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { PlayingStateProps } from "./types";

export default function PlayingState(props: PlayingStateProps) {
  return (
    <label
      valign={Gtk.Align.CENTER}
      className="bar-music-playstate-txt"
      label={props.status.as((v) => {
        switch (v) {
          case Mpris.PlaybackStatus.PLAYING:
            return "play_arrow";
          case Mpris.PlaybackStatus.PAUSED:
            return "pause";
          case Mpris.PlaybackStatus.STOPPED:
            return "stop";
          default:
            return "help";
        }
      })}
      justify={Gtk.Justification.CENTER}
    />
  );
}
