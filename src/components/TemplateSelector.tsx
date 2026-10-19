import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Layout, Sparkles, Award, Eye, X, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';
import { TemplateId, CVData, DEFAULT_CV_DATA } from '../types';
import { cn } from '../lib/utils';
import { CVHistory } from './CVHistory';
import { CVPreview } from './CVPreview';

interface TemplateSelectorProps {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
  onNext: () => void;
  history: CVData[];
  onViewHistory: (cv: CVData) => void;
  onDeleteHistory: (id: string) => void;
  onPrintHistory: (cv: CVData) => void;
  onDownloadHistory: (cv: CVData) => void;
}

interface TemplateOption {
  id: TemplateId;
  name: string;
  tagline: string;
  category: 'vibrant' | 'classic' | 'smart' | 'modern';
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'vibrant-prime',
    name: 'Vibrant Prime (2.0)',
    tagline: 'Updated Next-Gen Vibrant',
    category: 'vibrant',
    badge: 'NEW • 2026',
    badgeColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/25',
    description: 'All-new upgraded version of Vibrant Professional featuring dual-tone gradient badges, contact chips, zebra qualification tables, and digital verification seal.',
    features: ['Gradient Ribbons', 'Photo Frame', 'Zebra Table', 'Digital Seal'],
  },
  {
    id: 'classic-prestige',
    name: 'Classic Prestige (2.0)',
    tagline: 'Updated Corporate & Civil',
    category: 'classic',
    badge: 'NEW • 2026',
    badgeColor: 'bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-indigo-500/25',
    description: 'All-new upgraded version of Classic Professional featuring formal double-rule crest headers, dual-box Address cards, architectural qualification tables, and civil bio-data.',
    features: ['Double Rule Header', 'Dual Address Box', 'Architectural Table', 'Formal Bio-Data'],
  },
  {
    id: 'smart-executive',
    name: 'Smart Executive',
    tagline: 'Smart Hybrid Edition',
    category: 'smart',
    badge: 'HYBRID',
    badgeColor: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
    description: 'The best of both worlds: academic rigor of Classic format paired with the modern visual energy and icon accents of Vibrant format.',
    features: ['Icon Accents', 'Smart Tables', 'Tag Badges', 'Clean Alignment'],
  },
  {
    id: 'vibrant',
    name: 'Vibrant Professional',
    tagline: 'Standard BD Format',
    category: 'vibrant',
    badge: 'POPULAR',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Signature Bangladeshi style featuring vivid gradient section badges, passport photo frame, tabular qualifications, and verified declaration.',
    features: ['Vivid Badges', 'Tabular Education', 'Verified Signature'],
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    tagline: 'Timeless Academic & Corporate',
    category: 'classic',
    badge: 'STANDARD',
    badgeColor: 'bg-slate-800 text-white',
    description: 'Clean traditional layout with formal double rule headers, structured academic tables, and aligned biographical details.',
    features: ['Double Rule', 'Academic Focus', 'Formal Alignment'],
  },
  {
    id: 'smart-classic',
    name: 'Smart Classic',
    tagline: 'Modern Elegance',
    category: 'smart',
    description: 'An upgraded evolution of classic typography with a sleek top accent bar, modern sans-serif hierarchy, and optimized vertical rhythm.',
    features: ['Accent Bar', 'Card Milestones', 'Clean Rhythm'],
  },
  {
    id: 'smart-modern',
    name: 'Smart Modern',
    tagline: 'Executive Presentation',
    category: 'smart',
    description: 'Sophisticated layout with dot-connected career milestones, modern badge chips, and distinguished header accents.',
    features: ['Dark Banner', 'Milestone Dots', 'Skill Badges'],
  },
  {
    id: 'modern',
    name: 'Modern Sidebar',
    tagline: 'Contemporary 2-Column',
    category: 'modern',
    description: 'Striking two-column architecture featuring a high-contrast sidebar for contact, IT skills, and languages beside an expansive career timeline.',
    features: ['2-Column Layout', 'Dark Sidebar', 'Skill Meters'],
  },
];

