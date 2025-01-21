import { Widget, Gtk } from "astal/gtk3";
import { IndicatorCard } from "./index";
import { Variable, bind } from "astal";

// const audio: Wp.Audio | undefined = Wp.get_default()?.audio;

export const BrightnessIndicator = (props: Widget.BoxProps) => {
  const value = Variable(0);
  const name = Variable("Brightness");

  // if (audio != null)
  //   audio.connect("notify", (audio: Wp.Audio) => {
  //     print("Volume:", audio.defaultSpeaker.volume);
  //     value.set(audio.defaultSpeaker.volume);
  //
  //     // const isUsingHeadphone =
  //     // audio.defaultSpeaker.mediaClass === Wp.MediaClass.VIDEO_RECORDER;
  //   });
  //
  return (
    <IndicatorCard
      {...props}
      className={`element-show osd-brightness ${props.className}`}
      name={bind(name)}
      value={bind(value)}
    />
  );
};
