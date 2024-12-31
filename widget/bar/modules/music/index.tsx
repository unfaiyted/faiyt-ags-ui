import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { Variable, Binding } from "astal";
import { bind } from "astal";
import BarGroup from "../../utils/bar-group";
import { MusicModuleProps } from "./types";
import PlayingState from "./playing-state";
import TrackTitle from "./track-title";
import TrackProgress from "./progress-indicator";

const mpris = Mpris.get_default();

export default function Music(musicModuleProps: MusicModuleProps) {
  const { setup, child, ...props } = musicModuleProps;

  let player = mpris.get_players()[0];

  const value = Variable(0);

  mpris.connect("player-added", () => {
    player = mpris.get_players()[0];
  });

  const boxSetup = (self: Widget.Box) => {
    setup?.(self);

    player.connect("notify", (player: Mpris.Player, pspec) => {
      self.toggleClassName(
        "bar-music-playstate-playing",
        player.playback_status == Mpris.PlaybackStatus.PLAYING,
      );
      self.toggleClassName(
        "bar-music-playstate",
        player.playback_status == Mpris.PlaybackStatus.PAUSED,
      );

      value.set(player.position / player.length);
    });
  };

  const handleClick = (_self: Widget.EventBox, event: Astal.ClickEvent) => {
    if (event.button == Gdk.BUTTON_PRIMARY) {
      print("Clicked");
      player.playback_status == Mpris.PlaybackStatus.PAUSED
        ? player.play()
        : player.pause();
    } else if (event.button == Gdk.BUTTON_SECONDARY) {
      print("Clicked right");
      player.next();
    } else if (event.button == Gdk.BUTTON_MIDDLE) {
      print("Clicked middle");
      player.previous();
    }
  };

  return (
    <eventbox onClick={handleClick}>
      <BarGroup>
        <box homogeneous={true}>
          <overlay
            overlay={
              <TrackProgress startAt={0} endAt={360} value={bind(value)} />
            }
          >
            <box
              valign={Gtk.Align.CENTER}
              className="bar-music-playstate"
              // homogeneous={true}
              setup={boxSetup}
              css={`
                min-width: 2px;
                padding-left: 0.35rem;
              `}
            >
              <PlayingState
                status={bind(player, "playback_status").as((v) => v)}
              />
              {/* <TrackProgress startAt={0} endAt={360} value={bind(value)} /> */}
              <TrackTitle
                title={bind(player, "title")}
                artist={bind(player, "artist")}
              />
            </box>
          </overlay>
        </box>
      </BarGroup>
    </eventbox>
  );
}
