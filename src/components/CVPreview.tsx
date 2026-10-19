import React from 'react';
import { CVData } from '../types';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { SmartClassicTemplate, SmartModernTemplate } from './SmartTemplates';
import { VibrantTemplate } from './VibrantTemplate';
import { VibrantPrimeTemplate } from './VibrantPrimeTemplate';
import { ClassicPrestigeTemplate } from './ClassicPrestigeTemplate';
import { SmartExecutiveTemplate } from './SmartExecutiveTemplate';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.memo(React.forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const renderTemplate = () => {
    switch (data.theme.templateId) {
      case 'vibrant-prime':
        return <VibrantPrimeTemplate ref={ref} data={data} />;
      case 'classic-prestige':
        return <ClassicPrestigeTemplate ref={ref} data={data} />;
      case 'smart-executive':
        return <SmartExecutiveTemplate ref={ref} data={data} />;
      case 'vibrant':
        return <VibrantTemplate ref={ref} data={data} />;
      case 'classic':
        return <ClassicTemplate ref={ref} data={data} />;
      case 'modern':
        return <ModernTemplate ref={ref} data={data} />;
      case 'smart-classic':
        return <SmartClassicTemplate ref={ref} data={data} />;
      case 'smart-modern':
        return <SmartModernTemplate ref={ref} data={data} />;
      case 'modern-minimalist':
        return <VibrantPrimeTemplate ref={ref} data={data} />;
      case 'executive-elite':
        return <ClassicPrestigeTemplate ref={ref} data={data} />;
      default:
        return <VibrantPrimeTemplate ref={ref} data={data} />;
    }
  };

  return renderTemplate();
}));

CVPreview.displayName = 'CVPreview';
