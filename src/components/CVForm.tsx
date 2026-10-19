import React, { useState, useCallback, useMemo, useRef } from 'react';
import { 
  CVData, 
  SectionId, 
  Education, 
  WorkExperience, 
  CustomField, 
  ComputerSkill, 
  Reference, 
  Training,
  TemplateId
} from '../types';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Edit2,
  User,
  Target,
  GraduationCap,
  Monitor,
  Briefcase,
  Languages,
  ClipboardCheck,
  Heart,
  FileCheck,
  Users,
  PlusSquare,
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PhotoEditor } from './PhotoEditor';

// --- Static Options Cached in Module Scope for Zero Re-allocation Overhead ---
const PASSING_YEARS = Array.from({ length: 2028 - 2005 + 1 }, (_, i) => (2028 - i).toString());

const EXAM_OPTIONS = [
  'Secondary School Certificate (S.S.C)',
  'Secondary School Certificate (S.S.C Vocational)',
  'Higher Secondary Certificate (H.S.C)',
  'Higher Secondary Certificate (H.S.C BM)',
  'Dakhil',
  'Alim',
  'Diploma in Engineering',
  'B.Sc (Honours)',
  'B.A (Honours)',
  'B.S.S (Honours)',
  'B.B.A (Honours)',
  'M.Sc',
  'M.A',
  'M.S.S',
  'M.B.A',
  'Fazil',
  'Kamil'
];

const BOARD_OPTIONS = [
  'Dhaka',
  'Rajshahi',
  'Comilla',
  'Jessore',
  'Chittagong',
  'Barisal',
  'Sylhet',
  'Dinajpur',
  'Mymensingh',
  'Madrasah',
  'Technical',
  'National University'
];

const SCALE_OPTIONS = ['Out Of 5.00', 'Out Of 4.00'];

const INSTITUTE_OPTIONS = [
  'Narundi School And College',
  'Nurundi Higher Secondary Schoool',
  'Narundi Foyazia Sinor Alim Madrasah',
  'Narundi Syeda Naziba Akhter Girls High School'
];

const SUBJECT_OPTIONS = [
  'Science',
  'Humanities',
  'Business Studies',
  'General Electrical Works',
  'General Electronics',
  'Poultry Rearing And Farming',
  'Dress Making',
  'Building Maintenence'
];

const HOBBY_OPTIONS = [
  'Gardening',
  'Reading books',
  'Writing',
  'Gaming',
  'Traveling',
  'Photography',
  'Cooking',
  'Music',
  'Sports',
  'Painting',
  'Internet Browsing',
  'Watching Movies'
];

const COMPUTER_SKILL_OPTIONS = [
  'MS Office',
  'Adobe Photoshop',
  'Internet Browsing',
  'Basic Computer Applications',
  'Computer Basic',
  'Hardware & Networking',
  'Web Development',
  'Graphic Design'
];

const LANGUAGE_PROFICIENCY_OPTIONS = [
  'Bengali (Native)', 'Bengali (Fluent)', 'Bengali (Intermediate)', 'Bengali (Basic)',
  'English (Native)', 'English (Fluent)', 'English (Intermediate)', 'English (Basic)',
  'Arabic (Native)', 'Arabic (Fluent)', 'Arabic (Intermediate)', 'Arabic (Basic)',
  'Hindi (Native)', 'Hindi (Fluent)', 'Hindi (Intermediate)', 'Hindi (Basic)'
];

const WORK_POSITION_OPTIONS = [
  'Sales Executive',
  'Marketing Manager',
  'Software Engineer',
  'Accountant',
  'Teacher',
  'Graphic Designer',
  'Customer Service Representative',
  'Data Entry Operator',
  'Manager',
  'Supervisor',
  'Team Lead'
];

