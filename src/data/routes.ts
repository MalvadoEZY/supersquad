export const routes = {
  HOME: "/",
  EMPLOYEES: "/products",
  FEATURES: "/features",
  PRICING: "/pricing",
  RESOURCES: "/resources",
  BLOG: "/blog",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  TERMS_CONDITIONS: "/terms-conditions",
  PRIVACY_POLICY: "/privacy-policy",
  COOKIE_POLICY: "/cookie-policy",
  CONTACT: "/contact",
  AFFILIATE: "/become-an-affiliate",
  INSTAGRAM: "https://www.instagram.com/supersquad.ai/",
  LINKEDIN: "https://www.linkedin.com/company/supersquad-ai/",
  FACEBOOK: "https://www.facebook.com/supersquad.ai/",
};

export const footer = [
  {
    label: "Company",
    links: [
      { name: "about", href: routes.HOME },
      { name: "contact", href: routes.CONTACT },
      { name: "become-an-affiliate", href: routes.AFFILIATE },
    ],
  },
  {
    label: "Product",
    links: [
      { name: "employees", href: routes.EMPLOYEES },
      { name: "features", href: routes.FEATURES },
      { name: "pricing", href: routes.PRICING },
    ],
  },
];
