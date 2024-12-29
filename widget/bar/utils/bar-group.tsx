import { Widget } from "astal/gtk3";

export const BarGroup = ({ child }: Widget.BoxProps) => (
  <box className="bar-group-margin bar-sides">
    <box className="bar-group bar-group-standalone bar-group-pad-system">
      {child}
    </box>
  </box>
);

export default BarGroup;