const NATIONALITY_OPTIONS = ['Bangladeshi (By Birth)', 'Bangladeshi'];
const RELIGION_OPTIONS = ['Islam', 'Hinduism', 'Christianity', 'Buddhism'];
const MARITAL_OPTIONS = ['Unmarried', 'Married', 'Divorced'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const DISTRICT_UPAZILA_MAP: Record<string, string[]> = {
  'Jamalpur': ['Jamalpur Sadar', 'Bakshiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
  'Sherpur': ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'],
  'Mymensingh': ['Mymensingh Sadar', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagacha', 'Nandail', 'Phulpur', 'Trishal'],
  'Tangail': ['Tangail Sadar', 'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur'],
  'Dhaka': ['Dhaka Sadar', 'Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar'],
  'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
  'Narayanganj': ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
};

const DISTRICT_KEYS = Object.keys(DISTRICT_UPAZILA_MAP);

const SECTION_METADATA: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: 'careerObjective', label: 'Objective', icon: <Target size={14} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={14} /> },
  { id: 'workExperience', label: 'Experience', icon: <Briefcase size={14} /> },
  { id: 'trainings', label: 'Trainings', icon: <Award size={14} /> },
  { id: 'computerSkills', label: 'IT Skills', icon: <Monitor size={14} /> },
  { id: 'languageProficiency', label: 'Languages', icon: <Languages size={14} /> },
  { id: 'selfAssessment', label: 'Self Assessment', icon: <ClipboardCheck size={14} /> },
  { id: 'hobbies', label: 'Hobbies', icon: <Heart size={14} /> },
  { id: 'references', label: 'References', icon: <Users size={14} /> },
  { id: 'custom', label: 'Custom', icon: <PlusSquare size={14} /> },
  { id: 'declaration', label: 'Declaration', icon: <FileCheck size={14} /> },
];

const SECTION_ORDER: SectionId[] = [
  'careerObjective', 'personalInfo', 'education', 'trainings', 'computerSkills',
  'workExperience', 'languageProficiency', 'selfAssessment', 'hobbies', 'references',
  'custom', 'declaration'
];

function generateId() {
  try {
    return crypto.randomUUID();
  } catch (e) {
    return Math.random().toString(36).substring(2, 15);
  }
}

// --- Memoized UI Input Components ---
interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = React.memo(({ 
  label, 
  value, 
  options, 
  onChange 
}) => {
  const isCustomValue = !options.includes(value) && value !== '';
  const [isCustom, setIsCustom] = useState(isCustomValue);

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-gray-700">{label}</label>}
      <div className="flex gap-2">
        <select
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={isCustom ? 'custom' : value}
          onChange={(e) => {
            if (e.target.value === 'custom') {
              setIsCustom(true);
            } else {
              setIsCustom(false);
              onChange(e.target.value);
            }
          }}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          <option value="custom">Custom...</option>
        </select>
        {isCustom && (
          <input
            type="text"
            placeholder={`Custom ${label.toLowerCase()}`}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
});

CustomSelect.displayName = 'CustomSelect';

interface MultiSelectProps {
  label: string;
  selectedValues: string[];
  options: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
  selectedLabel?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = React.memo(({ 
  label, 
  selectedValues, 
  options, 
  onChange,
  placeholder = "Type and press Enter...",
  selectedLabel = "Selected Items:"
}) => {
  const [customValue, setCustomValue] = useState('');

  const toggleOption = useCallback((opt: string) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter(v => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  }, [selectedValues, onChange]);

  const addCustomItem = useCallback(() => {
    const trimmed = customValue.trim();
    if (trimmed && !selectedValues.includes(trimmed)) {
      onChange([...selectedValues, trimmed]);
      setCustomValue('');
    }
  }, [customValue, selectedValues, onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 border border-gray-200 rounded-lg max-h-36 overflow-y-auto">
        {options.map((opt) => {
          const isSelected = selectedValues.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggleOption(opt)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                isSelected 
                  ? "bg-indigo-600 text-white shadow-xs" 
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              )}
            >
              {isSelected ? `✓ ${opt}` : `+ ${opt}`}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomItem();
            }
          }}
        />
        <button
          type="button"
          onClick={addCustomItem}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          Add
        </button>
      </div>

      {selectedValues.length > 0 && (
        <div className="p-2.5 bg-indigo-50/60 rounded-lg border border-indigo-100">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-[11px] font-bold text-indigo-700">{selectedLabel}</p>
            <button 
              type="button"
              onClick={() => onChange([])}
              className="text-[10px] text-red-500 hover:underline font-bold cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedValues.map((val) => (
              <span 
                key={val} 
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-indigo-200 text-indigo-700 rounded-md text-xs font-medium"
              >
                {val}
                <button 
                  type="button"
                  onClick={() => toggleOption(val)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

MultiSelect.displayName = 'MultiSelect';

// --- Memoized Form Sub-Sections ---

interface QuickThemeSectionProps {
  theme: CVData['theme'];
  onChangeTheme: (updates: Partial<CVData['theme']>) => void;
}

const QuickThemeSection: React.FC<QuickThemeSectionProps> = React.memo(({ theme, onChangeTheme }) => {
  const templates: { id: TemplateId; label: string }[] = [
    { id: 'vibrant-prime', label: 'Vibrant Prime' },
    { id: 'classic-prestige', label: 'Classic Prestige' },
    { id: 'smart-executive', label: 'Smart Executive' },
    { id: 'vibrant', label: 'Vibrant' },
    { id: 'classic', label: 'Classic' },
    { id: 'smart-classic', label: 'Smart Classic' },
    { id: 'smart-modern', label: 'Smart Modern' },
    { id: 'modern', label: 'Modern' },
  ];

  const presets = [
    { name: 'Emerald', color: '#006747', settings: { primaryColor: '#006747', headerStyle: 'primary' as const } },
    { name: 'Royal Blue', color: '#2563eb', settings: { primaryColor: '#2563eb', headerStyle: 'default' as const } },
    { name: 'Gold Black', color: '#d4af37', settings: { primaryColor: '#d4af37', headerStyle: 'black' as const } },
    { name: 'Classic Black', color: '#1a1a1a', settings: { primaryColor: '#1a1a1a', headerStyle: 'default' as const } },
  ];

  return (
    <section className="bg-white p-5 rounded-2xl shadow-xs border border-indigo-100 bg-gradient-to-r from-indigo-50/20 to-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={18} />
            Quick Theme & Template
          </h3>
          <p className="text-xs text-gray-500">Instantly switch template layout and accent styling.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Template</span>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChangeTheme({ templateId: t.id })}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    theme.templateId === t.id 
                      ? "bg-white text-indigo-600 shadow-xs" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Color</span>
            <div className="flex items-center gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => onChangeTheme(p.settings)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all cursor-pointer",
                    theme.primaryColor === p.color ? "border-indigo-600 scale-110 shadow-xs" : "border-transparent"
                  )}
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

QuickThemeSection.displayName = 'QuickThemeSection';

interface SectionManagerSectionProps {
  selectedSections: SectionId[];
  onToggleSection: (id: SectionId) => void;
}

const SectionManagerSection: React.FC<SectionManagerSectionProps> = React.memo(({ selectedSections, onToggleSection }) => {
  return (
    <section className="bg-white p-5 rounded-2xl shadow-xs border border-indigo-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold flex items-center gap-2 text-indigo-700">
            <PlusSquare size={18} />
            CV Sections Manager
          </h3>
          <p className="text-xs text-gray-500">Toggle sections to include in your resume.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {SECTION_METADATA.map((section) => {
          const isSelected = selectedSections.includes(section.id);
          return (
            <button
              key={section.id}
              onClick={() => onToggleSection(section.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
              )}
            >
              <span className={cn("p-1 rounded-md", isSelected ? "bg-white/20" : "bg-gray-200 text-gray-600")}>
                {section.icon}
              </span>
              <span className="truncate">{section.label}</span>
              {isSelected && <Check className="ml-auto shrink-0" size={12} strokeWidth={3} />}
            </button>
          );
        })}
      </div>
    </section>
  );
});

SectionManagerSection.displayName = 'SectionManagerSection';

interface PersonalInfoSectionProps {
  info: CVData['personalInfo'];
  onChangeField: (field: keyof CVData['personalInfo'], val: string) => void;
  onSameAsPresent: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = React.memo(({ info, onChangeField, onSameAsPresent }) => {
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [editingSignature, setEditingSignature] = useState<string | null>(null);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChangeField]);

  const handleSignatureUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeField('signature', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChangeField]);

  const currentDistrictUpazilas = useMemo(() => {
    return DISTRICT_UPAZILA_MAP[info.presentDistrict] || [];
  }, [info.presentDistrict]);

  const permDistrictUpazilas = useMemo(() => {
    return DISTRICT_UPAZILA_MAP[info.permanentDistrict] || [];
  }, [info.permanentDistrict]);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-gray-900">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          <User size={18} />
        </div>
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            value={info.name}
            onChange={(e) => onChangeField('name', e.target.value)}
            placeholder="MD. MAKSUDUR RAHMAN"
          />
        </div>

        {/* Profile Photo */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Profile Photo (Passport size)</label>
          <div className="flex items-center gap-3">
            {info.photo && (
              <img 
                src={info.photo} 
                alt="Profile" 
                className="w-12 h-16 rounded-md object-cover border border-gray-200" 
                style={{ aspectRatio: '1.5/2' }}
              />
            )}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors">
                <Upload size={14} />
                Upload Photo
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
              {info.photo && (
                <button 
                  type="button"
                  onClick={() => setEditingPhoto(info.photo)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 cursor-pointer"
                >
                  <Edit2 size={14} /> Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Applicant Signature</label>
          <div className="flex items-center gap-3">
            {info.signature && (
              <img 
                src={info.signature} 
                alt="Signature" 
                className="w-20 h-8 rounded-md object-contain border bg-gray-50" 
              />
            )}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors">
                <Upload size={14} />
                Upload Signature
                <input type="file" className="hidden" accept="image/*" onChange={handleSignatureUpload} />
              </label>
              {info.signature && (
                <button 
                  type="button"
                  onClick={() => setEditingSignature(info.signature)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 cursor-pointer"
                >
                  <Edit2 size={14} /> Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Father's Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Father's Name</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.fathersName}
            onChange={(e) => onChangeField('fathersName', e.target.value)}
          />
        </div>

        {/* Mother's Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Mother's Name</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.mothersName}
            onChange={(e) => onChangeField('mothersName', e.target.value)}
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Date of Birth</label>
          <input 
            type="date" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.dob}
            onChange={(e) => onChangeField('dob', e.target.value)}
          />
        </div>

        <CustomSelect 
          label="Nationality" 
          value={info.nationality} 
          options={NATIONALITY_OPTIONS} 
          onChange={(val) => onChangeField('nationality', val)}
        />

        <CustomSelect 
          label="Religion" 
          value={info.religion} 
          options={RELIGION_OPTIONS} 
          onChange={(val) => onChangeField('religion', val)}
        />

        <CustomSelect 
          label="Marital Status" 
          value={info.maritalStatus} 
          options={MARITAL_OPTIONS} 
          onChange={(val) => onChangeField('maritalStatus', val)}
        />

        <CustomSelect 
          label="Gender" 
          value={info.gender} 
          options={GENDER_OPTIONS} 
          onChange={(val) => onChangeField('gender', val)}
        />

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Phone</label>
          <input 
            type="tel" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.phone}
            onChange={(e) => onChangeField('phone', e.target.value)}
            placeholder="01700-000000"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.email}
            onChange={(e) => onChangeField('email', e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>

        {/* Present Address */}
        <div className="md:col-span-2 space-y-3 pt-2">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b pb-1">Present Address</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Village</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={info.presentVillage}
                onChange={(e) => onChangeField('presentVillage', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Post Office</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={info.presentPostOffice}
                onChange={(e) => onChangeField('presentPostOffice', e.target.value)}
              />
            </div>
            <CustomSelect 
              label="District" 
              value={info.presentDistrict} 
              options={DISTRICT_KEYS} 
              onChange={(val) => onChangeField('presentDistrict', val)}
            />
            <CustomSelect 
              label="Upazila" 
              value={info.presentUpazila} 
              options={currentDistrictUpazilas} 
              onChange={(val) => onChangeField('presentUpazila', val)}
            />
          </div>
        </div>

        {/* Permanent Address */}
        <div className="md:col-span-2 space-y-3 pt-2">
          <div className="flex justify-between items-center border-b pb-1">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Permanent Address</h4>
            <button 
              type="button"
              onClick={onSameAsPresent}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Same as Present
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Village</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={info.permanentVillage}
                onChange={(e) => onChangeField('permanentVillage', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Post Office</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={info.permanentPostOffice}
                onChange={(e) => onChangeField('permanentPostOffice', e.target.value)}
              />
            </div>
            <CustomSelect 
              label="District" 
              value={info.permanentDistrict} 
              options={DISTRICT_KEYS} 
              onChange={(val) => onChangeField('permanentDistrict', val)}
            />
            <CustomSelect 
              label="Upazila" 
              value={info.permanentUpazila} 
              options={permDistrictUpazilas} 
              onChange={(val) => onChangeField('permanentUpazila', val)}
            />
          </div>
        </div>

        {/* Identification & Physical attributes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">National ID (NID)</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.nid}
            onChange={(e) => onChangeField('nid', e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Birth Registration No</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.birthRegNo}
            onChange={(e) => onChangeField('birthRegNo', e.target.value)}
          />
        </div>

        <CustomSelect 
          label="Blood Group" 
          value={info.bloodGroup} 
          options={BLOOD_GROUP_OPTIONS} 
          onChange={(val) => onChangeField('bloodGroup', val)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Height</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Feet"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={info.heightFeet}
              onChange={(e) => onChangeField('heightFeet', e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Inches"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={info.heightInches}
              onChange={(e) => onChangeField('heightInches', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">Weight (Kg)</label>
          <input 
            type="number" 
            placeholder="e.g. 65"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={info.weight}
            onChange={(e) => onChangeField('weight', e.target.value)}
          />
        </div>
      </div>

      {editingPhoto && (
        <PhotoEditor 
          image={editingPhoto}
          onSave={(edited) => {
            onChangeField('photo', edited);
            setEditingPhoto(null);
          }}
          onCancel={() => setEditingPhoto(null)}
          aspect={1.5 / 2}
        />
      )}

      {editingSignature && (
        <PhotoEditor 
          image={editingSignature}
          onSave={(edited) => {
            onChangeField('signature', edited);
            setEditingSignature(null);
          }}
          onCancel={() => setEditingSignature(null)}
          aspect={300 / 80}
        />
      )}
    </section>
  );
});

PersonalInfoSection.displayName = 'PersonalInfoSection';

interface CareerObjectiveSectionProps {
  objective: string;
  onChangeObjective: (val: string) => void;
}

const CareerObjectiveSection: React.FC<CareerObjectiveSectionProps> = React.memo(({ objective, onChangeObjective }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-900">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          <Target size={18} />
        </div>
        Career Objective
      </h3>
      <textarea 
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        rows={4}
        value={objective}
        onChange={(e) => onChangeObjective(e.target.value)}
        placeholder="Write your career objective..."
      />
    </section>
  );
});

CareerObjectiveSection.displayName = 'CareerObjectiveSection';

interface EducationSectionProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, val: string) => void;
  onRemove: (id: string) => void;
}

const EducationSection: React.FC<EducationSectionProps> = React.memo(({ education, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <GraduationCap size={18} />
          </div>
          Academic Qualification
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Exam
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border border-gray-200 rounded-xl relative group bg-gray-50/50">
            <button 
              onClick={() => onRemove(edu.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1"
              title="Remove Exam"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <CustomSelect 
                label="Exam Name" 
                value={edu.examName} 
                options={EXAM_OPTIONS} 
                onChange={(val) => onUpdate(edu.id, 'examName', val)}
              />
              <CustomSelect 
                label="Passing Year" 
                value={edu.passingYear} 
                options={PASSING_YEARS} 
                onChange={(val) => onUpdate(edu.id, 'passingYear', val)}
              />
              <CustomSelect 
                label="Board" 
                value={edu.board} 
                options={BOARD_OPTIONS} 
                onChange={(val) => onUpdate(edu.id, 'board', val)}
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">GPA / CGPA</label>
                <input 
                  type="text" 
                  placeholder="e.g. 5.00"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={edu.gpa}
                  onChange={(e) => onUpdate(edu.id, 'gpa', e.target.value)}
                />
              </div>
              <CustomSelect 
                label="Scale" 
                value={edu.gpaType} 
                options={SCALE_OPTIONS} 
                onChange={(val) => onUpdate(edu.id, 'gpaType', val)}
              />
              <CustomSelect 
                label="Subject / Group" 
                value={edu.subject} 
                options={SUBJECT_OPTIONS} 
                onChange={(val) => onUpdate(edu.id, 'subject', val)}
              />
              <div className="sm:col-span-2 md:col-span-3">
                <CustomSelect 
                  label="Institute Name" 
                  value={edu.instituteName} 
                  options={INSTITUTE_OPTIONS} 
                  onChange={(val) => onUpdate(edu.id, 'instituteName', val)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

interface ComputerSkillsSectionProps {
  skills: ComputerSkill[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof ComputerSkill, val: any) => void;
  onRemove: (id: string) => void;
}

const ComputerSkillsSection: React.FC<ComputerSkillsSectionProps> = React.memo(({ skills, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Monitor size={18} />
          </div>
          Computer Skills
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Computer Course
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border border-gray-200 rounded-xl relative group bg-gray-50/50">
            <button 
              onClick={() => onRemove(skill.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              <input 
                type="checkbox" 
                id={`hasTraining-${skill.id}`}
                checked={skill.hasTraining}
                onChange={(e) => onUpdate(skill.id, 'hasTraining', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor={`hasTraining-${skill.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">
                Include Formal Training Certificate Details
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skill.hasTraining && (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700">Institute Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={skill.instituteName}
                      onChange={(e) => onUpdate(skill.id, 'instituteName', e.target.value)}
                      placeholder="Maksud Computer Institute"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700">Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 6 Months"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={skill.duration}
                      onChange={(e) => onUpdate(skill.id, 'duration', e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <MultiSelect 
                  label="Computer Applications & Skills" 
                  selectedValues={skill.skills} 
                  options={COMPUTER_SKILL_OPTIONS} 
                  onChange={(vals) => onUpdate(skill.id, 'skills', vals)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

ComputerSkillsSection.displayName = 'ComputerSkillsSection';

interface TrainingsSectionProps {
  trainings: Training[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Training, val: string) => void;
  onRemove: (id: string) => void;
}

const TrainingsSection: React.FC<TrainingsSectionProps> = React.memo(({ trainings, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Award size={18} />
          </div>
          Professional Trainings
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Training
        </button>
      </div>

      <div className="space-y-4">
        {trainings.map((t) => (
          <div key={t.id} className="p-4 border border-gray-200 rounded-xl relative group bg-gray-50/50">
            <button 
              onClick={() => onRemove(t.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Institute Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={t.instituteName}
                  onChange={(e) => onUpdate(t.id, 'instituteName', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Subject / Course Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={t.subject}
                  onChange={(e) => onUpdate(t.id, 'subject', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 3 Months"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={t.duration}
                  onChange={(e) => onUpdate(t.id, 'duration', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

TrainingsSection.displayName = 'TrainingsSection';

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof WorkExperience, val: string) => void;
  onRemove: (id: string) => void;
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = React.memo(({ workExperience, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Briefcase size={18} />
          </div>
          Work Experience
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Job
        </button>
      </div>

      <div className="space-y-4">
        {workExperience.map((work) => (
          <div key={work.id} className="p-4 border border-gray-200 rounded-xl relative group bg-gray-50/50">
            <button 
              onClick={() => onRemove(work.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Company Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={work.companyName}
                  onChange={(e) => onUpdate(work.id, 'companyName', e.target.value)}
                />
              </div>
              <CustomSelect 
                label="Position" 
                value={work.position} 
                options={WORK_POSITION_OPTIONS} 
                onChange={(val) => onUpdate(work.id, 'position', val)}
              />
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 Years"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={work.duration}
                  onChange={(e) => onUpdate(work.id, 'duration', e.target.value)}
                />
              </div>
              <div className="md:col-span-3 space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Key Responsibilities (Optional)</label>
                <textarea 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  rows={2}
                  value={work.description}
                  onChange={(e) => onUpdate(work.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

WorkExperienceSection.displayName = 'WorkExperienceSection';

interface ListFieldSectionProps {
  field: 'skills' | 'selfAssessment';
  title: string;
  items: string[];
  icon: React.ReactNode;
  onAdd: () => void;
  onUpdate: (index: number, val: string) => void;
  onRemove: (index: number) => void;
}

const ListFieldSection: React.FC<ListFieldSectionProps> = React.memo(({ title, items, icon, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            {icon}
          </div>
          {title}
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={item}
              onChange={(e) => onUpdate(idx, e.target.value)}
            />
            <button 
              onClick={() => onRemove(idx)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
});

ListFieldSection.displayName = 'ListFieldSection';

interface LanguagesSectionProps {
  languages: string[];
  onAdd: () => void;
  onUpdate: (index: number, val: string) => void;
  onRemove: (index: number) => void;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = React.memo(({ languages, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Languages size={18} />
          </div>
          Language Proficiency
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Language
        </button>
      </div>

      <div className="space-y-2.5">
        {languages.map((lang, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex-1">
              <CustomSelect 
                label="" 
                value={lang} 
                options={LANGUAGE_PROFICIENCY_OPTIONS} 
                onChange={(val) => onUpdate(idx, val)}
              />
            </div>
            <button 
              onClick={() => onRemove(idx)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
});

LanguagesSection.displayName = 'LanguagesSection';

interface ReferencesSectionProps {
  references: Reference[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Reference, val: string) => void;
  onRemove: (id: string) => void;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = React.memo(({ references, onAdd, onUpdate, onRemove }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Users size={18} />
          </div>
          References
        </h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Reference
        </button>
      </div>

      <div className="space-y-4">
        {references.map((ref) => (
          <div key={ref.id} className="p-4 border border-gray-200 rounded-xl relative group bg-gray-50/50">
            <button 
              onClick={() => onRemove(ref.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer p-1"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Referee Name</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={ref.name}
                  onChange={(e) => onUpdate(ref.id, 'name', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Designation</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={ref.position}
                  onChange={(e) => onUpdate(ref.id, 'position', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Organization</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={ref.organization}
                  onChange={(e) => onUpdate(ref.id, 'organization', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Phone</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={ref.phone}
                  onChange={(e) => onUpdate(ref.id, 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

ReferencesSection.displayName = 'ReferencesSection';

interface CustomSectionProps {
  customSection: CVData['customSection'];
  onUpdateTitle: (title: string) => void;
  onAddField: () => void;
  onUpdateField: (id: string, field: 'label' | 'value', val: string) => void;
  onRemoveField: (id: string) => void;
}

const CustomSectionComponent: React.FC<CustomSectionProps> = React.memo(({ customSection, onUpdateTitle, onAddField, onUpdateField, onRemoveField }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <PlusSquare size={18} />
          </div>
          <input 
            type="text" 
            className="text-base font-bold w-full border-b border-gray-200 focus:border-indigo-500 outline-none pb-0.5"
            value={customSection.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
          />
        </div>
        <button 
          onClick={onAddField}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

      <div className="space-y-3">
        {customSection.fields.map((field) => (
          <div key={field.id} className="flex gap-3 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-gray-500">Label</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={field.label}
                onChange={(e) => onUpdateField(field.id, 'label', e.target.value)}
              />
            </div>
            <div className="flex-[2] space-y-1">
              <label className="text-xs text-gray-500">Value</label>
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={field.value}
                onChange={(e) => onUpdateField(field.id, 'value', e.target.value)}
              />
            </div>
            <button 
              onClick={() => onRemoveField(field.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
});

CustomSectionComponent.displayName = 'CustomSectionComponent';

interface DeclarationSectionProps {
  declaration: string;
  onChangeDeclaration: (val: string) => void;
}

const DeclarationSection: React.FC<DeclarationSectionProps> = React.memo(({ declaration, onChangeDeclaration }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
      <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-900">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          <FileCheck size={18} />
        </div>
        Certification / Declaration
      </h3>
      <textarea 
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        rows={3}
        value={declaration}
        onChange={(e) => onChangeDeclaration(e.target.value)}
      />
    </section>
  );
});

DeclarationSection.displayName = 'DeclarationSection';

// --- Root CVForm Component ---
interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = React.memo(({ data, onChange }) => {
  // Stable refs to prevent regenerating callbacks and re-rendering memoized sections on keystrokes
  const dataRef = useRef(data);
  dataRef.current = data;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Theme updater
  const handleUpdateTheme = useCallback((updates: Partial<CVData['theme']>) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      theme: { ...current.theme, ...updates }
    });
  }, []);

  // Section toggle updater
  const handleToggleSection = useCallback((id: SectionId) => {
    const current = dataRef.current;
    const isSelected = current.selectedSections.includes(id);
    let newSections: SectionId[];
    if (isSelected) {
      newSections = current.selectedSections.filter(s => s !== id);
    } else {
      newSections = [...current.selectedSections, id];
      newSections.sort((a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b));
    }
    onChangeRef.current({ ...current, selectedSections: newSections });
  }, []);

  // Personal info field updater
  const handleUpdatePersonalInfoField = useCallback((field: keyof CVData['personalInfo'], val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      personalInfo: { ...current.personalInfo, [field]: val }
    });
  }, []);

  // Same as present handler
  const handleSameAsPresent = useCallback(() => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      personalInfo: {
        ...current.personalInfo,
        permanentVillage: current.personalInfo.presentVillage,
        permanentPostOffice: current.personalInfo.presentPostOffice,
        permanentUpazila: current.personalInfo.presentUpazila,
        permanentDistrict: current.personalInfo.presentDistrict,
      }
    });
  }, []);

  // Career objective updater
  const handleUpdateObjective = useCallback((val: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, careerObjective: val });
  }, []);

  // Education updaters
  const handleAddEducation = useCallback(() => {
    const current = dataRef.current;
    const newEdu: Education = {
      id: generateId(),
      examName: '',
      passingYear: '',
      board: '',
      gpa: '',
      gpaType: 'Out Of 5.00',
      instituteName: '',
      subject: ''
    };
    onChangeRef.current({ ...current, education: [...current.education, newEdu] });
  }, []);

  const handleUpdateEducation = useCallback((id: string, field: keyof Education, val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      education: current.education.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  }, []);

  const handleRemoveEducation = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, education: current.education.filter(e => e.id !== id) });
  }, []);

  // Computer skills updaters
  const handleAddComputerSkill = useCallback(() => {
    const current = dataRef.current;
    const newSkill: ComputerSkill = {
      id: generateId(),
      hasTraining: true,
      instituteName: '',
      duration: '',
      skills: []
    };
    onChangeRef.current({ ...current, computerSkills: [...current.computerSkills, newSkill] });
  }, []);

  const handleUpdateComputerSkill = useCallback((id: string, field: keyof ComputerSkill, val: any) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      computerSkills: current.computerSkills.map(s => s.id === id ? { ...s, [field]: val } : s)
    });
  }, []);

  const handleRemoveComputerSkill = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, computerSkills: current.computerSkills.filter(s => s.id !== id) });
  }, []);

  // Trainings updaters
  const handleAddTraining = useCallback(() => {
    const current = dataRef.current;
    const newT: Training = {
      id: generateId(),
      instituteName: '',
      subject: '',
      duration: '',
      description: ''
    };
    onChangeRef.current({ ...current, trainings: [...current.trainings, newT] });
  }, []);

  const handleUpdateTraining = useCallback((id: string, field: keyof Training, val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      trainings: current.trainings.map(t => t.id === id ? { ...t, [field]: val } : t)
    });
  }, []);

  const handleRemoveTraining = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, trainings: current.trainings.filter(t => t.id !== id) });
  }, []);

  // Work experience updaters
  const handleAddWork = useCallback(() => {
    const current = dataRef.current;
    const newWork: WorkExperience = {
      id: generateId(),
      companyName: '',
      position: '',
      duration: '',
      description: ''
    };
    onChangeRef.current({ ...current, workExperience: [...current.workExperience, newWork] });
  }, []);

  const handleUpdateWork = useCallback((id: string, field: keyof WorkExperience, val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      workExperience: current.workExperience.map(w => w.id === id ? { ...w, [field]: val } : w)
    });
  }, []);

  const handleRemoveWork = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, workExperience: current.workExperience.filter(w => w.id !== id) });
  }, []);

  // List fields updaters (skills, selfAssessment)
  const handleAddListItem = useCallback((field: 'skills' | 'selfAssessment') => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, [field]: [...current[field], ''] });
  }, []);

  const handleUpdateListItem = useCallback((field: 'skills' | 'selfAssessment', index: number, val: string) => {
    const current = dataRef.current;
    const list = [...current[field]];
    list[index] = val;
    onChangeRef.current({ ...current, [field]: list });
  }, []);

  const handleRemoveListItem = useCallback((field: 'skills' | 'selfAssessment', index: number) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, [field]: current[field].filter((_, i) => i !== index) });
  }, []);

  // Hobbies updater
  const handleChangeHobbies = useCallback((vals: string[]) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, hobbies: vals });
  }, []);

  // Languages updaters
  const handleAddLanguage = useCallback(() => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, languageProficiency: [...current.languageProficiency, ''] });
  }, []);

  const handleUpdateLanguage = useCallback((index: number, val: string) => {
    const current = dataRef.current;
    const list = [...current.languageProficiency];
    list[index] = val;
    onChangeRef.current({ ...current, languageProficiency: list });
  }, []);

  const handleRemoveLanguage = useCallback((index: number) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, languageProficiency: current.languageProficiency.filter((_, i) => i !== index) });
  }, []);

  // References updaters
  const handleAddReference = useCallback(() => {
    const current = dataRef.current;
    const newRef: Reference = {
      id: generateId(),
      name: '',
      position: '',
      organization: '',
      phone: ''
    };
    onChangeRef.current({ ...current, references: [...current.references, newRef] });
  }, []);

  const handleUpdateReference = useCallback((id: string, field: keyof Reference, val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      references: current.references.map(r => r.id === id ? { ...r, [field]: val } : r)
    });
  }, []);

  const handleRemoveReference = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, references: current.references.filter(r => r.id !== id) });
  }, []);

  // Custom section updaters
  const handleUpdateCustomTitle = useCallback((title: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, customSection: { ...current.customSection, title } });
  }, []);

  const handleAddCustomField = useCallback(() => {
    const current = dataRef.current;
    const newField: CustomField = { id: generateId(), label: '', value: '' };
    onChangeRef.current({
      ...current,
      customSection: { ...current.customSection, fields: [...current.customSection.fields, newField] }
    });
  }, []);

  const handleUpdateCustomField = useCallback((id: string, field: 'label' | 'value', val: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      customSection: {
        ...current.customSection,
        fields: current.customSection.fields.map(f => f.id === id ? { ...f, [field]: val } : f)
      }
    });
  }, []);

  const handleRemoveCustomField = useCallback((id: string) => {
    const current = dataRef.current;
    onChangeRef.current({
      ...current,
      customSection: {
        ...current.customSection,
        fields: current.customSection.fields.filter(f => f.id !== id)
      }
    });
  }, []);

  // Declaration updater
  const handleUpdateDeclaration = useCallback((val: string) => {
    const current = dataRef.current;
    onChangeRef.current({ ...current, declaration: val });
  }, []);

  return (
    <div className="space-y-6 pb-20">
      {/* Quick Theme Bar */}
      <QuickThemeSection 
        theme={data.theme} 
        onChangeTheme={handleUpdateTheme} 
      />

      {/* Sections Manager */}
      <SectionManagerSection 
        selectedSections={data.selectedSections} 
        onToggleSection={handleToggleSection} 
      />

      {/* Personal Info */}
      {data.selectedSections.includes('personalInfo') && (
        <PersonalInfoSection 
          info={data.personalInfo} 
          onChangeField={handleUpdatePersonalInfoField} 
          onSameAsPresent={handleSameAsPresent}
        />
      )}

      {/* Career Objective */}
      {data.selectedSections.includes('careerObjective') && (
        <CareerObjectiveSection 
          objective={data.careerObjective} 
          onChangeObjective={handleUpdateObjective} 
        />
      )}

      {/* Education */}
      {data.selectedSections.includes('education') && (
        <EducationSection 
          education={data.education} 
          onAdd={handleAddEducation} 
          onUpdate={handleUpdateEducation} 
          onRemove={handleRemoveEducation} 
        />
      )}

      {/* Skills */}
      {data.selectedSections.includes('skills') && (
        <ListFieldSection 
          field="skills"
          title="Skills"
          items={data.skills}
          icon={<Monitor size={18} />}
          onAdd={() => handleAddListItem('skills')}
          onUpdate={(idx, val) => handleUpdateListItem('skills', idx, val)}
          onRemove={(idx) => handleRemoveListItem('skills', idx)}
        />
      )}

      {/* Hobbies */}
      {data.selectedSections.includes('hobbies') && (
        <section className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <Heart size={18} />
            </div>
            Hobby and Interests
          </h3>
          <MultiSelect 
            label="Hobbies" 
            selectedValues={data.hobbies} 
            options={HOBBY_OPTIONS} 
            onChange={handleChangeHobbies}
            placeholder="Type hobby and press Enter..."
            selectedLabel="Selected Hobbies:"
          />
        </section>
      )}

      {/* Computer Skills */}
      {data.selectedSections.includes('computerSkills') && (
        <ComputerSkillsSection 
          skills={data.computerSkills} 
          onAdd={handleAddComputerSkill} 
          onUpdate={handleUpdateComputerSkill} 
          onRemove={handleRemoveComputerSkill} 
        />
      )}

      {/* Professional Trainings */}
      {data.selectedSections.includes('trainings') && (
        <TrainingsSection 
          trainings={data.trainings} 
          onAdd={handleAddTraining} 
          onUpdate={handleUpdateTraining} 
          onRemove={handleRemoveTraining} 
        />
      )}

      {/* Language Proficiency */}
      {data.selectedSections.includes('languageProficiency') && (
        <LanguagesSection 
          languages={data.languageProficiency} 
          onAdd={handleAddLanguage} 
          onUpdate={handleUpdateLanguage} 
          onRemove={handleRemoveLanguage} 
        />
      )}

      {/* Work Experience */}
      {data.selectedSections.includes('workExperience') && (
        <WorkExperienceSection 
          workExperience={data.workExperience} 
          onAdd={handleAddWork} 
          onUpdate={handleUpdateWork} 
          onRemove={handleRemoveWork} 
        />
      )}

      {/* Self Assessment */}
      {data.selectedSections.includes('selfAssessment') && (
        <ListFieldSection 
          field="selfAssessment"
          title="Self Assessment"
          items={data.selfAssessment}
          icon={<ClipboardCheck size={18} />}
          onAdd={() => handleAddListItem('selfAssessment')}
          onUpdate={(idx, val) => handleUpdateListItem('selfAssessment', idx, val)}
          onRemove={(idx) => handleRemoveListItem('selfAssessment', idx)}
        />
      )}

      {/* References */}
      {data.selectedSections.includes('references') && (
        <ReferencesSection 
          references={data.references} 
          onAdd={handleAddReference} 
          onUpdate={handleUpdateReference} 
          onRemove={handleRemoveReference} 
        />
      )}

      {/* Custom Section */}
      {data.selectedSections.includes('custom') && (
        <CustomSectionComponent 
          customSection={data.customSection} 
          onUpdateTitle={handleUpdateCustomTitle} 
          onAddField={handleAddCustomField} 
          onUpdateField={handleUpdateCustomField} 
          onRemoveField={handleRemoveCustomField} 
        />
      )}

      {/* Declaration */}
      {data.selectedSections.includes('declaration') && (
        <DeclarationSection 
          declaration={data.declaration} 
          onChangeDeclaration={handleUpdateDeclaration} 
        />
      )}
    </div>
  );
});

CVForm.displayName = 'CVForm';
