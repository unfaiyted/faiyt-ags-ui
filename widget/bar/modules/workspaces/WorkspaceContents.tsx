// import { App, Astal, Gtk, Gdk } from "astal/gtk3";
// import { Widget } from "astal/gtk3";
// import { getFontWeightName } from "../../../../utils/font";
// import Hypr from "gi://AstalHyprland";
// import PangoCairo from "gi://PangoCairo";
// import Pango from "gi://Pango";
// import Cairo from "gi://cairo";
// import config from "../../../../utils/config";
// import { Variable } from "astal";
// import { mix } from "../../../../utils/color";
//
//
// const dummyWs = new Widget.Box({ className: "bar-ws" }); // Not shown. Only for getting size props
// const dummyActiveWs = new Widget.Box({ className: "bar-ws bar-ws-active" }); // Not shown. Only for getting size props
// const dummyOccupiedWs = new Widget.Box({ className: "bar-ws bar-ws-occupied" }); // Not shown. Only for getting size props
//
// export default function WorkspaceContent(
//   workspaceContentsProps: WorkspaceContentsProps,
// ) {
//   const {
//     setup,
//     shown,
//     initilized: init,
//     workspaceMask: wsm,
//     workspaceGroup: wsg,
//     ...props
//   } = workspaceContentsProps;
//
//   const hypr = Hypr.get_default();
//
//   const initilized = Variable(init);
//   const workspaceMask = Variable(wsm);
//   const workspaceGroup = Variable(wsg);
//
//   const updateMask = (self: Widget.DrawingArea) => {
//     const offset =
//       Math.floor((hypr.get_focused_workspace().id - 1) / shown) *
//       config.workspaces.shown;
//     const workspaces = hypr.get_workspaces();
//     let mask = 0;
//     for (let i = 0; i < workspaces.length; i++) {
//       const ws = workspaces[i];
//       if (ws.id <= offset || ws.id > offset + shown) continue; // Out of range, ignore
//       // todo: this is iffy to me
//       if (workspaces[i].get_clients().length > 0) mask |= 1 << (ws.id - offset);
//     }
//     // console.log('Mask:', workspaceMask.toString(2));
//     workspaceMask.set(mask);
//     self.queue_draw();
//   };
//
//   const toggleMask = (
//     self: Widget.DrawingArea,
//     occupied: boolean,
//     name: string,
//   ) => {
//     const currentMask = workspaceMask.get();
//     const newMask = occupied
//       ? currentMask | (1 << parseInt(name))
//       : currentMask & ~(1 << parseInt(name));
//     workspaceMask.set(newMask);
//     self.queue_draw();
//   };
//
//   const workspace = Variable(hypr.get_focused_workspace());
//
//   hypr.connect("event", (source, event, args) => {
//     print("Hyprland event:", event);
//     if (event === "workspace" || event === "workspacev2") {
//       workspace.set(hypr.get_focused_workspace());
//     }
//   });
//
//   return (
//     <box homogeneous={true}>
//       <box
//         css={`
//           min-width: 2px;
//         `}
//       >
//         {/* <drawingarea */}
//         {/*   {...props} */}
//         {/*   className="bar-ws-container" */}
//         {/*   setup={setup} */}
//         {/* ></drawingarea> */}
//       </box>
//     </box>
//   );
// }
