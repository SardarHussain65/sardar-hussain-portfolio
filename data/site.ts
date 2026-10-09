export const site = {
  name: "Sardar Hussain",
  title: "Senior React Native & Full-Stack Mobile Engineer",
  location: "Rawalpindi, Pakistan",
  email: "sardar.dev.pk@gmail.com",
  phoneDisplay: "+92 336 9164460",
  phoneTel: "+923369164460",
  whatsapp: "https://wa.me/923369164460",
  github: "https://github.com/SardarHussain65",
  githubLabel: "github.com/SardarHussain65",
  linkedin: "https://www.linkedin.com/in/sardar-hussain-dev/",
  resume: "/resume.pdf",
  availability: "Open to High-Impact Mobile Roles & Contracts",
} as const;

export const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("High-impact mobile work")}`;
