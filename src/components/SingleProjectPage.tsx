import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import singlePageContent from '../singlePageContents';
import { FaGithub } from "react-icons/fa";
import { LuScreenShare } from "react-icons/lu";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image, Link} from '@chakra-ui/react';
import '../css/SingleProjectPage.css'

const SingleProjectPage = () => {
  const { id } = useParams();
  const content = singlePageContent.filter(item => item.id === id);
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
      {isDesktop && <div className="app-cursor"></div>}
      <Card className='single-card'>
        <CardBody>
          <Image
            m = '0 auto'
            src={content[0].imageHeader}
            alt={content[0].id}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{content[0].title}</Heading>
            <Text>{content[0].mainText}</Text>
          </Stack>
          <Text>
            <ul>
                {content[0].tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                ))}
            </ul>
            </Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button leftIcon={<FaGithub />} w='7rem' variant='solid' colorScheme='blue'>
              <Link href="">
                GitHub
              </Link>
            </Button>
            <Button leftIcon={<LuScreenShare />} w='7rem' variant='solid' colorScheme='blue'>
              <Link href="">
                Live Site
              </Link>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export default SingleProjectPage;
