import '../css/LandingPage.css';
// import ColorModeSwitch from './ColorModeSwitch';
import ProjectSection from './ProjectSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

const LandingPage = () => {


  return (
    <>
      <section className="landing-page" id='landing-section' >
          {/* <ColorModeSwitch /> */}
          <ProjectSection />
          <AboutSection />
          <ContactSection />
          <FooterSection />
      </section>
  </>
  );
};

export default LandingPage;
