import { Widget, Gtk } from "astal/gtk3";
import { SystemMessage } from "../widget/sidebar/modules/ai/utils/system-message";
import { ChatMessage } from "../widget/sidebar/modules/ai/utils/chat-message";
import { ClaudeService } from "../services/claude";
import { ClaudeMessage } from "../services/claude";

type Command = (args: string) => void;

export interface AICommandProps {
  args: string;
  clearChat: () => void;
  appendChatContent: (newContent: Gtk.Widget) => void;
  service: ClaudeService; // TODO: Add GeminiService and other services
}

export const ClaudeCommands = (
  command: AICommandProps,
): Record<string, Command> => {
  const { args, service, appendChatContent, clearChat } = command;

  const commands = {
    clear: () => {
      clearChat();
    },

    load: () => {
      clearChat();
      service.loadHistory();
    },

    model: () => {
      appendChatContent(
        SystemMessage({
          content: `Currently using \`${service.modelName}\``,
          commandName: "/model",
        }),
      );
    },

    prompt: (args: string) => {
      if (!args) {
        appendChatContent(
          SystemMessage({
            content: "Usage: `/prompt MESSAGE`",
            commandName: "/prompt",
          }),
        );
        return;
      }
      service.addMessage("user", args);
    },

    key: (args: string) => {
      if (!args) {
        appendChatContent(
          SystemMessage({
            content: `Key stored in: \n\`${service.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
            commandName: "/key",
          }),
        );
        return;
      }

      service.key = args;
      appendChatContent(
        SystemMessage({
          content: `Updated API Key at\n\`${service.keyPath}\``,
          commandName: "/key",
        }),
      );
    },

    help: () => {
      const availableCommands = Object.keys(commands)
        .map((cmd) => `/${cmd}`)
        .join(", ");
      print("Available", availableCommands);
      appendChatContent(
        SystemMessage({
          content: `Available commands: ${availableCommands}`,
          commandName: "/help",
        }),
      );
    },
  };
  return commands;
};
