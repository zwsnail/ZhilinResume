import React from 'react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-black">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
      id="resume-preview-content"
      className="bg-white text-black text-sm font-sans leading-relaxed print-container mx-auto"
      style={{
        width: '210mm', 
        minHeight: '297mm', 
        padding: '19mm 12.7mm 12.7mm 12.7mm', 
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-black mb-3">{data.name}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10pt] text-black">
          {data.contact.location && <span className="flex items-center">{data.contact.location}</span>}
          {data.contact.phone && <span className="flex items-center before:content-[''] before:mx-1 before:text-black">{data.contact.phone}</span>}
          {data.contact.email && <a href={`mailto:${data.contact.email}`} className="text-black hover:underline before:content-[''] before:mx-1 before:text-black">{data.contact.email}</a>}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10pt] mt-2">
           {data.contact.github && (
            <a href={`https://${data.contact.github}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
               {data.contact.github.replace('https://', '')}
            </a>
          )}
          {data.contact.linkedin && (
            <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {data.contact.linkedin.replace('https://', '')}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Summary</h2>
        <p className="text-justify text-black leading-relaxed text-[10pt]">
          {data.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Professional Experience</h2>
        <div className="space-y-4">
          {data.experience?.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[11pt] text-black">{exp.role}</h3>
                <span className="text-[10pt] font-bold whitespace-nowrap text-black">{exp.date}</span>
              </div>
              <div className="flex justify-between items-center mb-1 text-[10pt] italic text-black">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-disc ml-4 space-y-1.5">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="pl-1 text-justify text-[10pt] leading-relaxed">
                    {renderText(point)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Academic Research & Development</h2>
        <div className="space-y-4">
          {data.research?.map((res) => (
            <div key={res.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-[11pt] text-black">{res.role}</h3>
                <span className="text-[10pt] font-bold whitespace-nowrap text-black">{res.date}</span>
              </div>
              <div className="flex justify-between items-center mb-1 text-[10pt] italic text-black">
                <span>{res.company}</span>
                <span>{res.location}</span>
              </div>
              <ul className="list-disc ml-4 space-y-1.5">
                {res.points.map((point, idx) => (
                  <li key={idx} className="pl-1 text-justify text-[10pt] leading-relaxed">
                     {renderText(point)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Education</h2>
        <div className="space-y-3">
          {data.education?.map((edu) => (
            <div key={edu.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[11pt] text-black">{edu.school}</h3>
                <span className="text-[10pt] font-bold whitespace-nowrap text-black">{edu.date}</span>
              </div>
              <div className="flex justify-between items-start">
                 <div className="text-[10pt] text-black">
                    <span className="italic">{edu.degree}</span>
                    {edu.location && <span className="ml-2 text-black italic">| {edu.location}</span>}
                 </div>
              </div>
              {edu.details && (
                <p className="text-[10pt] text-black mt-0.5 leading-relaxed text-justify">{edu.details}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certification */}
      {data.certification && data.certification.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Certification</h2>
          <div className="space-y-3">
            {data.certification.map((cert) => (
              <div key={cert.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11pt] text-black">{cert.institution}</h3>
                   <span className="text-[10pt] font-bold whitespace-nowrap text-black">{cert.date}</span>
                </div>
                 <div className="text-[10pt] text-black italic">
                    {cert.name}
                 </div>
                 {cert.details && (
                   <p className="text-[10pt] text-black mt-0.5 leading-relaxed text-justify">{cert.details}</p>
                 )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2 className="text-[11pt] font-bold uppercase border-b-[1.5pt] border-black mb-2 text-black">Technical Skills</h2>
          <div className="text-[10pt] space-y-1">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="flex">
                <span className="font-bold w-56 shrink-0 text-black">{skill.category}:</span>
                <span className="text-black leading-relaxed text-justify">{skill.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;