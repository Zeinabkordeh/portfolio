import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import '../css/ProjectSection.css';
import { Link } from 'react-router-dom';


export default function ProjectSection() {

  // const theme = useTheme();

  // const sharedStyles = {
  //   color: theme.secondaryColor,
  //   backgroundColor: theme.primaryColor,
  //   // border: `1px solid ${theme.secondaryColor}`,
  // };

  return (
    <div className='project-section' id='project-section'>
      <h1 className='project-title'>Featured Projects</h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        
        <SwiperSlide className='projects'>
          <img src="../../image/new-moviedatabase.png" alt="project1" />
          <div>
          <h1>TABZ</h1>
          <p>TABZ is an online movie database built in React.js using API that enables users to explore, search, and add favorite movies that stored in the local storage ...</p>
          <ul className='tools'>
            <li>React</li>
            <li>SCSS</li>
            <li>RestAPI</li>
            <li>GitHub</li>
            <li>Figma</li>
          </ul>
          <Link to="projects/TABZ" className='read-more'>Read More</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className='projects'>
          <img src="../../image/new-moviedatabase.png" alt="project2" />
          <div>
          <h1>Zeiko.ca</h1>
          <p>This portfolio was designed and developed as a platform to showcase my overall development and design skills that I learned within the TWD program, built using React/ TypeScript ...</p>
          <ul className='tools'>
            <li>React</li>
            <li>TypeScript</li>
            <li>Chakra UI</li>
            <li>CSS</li>
            <li>Figma</li>
          </ul>
          <Link to="projects/zeiko" className='read-more'>Read More</Link>
          </div>
        </SwiperSlide>
        
        <SwiperSlide className='projects'>
          <img src="../../image/new-moviedatabase.png" alt="project3" />
          <div>
          <h1>Vancouver Live</h1>
          <p>Vancouver Live hosts live music events. Our website enables easy ticket purchases, offers performer details, and provides the event schedule....</p>
          <ul className='tools'>
            <li>WordPress</li>
            <li>PHP</li>
            <li>WooCommerce</li>
            <li>SCSS</li>
            <li>GitHub</li>
            <li>Figma</li>
          </ul>
          <Link to="projects/vLive" className='read-more'>Read More</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className='discover'>
          <button className='discover-button'>
          <a href="projects">Discover More</a>
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
