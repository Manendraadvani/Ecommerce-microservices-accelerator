
import contentstack from "contentstack";

// Stack for About Us Page
export const AboutStack = contentstack.Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_ABOUT_API_KEY,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_ABOUT_DELIVERY_TOKEN,
  environment: import.meta.env.VITE_CONTENTSTACK_ABOUT_ENVIRONMENT,
});

// Stack for Contact Us Page
export const ContactStack = contentstack.Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_CONTACT_API_KEY,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_CONTACT_DELIVERY_TOKEN,
  environment: import.meta.env.VITE_CONTENTSTACK_CONTACT_ENVIRONMENT,
});
