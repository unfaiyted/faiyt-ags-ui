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

// interface ClaudeCommandProps {
//   clearChat: () => {};
//   appendChatContent: (newContent: ClaudeMessage) => void;
//   service: ClaudeService;
// }

// interface GeminiCommandProps {}

interface SystemMessageProps {
  content: string;
  commandName: string;
}

// const commandHandler = (args) => {
//   if (message.startsWith("/clear")) clearChat();
//   else if (message.startsWith("/load")) {
//     clearChat();
//     claudeService.loadHistory();
//   } else if (message.startsWith("/model"))
//     appendChatContent(
//       SystemMessage({
//         content: `Currently using \`${claudeService.modelName}\``,
//         commandName: "/model",
//         // geminiView,
//       }),
//     );
//   else if (message.startsWith("/prompt")) {
//     const firstSpaceIndex = message.indexOf(" ");
//     const prompt = message.slice(firstSpaceIndex + 1);
//     if (firstSpaceIndex == -1 || prompt.length < 1) {
//       appendChatContent(
//         SystemMessage({
//           content: `Usage: \`/prompt MESSAGE\``,
//           commandName: "/prompt",
//           // geminiView,
//         }),
//       );
//     } else {
//       claudeService.addMessage("user", prompt);
//     }
//   } else if (message.startsWith("/key")) {
//     const parts = message.split(" ");
//     if (parts.length == 1)
//       appendChatContent(
//         SystemMessage({
//           content: `Key stored in \n\`${claudeService.keyPath}\`\n To update this key, type \`/key YOUR_API_KEY\``,
//           commandName: "/key",
//           // geminiView,
//         }),
//       );
//     else {
//       claudeService.key = parts[1];
//       appendChatContent(
//         SystemMessage({
//           content: `Updated API Key at\n\`${claudeService.keyPath}\``,
//           commandName: "/key",
//           // geminiView,
//         }),
//       );
//     }
//   } else if (message.startsWith("/test"))
//     appendChatContent(SystemMessage(markdownTest, `Markdown test`, geminiView));
//   else
//     appendChatContent(SystemMessage(`Invalid command.`, "Error", geminiView));
// };
// type CommandHandler = (args: string) => void;
//
// const commands: Record<string, CommandHandler> = {
//   clear: () => clearChat(),
//   load: () => {
//     clearChat();
//     claudeService.loadHistory();
//   },
//   model: () => {
//     appendChatContent(
//       SystemMessage({
//         content: `Currently using \`${claudeService.modelName}\``,
//         commandName: "/model",
//         // geminiView,
//       }),
//     );
//   },
//   prompt: (args) => {
//     if (!args) {
//       appendChatContent(
//         SystemMessage({
//           content: `Usage: \`/prompt MESSAGE\``,
//           commandName: "/prompt",
//           // geminiView,
//         }),
//       );
//       return;
//     }
//     claudeService.addMessage("user", args);
//   },
//   key: (args) => {
//     if (!args) {
//       appendChatContent(
//         SystemMessage({
//           content: `Key stored in: \n\`${claudeService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
//           commandName: "/key",
//           // geminiView,
//         }),
//       );
//       return;
//     }
//     // claudeService.key = args;
//     appendChatContent(
//       SystemMessage({
//         content: `Updated API Key at\n\`${claudeService.keyPath}\``,
//         commandName: "/key",
//         // geminiView,
//       }),
//     );
//   },
// };

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
