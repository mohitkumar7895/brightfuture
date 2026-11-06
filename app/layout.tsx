import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import db from '@/lib/db';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import FloatingCallButton from '@/components/layout/FloatingCallButton';
import SiteLayoutWrapper from '@/components/layout/SiteLayoutWrapper';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await db.seoMetadata.findUnique({
      where: { pageSlug: '/' },
    });

    const settings = await db.websiteSetting.findFirst();

    const title = seo?.metaTitle || 'Bright Future Competition Institute | Best Coaching in Lalitpur';
    const description =
      seo?.metaDescription ||
      'Bright Future Competition Institute, Lalitpur, Uttar Pradesh. Best coaching for UP Police Constable & SI, SSC CGL/CHSL, Railways RRB, UPSSSC PET & Banking. Call 9450067223.';

    return {
      title: {
        default: title,
        template: `%s | ${settings?.instituteName || 'Bright Future Competition Institute'}`,
      },
      description,
      keywords: seo?.keywords || 'coaching in Lalitpur, UP Police coaching, SSC coaching Lalitpur, Bright Future Institute',
      metadataBase: new URL('https://brightfutureinstitute.com'),
      openGraph: {
        title,
        description,
        url: 'https://brightfutureinstitute.com',
        siteName: settings?.instituteName || 'Bright Future Competition Institute',
        images: [
          {
            url: '/images/hero-classroom.jpg',
            width: 1200,
            height: 630,
            alt: 'Bright Future Competition Institute Classroom Lalitpur',
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/images/hero-classroom.jpg'],
      },
      robots: seo?.robots || 'index, follow',
    };
  } catch {
    return {
      title: 'Bright Future Competition Institute | Lalitpur',
      description: 'Lalitpur’s premier coaching institute for UP Police, SSC, Railways, and Banking examinations.',
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await db.websiteSetting.findFirst();
  } catch {
    // fallback
  }

  // Schema Markup (EducationalOrganization & LocalBusiness)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: settings?.instituteName || 'Bright Future Competition Institute',
    description: 'Premier coaching institute for UP Police, SSC CGL/CHSL, Railway RRB, and UPSSSC exams in Lalitpur, Uttar Pradesh.',
    url: 'https://brightfutureinstitute.com',
    telephone: `+91-${settings?.primaryPhone || '9450067223'}`,
    email: settings?.email || 'aj2819147@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.headOfficeAddress || 'Behind Krishna Cinema, Station Road',
      addressLocality: 'Lalitpur',
      addressRegion: 'Uttar Pradesh',
      postalCode: settings?.pinCode || '284403',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.6875,
      longitude: 78.4112,
    },
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-blue-900 selection:text-white">
        <Toaster position="top-right" richColors />
        
        <SiteLayoutWrapper
          topBar={
            settings?.isAnnouncementBarActive ? (
              <TopBar
                announcement={settings.announcementBarText || undefined}
                phone={settings.primaryPhone}
                email={settings.email}
              />
            ) : undefined
          }
          header={
            <Header
              instituteName={settings?.instituteName}
              primaryPhone={settings?.primaryPhone}
            />
          }
          footer={
            <Footer
              instituteName={settings?.instituteName}
              headOfficeAddress={settings?.headOfficeAddress}
              marketBranchAddress={settings?.marketBranchAddress}
              primaryPhone={settings?.primaryPhone}
              alternatePhones={settings?.alternatePhones}
              email={settings?.email}
              openingHours={settings?.openingHours || undefined}
            />
          }
          floatingWhatsApp={
            <FloatingWhatsApp
              whatsappNumber={settings?.whatsappNumber || '9450067223'}
              instituteName={settings?.instituteName}
            />
          }
          floatingCall={
            <FloatingCallButton primaryPhone={settings?.primaryPhone || '9450067223'} />
          }
        >
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  );
}
