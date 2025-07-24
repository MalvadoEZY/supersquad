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

export const dashboardRoutes = {
  HOME: "/office",
  GENERATE_POST: "/office/generate-post",
  PERSONALITY: "/office/personality",
  PRODUCTS: "/office/products",
  RESPONSE_STYLE: "/office/response-style",
  PRIVACY: "/office/privacy",
};

export const header = {
  main: [
    { name: "Employees", href: routes.EMPLOYEES },
    { name: "Features", href: routes.FEATURES },
    { name: "Pricing", href: routes.PRICING },
  ],
  cta: [
    { name: "Log in", href: routes.SIGNIN, accent: false },
    { name: "Deploy your AI", href: routes.SIGNUP, accent: true },
  ],
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
