import { Widget } from "astal/gtk3";
import NetworkIndicator from "./network";

export interface StatusIndicatorsProps extends Widget.BoxProps {}

export default function StatusIndicators(props: StatusIndicatorsProps) {
  return (
    <box className="spacing-h-15">
      <NetworkIndicator />
    </box>
  );
}
