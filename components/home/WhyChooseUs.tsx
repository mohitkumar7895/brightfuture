'use client';

import React from 'react';
import { 
  Users, 
  FileCheck2, 
  BookMarked, 
  Award,
} from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

interface FeatureItem {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  features?: FeatureItem[];
  aboutContent?: string;
}

export default function WhyChooseUs({
  aboutContent,
}: WhyChooseUsProps) {
  // 3 Core Points - natural, grounded Indian coaching language
  const threeCoreFeatures = [
    {
      icon: Users,
      badge: '10+ वर्ष अनुभवी फैकल्टी',
      title: 'अनुभवी विषय विशेषज्ञ शिक्षक',
      description: 'मैथ्स शॉर्टकट, रीजनिंग ट्रिक्स, सामान्य अध्ययन (UP स्पेशल) और हिंदी व्याकरण की व्यवस्थित तैयारी।',
    },
    {
      icon: FileCheck2,
      badge: 'साप्ताहिक OMR टेस्ट',
      title: 'प्रत्येक रविवार ऑफलाइन मॉक टेस्ट',
      description: 'नवीनतम परीक्षा पैटर्न पर आधारित टेस्ट, नेगेटिव मार्किंग विश्लेषण एवं जिला-स्तरीय रैंक कार्ड।',
    },
    {
      icon: BookMarked,
      badge: 'ललितपुर में 2 शाखाएं',
      title: 'प्रिंटेड नोट्स एवं लाइब्रेरी सुविधा',
      description: 'अद्यतन फॉर्मूला बुकलेट, 10 वर्षों के हल प्रश्न पत्र तथा स्टेशन रोड और घंटाघर स्थित शांत अध्ययन कक्ष।',
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Section Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-8 sm:mb-9"
          badge={
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              हमारी विशेषताएं • Key Features
            </span>
          }
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              ललितपुर के छात्र <span className="text-blue-700">ब्राइट फ्यूचर</span> ही क्यों चुनते हैं?
            </h2>
          }
          subtitle={
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
              कंसेप्ट क्लैरिटी, स्पीड कैलकुलेशन ट्रिक्स और प्रत्येक रविवार OMR टेस्ट — ललितपुर में सर्वाधिक सिलेक्शन्स का विश्वसनीय रिकॉर्ड।
            </p>
          }
        />

        {/* 3 Core Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {threeCoreFeatures.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
