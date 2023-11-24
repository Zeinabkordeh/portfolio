import '../css/LandingPage.css';
import ColorModeSwitch from './ColorModeSwitch';
import ProjectSection from './ProjectSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';
import ToggleNav from './ToggleNav';

const LandingPage = () => {


  return (
    <>
      <ToggleNav/>
      <section className="landing-page" id='landing-section' >
          <ColorModeSwitch />
          <ProjectSection />
          <AboutSection />
          <ContactSection />
          <FooterSection />
      </section>
  </>
  );
};

export default LandingPage;
