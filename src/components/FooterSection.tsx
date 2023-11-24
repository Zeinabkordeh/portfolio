import { Icon } from '@chakra-ui/react';
import { GrGithub, GrLinkedinOption, GrMail } from 'react-icons/gr';
import '../css/App.css';
import '../css/FooterSection.css';
import { useTheme } from '../utils/themeContext';

const FooterSection = () => {
  
  const { theme } = useTheme();
  return (
    <>
      <div className='footer-section' style={{ color: theme.primaryColor, backgroundColor: theme.secondaryColor }}>
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
