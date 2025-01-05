import { execAsync } from "astal/process";
import Wp from "gi://AstalWp";

const wp = Wp.get_default();

const audio = wp ? wp.audio : undefined;

export const actions = {
  music: {
    toggle: () => execAsync("playerctl play-pause").catch(print),
    next: () =>
      execAsync([
        "bash",
        "-c",
        'playerctl next || playerctl position `bc <<< "100 * $(playerctl metadata mpris:length) / 1000000 / 100"` &',
      ]).catch(print),
    prev: () => execAsync(["playerctl previous"]).catch(print),
    pause: () => execAsync("playerctl pause").catch(print),
    play: () => execAsync("playerctl play").catch(print),
  },
  network: {
    ipInfo: () => execAsync("curl ipinfo.io"), // returns JSON with ip info and location
    ipCityInfo: () =>
      execAsync("curl ipinfo.io").then((output) =>
        JSON.parse(output)["city"].toLowerCase(),
      ),
  },
  brightness: {
    // TODO: implement brightness control
    increase: () => execAsync("brightnessctl set +5%").catch(print),
    decrease: () => execAsync("brightnessctl set -5%").catch(print),
  },
  keyboard: {
    backlight: {
      // TODO:
      // increase: () => execAsync("light -A 5").catch(print),
      // decrease: () => execAsync("light -U 5").catch(print),
    },
  },
  audio: {
    increase: () => {
      if (!audio || !audio.default_speaker) return;
      if (audio.default_speaker.volume <= 0.09)
        audio.default_speaker.volume += 0.01;
      else audio.default_speaker.volume += 0.03;
      // Indicator.popup(1);
    },
    decrease: () => {
      if (!audio || !audio.default_speaker) return;
      if (audio.default_speaker.volume <= 0.09)
        audio.default_speaker.volume -= 0.01;
      else audio.default_speaker.volume -= 0.03;
      // Indicator.popup(-1);
    },
  },
  weather: {
    update: (city: string) => {
      return execAsync(
        `curl https://wttr.in/${city.replace(/ /g, "%20")}?format=j1`,
      );
    },
  },
  window: {
    toggle: (windowName: string) => {
      execAsync([
        "bash",
        "-c",
        `ags request "window toggle ${windowName}"`,
      ]).catch(print);
    },
  },
  app: {
    screenSnip: () => {
      // execAsync(`${App.configDir}/scripts/grimblast.sh copy area`)
    },
    colorPicker: () => {
      // execAsync(`${App.configDir}/scripts/color_generation/switchwall.sh`)
    },
  },
};
