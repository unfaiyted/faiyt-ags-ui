import { Widget, Gtk, Gdk, Astal } from "astal/gtk3";
import { Variable, Binding, bind } from "astal";
import { getScrollDirection } from "../../../utils/utils";

export interface TabContent {
  name: string;
  content: (props: Widget.BoxProps) => Gtk.Widget;
  icon: string;
}

export interface TabContainerProps extends Widget.BoxProps {
  active: number;
  tabs: TabContent[];
}

export interface TabHeaderProps extends Widget.BoxProps {}
export interface TabHeaderItemProps extends Widget.BoxProps {
  tab: TabContent;
  index: number;
}

export interface TabContentProps extends Widget.BoxProps {
  active: Binding<number> | number;
  tab: Binding<TabContent>;
}

export const TabContainer = (tabContainerProps: TabContainerProps) => {
  const { setup, child, children, className, ...props } = tabContainerProps;

  const active = Variable(props.active);
  const activeTab = Variable(props.tabs[props.active]);

  // let lastActive = 0;
  // const count = Math.min(icons.length, names.length);

  print("Tabs length:", props.tabs.length);

  return (
    <box vertical className={`spacing-v-5 ${className}`}>
      <TabHeader {...props}>
        {props.tabs.map((tab, i) => (
          <TabHeaderItem tab={tab} index={i} {...props} />
        ))}
      </TabHeader>
      <TabContent {...props} tab={bind(activeTab).as((v) => v)} />
    </box>
  );
};

export const TabHeader = (tabHeaderProps: TabHeaderProps) => {
  const { setup, child, children, className, ...props } = tabHeaderProps;

  const active = Variable(0);

  const handleScroll = (self: Widget.EventBox, event: Astal.ScrollEvent) => {
    const scrollDirection = getScrollDirection(event);

    if (scrollDirection === Gdk.ScrollDirection.UP) {
      active.set(active.get() + 1);
    } else if (scrollDirection === Gdk.ScrollDirection.DOWN) {
      active.set(active.get() - 1);
    }
  };

  return (
    <box homogeneous={true}>
      <eventbox onScroll={handleScroll}>{children}</eventbox>
    </box>
  );
};

export const TabHeaderItem = (tabHeaderItemProps: TabHeaderItemProps) => {
  const { setup, child, children, className, ...props } = tabHeaderItemProps;

  print("TabHeaderItem:", props.tab.name);
  return (
    <box className={`spacing-v-5 txt-small`}>
      <button className="tab-btn">
        <box>
          <icon icon={props.tab.icon}></icon>
          <label label={props.tab.name}></label>
        </box>
      </button>
    </box>
  );
};

export const TabContent = (tabContentProps: TabContentProps) => {
  const { setup, child, children, className, ...props } = tabContentProps;

  return (
    <stack transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}>
      {bind(props.tab).as((v) => v.content({ className, ...props }))}
    </stack>
  );
};

export default TabContainer;
