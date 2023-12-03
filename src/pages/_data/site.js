const data = {
  domain: "https://domain/",
  root: "",
  name: "サイト名",
  shortcut_icon: "https://domain/path/to/icon",
  apple_icon: "https://domain/path/to/icon",
  og_image: "https://domain/path/to/image",
  main_nav_items: [
    {
      id: "home",
      link: "/",
      label: "HOME",
    },
    {
      id: "parts",
      link: "/parts.html",
      label: "PARTS",
    },
    {
      id: "page",
      link: "/page.html",
      label: "PAGE",
    },
  ],
};

module.exports = () => {
  return data;
};
