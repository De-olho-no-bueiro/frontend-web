import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import AcademicOriginSection from '../components/AcademicOriginSection';
import ImpactSection from '../components/ImpactSection';
import TeamSection from '../components/TeamSection';
import OpenSourceSection from '../components/OpenSourceSection';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <HeroSection />
      <ProjectSection />
      <AcademicOriginSection />
      <ImpactSection />
      <TeamSection />
      <OpenSourceSection />
    </div>
  );
}
