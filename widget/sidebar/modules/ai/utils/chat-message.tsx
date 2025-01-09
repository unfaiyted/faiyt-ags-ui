import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import GtkSource from "gi://GtkSource";
import config from "../../../../../utils/config";
import { execAsync } from "astal/process";
// import { ClaudeMessage } from "../claude";
import { MaterialIcon } from "../../../../utils/icons/material";

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

function substituteLang(str: string) {
  const subs = [
    { from: "javascript", to: "js" },
    { from: "bash", to: "sh" },
  ];
  for (const { from, to } of subs) {
    if (from === str) return to;
  }
  return str;
}

const HighlightedCode = (content: string, lang: string) => {
  const buffer = new GtkSource.Buffer();
  const sourceView = new GtkSource.View({
    buffer: buffer,
    wrap_mode: Gtk.WrapMode.NONE,
  });
  const langManager = GtkSource.LanguageManager.get_default();
  let displayLang = langManager.get_language(substituteLang(lang)); // Set your preferred language
  if (displayLang) {
    buffer.set_language(displayLang);
  }
  const schemeManager = GtkSource.StyleSchemeManager.get_default();
  buffer.set_style_scheme(schemeManager.get_scheme(CUSTOM_SCHEME_ID));
  buffer.set_text(content, -1);
  return sourceView;
};

const CodeBlock = (content = "", lang = "txt") => {
  // if (lang == 'tex' || lang == 'latex') {
  //     return Latex(content);
  // }

  const sourceView = HighlightedCode(content, lang);

  const handleClick = (self: Widget.Button, event: Astal.ClickEvent) => {
    const buffer = sourceView.get_buffer();
    const copyContent = buffer.get_text(
      buffer.get_start_iter(),
      buffer.get_end_iter(),
      false,
    ); // TODO: fix this
    // TODO: move to actions
    execAsync([`wl-copy`, `${copyContent}`]).catch(print);
  };

  const updateText = (text: string) => {
    sourceView.get_buffer().set_text(text, -1);
  };

  const codeBlock = (
    <box className="sidebar-chat-codeblock" vertical>
      <box className="sidebar-chat-codeblock-topbar">
        <label className="sidebar-chat-codeblock-topbar-txt">{lang}</label>
        <box className="sidebar-chat-codeblock-topbar-btn">
          <button
            className="sidebar-chat-codeblock-topbar-btn"
            onClick={handleClick}
          >
            <box className="spacing-h-5">
              <MaterialIcon icon="content_copy" size="small" />
              <label label="Copy" />
            </box>
          </button>
        </box>
      </box>
      <box className="sidebar-chat-codeblock-code" homogeneous>
        <scrollable
          vscroll={Gtk.PolicyType.NEVER}
          hscroll={Gtk.PolicyType.AUTOMATIC}
          child={sourceView}
        />
      </box>
    </box>
  );

  // const schemeIds = styleManager.get_scheme_ids();

  // print("Available Style Schemes:");
  // for (let i = 0; i < schemeIds.length; i++) {
  //     print(schemeIds[i]);
  // }
  return codeBlock;
};

const Divider = () =>
  new Widget.Box({
    className: "sidebar-chat-divider",
  });

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

export interface MessageContentProps extends Widget.BoxProps {}

const MessageContent = (props: MessageContentProps) => {
  const contentBox = new Widget.Box({
    className: "sidebar-chat-message-content",
  });

  const updateText = (item: GtkSource.View, text: string) => {
    item.get_buffer().set_text(text, -1);
  };

  const update = (content: string, useCursor = false) => {
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
            contentBox.add(CodeBlock("", codeBlockRegex.exec(line)[1]));
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
  return contentBox;
};

const TextSkeleton = (extraClassName = "") => (
  <box className={`sidebar-chat-message-skeletonline ${extraClassName}`} />
);
const MessageLoadingSkeleton = () => (
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

  // TODO: change this to get the username
  return (
    <box className="sidebar-chat-message">
      <box vertical>
        <label
          xalign={0}
          halign={Gtk.Align.START}
          wrap
          label={message.role == "user" ? "You" : props.modelName}
          className={`txt txt-bold sidebar-chat-name sidebar-chat-name-${message.role == "user" ? "user" : "bot"}`}
        />
        <box homogeneous className="sidebar-chat-messagearea">
          <stack shown={message.thinking ? "thinking" : "message"}>
            <MessageLoadingSkeleton name="thinking" />
            <MessageContent name="message" {...props} />
          </stack>
        </box>
      </box>
    </box>
  );
};
