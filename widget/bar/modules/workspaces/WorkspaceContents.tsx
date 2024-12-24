import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Widget } from "astal/gtk3";
import { getFontWeightName } from "../../../../utils/font";
import Hypr from "gi://AstalHyprland";
import PangoCairo from "gi://PangoCairo";
import Pango from "gi://Pango";
import Cairo from "gi://cairo";
import config from "../../../../utils/config";
import { Variable } from "astal";
import { mix } from "../../../../utils/color";

export interface WorkspaceContentsProps extends Widget.DrawingAreaProps {
  shown: number;
}

const dummyWs = new Widget.Box({ className: "bar-ws" }); // Not shown. Only for getting size props
const dummyActiveWs = new Widget.Box({ className: "bar-ws bar-ws-active" }); // Not shown. Only for getting size props
const dummyOccupiedWs = new Widget.Box({ className: "bar-ws bar-ws-occupied" }); // Not shown. Only for getting size props

export default function WorkspaceContent(
  workspaceContentsProps: WorkspaceContentsProps,
) {
  const { setup, shown, ...props } = workspaceContentsProps;

  const hypr = Hypr.get_default();

  let initialized = false;
  let workspaceMask = 0;
  let workspaceGroup = 0;

  const updateMask = (self: Widget.DrawingArea) => {
    const offset =
      Math.floor((hypr.get_focused_workspace().id - 1) / shown) *
      config.workspaces.shown;
    const workspaces = hypr.get_workspaces();
    let mask = 0;
    for (let i = 0; i < workspaces.length; i++) {
      const ws = workspaces[i];
      if (ws.id <= offset || ws.id > offset + shown) continue; // Out of range, ignore
      // todo: this is iffy to me
      if (workspaces[i].get_clients().length > 0) mask |= 1 << (ws.id - offset);
    }
    // console.log('Mask:', workspaceMask.toString(2));
    workspaceMask = mask;
    self.queue_draw();
  };

  const toggleMask = (
    self: Widget.DrawingArea,
    occupied: boolean,
    name: string,
  ) => {
    if (occupied) workspaceMask |= 1 << parseInt(name);
    else workspaceMask &= ~(1 << parseInt(name));
    self.queue_draw();
  };

  const workspace = Variable(hypr.get_focused_workspace());

  hypr.connect("event", (source, event, args) => {
    print("Hyprland event:", event);
    if (event === "workspace" || event === "workspacev2") {
      workspace.set(hypr.get_focused_workspace());
    }
  });

  const workspaceContentSetup = (self: Widget.DrawingArea) => {
    setup?.(self);

    self
      .hook(workspace, (self) => {
        self.set_css(`font-size: ${((workspace.get().id - 1) % shown) + 1}px;`);
        const previousGroup = workspaceGroup;
        const currentGroup = Math.floor((workspace.get().id - 1) / shown);
        if (currentGroup !== previousGroup) {
          updateMask(self);
          workspaceGroup = currentGroup;
        }
      })
      // .hook(
      //   Hyprland,
      //   (self) => self.attribute.updateMask(self),
      //   "notify::workspaces",
      // )
      .connect("draw", (area: Gtk.DrawingArea, cr) => {
        const offset =
          Math.floor((workspace.get().id - 1) / shown) *
          config.workspaces.shown;

        const allocation = area.get_allocation();
        const { width, height } = allocation;

        const workspaceStyleContext = dummyWs.get_style_context();

        const workspaceDiameter = parseFloat(
          workspaceStyleContext.get_property(
            "min-width",
            Gtk.StateFlags.NORMAL,
          ) as string,
        );

        const workspaceRadius = workspaceDiameter / 2;

        const workspaceFontSize =
          (parseFloat(
            workspaceStyleContext.get_property(
              "font-size",
              Gtk.StateFlags.NORMAL,
            ) as string,
          ) /
            4) *
          3;

        const workspaceFontFamily = workspaceStyleContext.get_property(
          "font-family",
          Gtk.StateFlags.NORMAL,
        ) as [string];

        const workspaceFontWeight = workspaceStyleContext.get_property(
          "font-weight",
          Gtk.StateFlags.NORMAL,
        ) as Pango.Weight;

        const wsbg = workspaceStyleContext.get_property(
          "background-color",
          Gtk.StateFlags.NORMAL,
        );
        const wsfg = workspaceStyleContext.get_property(
          "color",
          Gtk.StateFlags.NORMAL,
        );

        const occupiedWorkspaceStyleContext =
          dummyOccupiedWs.get_style_context();
        const occupiedbg = occupiedWorkspaceStyleContext.get_property(
          "background-color",
          Gtk.StateFlags.NORMAL,
        ) as { red: number; green: number; blue: number; alpha: number };

        const occupiedfg = occupiedWorkspaceStyleContext.get_property(
          "color",
          Gtk.StateFlags.NORMAL,
        ) as { red: number; green: number; blue: number; alpha: number };

        const activeWorkspaceStyleContext = dummyActiveWs.get_style_context();
        const activebg = activeWorkspaceStyleContext.get_property(
          "background-color",
          Gtk.StateFlags.NORMAL,
        ) as { red: number; green: number; blue: number; alpha: number };

        const activefg = activeWorkspaceStyleContext.get_property(
          "color",
          Gtk.StateFlags.NORMAL,
        ) as { red: number; green: number; blue: number; alpha: number };

        area.set_size_request(workspaceDiameter * shown, -1);
        const widgetStyleContext = area.get_style_context();
        const activeWs = parseFloat(
          widgetStyleContext.get_property(
            "font-size",
            Gtk.StateFlags.NORMAL,
          ) as string,
        );

        const activeWsCenterX =
          -(workspaceDiameter / 2) + workspaceDiameter * activeWs;
        const activeWsCenterY = height / 2;

        // Font
        const layout = PangoCairo.create_layout(cr);
        const fontDesc = Pango.font_description_from_string(
          `${workspaceFontFamily[0]} ${getFontWeightName(workspaceFontWeight)} ${workspaceFontSize}`,
        );
        layout.set_font_description(fontDesc);
        cr.setAntialias(Cairo.Antialias.BEST);
        // Get kinda min radius for number indicators
        layout.set_text("0".repeat(shown.toString().length), -1);
        const [layoutWidth, layoutHeight] = layout.get_pixel_size();
        const indicatorRadius =
          (Math.max(layoutWidth, layoutHeight) / 2) * 1.15; // smaller than sqrt(2)*radius
        const indicatorGap = workspaceRadius - indicatorRadius;

        for (let i = 1; i <= shown; i++) {
          if (workspaceMask & (1 << i)) {
            // Draw bg highlight
            cr.setSourceRGBA(
              occupiedbg.red,
              occupiedbg.green,
              occupiedbg.blue,
              occupiedbg.alpha,
            );
            const wsCenterX = -workspaceRadius + workspaceDiameter * i;
            const wsCenterY = height / 2;
            if (!(workspaceMask & (1 << (i - 1)))) {
              // Left
              cr.arc(
                wsCenterX,
                wsCenterY,
                workspaceRadius,
                0.5 * Math.PI,
                1.5 * Math.PI,
              );
              cr.fill();
            } else {
              cr.rectangle(
                wsCenterX - workspaceRadius,
                wsCenterY - workspaceRadius,
                workspaceRadius,
                workspaceRadius * 2,
              );
              cr.fill();
            }
            if (!(workspaceMask & (1 << (i + 1)))) {
              // Right
              cr.arc(
                wsCenterX,
                wsCenterY,
                workspaceRadius,
                -0.5 * Math.PI,
                0.5 * Math.PI,
              );
              cr.fill();
            } else {
              cr.rectangle(
                wsCenterX,
                wsCenterY - workspaceRadius,
                workspaceRadius,
                workspaceRadius * 2,
              );
              cr.fill();
            }
          }
        }

        // Draw active ws
        cr.setSourceRGBA(
          activebg.red,
          activebg.green,
          activebg.blue,
          activebg.alpha,
        );

        cr.arc(
          activeWsCenterX,
          activeWsCenterY,
          indicatorRadius,
          0,
          2 * Math.PI,
        );
        cr.fill();

        // Draw workspace numbers
        for (let i = 1; i <= shown; i++) {
          const inactivecolors = workspaceMask & (1 << i) ? occupiedfg : wsfg;
          if (i == activeWs) {
            cr.setSourceRGBA(
              activefg.red,
              activefg.green,
              activefg.blue,
              activefg.alpha,
            );
          }
          // Moving to
          else if (
            (i == Math.floor(activeWs) && workspace.get().id < activeWs) ||
            (i == Math.ceil(activeWs) && workspace.get().id > activeWs)
          ) {
            cr.setSourceRGBA(
              mix(activefg.red, inactivecolors.red, 1 - Math.abs(activeWs - i)),
              mix(
                activefg.green,
                inactivecolors.green,
                1 - Math.abs(activeWs - i),
              ),
              mix(
                activefg.blue,
                inactivecolors.blue,
                1 - Math.abs(activeWs - i),
              ),
              activefg.alpha,
            );
          }
          // Moving from
          else if (
            (i == Math.floor(activeWs) && workspace.get().id > activeWs) ||
            (i == Math.ceil(activeWs) && workspace.get().id < activeWs)
          ) {
            cr.setSourceRGBA(
              mix(activefg.red, inactivecolors.red, 1 - Math.abs(activeWs - i)),
              mix(
                activefg.green,
                inactivecolors.green,
                1 - Math.abs(activeWs - i),
              ),
              mix(
                activefg.blue,
                inactivecolors.blue,
                1 - Math.abs(activeWs - i),
              ),
              activefg.alpha,
            );
          }
          // Inactive
          else
            cr.setSourceRGBA(
              inactivecolors.red,
              inactivecolors.green,
              inactivecolors.blue,
              inactivecolors.alpha,
            );

          layout.set_text(`${i + offset}`, -1);
          const [layoutWidth, layoutHeight] = layout.get_pixel_size();
          const x = -workspaceRadius + workspaceDiameter * i - layoutWidth / 2;
          const y = (height - layoutHeight) / 2;
          cr.moveTo(x, y);
          PangoCairo.show_layout(cr, layout);
          cr.stroke();
        }
      });
  };
  return (
    <drawingarea
      {...props}
      className="bar-ws-container"
      setup={workspaceContentSetup}
    ></drawingarea>
  );
}
