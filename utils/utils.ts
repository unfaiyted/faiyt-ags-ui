import Cairo from "gi://cairo";
import { Astal, Gdk } from "astal/gtk3";

export const dummyRegion = new Cairo.Region();

export const enableClickthrough = (self) =>
  self.input_shape_combine_region(dummyRegion);

//this is because direction does not seem to work in event.direction
export const getScrollDirection = (
  event: Astal.ScrollEvent,
): Gdk.ScrollDirection => {
  if (event.delta_y > 0) {
    return Gdk.ScrollDirection.UP;
  } else {
    return Gdk.ScrollDirection.DOWN;
  }
};
