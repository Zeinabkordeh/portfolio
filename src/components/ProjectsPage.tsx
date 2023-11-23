import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import singlePageContent from '../hooks/singlePageContents';
import { FaGithub } from 'react-icons/fa';
import { LuScreenShare } from 'react-icons/lu';
import '../css/ProjectsPage.css';
import ColorModeSwitch from './ColorModeSwitch';
import { truncateText } from '../utils/truncateText';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text, Image, Box } from '@chakra-ui/react';

function ProjectsPage() {
//   const { id } = useParams();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const toggleCursor = () => {
      setIsDesktop(window.innerWidth >= 800);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector<HTMLElement>('.app-cursor');
      if (cursor) {
        cursor.setAttribute('style', `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`);
      }
    };

    const handleMouseClick = () => {
      const cursor = document.querySelector<HTMLElement>('.app-cursor');
      if (cursor) {
        cursor.classList.add('expand');
        setTimeout(() => {
          cursor.classList.remove('expand');
        }, 500);
      }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseClick);

    // Initial setup
    toggleCursor();

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <>
      <ColorModeSwitch />
      {isDesktop && <div className="app-cursor"></div>}
      <Box className='project-card-design'>
        {/* <SimpleGrid   templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'> */}

            {singlePageContent.map((content, index) => (
                
            <Card key={index} className='project-card-single'>
                <CardHeader>
                <Image
                    m = '0 auto'
                    src={content.imageSmall}
                    alt={content.id}
                    borderRadius='lg'
                />
                <Heading size='md'>{content.title}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{truncateText(content.mainText, 30)}</Text>
                </CardBody>
                <CardFooter>
                <Button>
                    <Link to={`/singleProject/${content.id}`} >Read More</Link>
                </Button>
                </CardFooter>
            </Card>
            ))}
            {/* </SimpleGrid> */}
        </Box>
    </>
  );
}

export default ProjectsPage;
