import { ResumeData, ExperienceItem } from '../types';

declare global {
  interface Window {
    jspdf: any;
  }
}

export const generatePDF = (data: ResumeData) => {
  const { jsPDF } = window.jspdf;
  
  // High-resolution PDF configuration
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",     
    format: "a4",
    hotfixes: ["px_scaling"] 
  });

  // --- Layout Constants (pt) ---
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 36; // 0.5 inch
  const marginY = 72; // Increased to 1 inch to move content down
  const contentWidth = pageWidth - (marginX * 2);
  
  const fontMain = "helvetica";
  
  // Typography
  const fontSizeTitle = 24;
  const fontSizeHeader = 11;
  const fontSizeBody = 10; 
  const fontSizeMeta = 10;
  
  // Strict Spacing Rules
  const lineHeightBody = 14; 
  const SPACING_SECTION = 18; // Gap between sections
  const SPACING_ITEM = 12;    // Gap between jobs/degrees
  const SPACING_BULLET = 5;   // Gap between bullet points
  const SPACING_HEADER_LINE = 12; // Space after header line
  const HEADER_LINE_WIDTH = 1.5;

  // Colors
  const black = '#000000'; 
  const linkBlue = '#2563eb'; 
  
  let cursorY = marginY;

  // --- Helpers ---

  const checkPageBreak = (heightNeeded: number) => {
    if (cursorY + heightNeeded > pageHeight - marginY) {
      doc.addPage();
      cursorY = marginY;
      return true;
    }
    return false;
  };

  const drawLine = (y: number) => {
    doc.setDrawColor(black);
    doc.setLineWidth(HEADER_LINE_WIDTH);
    doc.line(marginX, y, marginX + contentWidth, y);
    return y + SPACING_HEADER_LINE; 
  };

  // JUSTIFIED TEXT RENDERER
  // Calculates word spacing to perfectly align left and right edges
  const printRichText = (text: string, x: number, y: number, fontSize: number, maxWidth: number, indent: number = 0): number => {
    doc.setFontSize(fontSize);
    doc.setTextColor(black);
    
    // 1. Tokenize into {text, isBold, width, isSpace}
    const parts = text.split(/(\*\*.*?\*\*)/g);
    const tokens: { text: string, isBold: boolean, width: number, isSpace: boolean }[] = [];
    
    parts.forEach(part => {
      const isBold = part.startsWith('**') && part.endsWith('**');
      const cleanText = isBold ? part.slice(2, -2) : part;
      
      doc.setFont(fontMain, isBold ? "bold" : "normal");
      
      // Split by spaces, keep spaces as tokens
      const rawWords = cleanText.split(/(\s+)/);
      rawWords.forEach(w => {
        if (w.length === 0) return;
        const width = doc.getTextWidth(w);
        const isSpace = /^\s+$/.test(w);
        tokens.push({ text: w, isBold, width, isSpace });
      });
    });

    // 2. Build lines
    let currentLine: typeof tokens = [];
    let currentLineWidth = indent; // First line indent (e.g. for bullet)
    let currentY = y;
    const startX = x;

    const renderLine = (line: typeof tokens, isLastLine: boolean, lineIndent: number) => {
      // Calculate slack (extra space to fill)
      const visibleTokens = line.filter(t => !t.isSpace);
      const spaceTokens = line.filter(t => t.isSpace);
      
      let usedWidth = line.reduce((acc, t) => acc + t.width, 0);
      let extraSpace = maxWidth - (usedWidth + lineIndent);
      
      // If justify, distribute extraSpace among spaces
      // Don't justify last line, or lines with no spaces
      let spaceAdd = 0;
      if (!isLastLine && spaceTokens.length > 0 && extraSpace > 0 && extraSpace < 100) { // Limit huge gaps
         spaceAdd = extraSpace / spaceTokens.length;
      }

      let drawX = startX + lineIndent;
      
      line.forEach(token => {
        doc.setFont(fontMain, token.isBold ? "bold" : "normal");
        
        if (token.isSpace) {
           // Standard space width + distributed slack
           drawX += token.width + spaceAdd;
        } else {
           doc.text(token.text, drawX, currentY);
           drawX += token.width;
        }
      });
      
      currentY += lineHeightBody;
    };

    tokens.forEach(token => {
       if (currentLineWidth + token.width > maxWidth) {
         // Line break needed
         // Trim trailing space from current line to avoid right-edge jaggedness issues
         while(currentLine.length > 0 && currentLine[currentLine.length-1].isSpace) {
             const removed = currentLine.pop();
             if(removed) currentLineWidth -= removed.width;
         }

         renderLine(currentLine, false, (currentY === y ? indent : 0));
         
         // Start new line
         currentLine = [];
         currentLineWidth = 0;
         
         // If current token is space, skip it at start of new line
         if (token.isSpace) return;
       }
       
       currentLine.push(token);
       currentLineWidth += token.width;
    });

    // Flush last line (Left aligned)
    if (currentLine.length > 0) {
      renderLine(currentLine, true, (currentY === y ? indent : 0));
    }

    return currentY;
  };

  const renderItem = (item: ExperienceItem) => {
    // Header Check
    if (cursorY + 30 > pageHeight - marginY) {
      doc.addPage();
      cursorY = marginY;
    }

    doc.setTextColor(black);
    // Role & Date
    doc.setFont(fontMain, "bold");
    doc.setFontSize(11);
    doc.text(item.role, marginX, cursorY);
    
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeMeta);
    const dateWidth = doc.getTextWidth(item.date);
    doc.text(item.date, marginX + contentWidth - dateWidth, cursorY);
    cursorY += 13;

    // Company & Location
    doc.setFont(fontMain, "italic"); 
    doc.setFontSize(fontSizeMeta);
    doc.text(item.company, marginX, cursorY);

    const locWidth = doc.getTextWidth(item.location);
    doc.text(item.location, marginX + contentWidth - locWidth, cursorY);
    cursorY += 13;

    // Points
    item.points.forEach(point => {
        // --- CUSTOM LAYOUT LOGIC ---
        // Force "HPC Acceleration" to the next page as per user request
        if (point.includes("HPC Acceleration")) {
            doc.addPage();
            cursorY = marginY;
        }

        // Estimate height roughly to avoid orphan bullets
        // If getting close to page end, better to jump
        if (cursorY + lineHeightBody * 2 > pageHeight - marginY) {
            doc.addPage();
            cursorY = marginY;
        }

        doc.setFont(fontMain, "normal"); 
        doc.setTextColor(black);
        doc.text("•", marginX + 6, cursorY);
        // Indent text by 14pt
        cursorY = printRichText(point, marginX + 14, cursorY, fontSizeBody, contentWidth - 14, 0);
        cursorY += SPACING_BULLET; 
    });
    
    cursorY += SPACING_ITEM; 
  };


  // --- Render Sections ---

  // 1. Name
  doc.setFont(fontMain, "bold");
  doc.setFontSize(fontSizeTitle);
  doc.setTextColor(black);
  const nameWidth = doc.getTextWidth(data.name);
  doc.text(data.name.toUpperCase(), (pageWidth - nameWidth) / 2, cursorY);
  cursorY += 20;

  // 2. Contact
  doc.setFont(fontMain, "normal");
  doc.setFontSize(fontSizeMeta);
  doc.setTextColor(black);
  
  const contactLine = [data.contact.location, data.contact.phone, data.contact.email].filter(Boolean).join("   ");
  const contactWidth = doc.getTextWidth(contactLine);
  doc.text(contactLine, (pageWidth - contactWidth) / 2, cursorY);
  cursorY += 14;

  const linkParts = [
    { text: data.contact.github?.replace('https://', ''), url: data.contact.github },
    { text: data.contact.linkedin?.replace('https://', ''), url: data.contact.linkedin }
  ].filter(p => p.text);

  let totalLinkWidth = 0;
  linkParts.forEach((p, i) => {
    totalLinkWidth += doc.getTextWidth(p.text!);
    if (i < linkParts.length - 1) totalLinkWidth += doc.getTextWidth("   ");
  });

  let linkCursorX = (pageWidth - totalLinkWidth) / 2;
  
  linkParts.forEach((p, i) => {
    if (!p.text) return;
    doc.setTextColor(linkBlue); 
    doc.text(p.text, linkCursorX, cursorY);
    let url = p.url;
    if (url && !url.startsWith('http')) url = 'https://' + url;
    if (url) doc.link(linkCursorX, cursorY - 10, doc.getTextWidth(p.text), 12, { url });

    linkCursorX += doc.getTextWidth(p.text);
    if (i < linkParts.length - 1) {
       doc.text("   ", linkCursorX, cursorY);
       linkCursorX += doc.getTextWidth("   ");
    }
  });
  cursorY += 30;

  // 3. Summary
  if (data.summary) {
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("SUMMARY", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);
    
    // Justified summary
    cursorY = printRichText(data.summary, marginX, cursorY, fontSizeBody, contentWidth);
    cursorY += SPACING_SECTION;
  }

  // 4. Experience
  if (data.experience && data.experience.length > 0) {
    checkPageBreak(60);
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("PROFESSIONAL EXPERIENCE", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);

    data.experience.forEach(exp => renderItem(exp));
    cursorY += (SPACING_SECTION - SPACING_ITEM); // Adjust for last item spacing
  }

  // 5. Research (Natural flow)
  if (data.research && data.research.length > 0) {
    checkPageBreak(60);
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("ACADEMIC RESEARCH & DEVELOPMENT", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);

    data.research.forEach(res => renderItem(res));
    cursorY += (SPACING_SECTION - SPACING_ITEM);
  }

  // 6. Education
  if (data.education && data.education.length > 0) {
    checkPageBreak(60);
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("EDUCATION", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);

    data.education.forEach(edu => {
      checkPageBreak(40);
      doc.setTextColor(black);
      doc.setFont(fontMain, "bold");
      doc.setFontSize(11);
      doc.text(edu.school, marginX, cursorY);
      
      doc.setFont(fontMain, "bold");
      doc.setFontSize(fontSizeMeta);
      doc.text(edu.date, marginX + contentWidth - doc.getTextWidth(edu.date), cursorY);
      cursorY += 13;

      doc.setFont(fontMain, "italic");
      doc.setFontSize(fontSizeMeta);
      const degreeText = `${edu.degree}`;
      doc.text(degreeText, marginX, cursorY);
      
      if (edu.location) {
          doc.text(`| ${edu.location}`, marginX + doc.getTextWidth(degreeText) + 6, cursorY);
      }
      cursorY += 13;

      if (edu.details) {
         doc.setFont(fontMain, "normal");
         doc.setFontSize(fontSizeBody);
         cursorY = printRichText(edu.details, marginX, cursorY, fontSizeBody, contentWidth);
      }
      cursorY += SPACING_ITEM;
    });
    cursorY += (SPACING_SECTION - SPACING_ITEM);
  }

  // 7. Certification
  if (data.certification && data.certification.length > 0) {
    checkPageBreak(60);
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("CERTIFICATION", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);

    data.certification.forEach(cert => {
       checkPageBreak(35);
       doc.setFont(fontMain, "bold");
       doc.setFontSize(11);
       doc.text(cert.institution, marginX, cursorY);
       doc.text(cert.date, marginX + contentWidth - doc.getTextWidth(cert.date), cursorY);
       cursorY += 13;

       doc.setFont(fontMain, "italic");
       doc.setFontSize(fontSizeMeta);
       doc.text(cert.name, marginX, cursorY);
       cursorY += 13;

       if (cert.details) {
         cursorY = printRichText(cert.details, marginX, cursorY, fontSizeBody, contentWidth);
       }
       cursorY += SPACING_ITEM;
    });
    cursorY += (SPACING_SECTION - SPACING_ITEM);
  }

  // 8. Technical Skills
  if (data.skills && data.skills.length > 0) {
    checkPageBreak(60);
    doc.setFont(fontMain, "bold");
    doc.setFontSize(fontSizeHeader);
    doc.setTextColor(black);
    doc.text("TECHNICAL SKILLS", marginX, cursorY);
    cursorY += 8;
    cursorY = drawLine(cursorY);

    doc.setFontSize(fontSizeBody);
    data.skills.forEach(skill => {
        checkPageBreak(18);
        doc.setFont(fontMain, "bold");
        doc.text(skill.category + ":", marginX, cursorY);

        // Align details
        const indentX = marginX + 155; 
        cursorY = printRichText(skill.items, indentX, cursorY, fontSizeBody, pageWidth - indentX - marginX);
        cursorY += 4; // slight gap
    });
  }

  doc.save('Zhilin_Tang_Resume.pdf');
};