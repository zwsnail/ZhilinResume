import React from 'react';
import { ResumeData } from '../types';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const handleChange = (section: keyof ResumeData, value: any) => {
    onChange({ ...data, [section]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    onChange({
      ...data,
      contact: { ...data.contact, [field]: value }
    });
  };

  const handleSkillChange = (index: number, field: 'category' | 'items', value: string) => {
    const newSkills = [...(data.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    handleChange('skills', newSkills);
  };

  return (
    <div className="space-y-8 p-4">
      {/* Basics */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">Full Name</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.name} 
              onChange={(e) => handleChange('name', e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">Location</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.contact.location} 
              onChange={(e) => handleContactChange('location', e.target.value)} 
            />
          </div>
           <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">Phone</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.contact.phone} 
              onChange={(e) => handleContactChange('phone', e.target.value)} 
            />
          </div>
           <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">Email</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.contact.email} 
              onChange={(e) => handleContactChange('email', e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">LinkedIn (URL)</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.contact.linkedin} 
              onChange={(e) => handleContactChange('linkedin', e.target.value)} 
            />
          </div>
           <div>
            <label className="block text-xs font-medium text-slate-500 uppercase">GitHub (URL)</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.contact.github} 
              onChange={(e) => handleContactChange('github', e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Professional Summary</h3>
        <textarea 
          className="w-full h-32 p-3 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
        <p className="text-xs text-slate-400 mt-2">Tip: Keep it 3-4 lines maximum. Focus on specific technologies and years of experience.</p>
      </div>

      {/* Skills Editor */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Technical Skills</h3>
        <div className="space-y-4">
          {data.skills?.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text"
                className="w-1/3 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                value={skill.category}
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
              />
              <input 
                type="text"
                className="w-2/3 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={skill.items}
                onChange={(e) => handleSkillChange(index, 'items', e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

       {/* Notice */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        <p>
          <strong>Editor Note:</strong> This is a lightweight editor for fine-tuning. The layout on the right updates automatically. 
          Use the <strong>"Download PDF"</strong> button to save the file.
        </p>
      </div>
    </div>
  );
};

export default ResumeEditor;