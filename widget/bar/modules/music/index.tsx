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

// TODO: Would be good if we could use a reveal animation to hide the playing text and
// double click the icon to expand it out and again to hide it so only the play icon is present.

const mpris = Mpris.get_default();

export default function Music(musicModuleProps: MusicModuleProps) {
  const { setup, child, ...props } = musicModuleProps;

  let lastPlayer: Mpris.Player | null = mpris.get_players()[0];

  const player = Variable(mpris.get_players()[0]).poll(1000, () => {
    const currentPlayer = mpris.get_players()[0];
    // print("Current player:", currentPlayer.identity);
    if (currentPlayer.identity === lastPlayer.identity) return currentPlayer;
    print("Player changed:", currentPlayer.identity);
    updatePlayer(currentPlayer);
    return mpris.get_players()[0];
  });

  const playerCount = Variable(mpris.get_players().length);

  const value = Variable(0);
  const title = Variable(player.get().title);
  const artist = Variable(player.get().artist);
  const album = Variable(player.get().album);
  const playbackStatus = Variable(player.get().playbackStatus);

  if (mpris) {
    mpris.connect("player-closed", () => {
      print("Player closed");
      updatePlayer();
    });

    mpris.connect("player-added", () => {
      print("Player added");
      updatePlayer();
    });
  }

  const updatePlayer = (currentPlayer?: Mpris.Player) => {
    print(`Updating player`);
    player.set(currentPlayer || mpris.get_players()[0]);
    playerCount.set(mpris.get_players().length);
    value.set(player.get().position / player.get().length);

    player.get().connect("notify", (p) => {
      value.set(p.position / p.length);
      title.set(p.title);
      artist.set(p.artist);
      album.set(p.album);
      playbackStatus.set(p.playbackStatus);
      // print("p:", p.playback_status);
      // print("p position:", p.position);
      // print("p length:", p.length);
    });
  };

  const handleClick = (_self: Widget.EventBox, event: Astal.ClickEvent) => {
    if (event.button == Gdk.BUTTON_PRIMARY) {
      print("Clicked");
      player.get().playback_status == Mpris.PlaybackStatus.PAUSED
        ? player.get().play()
        : player.get().pause();
    } else if (event.button == Gdk.BUTTON_SECONDARY) {
      print("Clicked right");
      player.get().next();
    } else if (event.button == Gdk.BUTTON_MIDDLE) {
      print("Clicked middle");
      player.get().previous();
    }
  };

  // if (!player) return <box></box>;

  updatePlayer(player.get());
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
              className={bind(playbackStatus).as((v) => {
                switch (v) {
                  case Mpris.PlaybackStatus.PLAYING:
                    return "bar-music-playstate-playing";
                  case Mpris.PlaybackStatus.PAUSED:
                  case Mpris.PlaybackStatus.STOPPED:
                  default:
                    return "bar-music-playstate";
                }
              })}
              // "bar-music-playstate"
              // homogeneous={true}
              // setup={boxSetup}
              css={`
                min-width: 2px;
                padding-left: 0.35rem;
              `}
            >
              <PlayingState status={bind(playbackStatus)} />
              {/* <TrackProgress startAt={0} endAt={360} value={bind(value)} /> */}
              <TrackTitle title={bind(title)} artist={bind(artist)} />
            </box>
          </overlay>
        </box>
      </BarGroup>
    </eventbox>
  );
}
