import React from 'react';
import { CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const FormatAdvice: React.FC = () => {
  return (
    <div className="p-5 bg-slate-50 h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Formatting Analysis
      </h2>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
          <h3 className="text-green-700 font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            What works well
          </h3>
          <ul className="text-sm space-y-2 text-slate-600">
            <li>• <strong>Strong Action Verbs:</strong> "Spearheaded", "Engineered", "Architected" are excellent starts for bullet points.</li>
            <li>• <strong>Quantifiable Metrics:</strong> "60% reduction", "1.5x increase", "50+ models". This is exactly what US recruiters look for.</li>
            <li>• <strong>Tech Stack Density:</strong> Very clear focus on GPU/CUDA/C++. The specialized skills are easy to find.</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
          <h3 className="text-amber-700 font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Changes Applied & Tips
          </h3>
          <ul className="text-sm space-y-3 text-slate-600">
            <li>
              <strong>Research Section Merged:</strong> 
              <p className="mt-1 text-xs text-slate-500">Your original text had a floating "HPC Acceleration" section. I have merged it under the DePaul Research Assistant role to maintain chronological flow.</p>
            </li>
            <li>
              <strong>Date Formatting:</strong>
              <p className="mt-1 text-xs text-slate-500">Standardized to "Month Year – Month Year" for consistency. Added "Present" for the current role.</p>
            </li>
            <li>
              <strong>US Resume Standards:</strong>
              <ul className="pl-4 mt-1 list-disc text-xs text-slate-500 space-y-1">
                <li>No photos or personal details (age, marital status).</li>
                <li>One page is ideal for &lt;10 years exp. Your density is high, so 1 page looks very professional with this layout.</li>
                <li>Hyperlinks for Github/LinkedIn should be clickable but concise (removed https:// for print aesthetics).</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
           <h3 className="font-semibold text-slate-800 mb-2">Content Strategy Suggestions</h3>
           <p className="text-sm text-slate-600 mb-2">
             Since you are targeting US High Frequency Trading (HFT) or AI Infrastructure roles:
           </p>
           <ul className="text-sm list-disc pl-4 space-y-1 text-slate-600">
             <li>Ensure <strong>C++17/20</strong> is mentioned if you know it (recruiters love modern C++ standards).</li>
             <li>For the "Graduate Research", emphasize if the "novel attention mechanism" was published or if the code is open source.</li>
             <li>Double check the phone number format. Is +1 (312) your current US number? Ensure it is active.</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default FormatAdvice;