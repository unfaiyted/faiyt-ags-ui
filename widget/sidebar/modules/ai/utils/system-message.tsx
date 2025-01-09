import { Widget, Gtk, Gdk } from "astal/gtk3";

export interface SystemMessageProps extends Widget.BoxProps {
  commandName: string;
  content: string;
}

export const SystemMessage = (props: SystemMessageProps) => {
  const messageContent = MessageContent(props.content);
  return (
    <box className="sidebar-chat-message">
      <box vertical>
        <label
          xalign={0}
          halign={Gtk.Align.START}
          wrap
          label={`System  •  ${props.commandName}`}
          className="txt txt-bold sidebar-chat-name sidebar-chat-name-system"
        />
        {messageContent}
      </box>
    </box>
  );
};
