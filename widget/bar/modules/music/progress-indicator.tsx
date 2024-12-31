import { Widget, Gtk } from "astal/gtk3";

export const TrackProgress = (props: Widget.CircularProgressProps) => {
  // const _updateProgress = (circprog: Widget.CircularProgress) => {
  //   // first player?
  //   const player = mpris.get_players()[0];
  //   if (!player) return;
  //   // Set circular progress value
  //   circprog.css = `font-size: ${Math.max((player.position / player.length) * 100, 0)}px;`;
  // };

  return (
    <circularprogress
      value={props.value}
      css={`
        opacity: 0.4;
      `}
      className="bar-music-circprog"
      halign={Gtk.Align.START}
      valign={Gtk.Align.CENTER}
    ></circularprogress>
  );
};

export default TrackProgress;
