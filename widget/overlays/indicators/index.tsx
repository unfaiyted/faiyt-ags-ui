import { Widget, Gtk, Gdk } from "astal/gtk3";
import config from "../../../utils/config";
import { Binding, Variable, bind } from "astal";

export interface ProgressBarProps extends Widget.BoxProps {
  value: Binding<number>;
}

// Expects a value between 0 and 100
export const ProgressBar = (props: ProgressBarProps) => {
  const { value, ...rest } = props;

  return (
    <box
      className={`osd-progress progress-bar-container ${props.className}`}
      css={`
        height: 10px;
      `}
      {...rest}
    >
      <box
        className="progress-bar-fill"
        css={`
          background-color: #4caf50;
          transition: width 0.3s ease-in-out;
          width: ${value.as((v) => Math.min(Math.max(v, 0), 100) + "%")};
        `}
      />
    </box>
  );
};

export interface IndicatorCardProps extends Widget.BoxProps {
  value: Binding<number>;
}

export const IndicatorCard = (props: IndicatorCardProps) => {
  const label = Variable("0");

  const disable = () => {
    label.set("󰖭");
  };

  return (
    <box vertical hexpand className={`osd-bg osd-value ${props.className}`}>
      <box vexpand>
        <label
          xalign={0}
          yalign={0}
          hexpand
          className="osd-label"
          label={props.name}
        />
        <label
          hexpand={false}
          className="osd-value-txt"
          label={props.value.as((v) => v.toString())}
        />
      </box>
      <ProgressBar
        className={`${props.className}-progress`}
        hexpand
        vertical={false}
        value={props.value}
      />
    </box>
  );
};

export interface IndicatorContainerProps extends Widget.RevealerProps {
  // TODO: correct type
  children?: any;
}

export const IndicatorsContainer = (props: IndicatorContainerProps) => {
  const isShow = Variable(true);
  const showClass = "osd-show";
  const hideClass = "osd-hide";

  return (
    <revealer
      {...props}
      className={bind(isShow).as((v) => (v ? showClass : hideClass))}
      transitionDuration={config.animations.durationSmall}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      revealChild={true}
    >
      <box halign={Gtk.Align.CENTER} vertical={false} className="">
        {props?.children || props?.child}
      </box>
    </revealer>
  );
};

export default IndicatorsContainer;
