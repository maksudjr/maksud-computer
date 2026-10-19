import React from 'react';
import { CVData } from '../types';
import { cn } from '../lib/utils';

interface ClassicPrestigeTemplateProps {
  data: CVData;
}

export const ClassicPrestigeTemplate = React.memo(React.forwardRef<HTMLDivElement, ClassicPrestigeTemplateProps>(({ data }, ref) => {
  const { theme, personalInfo, careerObjective, education, computerSkills, trainings, workExperience, languageProficiency, selfAssessment, hobbies, declaration, references, selectedSections, customSection } = data;
  const primaryColor = theme.primaryColor || '#1e3a8a'; // Deep formal navy blue
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

  // Formal Classic Section Header
  const renderClassicHeader = (title: string) => (
    <div className="mt-4 mb-2 break-after-avoid">
      <div className="flex items-center gap-2">
        <h2 
          contentEditable={theme.editableMode}
          suppressContentEditableWarning
          className="font-black uppercase tracking-wider text-[10pt] outline-none"
          style={{ color: primaryColor }}
        >
          {title}
        </h2>
        <div className="flex-1 h-[1.5px]" style={{ backgroundColor: primaryColor }} />
      </div>
      <div className="h-[0.5px] w-full mt-[1px] bg-slate-200" />
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
      {/* Formal Top Double-Rule Header */}
      <div className="border-b-[3px] border-slate-900 pb-3 mb-4 shrink-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="border-b border-slate-300 pb-1 mb-1.5 flex items-center justify-between">
              <span className="text-[10pt] font-black uppercase tracking-[0.25em] text-slate-800">
                CURRICULUM VITAE
              </span>
              <span className="text-[8pt] font-semibold text-slate-500 italic">
                Confidential & Official
              </span>
            </div>

            <h1 
              contentEditable={theme.editableMode}
              suppressContentEditableWarning
              className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-slate-950 outline-none mb-1"
              style={{ color: primaryColor }}
            >
              {personalInfo.name || 'YOUR FULL NAME'}
            </h1>

            {/* Side-by-Side Formal Address Box */}
            <div className="grid grid-cols-2 gap-3 mt-2 text-[8pt] text-slate-700">
              <div className="p-2 rounded border border-slate-300 bg-slate-50/50">
                <span className="block font-black text-slate-900 uppercase text-[7.5pt] mb-0.5" style={{ color: primaryColor }}>
                  Present Mailing Address:
                </span>
                <p contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">
                  {presentAddress || 'Present address not specified'}
                </p>
                {personalInfo.phone && (
                  <p className="mt-0.5 font-bold text-slate-900">Mobile: {personalInfo.phone}</p>
                )}
                {personalInfo.email && (
                  <p className="text-slate-600">Email: {personalInfo.email}</p>
                )}
              </div>

              <div className="p-2 rounded border border-slate-300 bg-slate-50/50">
                <span className="block font-black text-slate-900 uppercase text-[7.5pt] mb-0.5" style={{ color: primaryColor }}>
                  Permanent Home Address:
                </span>
                <p contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">
                  {permanentAddress || 'Permanent address not specified'}
                </p>
                {personalInfo.nationality && (
                  <p className="mt-0.5 text-slate-600">Nationality: {personalInfo.nationality}</p>
                )}
              </div>
            </div>
          </div>

          {/* Formal Photo Box with border */}
          {personalInfo.photo && (
            <div className="w-24 h-32 border-2 border-slate-800 p-0.5 bg-white shrink-0 shadow-xs">
              <img 
                src={personalInfo.photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Body Content */}
      <div 
        className="flex-1 space-y-3"
        style={{ fontSize: `${theme.fontSize}pt`, lineHeight: displayLineSpacing }}
      >
        {selectedSections.map((sectionId) => {
          // Career Objective
          if (sectionId === 'careerObjective' && careerObjective) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderClassicHeader('Career Objective')}
                <p 
                  contentEditable={theme.editableMode}
                  suppressContentEditableWarning
                  className="text-justify leading-relaxed text-slate-800 text-[9pt]"
                >
                  {careerObjective}
                </p>
              </section>
            );
          }

          // Academic Qualifications - Formal Architectural Table
          if (sectionId === 'education' && education.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderClassicHeader('Academic Qualifications')}
                <table className="w-full border-collapse border border-slate-400 text-left text-[8.5pt]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-400 text-slate-900 font-black uppercase text-[8pt]">
                      <th className="border-r border-slate-400 py-1.5 px-2">Exam / Degree</th>
                      <th className="border-r border-slate-400 py-1.5 px-2">Group / Major</th>
                      <th className="border-r border-slate-400 py-1.5 px-2">Board / University</th>
                      <th className="border-r border-slate-400 py-1.5 px-2 text-center">Passing Year</th>
                      <th className="py-1.5 px-2 text-center">GPA / CGPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((edu, idx) => (
                      <tr key={edu.id} className={idx % 2 === 1 ? "bg-slate-50/70" : "bg-white"}>
                        <td className="border-r border-slate-300 border-t py-1.5 px-2 font-bold text-slate-900">
                          <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.examName}</span>
                        </td>
                        <td className="border-r border-slate-300 border-t py-1.5 px-2 text-slate-800">
                          <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.subject}</span>
                        </td>
                        <td className="border-r border-slate-300 border-t py-1.5 px-2 text-slate-800">
                          <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.board || edu.instituteName}</span>
                        </td>
                        <td className="border-r border-slate-300 border-t py-1.5 px-2 text-center text-slate-900 font-semibold">
                          <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.passingYear}</span>
                        </td>
                        <td className="border-t border-slate-300 py-1.5 px-2 text-center font-black text-slate-900">
                          <span contentEditable={theme.editableMode} suppressContentEditableWarning className="outline-none">{edu.gpa}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          }

          // Employment / Work Experience
          if (sectionId === 'workExperience' && workExperience.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderClassicHeader('Employment & Work Experience')}
                <div className="space-y-2">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-slate-400 pl-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[9pt]" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.position} — <span style={{ color: primaryColor }}>{exp.companyName}</span>
                        </span>
                        <span className="text-[8pt] font-semibold text-slate-600" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.duration}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-slate-700 text-justify text-[8.5pt] mt-0.5" contentEditable={theme.editableMode} suppressContentEditableWarning>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Computer Skills
          if (sectionId === 'computerSkills' && computerSkills.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderClassicHeader('Computer & Technical Proficiency')}
                <div className="space-y-1.5 text-[8.5pt]">
                  {computerSkills.map((cSkill) => (
                    <div key={cSkill.id} className="grid grid-cols-[160px_10px_1fr]">
                      <span className="font-bold text-slate-800">
                        {cSkill.instituteName || 'Application Packages'}
                      </span>
                      <span className="font-bold">:</span>
                      <span className="text-slate-700">
                        {cSkill.skills.join(', ')} {cSkill.duration && `(${cSkill.duration})`}
                      </span>
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
                {renderClassicHeader('Language Proficiency')}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[8.5pt]">
                  {languageProficiency.map((lp) => (
                    <div key={lp.id} className="grid grid-cols-[100px_10px_1fr]">
                      <span className="font-bold text-slate-800">{lp.language}</span>
                      <span className="font-bold">:</span>
                      <span className="text-slate-700 font-semibold">{lp.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Bio-Data / Personal Information
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
                {renderClassicHeader('Personal Information (Bio-Data)')}
                <div className="space-y-1 text-[8.5pt]">
                  {bioFields.map((field, idx) => (
                    <div key={idx} className="grid grid-cols-[160px_10px_1fr]">
                      <span className="font-bold text-slate-900">{field.label}</span>
                      <span className="font-bold text-slate-700">:</span>
                      <span className="text-slate-800" contentEditable={theme.editableMode} suppressContentEditableWarning>
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          // Declaration & Formal Signature
          if (sectionId === 'declaration' && declaration) {
            return (
              <section key={sectionId} className="break-inside-avoid mt-4">
                {renderClassicHeader('Declaration')}
                <p 
                  contentEditable={theme.editableMode}
                  suppressContentEditableWarning
                  className="text-justify text-slate-800 text-[8.5pt] leading-relaxed mb-6"
                >
                  {declaration}
                </p>

                <div className="flex justify-between items-end pt-3">
                  <div className="text-[8.5pt] text-slate-800 space-y-0.5">
                    <p className="font-semibold">Date: _________________</p>
                    <p className="font-semibold">Place: ________________</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 border-t-2 border-slate-900 pt-1 font-black text-[9pt] text-slate-950 uppercase" contentEditable={theme.editableMode} suppressContentEditableWarning>
                      {personalInfo.name || 'Applicant Signature'}
                    </div>
                    <span className="text-[7.5pt] font-semibold text-slate-600 uppercase tracking-widest">(Signature of the Applicant)</span>
                  </div>
                </div>
              </section>
            );
          }

          // References
          if (sectionId === 'references' && references && references.length > 0) {
            return (
              <section key={sectionId} className="break-inside-avoid">
                {renderClassicHeader('Professional References')}
                <div className="grid grid-cols-2 gap-4 text-[8.5pt]">
                  {references.map((refItem) => (
                    <div key={refItem.id} className="p-2 border border-slate-300 rounded space-y-0.5 bg-slate-50/40">
                      <p className="font-black text-slate-900">{refItem.name}</p>
                      <p className="font-medium text-slate-700">{refItem.position}</p>
                      <p className="text-slate-600">{refItem.organization}</p>
                      {refItem.phone && <p className="font-bold text-slate-900 mt-1">Mobile: {refItem.phone}</p>}
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

ClassicPrestigeTemplate.displayName = 'ClassicPrestigeTemplate';
