export const site = {
  name: "Sardar Hussain",
  title: "React Native Developer",
  location: "Rawalpindi/Islamabad, Pakistan",
  email: "sardar.dev.pk@gmail.com",
  phoneDisplay: "+92 336 9164460",
  phoneTel: "+923369164460",
  whatsapp: "https://wa.me/923369164460",
  github: "https://github.com/SardarHussain65",
  githubLabel: "github.com/SardarHussain65",
  linkedin: "https://www.linkedin.com/in/sardar-hussain-dev/",
  resume: "/resume.pdf",
  availability: "Open to High-Impact Mobile Roles & Contracts",
  education: "B.S. Computer Science — Virtual University of Pakistan (in progress)",
  company: "Repla Technologies",
  yearsExp: "~2",
  appsShipped: "6+",
  bio: "React Native developer at Repla Technologies with ~2 years of experience shipping production mobile apps. Building high-framerate, production-grade experiences — from ride-hailing and telehealth to IPTV and full-stack platforms.",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("High-impact mobile work")}`;

export const roles = [
  "React Native Developer",
  "Mobile App Engineer",
  "Full-Stack Builder",
] as const;

export const stats = [
  { value: 2, prefix: "~", suffix: " yrs", label: "Years of Experience" },
  { value: 6, prefix: "", suffix: "+", label: "Production Apps Shipped" },
  { value: 1, prefix: "", suffix: "", label: "Solo Full-Stack Platform" },
] as const;
