export interface ContactInfo {
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  points: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  location: string;
  date: string;
  details: string; // GPA, coursework, etc.
}

export interface CertificationItem {
  id: string;
  name: string;
  institution: string;
  date: string;
  details: string;
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceItem[];
  research: ExperienceItem[];
  education: EducationItem[];
  certification: CertificationItem[];
  skills: {
    category: string;
    items: string;
  }[];
}