import React from 'react';
import { CVData } from '../types';
import { cn } from '../lib/utils';
import { Mail, Phone, MapPin, Award, BookOpen, Briefcase, User, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

interface SmartExecutiveTemplateProps {
  data: CVData;
}

export const SmartExecutiveTemplate = React.memo(React.forwardRef<HTMLDivElement, SmartExecutiveTemplateProps>(({ data }, ref) => {
  const { theme, personalInfo, careerObjective, education, computerSkills, trainings, workExperience, languageProficiency, declaration, references, selectedSections } = data;
  const primaryColor = theme.primaryColor || '#4338ca'; // Indigo
  const displayLineSpacing = theme.lineSpacing === -50 ? 0.7 : theme.lineSpacing;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const formatAddress = (village: string, po: string, upazila: string, district: string) => {
    const parts = [];
    if (village) parts.push(`Vill: ${village}`);
    if (po) parts.push(`P.O: ${po}`);
    if (upazila) parts.push(`Upazila: ${upazila}`);
    if (district) parts.push(`Dist: ${district}`);
    return parts.join(', ');
  };

  const presentAddress = formatAddress(personalInfo.presentVillage, personalInfo.presentPostOffice, personalInfo.presentUpazila, personalInfo.presentDistrict);
  const permanentAddress = formatAddress(personalInfo.permanentVillage, personalInfo.permanentPostOffice, personalInfo.permanentUpazila, personalInfo.permanentDistrict);

  const renderSmartHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-2 mb-2 mt-4 break-after-avoid">
      <div 
        className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
        style={{ backgroundColor: primaryColor }}
      >
        {icon}
      </div>
      <h3 
        contentEditable={theme.editableMode}
        suppressContentEditableWarning
        className="font-black uppercase tracking-wider text-[10pt] outline-none"
        style={{ color: primaryColor }}
      >
        {title}
      </h3>
      <div className="flex-1 h-[1.5px] bg-slate-100" />
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white w-[210mm] mx-auto shadow-2xl print:shadow-none print:m-0 flex flex-col relative cv-paper",
        theme.fontStyle
      )}
      style={{
        minHeight: `${297 * theme.pageCount}mm`,
        padding: `${theme.pageMargin}mm`
      }}
    >
      {/* Top Smart Gradient Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500"
      />

      {/* Header */}
      <div className="pb-4 mb-3 border-b border-slate-200 shrink-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <span className="text-[8pt] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Professional Curriculum Vitae
            </span>
            <h1 
              contentEditable={theme.editableMode}
              suppressContentEditableWarning
              className="text-3xl font-black uppercase tracking-tight text-slate-900 outline-none mt-1 mb-2"
            >
              {personalInfo.name || 'YOUR FULL NAME'}
            </h1>

            <div className="flex flex-wrap gap-3 text-[8.5pt] text-slate-600">
              {personalInfo.phone && (
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <Phone size={12} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail size={12} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning>{personalInfo.email}</span>
                </div>
              )}
              {presentAddress && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning>{presentAddress}</span>
                </div>
              )}
            </div>
          </div>

          {personalInfo.photo && (
            <div 
              className="w-24 h-32 rounded-xl border-2 p-1 bg-white shadow-sm shrink-0 overflow-hidden"
              style={{ borderColor: primaryColor }}
            >
              <img 
                src={personalInfo.photo} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div 
        className="flex-1 space-y-3"
        style={{ fontSize: `${theme.fontSize}pt`, lineHeight: displayLineSpacing }}
      >
        {selectedSections.map((sectionId) => {
          if (sectionId === 'careerObjective' && careerObjective) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Career Objective', <Award size={13} />)}
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-slate-800 text-justify text-[9pt] leading-relaxed">
                  <p contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">
                    {careerObjective}
                  </p>
                </div>
              </section>
            );
          }

          if (sectionId === 'education' && education.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Academic Qualification', <BookOpen size={13} />)}
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-[8.5pt]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-black uppercase text-[8pt]">
                        <th className="py-2 px-3">Exam / Degree</th>
                        <th className="py-2 px-3">Subject / Major</th>
                        <th className="py-2 px-3">Board / University</th>
                        <th className="py-2 px-3 text-center">Year</th>
                        <th className="py-2 px-3 text-center">GPA / Division</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {education.map((edu, idx) => (
                        <tr key={edu.id} className={idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"}>
                          <td className="py-2 px-3 font-bold text-slate-900">{edu.examName}</td>
                          <td className="py-2 px-3 text-slate-700">{edu.subject}</td>
                          <td className="py-2 px-3 text-slate-700">{edu.board || edu.instituteName}</td>
                          <td className="py-2 px-3 text-center font-semibold text-slate-800">{edu.passingYear}</td>
                          <td className="py-2 px-3 text-center font-black text-indigo-700">{edu.gpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          }

          if (sectionId === 'workExperience' && workExperience.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Work Experience', <Briefcase size={13} />)}
                <div className="space-y-2">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold text-slate-900 text-[9pt]">{exp.position} — <span style={{ color: primaryColor }}>{exp.companyName}</span></span>
                        <span className="text-[8pt] font-semibold text-slate-500">{exp.duration}</span>
                      </div>
                      {exp.description && <p className="text-slate-600 text-[8.5pt]">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'computerSkills' && computerSkills.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Computer Skills', <Globe size={13} />)}
                <div className="grid grid-cols-2 gap-2 text-[8.5pt]">
                  {computerSkills.map((cSkill) => (
                    <div key={cSkill.id} className="p-2 rounded-lg border border-slate-100 bg-slate-50/40">
                      <span className="font-bold text-slate-900 block mb-0.5">{cSkill.instituteName || 'Special Training'}</span>
                      <div className="flex flex-wrap gap-1">
                        {cSkill.skills.map((s, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[7.5pt] bg-white border border-slate-200 text-slate-700 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'languageProficiency' && languageProficiency.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Language Skills', <Globe size={13} />)}
                <div className="grid grid-cols-3 gap-2 text-[8.5pt]">
                  {languageProficiency.map((lp) => (
                    <div key={lp.id} className="p-2 rounded-lg border border-slate-100 bg-slate-50/40 flex justify-between">
                      <span className="font-bold text-slate-900">{lp.language}</span>
                      <span className="font-bold text-indigo-600 text-[8pt]">{lp.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (sectionId === 'personalInfo') {
            const bioFields = [
              { label: "Father's Name", value: personalInfo.fathersName },
              { label: "Mother's Name", value: personalInfo.mothersName },
              { label: "Date of Birth", value: formatDate(personalInfo.dob) },
              { label: "Gender", value: personalInfo.gender },
              { label: "Marital Status", value: personalInfo.maritalStatus },
              { label: "Nationality", value: personalInfo.nationality || 'Bangladeshi' },
              { label: "Religion", value: personalInfo.religion },
              { label: "Permanent Address", value: permanentAddress },
              { label: "Present Address", value: presentAddress },
            ].filter(f => Boolean(f.value));

            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('Personal Details', <User size={13} />)}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-[8.5pt]">
                    {bioFields.map((field, idx) => (
                      <div key={idx} className="grid grid-cols-[115px_10px_1fr]">
                        <span className="font-bold text-slate-700">{field.label}</span>
                        <span className="font-bold text-slate-400">:</span>
                        <span className="text-slate-800" contentEditable={theme.editableMode} suppressContentEditableWarning>{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          if (sectionId === 'declaration' && declaration) {
            return (
              <section key={sectionId} className="break-inside-avoid mt-4">
                {renderSmartHeader('Declaration', <ShieldCheck size={13} />)}
                <p contentEditable={theme.editableMode} suppressContentEditableWarning className="text-slate-700 text-justify text-[8.5pt] mb-6">
                  {declaration}
                </p>
                <div className="flex justify-between items-end pt-3 text-[8.5pt]">
                  <div className="text-slate-600 space-y-0.5">
                    <p>Date: ________________</p>
                    <p>Place: _______________</p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 border-t-2 border-slate-900 pt-1 font-bold text-slate-900">
                      {personalInfo.name || 'Applicant Signature'}
                    </div>
                    <span className="text-[7.5pt] text-slate-500 uppercase tracking-widest">Signature</span>
                  </div>
                </div>
              </section>
            );
          }

          if (sectionId === 'references' && references && references.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSmartHeader('References', <User size={13} />)}
                <div className="grid grid-cols-2 gap-3 text-[8.5pt]">
                  {references.map((r) => (
                    <div key={r.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/40">
                      <p className="font-bold text-slate-900">{r.name}</p>
                      <p className="text-slate-600">{r.position}, {r.organization}</p>
                      {r.phone && <p className="text-slate-800 font-semibold mt-0.5">{r.phone}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}));

SmartExecutiveTemplate.displayName = 'SmartExecutiveTemplate';
