import React, { useEffect, useRef } from 'react';
import Snap from 'snapsvg';
import '../css/NavBar.css';
import { Ribbon } from '../hooks/ribbon';
import TextTransition from './TextsTransition';


const Navbar: React.FC = () => {
  const svgRef = useRef(null);

  useEffect(()=>{
    if (svgRef.current){
      console.log(svgRef.current)
      let ribbon = new Ribbon(Snap(svgRef.current));
      ribbon.init();
    }
  },[])


  return (
    <>
      <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
      <TextTransition/>
      <svg id="svg" ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1700 889" style={{ width: '100%', height: 'auto' }}></svg>
      </div>
    </>
  );
};

export default Navbar;
