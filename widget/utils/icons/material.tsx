import { Widget } from "astal/gtk3";

export interface MaterialIconProps extends Widget.LabelProps {
  size?: "tiny" | "small" | "normal" | "large" | "big" | "gigantic";
  icon: string;
}

export const MaterialIcon = (props: MaterialIconProps) => (
  <label
    className={`icon-material txt-${props.size}`}
    label={props.icon}
  ></label>
);
