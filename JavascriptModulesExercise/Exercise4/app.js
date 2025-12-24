async function loadConfig() {
  const themeTime = await import("./theme.mjs");

  const currentHour = new Date().getHours();

  if (currentHour < 18) {
    themeTime.setLightTheme();
  } else {
    themeTime.setDarkTheme();
  }
}

loadConfig();
