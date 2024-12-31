import { Widget } from "astal/gtk3";
import { Variable, Binding } from "astal";
import { bind } from "astal";
import { TrackTitleProps } from "./types";

export const TrackTitle = (props: TrackTitleProps) => {
  function trimTrackTitle(title: string) {
    if (!title) return "";
    const cleanPatterns = [
      /【[^】]*】/, // Touhou n weeb stuff
      " [FREE DOWNLOAD]", // F-777
    ];
    cleanPatterns.forEach((expr) => (title = title.replace(expr, "")));
    return title;
  }

  const trimmedTitle = Variable(trimTrackTitle(props.title.get()));
  const artist = Variable(props.artist.get());

  props.title.subscribe((title) => {
    print("Track title:", title);
    trimmedTitle.set(trimTrackTitle(title));
    artist.set(props.artist.get());
  });

  return (
    <label
      className="txt-smallie bar-music-txt"
      css={`
        padding-left: 0.5rem;
      `}
      expand={true}
      label={bind(trimmedTitle).as((v) => `${v} - ${artist.get()}`)}
    ></label>
  );
};

export default TrackTitle;
