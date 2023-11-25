import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,  } from '@chakra-ui/react';
import Isotope from 'isotope-layout';
import { useEffect, useRef, useState } from 'react';
import '../css/AboutSection.css';
import { GiSkills } from "react-icons/gi";
import { useTheme } from '../utils/themeContext';
import IsotopeGrid from './IsotopeGrid';
import { GoPersonFill } from "react-icons/go";
import { FaMountainSun } from "react-icons/fa6";

const AboutSection = () => {

  const { theme } = useTheme();

  const isotope = useRef<Isotope | null>(null);
  const [filterKey, setFilterKey] = useState<string>('all');

  useEffect(() => {
    isotope.current = new Isotope('.isotope-container', {
      itemSelector: '.filter-item',
      layoutMode: 'fitRows',
    });

  }, []);

  useEffect(() => {
    if (isotope.current) {
      if (filterKey === '*') {
        isotope.current.arrange({ filter: '*' }); 
      } else {
        isotope.current.arrange({ filter: `.${filterKey}` });
      }
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key: string) => () => {
    if (document.getElementById(key)?.classList.contains('button-checked')) {
      document.getElementById(key)?.classList.remove('button-checked');
      document.getElementById('*')?.classList.add('button-checked');
      setFilterKey('*');
    } else {
      const removeButtons = Array.from(document.getElementsByClassName('button-checked'));
      removeButtons.forEach((button) => {
        button.classList.remove('button-checked');
      });
      document.getElementById(key)?.classList.add('button-checked');
      setFilterKey(key);
    }
  };


  return (
    <div className='about-wrapper'>
      <section className='aboutMe' id='about-section'>
        <h1 className='about-title'>About Me</h1>
        <img src="/image/zeinab.jpg" alt="My Image" width='180px' />
        <div>
          <p>Hey there, fellow coder and design aficionado!</p>
          <br />
          <p>I'm Zeinab a passionate front-end web developer with a love for crafting seamless digital experiences. This space is where lines of code and pixels dance together, bringing ideas to life.</p>
          <br />
          <p>Whether you're here for inspiration, collaboration, or a bit of both, I'm excited to share my journey with you. Let's build something extraordinary!</p>
          <br />
          <p>Happy coding,</p>
          <div style={{ margin: '10px 0' }}></div>
          <p>Zeinab Kordeh</p>
          <div style={{ margin: '20px 0' }}></div>
        </div>
        <Accordion allowToggle>
          <AccordionItem className='about-sections'>
            <h2>
              <AccordionButton _expanded={{ bg: theme.primaryColor, color: theme.secondaryColor }} key='bioOne'>
                <Box as="span" flex='1' textAlign='left'>
                  {<GoPersonFill/>} Who am I
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            
              <p>With a master's degree in architectural design, my passion for design and technology naturally led me into the world of web design. It's where I've found the sweet spot, striking a balance between creativity and tech wizardry. Beyond the professional realm, you'll often find me practicing yoga for that much-needed Zen moment or hitting the hiking trails to escape the digital grind. And when I'm not pixel-pushing, I'm all about painting and crafting, it's like my little analog escape room.</p>

              <p>These interests provide a well-rounded perspective, injecting a touch of artistry and aesthetics into my digital work. So, I'm your go-to person for creating visually appealing and user-friendly websites, blending my love for design and technology into a neat online package.</p>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem className='about-sections'>
            <h2>
              <AccordionButton _expanded={{ bg: theme.primaryColor, color: theme.secondaryColor  }} key='bioTwo'>
                <Box as="span" flex='1' textAlign='left'>
                  {<FaMountainSun/>}Outside of Coding?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem className='about-sections'>
            <h2>
              <AccordionButton _expanded={{ bg: theme.primaryColor, color: theme.secondaryColor  }} key='bioThree' onClick={handleFilterKeyChange('*')}>
                <Box as="span" flex='1' textAlign='left'>
                {<GiSkills />} Skills
                </Box>
                <AccordionIcon  />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} >
              <IsotopeGrid />
            </AccordionPanel >
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

export default AboutSection;
