import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { Variable, Binding } from "astal";
import { bind } from "astal";

const mpris = Mpris.get_default();

export interface MusicModuleProps extends Widget.BoxProps {}

export default function Music(musicModuleProps: MusicModuleProps) {
  const { setup, child, ...props } = musicModuleProps;

  let player = mpris.get_players()[0];

  mpris.connect("player-added", () => {
    player = mpris.get_players()[0];
  });

  const boxSetup = (self: Widget.Box) => {
    setup?.(self);

    player.connect("notify", (player: Mpris.Player, pspec) => {
      print("Player:", player.playback_status);
      print("player position:", player.position);
      print("player length:", player.length);
      // print("player metadata title:", player.metadata.title);
      self.toggleClassName(
        "bar-music-playstate-playing",
        player.playback_status == Mpris.PlaybackStatus.PLAYING,
      );
      self.toggleClassName(
        "bar-music-playstate",
        player.playback_status == Mpris.PlaybackStatus.PAUSED,
      );
    });
  };

  return (
    <box
      valign={Gtk.Align.CENTER}
      className="bar-music-playstate"
      homogeneous={true}
      setup={boxSetup}
    >
      <PlayingState status={bind(player, "playback_status").as((v) => v)} />
      <TrackProgress
        value={bind(player, "position")}
        startAt={0}
        endAt={bind(player, "length")}
      />
      <TrackTitle title={bind(player, "title")} />
    </box>
  );
}

export interface PlayingStateProps extends Widget.LabelProps {
  status: Binding<Mpris.PlaybackStatus>;
}
export interface TrackTitleProps extends Widget.LabelProps {
  title: Binding<string>;
}

const PlayingState = (props: PlayingStateProps) => {
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
};

const TrackTitle = (props: TrackTitleProps) => {
  return (
    <label
      className="txt-smallie bar-music-txt"
      expand={true}
      label={props.title}
      // label={bind(mpris.get_players()[0], "metadata.title")}
      // extraSetup={(self) =>
      // self.hook(Mpris, _updateTitle).poll(3000, _updateTitle)
    ></label>
  );
};

export interface TrackProgressProps extends Widget.CircularProgressProps {
  value: Binding<number>;
  startAt: Binding<number>;
  endAt: Binding<number>;
}

const TrackProgress = (props: Widget.CircularProgressProps) => {
  const _updateProgress = (circprog: Widget.CircularProgress) => {
    // first player?
    const player = mpris.get_players()[0];
    if (!player) return;
    // Set circular progress value
    circprog.css = `font-size: ${Math.max((player.position / player.length) * 100, 0)}px;`;
  };

  return (
    <circularprogress
      value={props.value}
      startAt={props.startAt}
      endAt={props.endAt}
      // className="bar-music-circprog"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    ></circularprogress>
  );
};
//     className: "bar-music-circprog",
//     vpack: "center",
//     hpack: "center",
//     extraSetup: (self) =>
//       self.hook(Mpris, _updateProgress).poll(3000, _updateProgress),
//   });
// };
