import React, { useState } from 'react';
import { INITIAL_DATA } from './constants';
import ResumePreview from './components/ResumePreview';
import FormatAdvice from './components/FormatAdvice';
import { ResumeData } from './types';
import { generatePDF } from './utils/pdfGenerator';
import { Download, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  // Data is static
  const [resumeData] = useState<ResumeData>(INITIAL_DATA);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      if (window.jspdf) {
        generatePDF(resumeData);
      } else {
        alert('PDF Engine is loading. Please wait a moment and try again.');
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col h-screen">
      {/* Top Navbar - Hidden on Print */}
      <nav className="h-16 bg-slate-850 text-white flex items-center justify-between px-6 shadow-lg shrink-0 no-print z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center font-bold text-lg shadow-inner">
            R
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-tight">ResumeArchitect</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">US Format Edition</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium text-sm transition-all shadow-md hover:shadow-lg active:scale-95 ${isDownloading ? 'opacity-75 cursor-wait' : ''}`}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden bg-slate-100">
        
        {/* Left Sidebar (Advice Only) - Shrink to 225px */}
        <aside className="w-[225px] bg-white border-r border-slate-200 flex flex-col no-print shadow-xl z-0">
          <div className="flex border-b border-slate-200 bg-slate-50">
            <div className="flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 text-blue-600">
              <MessageSquare className="w-4 h-4" />
              Expert Review
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <FormatAdvice />
          </div>
        </aside>

        {/* Right Preview Area */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible">
          <div className="shadow-2xl print:shadow-none print:w-full">
            <ResumePreview data={resumeData} />
          </div>
        </main>

      </div>
    </div>
  );
};

export default App;