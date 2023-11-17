import '../css/FooterSection.css';
import { Icon } from '@chakra-ui/react'
import { GrLinkedinOption, GrMail, GrGithub } from 'react-icons/gr'

const FooterSection = () => {
  

  return (
    <>
      <div className='footer-section'>
        <h1>Contact With Me!</h1>
        <div>
            <a href="https://www.linkedin.com/in/zeinabkordeh/">
              <Icon className='media-icon' as={GrLinkedinOption} boxSize={6}/>
            </a>
            <a href="mailto:your.email@example.com">
            <Icon className='media-icon' as={GrMail} boxSize={6}/>
            </a>
            <a href="https://github.com/Zeinabkordeh">
            <Icon className='media-icon' as={GrGithub}boxSize={6}/>
            </a>
        </div>
        <p>©Zeinab Kordeh | Vancouver | 2023</p>
      </div>
    </>
  );
}

export default FooterSection;
