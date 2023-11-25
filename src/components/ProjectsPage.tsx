import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProjectsPage.css';
import singlePageContent from '../hooks/singlePageContents';
import { truncateText } from '../utils/truncateText';
// import ColorModeSwitch from './ColorModeSwitch';
import FooterSection from './FooterSection';
import ToggleNav from './ToggleNav';

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
      <ToggleNav/>
      {/* <ColorModeSwitch /> */}
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
                    <Link to={`/Projects/${content.id}`}  className='read-more-single'>Read More</Link>
                </Button>
                </CardFooter>
            </Card>
            ))}
            {/* </SimpleGrid> */}
        </Box>
        <FooterSection />
    </>
  );
}

export default ProjectsPage;
