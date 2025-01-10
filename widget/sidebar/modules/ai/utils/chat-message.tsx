import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import GLib from "gi://GLib";
import ChatCodeBlock from "./chat-code-block";
import ChatMessageContent from "./chat-message-content";
import { ClaudeMessage } from "../../../../../services/claude";
// import {ChatMessage} from "./"

// const LATEX_DIR = `${GLib.get_user_cache_dir()}/ags/media/latex`;
// const CUSTOM_SOURCEVIEW_SCHEME_PATH = `${App.configDir}/assets/themes/sourceviewtheme${darkMode.value ? '' : '-light'}.xml`;
// const CUSTOM_SCHEME_ID = `custom${darkMode.value ? '' : '-light'}`;
const USERNAME = GLib.get_user_name();

//   setup: (self) => self
//                     .hook(message, (self, isThinking) => {
//                         messageArea.shown = message.thinking ? 'thinking' : 'message';
//                     }, 'notify::thinking')
//                     .hook(message, (self) => { // Message update
//                         messageContentBox.attribute.fullUpdate(messageContentBox, message.content, message.role != 'user');
//                     }, 'notify::content')
//                     .hook(message, (label, isDone) => { // Remove the cursor
//                         messageContentBox.attribute.fullUpdate(messageContentBox, message.content, false);
//                     j, 'notify::done')
//                 ,
//             })

const TextSkeleton = (extraClassName = "") => (
  <box className={`sidebar-chat-message-skeletonline ${extraClassName}`} />
);

const ChatMessageLoadingSkeleton = () => (
  <box
    vertical
    className="spacing-v-5"
    children={Array.from({ length: 3 }, (_, id) =>
      TextSkeleton(`sidebar-chat-message-skeletonline-offset${id}`),
    )}
  />
);

export interface ChatMessageProps extends Widget.BoxProps {
  commandName: string;
  message: ClaudeMessage;
  modelName: string;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;

  return (
    <box className="sidebar-chat-message">
      <box vertical>
        <label
          xalign={0}
          halign={Gtk.Align.START}
          wrap
          label={message.role == "user" ? USERNAME : props.modelName}
          className={`txt txt-bold sidebar-chat-name sidebar-chat-name-${message.role == "user" ? "user" : "bot"}`}
        />
        <box homogeneous className="sidebar-chat-messagearea">
          <stack shown={message.thinking ? "thinking" : "message"}>
            <ChatMessageLoadingSkeleton name="thinking" />
            <ChatMessageContent
              name="message"
              content={props.message.content}
              {...props}
            />
          </stack>
        </box>
      </box>
    </box>
  );
};
