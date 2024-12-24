export interface AiConfig {
  defaultGPTProvider: string;
  defaultTemperature: number;
  enhancements: boolean;
  useHistory: boolean;
  safety: boolean;
  writingCursor: string;
  proxyUrl: string | null;
}

export interface AnimationsConfig {
  choreographyDelay: number;
  durationSmall: number;
  durationLarge: number;
}

export interface AutoDarkMode {
  enabled: boolean;
  from: string;
  to: string;
}

export interface AppearanceConfig {
  autoDarkMode: AutoDarkMode;
  keyboardUseFlag: boolean;
  layerSmoke: boolean;
  layerSmokeStrength: number;
  barRoundCorners: 0 | 1;
  fakeScreenRounding: 0 | 1 | 2;
}

export interface AppsConfig {
  bluetooth: string;
  imageViewer: string;
  network: string;
  settings: string;
  taskManager: string;
  terminal: string;
}

export interface BatteryConfig {
  low: number;
  critical: number;
  warnLevels: number[];
  warnTitles: string[];
  warnMessages: string[];
  suspendThreshold: number;
}

export interface BrightnessControllers {
  default: string;
  [key: string]: string;
}

export interface BrightnessConfig {
  controllers: BrightnessControllers;
}

export interface CheatsheetConfig {
  keybinds: {
    configPath: string;
  };
}

export interface GamingConfig {
  crosshair: {
    size: number;
    color: string;
  };
}

export interface I18nConfig {
  langCode: string;
  extraLogs: boolean;
}

export interface MonitorsConfig {
  scaleMethod: "division" | "gdk";
}

export interface MusicConfig {
  preferredPlayer: string;
}

export interface OnScreenKeyboardConfig {
  layout: string;
}

export interface OverviewConfig {
  scale: number;
  numOfRows: number;
  numOfCols: number;
  wsNumScale: number;
  wsNumMarginScale: number;
}

export interface GptModel {
  name: string;
  logo_name: string;
  description: string;
  base_url: string;
  key_get_url: string;
  key_file: string;
  model: string;
}

export interface SidebarConfig {
  ai: {
    extraGptModels: {
      [key: string]: GptModel;
    };
  };
  image: {
    columns: number;
    batchCount: number;
    allowNsfw: boolean;
    saveInFolderByTags: boolean;
  };
  pages: {
    order: string[];
    apis: {
      order: string[];
    };
  };
}

export interface SearchFeatures {
  actions: boolean;
  commands: boolean;
  mathResults: boolean;
  directorySearch: boolean;
  aiSearch: boolean;
  webSearch: boolean;
}

export interface SearchConfig {
  enableFeatures: SearchFeatures;
  engineBaseUrl: string;
  excludedSites: string[];
}

export interface TimeConfig {
  format: string;
  interval: number;
  dateFormatLong: string;
  dateInterval: number;
  dateFormat: string;
}

export interface WeatherConfig {
  city: string;
  preferredUnit: "C" | "F";
}

export interface WorkspacesConfig {
  shown: number;
}

export interface AutoHideConfig {
  trigger: string;
  interval: number;
}

export interface DockConfig {
  enabled: boolean;
  hiddenThickness: number;
  pinnedApps: string[];
  layer: string;
  monitorExclusivity: boolean;
  searchPinnedAppIcons: boolean;
  trigger: string[];
  autoHide: AutoHideConfig[];
}

export interface IconsConfig {
  searchPaths: string[];
  symbolicIconTheme: {
    dark: string;
    light: string;
  };
  substitutions: {
    [key: string]: string;
  };
  regexSubstitutions: Array<{
    regex: RegExp;
    replace: string;
  }>;
}

export interface KeybindsConfig {
  overview: {
    altMoveLeft: string;
    altMoveRight: string;
    deleteToEnd: string;
  };
  sidebar: {
    apis: {
      nextTab: string;
      prevTab: string;
    };
    options: {
      nextTab: string;
      prevTab: string;
    };
    pin: string;
    cycleTab: string;
    nextTab: string;
    prevTab: string;
  };
  cheatsheet: {
    keybinds: {
      nextTab: string;
      prevTab: string;
    };
    nextTab: string;
    prevTab: string;
    cycleTab: string;
  };
}

export enum BarMode {
  Normal = "normal",
  Focus = "focus",
  Nothing = "nothing",
}

export interface BarConfig {
  modes: Array<BarMode>;
  default: BarMode;
}

export interface ConfigOptions {
  ai?: AiConfig;
  animations?: AnimationsConfig;
  appearance?: AppearanceConfig;
  apps?: AppsConfig;
  battery?: BatteryConfig;
  brightness?: BrightnessConfig;
  cheatsheet?: CheatsheetConfig;
  gaming?: GamingConfig;
  i18n?: I18nConfig;
  monitors?: MonitorsConfig;
  music?: MusicConfig;
  onScreenKeyboard?: OnScreenKeyboardConfig;
  overview?: OverviewConfig;
  sidebar?: SidebarConfig;
  search?: SearchConfig;
  time?: TimeConfig;
  weather?: WeatherConfig;
  workspaces?: WorkspacesConfig;
  dock?: DockConfig;
  icons?: IconsConfig;
  keybinds?: KeybindsConfig;
  bar?: BarConfig;
}

export interface MergedConfig extends ConfigOptions {
  ai: AiConfig;
  animations: AnimationsConfig;
  appearance: AppearanceConfig;
  apps: AppsConfig;
  battery: BatteryConfig;
  brightness: BrightnessConfig;
  cheatsheet: CheatsheetConfig;
  gaming: GamingConfig;
  i18n: I18nConfig;
  monitors: MonitorsConfig;
  music: MusicConfig;
  onScreenKeyboard: OnScreenKeyboardConfig;
  overview: OverviewConfig;
  sidebar: SidebarConfig;
  search: SearchConfig;
  time: TimeConfig;
  weather: WeatherConfig;
  workspaces: WorkspacesConfig;
  dock: DockConfig;
  icons: IconsConfig;
  keybinds: KeybindsConfig;
  bar: BarConfig;
}
