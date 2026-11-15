export const site = {
  name: "Sardar Hussain",
  title: "React Native & Mobile App Developer",
  location: "Rawalpindi/Islamabad, Pakistan",
  email: "sardar.dev.pk@gmail.com",
  phoneDisplay: "+92 336 9164460",
  phoneTel: "+923369164460",
  whatsapp: "https://wa.me/923369164460",
  github: "https://github.com/SardarHussain65",
  githubLabel: "github.com/SardarHussain65",
  linkedin: "https://www.linkedin.com/in/sardar-hussain-dev/",
  resume: "/resume.pdf",
  availability: "Open to Full-Time Mobile Roles & Projects",
  education: "B.S. Computer Science — Virtual University of Pakistan (in progress)",
  company: "Repla Technologies",
  yearsExp: "2+",
  appsShipped: "6+",
  bio: "React Native developer at Repla Technologies with 2+ years of experience shipping production mobile apps. I build fast, smooth apps for iOS, Android, and Smart TVs — from ride-hailing and healthcare to video streaming and full-stack platforms.",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("Mobile Developer Opportunity")}`;

export const roles = [
  "React Native Developer",
  "Mobile App Engineer",
  "Smart TV Developer",
] as const;

export const stats = [
  { value: 2, prefix: "", suffix: "+ yrs", label: "Years of Experience" },
  { value: 6, prefix: "", suffix: "+", label: "Production Apps Shipped" },
  { value: 1, prefix: "", suffix: "", label: "Full-Stack Project Built Solo" },
] as const;