// Rich, High-Fidelity CSS Visual Mockup for every template format
const TemplateMiniMockup: React.FC<{ templateId: TemplateId }> = ({ templateId }) => {
  // 1. Vibrant Prime (2.0) - Updated Vibrant Version
  if (templateId === 'vibrant-prime') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between text-[6px] select-none pointer-events-none font-sans">
        <div>
          {/* Top Tri-Color Gradient Stripe */}
          <div className="h-1 bg-gradient-to-r from-emerald-600 via-sky-500 to-teal-700 rounded-full w-full mb-2" />
          
          {/* Header */}
          <div className="flex justify-between items-start gap-2 pb-2 mb-2 border-b border-emerald-100">
            <div className="flex-1 space-y-1">
              <span className="inline-block px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-black text-[5px]">
                CURRICULUM VITAE
              </span>
              <div className="h-2.5 bg-slate-900 rounded-sm w-4/5 font-black" />
              <div className="flex gap-1 pt-0.5">
                <span className="px-1 py-0.2 rounded bg-slate-100 text-emerald-700 text-[5px] font-bold">01622...</span>
                <span className="px-1 py-0.2 rounded bg-slate-100 text-slate-600 text-[5px]">Jamalpur</span>
              </div>
            </div>
            {/* Passport Photo Frame with dual-colored ring */}
            <div className="w-7 h-9 rounded-sm border-2 border-emerald-600 p-0.5 bg-white shadow-xs shrink-0 flex items-center justify-center">
              <div className="w-5 h-6 bg-slate-200 rounded-xs flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>

          {/* Section 1 - Career Objective with gradient ribbon */}
          <div className="mb-2">
            <div className="h-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-sm w-full mb-1 flex items-center px-1.5 shadow-xs">
              <span className="text-[5px] text-white font-black uppercase tracking-wider">★ Career Objective</span>
            </div>
            <div className="p-1 rounded bg-slate-50 border-l-2 border-emerald-600 space-y-0.5">
              <div className="h-1 bg-slate-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-4/5" />
            </div>
          </div>

          {/* Section 2 - Updated Academic Qualifications Zebra Table */}
          <div className="mb-2">
            <div className="h-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-sm w-full mb-1 flex items-center px-1.5 shadow-xs">
              <span className="text-[5px] text-white font-black uppercase tracking-wider">★ Academic Qualifications</span>
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-700 to-teal-800 flex items-center justify-between px-1 text-white font-bold text-[5px]">
                <span>Degree</span>
                <span>Board</span>
                <span>Year</span>
                <span>GPA</span>
              </div>
              <div className="h-2 bg-emerald-50/50 flex items-center justify-between px-1 border-b border-slate-100">
                <span className="font-bold text-slate-800 text-[5px]">B.Sc CSE</span>
                <span className="text-slate-500 text-[5px]">Dhaka</span>
                <span className="text-slate-600 text-[5px]">2022</span>
                <span className="px-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[5px]">3.78</span>
              </div>
              <div className="h-2 bg-white flex items-center justify-between px-1">
                <span className="font-bold text-slate-800 text-[5px]">H.S.C</span>
                <span className="text-slate-500 text-[5px]">Mym</span>
                <span className="text-slate-600 text-[5px]">2017</span>
                <span className="px-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[5px]">4.83</span>
              </div>
            </div>
          </div>

          {/* Section 3 - Personal Details (2-col grid) */}
          <div>
            <div className="h-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-sm w-full mb-1 flex items-center px-1.5 shadow-xs">
              <span className="text-[5px] text-white font-black uppercase tracking-wider">★ Personal Details</span>
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-50 rounded">
              <div className="h-1 bg-slate-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-4/5" />
              <div className="h-1 bg-slate-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-3/4" />
            </div>
          </div>
        </div>

        {/* Footer Seal & Signature */}
        <div className="flex justify-between items-end pt-1 border-t border-slate-100">
          <div className="text-[5px] text-slate-400 font-medium">Date: 2026-10-18</div>
          <div className="w-12 border-t border-slate-800 text-center">
            <div className="h-1 bg-slate-500 rounded w-8 mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Classic Prestige (2.0) - Updated Classic Version
  if (templateId === 'classic-prestige') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between text-[6px] select-none pointer-events-none font-serif">
        <div>
          {/* Top Double Rule Monogram Header */}
          <div className="border-b-[1.5px] border-slate-900 pb-1 mb-1.5">
            <div className="border-b border-slate-300 pb-0.5 mb-1 flex justify-between items-center">
              <span className="text-[5.5px] font-black uppercase tracking-[0.2em] text-slate-800">
                CURRICULUM VITAE
              </span>
              <span className="text-[4.5px] text-slate-400 italic">Confidential</span>
            </div>
            <div className="flex justify-between items-start gap-1">
              <div>
                <div className="h-2.5 bg-blue-950 rounded-sm w-28 font-black" />
                <div className="h-1 bg-slate-400 rounded w-16 mt-0.5" />
              </div>
              {/* Formal photo box with crisp outline */}
              <div className="w-6 h-8 border border-slate-800 bg-slate-50 shrink-0 flex items-center justify-center">
                <div className="w-3 h-4 bg-slate-300" />
              </div>
            </div>
          </div>

          {/* Dual Address Frame Box */}
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="border border-slate-300 p-1 bg-slate-50/50 rounded-xs">
              <span className="text-[5px] font-black text-blue-900 uppercase block">Present Address:</span>
              <div className="h-0.8 bg-slate-300 rounded w-full mt-0.5" />
              <div className="h-0.8 bg-slate-300 rounded w-4/5 mt-0.5" />
            </div>
            <div className="border border-slate-300 p-1 bg-slate-50/50 rounded-xs">
              <span className="text-[5px] font-black text-blue-900 uppercase block">Permanent Address:</span>
              <div className="h-0.8 bg-slate-300 rounded w-full mt-0.5" />
              <div className="h-0.8 bg-slate-300 rounded w-4/5 mt-0.5" />
            </div>
          </div>

          {/* Academic Qualifications Formal Architectural Table */}
          <div className="mb-2">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[5.5px] font-black uppercase text-blue-950">Academic Qualifications</span>
              <div className="flex-1 h-[1px] bg-blue-900" />
            </div>
            <div className="border border-slate-400">
              <div className="bg-slate-100 flex items-center justify-between px-1 py-0.5 border-b border-slate-400 font-bold text-[5px] text-slate-900">
                <span>Degree</span>
                <span>Board</span>
                <span>Passing</span>
                <span>GPA</span>
              </div>
              <div className="flex items-center justify-between px-1 py-0.5 border-b border-slate-200 text-[5px]">
                <span className="font-bold text-slate-900">B.Sc CSE</span>
                <span className="text-slate-600">Dhaka</span>
                <span className="text-slate-600">2022</span>
                <span className="font-bold text-blue-900">3.78</span>
              </div>
              <div className="flex items-center justify-between px-1 py-0.5 text-[5px] bg-slate-50/50">
                <span className="font-bold text-slate-900">H.S.C</span>
                <span className="text-slate-600">Mym</span>
                <span className="text-slate-600">2017</span>
                <span className="font-bold text-blue-900">4.83</span>
              </div>
            </div>
          </div>

          {/* Personal Bio-Data Alignment */}
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[5.5px] font-black uppercase text-blue-950">Personal Information</span>
              <div className="flex-1 h-[1px] bg-blue-900" />
            </div>
            <div className="space-y-0.5 pl-1">
              <div className="flex justify-between">
                <span className="text-slate-700 font-bold">Father's Name :</span>
                <span className="text-slate-900 font-medium w-16">Md. Abdur Rahim</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 font-bold">Date of Birth :</span>
                <span className="text-slate-900 font-medium w-16">15-05-1998</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 font-bold">Nationality :</span>
                <span className="text-slate-900 font-medium w-16">Bangladeshi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="flex justify-between items-end pt-1">
          <span className="text-[5px] text-slate-500">Date: ____________</span>
          <div className="w-14 border-t border-slate-800 text-center">
            <span className="text-[4.5px] text-slate-600 block">(Applicant Signature)</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Smart Executive - Hybrid
  if (templateId === 'smart-executive') {
    return (
      <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between text-[6px] select-none pointer-events-none font-sans">
        <div>
          {/* Top Multi-Gradient Line */}
          <div className="h-1 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 w-full rounded-full mb-2" />
          
          <div className="flex justify-between items-start mb-2 pb-1.5 border-b border-slate-100">
            <div>
              <span className="text-[5px] font-black uppercase tracking-widest text-indigo-600 block mb-0.5">
                Executive Profile
              </span>
              <div className="h-2.5 bg-slate-900 rounded w-24 mb-1" />
              <div className="flex gap-1 text-[5px] text-slate-500">
                <span>01622638268</span>
                <span>•</span>
                <span>maksudjr2020@gmail.com</span>
              </div>
            </div>
            <div className="w-7 h-9 rounded-lg border-2 border-indigo-600 p-0.5 bg-indigo-50/50 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-indigo-300" />
            </div>
          </div>

          {/* Section 1 */}
          <div className="mb-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2.5 h-2.5 rounded bg-indigo-600 flex items-center justify-center text-white text-[4px]">◆</div>
              <span className="text-[5.5px] font-black text-indigo-950 uppercase">Career Objective</span>
              <div className="flex-1 h-[1px] bg-slate-200" />
            </div>
            <div className="p-1 rounded bg-slate-50 text-slate-600 space-y-0.5">
              <div className="h-1 bg-slate-200 rounded w-full" />
              <div className="h-1 bg-slate-200 rounded w-5/6" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2.5 h-2.5 rounded bg-indigo-600 flex items-center justify-center text-white text-[4px]">◆</div>
              <span className="text-[5.5px] font-black text-indigo-950 uppercase">Education</span>
              <div className="flex-1 h-[1px] bg-slate-200" />
            </div>
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="h-2 bg-slate-100 flex items-center justify-between px-1 text-[5px] font-bold">
                <span>Exam</span>
                <span>Board</span>
                <span>GPA</span>
              </div>
              <div className="h-2 bg-white flex items-center justify-between px-1 text-[5px]">
                <span className="font-bold text-slate-800">B.Sc CSE</span>
                <span className="text-slate-500">Dhaka</span>
                <span className="font-bold text-indigo-600">3.78</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <div className="w-12 border-t border-slate-800 text-center">
            <span className="text-[5px] text-slate-500">Signature</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Vibrant Professional (Classic)
  if (templateId === 'vibrant') {
    return (
      <div className="w-full h-full bg-white p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start gap-2 border-b border-gray-100 pb-2 mb-2">
            <div className="flex-1 space-y-1">
              <div className="h-2.5 bg-emerald-700 rounded-sm w-3/4 font-black" />
              <div className="h-1 bg-gray-300 rounded w-1/2" />
              <div className="flex gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="h-1 bg-gray-200 rounded w-16" />
              </div>
            </div>
            <div className="w-7 h-9 border-2 border-emerald-600 rounded-sm bg-gray-100 flex items-center justify-center shrink-0">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Section 1 - Objective */}
          <div className="mb-2">
            <div className="h-2 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-sm w-full mb-1 flex items-center px-1">
              <span className="text-[5px] text-white font-bold uppercase tracking-wider">Career Objective</span>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 bg-gray-200 rounded w-full" />
              <div className="h-1 bg-gray-200 rounded w-5/6" />
            </div>
          </div>

          {/* Section 2 - Table */}
          <div className="mb-2">
            <div className="h-2 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-sm w-full mb-1 flex items-center px-1">
              <span className="text-[5px] text-white font-bold uppercase tracking-wider">Education</span>
            </div>
            <div className="border border-emerald-100 rounded-sm overflow-hidden">
              <div className="h-2 bg-emerald-50 flex items-center px-1 border-b border-emerald-100">
                <div className="h-1 bg-emerald-300 rounded w-8" />
              </div>
              <div className="h-2 flex items-center px-1 border-b border-gray-50">
                <div className="h-1 bg-gray-300 rounded w-12" />
              </div>
              <div className="h-2 flex items-center px-1">
                <div className="h-1 bg-gray-200 rounded w-10" />
              </div>
            </div>
          </div>

          {/* Section 3 - Personal details grid */}
          <div>
            <div className="h-2 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-sm w-full mb-1 flex items-center px-1">
              <span className="text-[5px] text-white font-bold uppercase tracking-wider">Personal Info</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="h-1 bg-gray-200 rounded w-full" />
              <div className="h-1 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="flex justify-end pt-1 border-t border-gray-100">
          <div className="w-10 border-t border-gray-400 text-center">
            <div className="h-1 bg-gray-300 rounded w-6 mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    );
  }

  // 5. Classic Professional
  if (templateId === 'classic') {
    return (
      <div className="w-full h-full bg-white p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none">
        <div>
          {/* Top Double Rule Header */}
          <div className="border-b-2 border-indigo-700 pb-1.5 mb-2 text-center">
            <div className="h-1 bg-indigo-700 rounded w-1/3 mx-auto mb-1" />
            <div className="h-2.5 bg-indigo-950 rounded-sm w-3/5 mx-auto font-black" />
            <div className="h-1 bg-gray-300 rounded w-2/5 mx-auto mt-1" />
          </div>

          {/* Photo Float Top Right */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 space-y-1">
              <div className="h-1.5 bg-indigo-700 rounded w-20" />
              <div className="h-1 bg-gray-200 rounded w-full" />
              <div className="h-1 bg-gray-200 rounded w-4/5" />
            </div>
            <div className="w-6 h-8 border border-gray-300 bg-gray-100 rounded-sm ml-2 shrink-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Education Table */}
          <div className="mb-2">
            <div className="h-1.5 bg-indigo-700 rounded w-24 mb-1" />
            <div className="border border-gray-300 rounded-sm">
              <div className="h-2 bg-gray-100 border-b border-gray-300 flex items-center px-1">
                <div className="h-1 bg-gray-400 rounded w-16" />
              </div>
              <div className="h-2 border-b border-gray-100 flex items-center px-1">
                <div className="h-1 bg-gray-300 rounded w-20" />
              </div>
            </div>
          </div>

          {/* Personal Info Alignments */}
          <div className="space-y-1">
            <div className="h-1.5 bg-indigo-700 rounded w-20 mb-1" />
            <div className="grid grid-cols-3 gap-1">
              <div className="h-1 bg-indigo-900 rounded w-8" />
              <div className="h-1 bg-gray-400 rounded w-1" />
              <div className="h-1 bg-gray-300 rounded w-16" />
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="flex justify-end pt-1">
          <div className="w-12 border-t border-gray-600 text-center">
            <div className="h-1 bg-gray-400 rounded w-8 mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    );
  }

  // 6. Modern Sidebar
  if (templateId === 'modern') {
    return (
      <div className="w-full h-full bg-white flex select-none pointer-events-none">
        <div className="w-1/3 bg-slate-900 p-2 text-white flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-500 mb-2 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400" />
            </div>
            <div className="h-1.5 bg-white rounded w-10 mb-2" />
            <div className="w-full space-y-1 mb-2">
              <div className="h-1 bg-indigo-400 rounded w-8" />
              <div className="h-1 bg-slate-400 rounded w-full" />
            </div>
          </div>
          <div className="h-1 bg-slate-600 rounded w-10" />
        </div>
        <div className="w-2/3 p-2.5 flex flex-col justify-between">
          <div>
            <div className="h-2.5 bg-slate-900 rounded w-3/4 mb-1" />
            <div className="h-1 bg-indigo-600 rounded w-1/2 mb-2" />
            <div className="h-1 bg-gray-200 rounded w-full mb-1" />
            <div className="h-1 bg-gray-200 rounded w-4/5" />
          </div>
          <div className="flex justify-end">
            <div className="w-10 border-t border-gray-400 text-center pt-0.5">
              <div className="h-1 bg-gray-300 rounded w-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Smart Classic
  if (templateId === 'smart-classic') {
    return (
      <div className="w-full h-full bg-white flex flex-col justify-between text-[6px] select-none pointer-events-none">
        <div className="h-1.5 bg-indigo-600 w-full shrink-0" />
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="h-2.5 bg-slate-900 rounded w-24 mb-1" />
                <div className="h-1 bg-indigo-600 rounded w-16" />
              </div>
              <div className="w-6 h-8 rounded-sm bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-indigo-200" />
              </div>
            </div>
            <div className="mb-2">
              <div className="h-1.5 bg-indigo-600 rounded w-20 mb-1" />
              <div className="h-1 bg-gray-200 rounded w-full mb-0.5" />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <div className="w-10 border-t border-gray-400 text-center pt-0.5">
              <div className="h-1 bg-gray-300 rounded w-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. Smart Modern
  return (
    <div className="w-full h-full bg-white flex flex-col justify-between p-3 select-none pointer-events-none">
      <div>
        <div className="p-2 bg-slate-900 rounded-lg text-white mb-2 flex justify-between items-center">
          <div>
            <div className="h-2 bg-white rounded w-20 mb-1" />
            <div className="h-1 bg-amber-400 rounded w-12" />
          </div>
          <div className="w-5 h-5 rounded-full bg-slate-700 border border-amber-400 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
        </div>
        <div className="mb-2">
          <div className="h-1.5 bg-amber-600 rounded w-16 mb-1" />
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-10 border-t border-gray-400 text-center pt-0.5">
          <div className="h-1 bg-gray-300 rounded w-6 mx-auto" />
        </div>
      </div>
    </div>
  );
};

// Rich Sample Data for Full Interactive Preview Modal
const SAMPLE_PREVIEW_DATA: CVData = {
  ...DEFAULT_CV_DATA,
  theme: {
    ...DEFAULT_CV_DATA.theme,
    templateId: 'vibrant-prime',
    fontSize: 10,
    lineSpacing: 1.4,
    pageMargin: 15,
  },
  personalInfo: {
    ...DEFAULT_CV_DATA.personalInfo,
    name: 'MD. MAKSUDUR RAHMAN',
    fathersName: 'Md. Abdur Rahim',
    mothersName: 'Mst. Rezia Begum',
    dob: '1998-05-15',
    nationality: 'Bangladeshi (By Birth)',
    religion: 'Islam',
    maritalStatus: 'Unmarried',
    gender: 'Male',
    phone: '+880 1622-638268',
    email: 'maksudjr2020@gmail.com',
    presentVillage: 'Narundi',
    presentPostOffice: 'Narundi Bazar',
    presentUpazila: 'Jamalpur Sadar',
    presentDistrict: 'Jamalpur',
    permanentVillage: 'Narundi',
    permanentPostOffice: 'Narundi Bazar',
    permanentUpazila: 'Jamalpur Sadar',
    permanentDistrict: 'Jamalpur',
    photo: 'https://i.ibb.co.com/DDxbymvm/Screenshot-20260516-022402.jpg',
  },
  careerObjective: 'Motivated, detail-oriented professional seeking a challenging career position where I can utilize my technical skills, leadership, and analytical abilities to contribute toward organizational growth.',
  education: [
    {
      id: 'edu-1',
      examName: 'B.Sc. in Computer Science & Engineering',
      instituteName: 'Dhaka International University',
      board: 'Dhaka',
      subject: 'Computer Science & Engineering',
      passingYear: '2022',
      gpa: '3.78',
      gpaType: 'CGPA'
    },
    {
      id: 'edu-2',
      examName: 'Higher Secondary Certificate (HSC)',
      instituteName: 'Govt. Ashek Mahmud College',
      board: 'Mymensingh',
      subject: 'Science',
      passingYear: '2017',
      gpa: '4.83',
      gpaType: 'GPA'
    },
    {
      id: 'edu-3',
      examName: 'Secondary School Certificate (SSC)',
      instituteName: 'Narundi High School',
      board: 'Dhaka',
      subject: 'Science',
      passingYear: '2015',
      gpa: '5.00',
      gpaType: 'GPA'
    }
  ],
  workExperience: [
    {
      id: 'exp-1',
      companyName: 'Maksud Computer & IT Services',
      position: 'Senior IT Officer & System Administrator',
      duration: '2022 - Present',
      description: 'Supervised computer training, digital document processing, graphic design, and software applications.'
    }
  ],
  computerSkills: [
    {
      id: 'cs-1',
      instituteName: 'National Youth Development Training Center',
      hasTraining: true,
      duration: '6 Months',
      skills: ['MS Word', 'MS Excel', 'PowerPoint', 'Internet & Email', 'Photoshop', 'Bangla & English Typing']
    }
  ],
  languageProficiency: ['Bengali (Native Speaker)', 'English (Professional Working Proficiency)'],
  selfAssessment: ['Honest, hardworking, and punctual', 'Capable of working under pressure', 'Good interpersonal communication skills'],
  declaration: 'I hereby declare that all the information furnished above is true, complete, and correct to the best of my knowledge and belief.',
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedId, 
  onSelect, 
  onNext,
  history,
  onViewHistory,
  onDeleteHistory,
  onPrintHistory,
  onDownloadHistory
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vibrant' | 'classic' | 'smart'>('all');
  const [previewModalTemplate, setPreviewModalTemplate] = useState<TemplateOption | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.65);

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs mb-3 shadow-xs">
          <Sparkles size={14} className="text-emerald-600 animate-pulse" />
          Updated 2026 Template Collection
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
          Choose Your CV Template
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Tailored for Bangladeshi corporate, government, NGO, bank, and international applications. Pick any style below with real-time visual previews.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Templates (8)' },
            { id: 'vibrant', label: 'Vibrant Series (Updated)' },
            { id: 'classic', label: 'Classic Series (Updated)' },
            { id: 'smart', label: 'Smart Series (3)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid with Updated Preview Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {filteredTemplates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <motion.div
              key={template.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSelect(template.id)}
              className={cn(
                "relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group flex flex-col bg-white",
                isSelected 
                  ? "border-indigo-600 shadow-xl ring-4 ring-indigo-50" 
                  : "border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300"
              )}
            >
              {/* Badge */}
              {template.badge && (
                <div className={cn(
                  "absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm",
                  template.badgeColor
                )}>
                  {template.badge}
                </div>
              )}

              {/* Quick Preview Eye Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewModalTemplate(template);
                }}
                title="Full Screen Preview"
                className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-white/90 backdrop-blur-xs text-gray-600 hover:text-indigo-600 hover:bg-white shadow-sm border border-gray-100 transition-all opacity-80 group-hover:opacity-100"
              >
                <Eye size={15} />
              </button>

              {/* Miniature Realistic Paper Sheet Preview */}
              <div className="aspect-[3/4.2] bg-slate-100 p-3 relative overflow-hidden border-b border-gray-100 flex items-center justify-center">
                <div className="w-full h-full rounded-md shadow-md bg-white border border-slate-200/80 overflow-hidden transition-transform group-hover:scale-102 duration-200">
                  <TemplateMiniMockup templateId={template.id} />
                </div>
                
                {/* Selected Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-indigo-600/15 flex items-center justify-center z-10 backdrop-blur-[0.5px]">
                    <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg scale-110">
                      <Check size={22} strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>

              {/* Meta Card */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-black text-gray-900 leading-tight">
                      {template.name}
                    </h3>
                  </div>
                  
                  <p className="text-xs font-bold text-indigo-600 mb-2">
                    {template.tagline}
                  </p>
                  
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                    {template.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.features.map((feat, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isSelected ? "text-indigo-600 font-black" : "text-gray-400 group-hover:text-gray-700"
                  )}>
                    {isSelected ? '✓ Selected Template' : 'Click to Select'}
                  </span>
                  
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300"
                  )}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="flex justify-center mb-12">
        <button
          onClick={onNext}
          className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center gap-3 group active:scale-95 cursor-pointer"
        >
          Start Building with {TEMPLATES.find(t => t.id === selectedId)?.name || 'Selected Template'}
          <Layout size={20} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Interactive Full Screen Live Preview Modal */}
      <AnimatePresence>
        {previewModalTemplate && (
          <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col border border-slate-700 shadow-2xl overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="p-4 px-6 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{previewModalTemplate.name}</h3>
                    <p className="text-xs text-slate-400">{previewModalTemplate.tagline} • Full Scale A4 Simulation</p>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-slate-700/60 p-1 rounded-xl border border-slate-600">
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(0.45, prev - 0.1))}
                      className="p-1.5 hover:bg-slate-600 rounded-lg text-slate-300"
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-mono font-bold px-2 text-slate-200">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(1.0, prev + 0.1))}
                      className="p-1.5 hover:bg-slate-600 rounded-lg text-slate-300"
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onSelect(previewModalTemplate.id);
                      setPreviewModalTemplate(null);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 size={15} />
                    Use This Template
                  </button>

                  <button
                    onClick={() => setPreviewModalTemplate(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Canvas */}
              <div className="flex-1 bg-slate-950/60 p-6 overflow-auto flex justify-center items-start">
                <div 
                  className="origin-top transition-transform duration-150"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <CVPreview 
                    data={{
                      ...SAMPLE_PREVIEW_DATA,
                      theme: {
                        ...SAMPLE_PREVIEW_DATA.theme,
                        templateId: previewModalTemplate.id,
                        primaryColor: previewModalTemplate.id.includes('vibrant') ? '#059669' : (previewModalTemplate.id.includes('classic') ? '#1e3a8a' : '#4338ca')
                      }
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CVHistory 
        history={history}
        onView={onViewHistory}
        onDelete={onDeleteHistory}
        onPrint={onPrintHistory}
        onDownload={onDownloadHistory}
      />

      {/* About Us Section */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 justify-center">
            <span className="w-2 h-6 bg-indigo-600 rounded-full" />
            About Maksud Computer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border-2 border-indigo-100 shrink-0">
                  <img src="https://i.ibb.co.com/DDxbymvm/Screenshot-20260516-022402.jpg" alt="Maksudur Rahman" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Maksudur Rahman</h3>
                  <p className="text-indigo-600 font-medium text-xs">Director, Maksud Computer</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Dedicated to providing high-quality digital solutions, professional curriculum vitae generation, and IT services at Narundi Bazar, Jamalpur.
              </p>
            </div>
            <div className="space-y-2.5 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Location:</span>
                <span>Narundi Bazar, Jamalpur Sadar, Jamalpur</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Phone:</span>
                <span>01622638268</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Email:</span>
                <span>maksudjr2020@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
