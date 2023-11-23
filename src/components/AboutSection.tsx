import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Flex, Grid } from '@chakra-ui/react'
import IsotopeGrid from './IsotopeGrid';
import '../css/AboutSection.css';
import { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import { useTheme } from '../utils/themeContext';

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
    <>
      <div className='aboutMe' id='about-section'>
        <h1 className='about-title'>About Me</h1>
        <Accordion allowToggle>
          <AccordionItem className='about-sections'>
            <h2>
              <AccordionButton _expanded={{ bg: theme.primaryColor, color: theme.secondaryColor }} key='bioOne'>
                <Box as="span" flex='1' textAlign='left'>
                  Who am I
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              With a master's degree in architectural design, my passion for design and technology naturally led me into the world of web design. It's where I've found the sweet spot, striking a balance between creativity and tech wizardry. Beyond the professional realm, you'll often find me practicing yoga for that much-needed Zen moment or hitting the hiking trails to escape the digital grind. And when I'm not pixel-pushing, I'm all about painting and crafting, it's like my little analog escape room.
              These interests provide a well-rounded perspective, injecting a touch of artistry and aesthetics into my digital work. So, I'm your go-to person for creating visually appealing and user-friendly websites, blending my love for design and technology into a neat online package.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem className='about-sections'>
            <h2>
              <AccordionButton _expanded={{ bg: theme.primaryColor, color: theme.secondaryColor  }} key='bioTwo'>
                <Box as="span" flex='1' textAlign='left'>
                  Outside of Coding?
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
                  Skills
                </Box>
                <AccordionIcon  />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} >
              <IsotopeGrid />
            </AccordionPanel >
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default AboutSection;
