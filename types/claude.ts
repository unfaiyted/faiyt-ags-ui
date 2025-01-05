// Base event types
export type BaseEvent = {
  type: string;
};

// Content block types
export type TextContentBlock = {
  type: "text";
  text: string;
};

export type ToolUseContentBlock = {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, any>;
};

export type ContentBlock = TextContentBlock | ToolUseContentBlock;

// Delta types
export type TextDelta = {
  type: "text_delta";
  text: string;
};

export type InputJsonDelta = {
  type: "input_json_delta";
  partial_json: string;
};

export type ContentBlockDelta = {
  type: "content_block_delta";
  index: number;
  delta: TextDelta | InputJsonDelta;
};

// Message types
export type Message = {
  id: string;
  type: "message";
  role: "assistant";
  model: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  content: ContentBlock[];
  stop_reason: string | null;
};

// Specific event types
export type MessageStartEvent = BaseEvent & {
  type: "message_start";
  message: Message;
};

export type ContentBlockStartEvent = BaseEvent & {
  type: "content_block_start";
  index: number;
  content_block: ContentBlock;
};

export type PingEvent = BaseEvent & {
  type: "ping";
};

export type ContentBlockStopEvent = BaseEvent & {
  type: "content_block_stop";
  index: number;
};

export type MessageDelta = {
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: {
    output_tokens: number;
  };
};

export type MessageDeltaEvent = BaseEvent & {
  type: "message_delta";
  delta: MessageDelta;
  usage: {
    output_tokens: number;
  };
};

export type MessageStopEvent = BaseEvent & {
  type: "message_stop";
};

// Union of all possible events
export type AnthropicStreamingEvent =
  | MessageStartEvent
  | ContentBlockStartEvent
  | PingEvent
  | ContentBlockDelta
  | ContentBlockStopEvent
  | MessageDeltaEvent
  | MessageStopEvent;

// Parser function type
export type StreamParser = {
  parse(event: string): {
    event: string;
    data: AnthropicStreamingEvent;
  };
};
