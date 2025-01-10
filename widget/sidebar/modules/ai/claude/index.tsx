import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import { ChatContent, ChatInput, ChatSendButton, ChatView } from "../index";
import { AIName } from "../index";
import { Variable, bind } from "astal";
import { parseCommand } from "../../../../../utils";
import { ClaudeService } from "../../../../../services/claude";
import { AICommandProps } from "../../../../../handlers/claude-commands";
import { SystemMessage } from "../utils/system-message";
import { ClaudeCommands } from "../../../../../handlers/claude-commands";

export interface ClaudeAIProps extends Widget.BoxProps {}

// [AIName.GEMINI]: {
//   label: "Gemini",
//   name: AIName.GEMINI,
//   sendCommand: geminiSendMessage,
//   contentWidget: geminiView,
//   commandBar: geminiCommands,
//   tabIcon: geminiTabIcon,
//   placeholderText: getString("Message Gemini..."),
// },

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
  print("ClaudeAI Initilizer");
  const chatContent = Variable<Array<Gtk.Widget>>([]);
  const input = Variable("");

  print("Service Starting");
  const claudeService = new ClaudeService();

  const appendChatContent = (newContent: Gtk.Widget) => {
    chatContent.set(chatContent.get().concat(newContent));
  };

  const clearChat = () => {
    chatContent.set([]);
  };

  const sendMessage = (message: string) => {
    print("Sending message:", message);
    // Check if text or API key is empty
    if (message.length == 0) return;
    if (!claudeService.isKeySet()) {
      // ClaudeService.key = message;
      appendChatContent(
        SystemMessage({
          content: `Key saved to\n\`${claudeService.keyPath}\``,
          commandName: "API Key",
          // geminiView,
        }),
      );
      message = "";
      return;
    }
    // Commands
    if (message.startsWith("/")) {
      const { command, args } = parseCommand(message);

      const aiCommand: AICommandProps = {
        args,
        clearChat,
        appendChatContent,
        service: claudeService,
      };

      const commands = ClaudeCommands(aiCommand);
      const commandHandler = commands[command];

      if (commandHandler) {
        commandHandler(args);
      } else {
        print("Invalid command");
        appendChatContent(
          SystemMessage({
            content: "Invalid command.",
            commandName: "Error",
            // geminiView,
          }),
        );
      }
    } else {
      claudeService.send(message);
    }
  };

  const sendMessageReturn = (self: Widget.Entry, event: Gdk.Event) => {
    sendMessage(input.get());
  };

  const sendMessageClick = (self: Widget.Button, event: Astal.ClickEvent) => {
    sendMessage(input.get());
  };

  const handleInputChanged = (self: Widget.Entry) => {
    input.set(self.get_text());
  };

  return (
    <box {...props}>
      <ChatView>
        <WelcomeMessage />
        <ChatContent children={bind(chatContent)} />
      </ChatView>
      <box>
        <ChatInput
          aiName={AIName.CLAUDE}
          handleSubmit={sendMessageReturn}
          onChanged={handleInputChanged}
        />
        <ChatSendButton onClick={sendMessageClick} />
      </box>
    </box>
  );
}
