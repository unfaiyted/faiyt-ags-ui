import { Widget, Astal } from "astal/gtk3";
import { BarMode } from "../../types";
import { Variable } from "astal";
import Hypr from "gi://AstalHyprland";

export interface BaseWorkspacesProps extends Widget.DrawingAreaProps {
  mode: BarMode;
  shown: number;
  initilized: Boolean;
}

export interface NormalModeWorkspacesProps extends BaseWorkspacesProps {
  // Normal mode specific props
  workspace: Variable<Hypr.Workspace>;
  workspaceMask: Variable<number>;
  workspaceGroup: Variable<number>;
  updateMask: (self: Widget.DrawingArea) => void;
  toggleMask: (
    self: Widget.DrawingArea,
    occupied: boolean,
    name: string,
  ) => void;
}

export interface FocusModeWorkspacesProps extends BaseWorkspacesProps {
  // Focus mode specific props
  workspace: Variable<Hypr.Workspace>;
  workspaceMask: Variable<number>;
  workspaceGroup: Variable<number>;
  updateMask: (self: Widget.DrawingArea) => void;
  toggleMask: (
    self: Widget.DrawingArea,
    occupied: boolean,
    name: string,
  ) => void;
}

export interface NormalWorkspacesContentsProps extends WorkspaceContentsProps {
  workspace: Hypr.Workspace;
  shown: number;
  workspaceGroup: number;
  self: Widget.DrawingArea;
  updateMask: (self: Widget.DrawingArea) => void;
  toggleMask: (
    self: Widget.DrawingArea,
    occupied: boolean,
    name: string,
  ) => void;
}

export interface WorkspaceContentsProps extends Widget.DrawingAreaProps {
  shown: number;
  mode: BarMode;
  initilized: Boolean;
  workspaceMask: number;
  workspaceGroup: number;
}
