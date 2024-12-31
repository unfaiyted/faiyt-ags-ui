import { Widget } from "astal/gtk3";

export const BarGroup = ({ child, className }: Widget.BoxProps) => (
  <box className={`bar-group-margin bar-sides ${className}`}>
    <box className="bar-group bar-group-standalone bar-group-pad-system">
      {child}
    </box>
  </box>
);

export default BarGroup;
