import React from 'react';
import { CVData } from '../types';
import { cn } from '../lib/utils';
import { Phone, Mail, MapPin, Award, BookOpen, Briefcase, User, CheckCircle2, ShieldCheck, Globe, Calendar, Heart } from 'lucide-react';

interface VibrantPrimeTemplateProps {
  data: CVData;
}

function adjustColor(color: string, amount: number) {
  return '#' + color.replace(/^#/, '').replace(/../g, c => ('0' + Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).slice(-2));
}

export const VibrantPrimeTemplate = React.memo(React.forwardRef<HTMLDivElement, VibrantPrimeTemplateProps>(({ data }, ref) => {
  const { theme, personalInfo, careerObjective, education, computerSkills, trainings, workExperience, languageProficiency, selfAssessment, hobbies, declaration, references, selectedSections, customSection } = data;
  const primaryColor = theme.primaryColor || '#059669'; // Default emerald
  const darkColor = adjustColor(primaryColor, -35);
  const lightColor = adjustColor(primaryColor, 35);
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
    if (upazila) parts.push(`P.S/Upazila: ${upazila}`);
    if (district) parts.push(`Dist: ${district}`);
    return parts.join(', ');
  };

  const presentAddress = formatAddress(personalInfo.presentVillage, personalInfo.presentPostOffice, personalInfo.presentUpazila, personalInfo.presentDistrict);
  const permanentAddress = formatAddress(personalInfo.permanentVillage, personalInfo.permanentPostOffice, personalInfo.permanentUpazila, personalInfo.permanentDistrict);

  // Modern Vibrant Section Header with icon ribbon & gradient badge
  const renderSectionHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-2 mb-3 mt-4 break-after-avoid">
      <div 
        className="px-3.5 py-1.5 rounded-lg font-black uppercase tracking-wider text-white shadow-sm flex items-center gap-2 text-[10pt]"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${darkColor})`,
          boxShadow: `0 2px 8px ${primaryColor}35`
        }}
      >
        <span className="opacity-90">{icon}</span>
        <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">
          {title}
        </span>
      </div>
      <div className="flex-1 h-[2px] rounded-full" style={{ background: `linear-gradient(to right, ${primaryColor}55, transparent)` }} />
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
      {/* Top Accent Gradient Border */}
      <div 
        className="absolute top-0 left-0 right-0 h-2.5"
        style={{ background: `linear-gradient(90deg, ${primaryColor}, #0ea5e9, ${darkColor})` }}
      />

      {/* Modern High-End Vibrant Header */}
      <div className="pt-2 pb-4 mb-3 border-b-2 shrink-0" style={{ borderColor: `${primaryColor}25` }}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white mb-2"
                 style={{ backgroundColor: primaryColor }}>
              <Award size={11} />
              CURRICULUM VITAE
            </div>

            <h1 
              contentEditable={theme.editableMode}
              suppressContentEditableWarning
              className="text-3xl font-black uppercase tracking-tight text-slate-900 outline-none mb-1"
            >
              {personalInfo.name || 'YOUR FULL NAME'}
            </h1>

            {/* Sub-tagline / Contact chips */}
            <div className="flex flex-wrap gap-2 text-[8.5pt] text-slate-600 mt-2">
              {personalInfo.phone && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                  <Phone size={11} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning className="font-semibold">{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.email && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                  <Mail size={11} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning className="font-semibold">{personalInfo.email}</span>
                </span>
              )}
              {presentAddress && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                  <MapPin size={11} style={{ color: primaryColor }} />
                  <span contentEditable={theme.editableMode} suppressContentEditableWarning>{presentAddress}</span>
                </span>
              )}
            </div>
          </div>

          {/* Photo Frame with double border & subtle shadow */}
          {personalInfo.photo && (
            <div 
              className="w-24 h-32 rounded-xl p-1 bg-white shadow-md border-2 shrink-0 overflow-hidden"
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

      {/* Main Content Sections */}
      <div 
        className="flex-1 space-y-4"
        style={{ fontSize: `${theme.fontSize}pt`, lineHeight: displayLineSpacing }}
      >
        {selectedSections.map((sectionId) => {
          // Career Objective
          if (sectionId === 'careerObjective' && careerObjective) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Career Objective', <Award size={13} />)}
                <div 
                  className="p-3.5 rounded-xl border-l-4 bg-slate-50/70 border border-slate-100 text-slate-800 text-justify leading-relaxed"
                  style={{ borderLeftColor: primaryColor }}
                >
                  <p contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">
                    {careerObjective}
                  </p>
                </div>
              </section>
            );
          }

          // Educational Qualifications - Upgraded Vibrant Table
          if (sectionId === 'education' && education.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Academic Qualifications', <BookOpen size={13} />)}
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left border-collapse" style={{ fontSize: `${theme.fontSize - 0.5}pt` }}>
                    <thead>
                      <tr 
                        className="text-white font-black uppercase text-[8.5pt]"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${darkColor})` }}
                      >
                        <th className="py-2 px-3">Exam / Degree</th>
                        <th className="py-2 px-3">Group / Major</th>
                        <th className="py-2 px-3">Board / University</th>
                        <th className="py-2 px-3 text-center">Passing Year</th>
                        <th className="py-2 px-3 text-center">GPA / Division</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {education.map((edu, idx) => (
                        <tr key={edu.id} className={idx % 2 === 1 ? "bg-slate-50/60" : "bg-white"}>
                          <td className="py-2 px-3 font-bold text-slate-900">
                            <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.examName}</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700">
                            <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.subject}</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700">
                            <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.board || edu.instituteName}</span>
                          </td>
                          <td className="py-2 px-3 text-center font-semibold text-slate-800">
                            <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.passingYear}</span>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span 
                              className="inline-block px-2 py-0.5 rounded-full font-black text-[8pt]"
                              style={{ backgroundColor: `${primaryColor}15`, color: darkColor }}
                              contentEditable={theme.editableMode} 
                              suppressContentEditableWarning
                            >
                              {edu.gpa}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          }

          // Work Experience
          if (sectionId === 'workExperience' && workExperience.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Work Experience', <Briefcase size={13} />)}
                <div className="space-y-3">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-900 text-[9.5pt]" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.position}
                        </h4>
                        <span className="text-[8pt] font-semibold text-slate-500" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.duration}
                        </span>
                      </div>
                      <p className="font-semibold text-xs mb-1" style={{ color: primaryColor }} contentEditable={theme.editableMode} suppressContentEditableWarning>
                        {exp.companyName}
                      </p>
                      {exp.description && (
                        <p className="text-slate-600 text-justify text-[8.5pt]" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Computer Skills & Technical Training
          if (sectionId === 'computerSkills' && computerSkills.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Computer & IT Skills', <Globe size={13} />)}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {computerSkills.map((cSkill) => (
                    <div key={cSkill.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[8.5pt] mb-1">
                        <CheckCircle2 size={13} style={{ color: primaryColor }} />
                        <span contentEditable={theme.editableMode} suppressContentEditableWarning>{cSkill.instituteName || 'Specialized Training'}</span>
                        {cSkill.duration && <span className="text-slate-400 text-[7.5pt]">({cSkill.duration})</span>}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cSkill.skills.map((s, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[8pt] font-semibold bg-white border border-slate-200 text-slate-700"
                            contentEditable={theme.editableMode}
                            suppressContentEditableWarning
                          >
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

          // Trainings & Courses
          if (sectionId === 'trainings' && trainings.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Professional Trainings', <Award size={13} />)}
                <div className="space-y-2">
                  {trainings.map((tr) => (
                    <div key={tr.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-slate-800" contentEditable={theme.editableMode} suppressContentEditableWarning>{tr.subject}</span>
                        <span className="text-slate-500 text-[8pt] ml-2">from {tr.instituteName}</span>
                      </div>
                      <span className="text-[8pt] font-semibold text-slate-500">{tr.duration}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Language Proficiency
          if (sectionId === 'languageProficiency' && languageProficiency.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Language Proficiency', <Globe size={13} />)}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {languageProficiency.map((lp) => (
                    <div key={lp.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <span className="font-bold text-slate-800" contentEditable={theme.editableMode} suppressContentEditableWarning>{lp.language}</span>
                      <span className="text-[7.5pt] font-bold px-2 py-0.5 rounded bg-white border border-slate-200" style={{ color: primaryColor }} contentEditable={theme.editableMode} suppressContentEditableWarning>
                        {lp.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Personal Details - 2-Column Aligned Bio-Data
          if (sectionId === 'personalInfo') {
            const bioFields = [
              { label: "Father's Name", value: personalInfo.fathersName },
              { label: "Mother's Name", value: personalInfo.mothersName },
              { label: "Date of Birth", value: formatDate(personalInfo.dob) },
              { label: "Gender", value: personalInfo.gender },
              { label: "Marital Status", value: personalInfo.maritalStatus },
              { label: "Nationality", value: personalInfo.nationality || 'Bangladeshi (By Birth)' },
              { label: "Religion", value: personalInfo.religion },
              { label: "Permanent Address", value: permanentAddress },
              { label: "Present Address", value: presentAddress },
            ].filter(f => Boolean(f.value));

            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('Personal Details', <User size={13} />)}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                    {bioFields.map((field, idx) => (
                      <div key={idx} className="grid grid-cols-[115px_10px_1fr] text-[8.5pt]">
                        <span className="font-bold text-slate-700">{field.label}</span>
                        <span className="font-bold text-slate-400">:</span>
                        <span className="text-slate-800 font-medium" contentEditable={theme.editableMode} suppressContentEditableWarning>{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // Declaration & Signature
          if (sectionId === 'declaration' && declaration) {
            return (
              <section key={sectionId} className="break-inside-avoid mt-4">
                {renderSectionHeader('Declaration', <ShieldCheck size={13} />)}
                <p 
                  contentEditable={theme.editableMode}
                  suppressContentEditableWarning
                  className="text-slate-700 text-justify text-[8.5pt] leading-relaxed mb-6"
                >
                  {declaration}
                </p>

                <div className="flex justify-between items-end pt-4">
                  <div className="text-[8.5pt] text-slate-600 space-y-0.5">
                    <p>Date: ________________</p>
                    <p>Place: _______________</p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 border-t-2 pt-1 border-slate-800 font-bold text-[9pt] text-slate-900" contentEditable={theme.editableMode} suppressContentEditableWarning>
                      {personalInfo.name || 'Applicant Signature'}
                    </div>
                    <span className="text-[7.5pt] text-slate-500 uppercase tracking-widest">Authorized Signature</span>
                  </div>
                </div>
              </section>
            );
          }

          // References
          if (sectionId === 'references' && references && references.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderSectionHeader('References', <User size={13} />)}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {references.map((refItem) => (
                    <div key={refItem.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-0.5 text-[8.5pt]">
                      <h5 className="font-bold text-slate-900">{refItem.name}</h5>
                      <p className="text-slate-600 font-medium">{refItem.position}</p>
                      <p className="text-slate-500">{refItem.organization}</p>
                      {refItem.phone && <p className="text-slate-700 font-semibold mt-1">Phone: {refItem.phone}</p>}
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

VibrantPrimeTemplate.displayName = 'VibrantPrimeTemplate';
