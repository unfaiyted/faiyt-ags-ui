import { Variable } from "astal";
import { BaseBarContentProps, BarMode } from "../types";
import NormalBarContent from "./normal";
import FocusBarContent from "./focus";
import NothingBarContent from "./nothing";
import { bind } from "astal";

export default function BarModeContent(baseBarProps: BaseBarContentProps) {
  const { setup, child, ...props } = baseBarProps;

  const getModeContent = () => {
    switch (props.mode.get()) {
      case BarMode.Normal:
        return <NormalBarContent {...props} />;
      case BarMode.Focus:
        return <FocusBarContent {...props} />;
      case BarMode.Nothing:
      default:
        return <NothingBarContent {...props} />;
    }
  };
  const barContent = Variable(getModeContent());

  props.mode.subscribe(() => {
    barContent.set(getModeContent());
  });

  return <box>{bind(barContent).as((v) => v)}</box>;
}

export { BarModeContent };
