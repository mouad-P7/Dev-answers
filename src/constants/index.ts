export const remoteFiles = {
  profile: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQlED5AKrBGBNq8LUc9ZoDv0FKM5Ryal4eXIdfQ",
  logo: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQlGkWyjl54trQDRNUsZlEIfSHKhxPvkaFbe0V8",
  light_illustration: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQlgBzE9PI7iudLR3ktaOGWZpSzTIo8rxvcVmfA",
  dark_illustration: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQl5Cxp5yshi0YqHXba1QMsdmwfcARopEjyrlne",
  auth_light: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQlA4OQL03cxwp86BzHjE1d3FveyIK7UDtkgWsn",
  auth_dark: "https://olugn11nli.ufs.sh/f/wkYpCkNg1XQlPnN4UFY7W2IymdhVrBOAHzgiJel4aMDQbYqk",
} as const;

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  // {
  //   imgURL: "/assets/icons/suitcase.svg",
  //   route: "/jobs",
  //   label: "Find Jobs",
  // },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];
