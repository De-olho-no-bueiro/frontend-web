'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DocSidebar, type DocTopic } from '@/features/how-to-use/components/DocSidebar';
import { InstallationAndroidContent } from '@/features/how-to-use/components/doc-content/InstallationAndroidContent';
import { InstallationIosContent } from '@/features/how-to-use/components/doc-content/InstallationIosContent';
import { MobileAppContent } from '@/features/how-to-use/components/doc-content/MobileAppContent';
import { DashboardContent } from '@/features/how-to-use/components/doc-content/DashboardContent';

export default function HowToUsePage() {
  const [activeTopic, setActiveTopic] = useState<DocTopic>('android');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTopic) {
      case 'android':
        return <InstallationAndroidContent />;
      case 'ios':
        return <InstallationIosContent />;
      case 'mobile-app':
        return <MobileAppContent />;
      case 'dashboard':
        return <DashboardContent />;
      default:
        return <InstallationAndroidContent />;
    }
  };

  const handleTopicSelect = (topic: DocTopic) => {
    setActiveTopic(topic);
    setIsMobileMenuOpen(false); // Close mobile menu on select
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col bg-white">
      {/* Mobile Header / Menu Toggle */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <span className="font-semibold text-slate-900">Documentação</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1400px] flex-1 md:flex md:px-8">
        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className="md:w-64 md:shrink-0 md:border-r md:border-slate-200 lg:w-72">
          <DocSidebar
            activeTopic={activeTopic}
            onSelectTopic={handleTopicSelect}
            isOpenMobile={isMobileMenuOpen}
          />
        </div>

        <main className="flex-1 px-4 py-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-4xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
