## These fonts will need to be installed on the system

#### TODO: nerd font links

```css
@mixin titlefont {
    // Geometric sans-serif
    font-family: "Gabarito", "Poppins", "Readex Pro", "Lexend", sans-serif;
}

@mixin mainfont {
    // Other clean sans-serif
    font-family: "Rubik", "Geist", "AR One Sans", "Reddit Sans", "Inter",
        "Roboto", "Ubuntu", "Noto Sans", sans-serif;
    // font-weight: 500;
}

@mixin icon-material {
    // Material Design Icons
    font-family: "Material Symbols Rounded", "MaterialSymbolsRounded", "Material Symbols Outlined",
        "Material Symbols Sharp";
}

@mixin icon-phosphor {
  // Phosphor Icons
  font-family: "Phosphor", "Phosphor-Bold", "Phosphor-Duotone","Phoshphor-Outline","Phosphor-Fill","Phosphor-Thin"
}


@mixin icon-nerd {
    // Nerd Fonts
    font-family: "SpaceMono NF", "SpaceMono Nerd Font", "JetBrains Mono NF",
        "JetBrains Mono Nerd Font", monospace;
}

@mixin techfont {
    // Monospace for sys info n stuff. Doesn't have to be a nerd font, but it's cool.
    font-family: "JetBrains Mono NF", "JetBrains Mono Nerd Font",
        "JetBrains Mono NL", "SpaceMono NF", "SpaceMono Nerd Font", monospace;
}

@mixin readingfont {
    // The most readable fonts, for a comfortable reading experience
    // in stuff like AI chat on sidebar
    font-family: "Readex Pro", "Lexend", "Noto Sans", sans-serif;
    // font-weight: 500;
}

@mixin subtext {
    color: colors.$subtext;
}
```

## Default Configuration

**Required:**

- Hyprland
- Ags/Astal

**Optional:**

- Grimblast (screenshots) <https://github.com/hyprwm/contrib/tree/main/grimblast>
