import { Widget, Gtk } from "astal/gtk3";
import { ChatCodeBlock } from "./chat-code-block";
import config from "../../../../../utils/config";
import { ClaudeMessage } from "../../../../../services/claude";
import GtkSource from "gi://GtkSource?version=4";
import { Binding } from "astal";

export interface MessageContentProps extends Widget.BoxProps {
  content: string | Binding<string>;
}

const Divider = () =>
  new Widget.Box({
    className: "sidebar-chat-divider",
  });

const md2pango = (content: string) => {
  return content;
};

const TextBlock = (content = "") =>
  new Widget.Label({
    halign: Gtk.Align.FILL,
    className: "txt sidebar-chat-txtblock sidebar-chat-txt",
    useMarkup: true,
    xalign: 0,
    wrap: true,
    selectable: true,
    label: content,
  });

export const ChatMessageContent = (props: MessageContentProps) => {
  const contentBox = new Widget.Box({
    ...props,
    className: "sidebar-chat-message-content",
  });

  const updateText = (item: GtkSource.View, text: string) => {
    item.get_buffer().set_text(text, -1);
  };

  const update = (content: string, useCursor = false) => {
    print("update called with:", content);
    // Clear and add first text widget
    const children = contentBox.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.destroy();
    }
    contentBox.add(TextBlock());
    // Loop lines. Put normal text in markdown parser
    // and put code into code highlighter (TODO)
    let lines = content.split("\n");
    let lastProcessed = 0;
    let inCode = false;
    for (const [index, line] of lines.entries()) {
      // Code blocks
      const codeBlockRegex = /^\s*```([a-zA-Z0-9]+)?\n?/;
      if (codeBlockRegex.test(line)) {
        const kids = contentBox.get_children();
        const lastKid = kids[kids.length - 1];
        const blockContent = lines.slice(lastProcessed, index).join("\n");
        if (!inCode) {
          if (lastKid instanceof Widget.Label) {
            lastKid.label = md2pango(blockContent);

            const content = codeBlockRegex.exec(line)?.[1];
            if (content) {
              contentBox.add(ChatCodeBlock("", content));
            }
          } else {
            print("Last kid is not a label, unexpectedly.");
          }
        } else {
          if (lastKid instanceof GtkSource.View) {
            updateText(lastKid, blockContent);
            contentBox.add(TextBlock());
          } else {
            print("Last kid is GtkSource.View, unexpectedly");
          }
        }

        lastProcessed = index + 1;
        inCode = !inCode;
      }
      // Breaks
      const dividerRegex = /^\s*---/;
      if (!inCode && dividerRegex.test(line)) {
        const kids = contentBox.get_children();
        const lastLabel = kids[kids.length - 1] as Widget.Label;
        const blockContent = lines.slice(lastProcessed, index).join("\n");
        lastLabel.label = md2pango(blockContent);
        contentBox.add(Divider());
        contentBox.add(TextBlock());
        lastProcessed = index + 1;
      }
    }
    if (lastProcessed < lines.length) {
      const kids = contentBox.get_children();
      const lastLabel = kids[kids.length - 1];
      let blockContent = lines.slice(lastProcessed, lines.length).join("\n");
      if (!inCode) {
        const currLabel = lastLabel as Widget.Label;
        currLabel.label = `${md2pango(blockContent)}${useCursor ? config.ai.writingCursor : ""}`;
      } else {
        const currItem = lastLabel as GtkSource.View;
        currItem.get_buffer().set_text(blockContent, -1);
      }
    }
    // Debug: plain text
    // contentBox.add(Label({
    //     hpack: 'fill',
    //     className: 'txt sidebar-chat-txtblock sidebar-chat-txt',
    //     useMarkup: false,
    //     xalign: 0,
    //     wrap: true,
    //     selectable: true,
    //     label: '------------------------------\n' + md2pango(content),
    // }))
    contentBox.show_all();
  };
  // contentBox.attribute.fullUpdate(contentBox, content, false);
  if (props.content instanceof Binding) {
    print("Binding content subscribed");
    props.content.subscribe(update);
    update(props.content.get());
  } else update(props.content);
  return contentBox;
};

export default ChatMessageContent;
