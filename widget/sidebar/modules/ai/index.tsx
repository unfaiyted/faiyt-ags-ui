import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import TabContainer, {
  TabContainerProps,
  TabContent,
} from "../../../utils/containers/tabs";
import { PhosphorIcons } from "../../../../phosphor-icons";
import { timeout } from "astal/time";
import ClaudeAI from "./claude";

export enum AIName {
  CLAUDE = "claude",
  GEMINI = "gemini",
  GPT = "gpt",
  OLLAMA = "ollama",
  WAIFU = "waifu",
}

export interface AIItem {
  label: string;
  name: AIName;
  sendCommand: (message: string) => void;
  contentWidget: Widget.BoxProps;
  commandBar: Widget.BoxProps;
  tabIcon: Widget.IconProps;
  placeholderText: string;
}

export const EXPAND_INPUT_THRESHOLD = 30;

// export const AI_LIST: Record<AIName, AIItem> = {
//   [AIName.CLAUDE]: {
//     label: "Claude (3.5)",
//     name: AIName.CLAUDE,
//   }
// sendCommand: geminiSendMessage,
// contentWidget: geminiView,
// commandBar: geminiCommands,
// tabIcon: geminiTabIcon,
// placeholderText: getString("Message Gemini..."),
// },
// [AIName.GEMINI]: {
//   label: "Gemini",
//   name: AIName.GEMINI,
//   sendCommand: geminiSendMessage,
//   contentWidget: geminiView,
//   commandBar: geminiCommands,
//   tabIcon: geminiTabIcon,
//   placeholderText: getString("Message Gemini..."),
// },
// [AIName.GPT]: {
//   label: "chatGPT",
//   name: AIName.GPT,
//   sendCommand: chatGPTSendMessage,
//   contentWidget: chatGPTView,
//   commandBar: chatGPTCommands,
//   tabIcon: chatGPTTabIcon,
//   placeholderText: getString("Message the model..."),
// },
// [AIName.WAIFU]: {
//   label: "Waifu",
//   name: AIName.WAIFU,
//   sendCommand: waifuSendMessage,
//   contentWidget: waifuView,
//   commandBar: waifuCommands,
//   tabIcon: waifuTabIcon,
//   placeholderText: getString("Enter tags"),
// },
// [AIName.OLLAMA]: {
//   label: "Ollama",
//   name: AIName.OLLAMA,
//   sendCommand: booruSendMessage,
//   contentWidget: booruView,
//   commandBar: booruCommands,
//   tabIcon: booruTabIcon,
//   placeholderText: getString("Enter tags"),
// },
// };

export const AI_TABS: Record<AIName, TabContent> = {
  [AIName.CLAUDE]: {
    name: AIName.CLAUDE,
    content: ClaudeAI,
    icon: PhosphorIcons.brain,
  },
  [AIName.GEMINI]: {
    name: AIName.GEMINI,
    content: ClaudeAI,
    icon: PhosphorIcons.diamond,
  },
  [AIName.GPT]: {
    name: AIName.GPT,
    content: ClaudeAI,
    icon: PhosphorIcons.chat,
  },
  [AIName.WAIFU]: {
    name: AIName.WAIFU,
    content: ClaudeAI,
    icon: PhosphorIcons.onigiri,
  },
  [AIName.OLLAMA]: {
    name: AIName.OLLAMA,
    content: ClaudeAI,
    icon: PhosphorIcons.alien,
  },
};

export interface ChatEntryProps extends Widget.EntryProps {
  aiName: AIName;
  onSubmit?: (self: Widget.Entry, event: Gdk.Event) => void;
  // onReturn?: (self: Widget.Entry, event: Gdk.Event) => void;
}

export const ChatView = (props: Widget.BoxProps) => {
  const scrollableSetup = (self: Widget.Scrollable) => {
    self.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC);
    const vScrollBar = self.get_vscrollbar();
    vScrollBar.get_style_context().add_class("sidebar-scrollbar");

    // timeout(1, () => {
    //   // self.child.set_focus_vadjustment(vScrollBar.get_adjustment());
    // });

    const adjustment = self.get_vadjustment();
    adjustment.connect("changed", () =>
      timeout(1, () => {
        // print("Adjustment changed:", adjustment.get_value());
        // if (!ChatInput.hasFocus) return;
        adjustment.set_value(
          adjustment.get_upper() - adjustment.get_page_size(),
        );
      }),
    );
  };

  return (
    <box homogeneous>
      <scrollable vexpand setup={scrollableSetup}>
        <box vertical>{props.children}</box>
      </scrollable>
    </box>
  );
};

export const ChatContent = (props: Widget.BoxProps) => {
  return (
    <box className="spacing-v-5" vertical>
      {props.children}
    </box>
  );
};

export const ChatInput = (props: ChatEntryProps) => {
  const handleKeyPress = (self: Widget.Entry, event: Gdk.Event) => {
    // print(self);
    const key = event.get_keyval()[1];

    if (key === Gdk.KEY_Return || key === Gdk.KEY_KP_Enter) {
      if (event.get_state()[1] !== Gdk.KEY_Shift_L) {
        print("Sending message:", self.get_text());
        props.onSubmit?.(self, event);
      }
    }
  };
  return (
    <entry
      onKeyPressEvent={handleKeyPress}
      accept-tabs={false}
      wrap-mode={Gtk.WrapMode.WORD_CHAR}
      expand
      className="sidebar-chat-entry txt txt-smallie"
      {...props}
    />
  );
};

export const ChatSendButton = (props: Widget.ButtonProps) => {
  return (
    <button
      valign={Gtk.Align.END}
      tooltipText={props.name}
      onClick={props.onClick}
      label="arrow_upward"
      className={`sidebar-chat-send txt-norm icon-material ${props.className}`}
    />
  );
};

export interface AIModulesProps extends Widget.BoxProps {}

export default function AIModules(props: AIModulesProps) {
  const aiTabsArray: TabContent[] = Object.values(AI_TABS);

  return (
    <box>
      <TabContainer
        {...props}
        className="margin-top-5"
        orientation={Gtk.Orientation.VERTICAL}
        tabs={aiTabsArray}
        hideLabels
        active={0}
      />
    </box>
  );
}
