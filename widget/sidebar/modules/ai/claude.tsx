import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import { ChatContent, ChatInput, ChatSendButton, ChatView } from "./index";
import { AIName } from "./index";
import { Variable, bind } from "astal";
import { ClaudeService } from "../../../../services/claude";
import { timeout } from "astal/time";
import { ChatMessage } from "./utils/chat-message";
import { SystemMessage } from "./uitls/system-message";

const chatContent = Variable<Array<Widget.Box>>([]);
const claudeService = new ClaudeService();

const appendChatContent = (newContent) => {
  chatContent.set(chatContent.get().concat(newContent));
};

const clearChat = () => {
  chatContent.set([]);
};

type CommandHandler = (args: string) => void;

const commands: Record<string, CommandHandler> = {
  clear: () => clearChat(),
  load: () => {
    clearChat();
    claudeService.loadHistory();
  },
  model: () => {
    appendChatContent(
      SystemMessage(
        `Currently using \`${GeminiService.modelName}\``,
        "/model",
        geminiView,
      ),
    );
  },
  prompt: (args) => {
    if (!args) {
      appendChatContent(
        SystemMessage(`Usage: \`/prompt MESSAGE\``, "/prompt", geminiView),
      );
      return;
    }
    claudeService.addMessage("user", args);
  },
  key: (args) => {
    if (!args) {
      appendChatContent(
        SystemMessage(
          `Key stored in: \n\`${GeminiService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
          "/key",
          geminiView,
        ),
      );
      return;
    }
    // claudeService.key = args;
    appendChatContent(
      SystemMessage(
        `Updated API Key at\n\`${GeminiService.keyPath}\``,
        "/key",
        geminiView,
      ),
    );
  },
};

export interface ClaudeAIProps extends Widget.BoxProps {}

const handleCommand = (message: string) => {};

// [AIName.GEMINI]: {
//   label: "Gemini",
//   name: AIName.GEMINI,
//   sendCommand: geminiSendMessage,
//   contentWidget: geminiView,
//   commandBar: geminiCommands,
//   tabIcon: geminiTabIcon,
//   placeholderText: getString("Message Gemini..."),
// },

const sendMessage = (message: string) => {
  print("Sending message:", message);
  // Check if text or API key is empty
  if (message.length == 0) return;
  if (!claudeService.isKeySet()) {
    // ClaudeService.key = message;
    chatContent.add(
      SystemMessage(
        `Key saved to\n\`${ClaudeService.keyPath}\``,
        "API Key",
        geminiView,
      ),
    );
    message = "";
    return;
  }
  // Commands
  if (message.startsWith("/")) {
    if (message.startsWith("/clear")) clearChat();
    else if (message.startsWith("/load")) {
      clearChat();
      ClaudeService.loadHistory();
    } else if (message.startsWith("/model"))
      chatContent.add(
        SystemMessage(
          `${getString("Currently using")} \`${GeminiService.modelName}\``,
          "/model",
          geminiView,
        ),
      );
    else if (message.startsWith("/prompt")) {
      const firstSpaceIndex = message.indexOf(" ");
      const prompt = message.slice(firstSpaceIndex + 1);
      if (firstSpaceIndex == -1 || prompt.length < 1) {
        chatContent.add(
          SystemMessage(`Usage: \`/prompt MESSAGE\``, "/prompt", geminiView),
        );
      } else {
        GeminiService.addMessage("user", prompt);
      }
    } else if (message.startsWith("/key")) {
      const parts = message.split(" ");
      if (parts.length == 1)
        chatContent.add(
          SystemMessage(
            `${getString("Key stored in:")} \n\`${GeminiService.keyPath}\`\n${getString("To update this key, type")} \`/key YOUR_API_KEY\``,
            "/key",
            geminiView,
          ),
        );
      else {
        GeminiService.key = parts[1];
        chatContent.add(
          SystemMessage(
            `${getString("Updated API Key at")}\n\`${GeminiService.keyPath}\``,
            "/key",
            geminiView,
          ),
        );
      }
    } else if (message.startsWith("/test"))
      chatContent.add(SystemMessage(markdownTest, `Markdown test`, geminiView));
    else
      chatContent.add(
        SystemMessage(getString(`Invalid command.`), "Error", geminiView),
      );
  } else {
    GeminiService.send(message);
  }
};

const sendMessageReturn = (self: Widget.Entry, event: Gdk.Event) => {
  sendMessage("seee");
};

const sendMessageClick = (self: Widget.Button, event: Astal.ClickEvent) => {
  sendMessage("seee");
};

const WelcomeMessage = () => {
  return (
    <box homogeneous vexpand>
      <box className="spacing-v-15" vertical valign={Gtk.Align.CENTER}>
        <label label="Welcome to Claude AI!" />
      </box>
    </box>
  );
};

export default function ClaudeAI(props: ClaudeAIProps) {
  return (
    <box {...props}>
      <ChatView>
        <WelcomeMessage />
        <ChatContent children={bind(chatContent)} />
      </ChatView>
      <box>
        <ChatInput aiName={AIName.CLAUDE} onSubmit={sendMessageReturn} />
        <ChatSendButton onClick={sendMessageClick} />
      </box>
    </box>
  );
}
