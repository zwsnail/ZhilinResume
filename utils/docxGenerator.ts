import { ResumeData } from '../types';

declare global {
  interface Window {
    docx: any;
  }
}

export const generateDocx = (data: ResumeData) => {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopType, TabStopPosition, BorderStyle, WidthType } = window.docx;

  // Helper to parse **bold** text
  const parseRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return new TextRun({
          text: part.slice(2, -2),
          bold: true,
          font: "Arial",
          size: 20 // 10pt
        });
      }
      return new TextRun({
        text: part,
        font: "Arial",
        size: 20 // 10pt
      });
    });
  };

  const createSectionHeader = (title: string) => {
    return new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_2,
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      spacing: {
        before: 200,
        after: 100,
      },
      run: {
        font: "Arial",
        bold: true,
        size: 22, // 11pt
        allCaps: true,
      }
    });
  };

  const createExperienceItem = (item: any) => {
    const paragraphs = [];

    // Title Row: Role (Left) ---- Date (Right)
    paragraphs.push(new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: item.role,
          bold: true,
          font: "Arial",
          size: 22, // 11pt
        }),
        new TextRun({
          text: `\t${item.date}`,
          bold: true,
          font: "Arial",
          size: 20, // 10pt
        }),
      ],
    }));

    // Company Row: Company (Left, Italic) ---- Location (Right, Italic)
    paragraphs.push(new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      spacing: {
        after: 50,
      },
      children: [
        new TextRun({
          text: item.company,
          italics: true,
          font: "Arial",
          size: 20, // 10pt
        }),
        new TextRun({
          text: `\t${item.location}`,
          italics: true,
          font: "Arial",
          size: 20, // 10pt
        }),
      ],
    }));

    // Bullet Points
    item.points.forEach((point: string) => {
      paragraphs.push(new Paragraph({
        bullet: {
          level: 0,
        },
        children: parseRichText(point),
        spacing: {
          after: 30,
        },
      }));
    });

    // Add a small spacer after item
    paragraphs.push(new Paragraph({ spacing: { after: 100 } }));

    return paragraphs;
  };

  // --- Document Construction ---

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch (Twips)
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Name
          new Paragraph({
            text: data.name.toUpperCase(),
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 100,
            },
            run: {
              font: "Arial",
              bold: true,
              size: 48, // 24pt
              color: "000000",
            }
          }),

          // Contact
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 50,
            },
            children: [
              new TextRun({ text: `${data.contact.location} | ${data.contact.phone} | ${data.contact.email}`, font: "Arial", size: 20 }),
            ],
          }),

          // Links
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 200,
            },
            children: [
              new TextRun({ text: `${data.contact.github?.replace('https://', '')} | ${data.contact.linkedin?.replace('https://', '')}`, font: "Arial", size: 20, color: "0000EE" }),
            ],
          }),

          // Summary
          createSectionHeader("SUMMARY"),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                font: "Arial",
                size: 20, // 10pt
              })
            ]
          }),

          // Experience
          createSectionHeader("PROFESSIONAL EXPERIENCE"),
          ...data.experience.flatMap(createExperienceItem),

          // Research
          createSectionHeader("ACADEMIC RESEARCH & DEVELOPMENT"),
          ...data.research.flatMap(createExperienceItem),

          // Education
          createSectionHeader("EDUCATION"),
          ...data.education.flatMap(edu => [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: edu.school, bold: true, font: "Arial", size: 22 }),
                new TextRun({ text: `\t${edu.date}`, bold: true, font: "Arial", size: 20 }),
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree}${edu.location ? ' | ' + edu.location : ''}`, italics: true, font: "Arial", size: 20 }),
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: edu.details, font: "Arial", size: 20 }),
              ]
            })
          ]),

          // Certs
          ...(data.certification && data.certification.length > 0 ? [
             createSectionHeader("CERTIFICATION"),
             ...data.certification.flatMap(cert => [
               new Paragraph({
                 tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                 children: [
                   new TextRun({ text: cert.institution, bold: true, font: "Arial", size: 22 }),
                   new TextRun({ text: `\t${cert.date}`, bold: true, font: "Arial", size: 20 }),
                 ]
               }),
               new Paragraph({
                 children: [
                   new TextRun({ text: cert.name, italics: true, font: "Arial", size: 20 }),
                 ]
               }),
               new Paragraph({
                 spacing: { after: 100 },
                 children: [
                   new TextRun({ text: cert.details, font: "Arial", size: 20 }),
                 ]
               })
             ])
          ] : []),

          // Skills
          createSectionHeader("TECHNICAL SKILLS"),
          ...data.skills.flatMap(skill => [
             new Paragraph({
               children: [
                 new TextRun({ text: `${skill.category}: `, bold: true, font: "Arial", size: 20 }),
                 new TextRun({ text: skill.items, font: "Arial", size: 20 }),
               ]
             })
          ])
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "Zhilin_Tang_Resume.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};