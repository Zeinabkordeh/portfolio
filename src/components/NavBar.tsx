import React, { useEffect, useRef } from 'react';
import Snap from 'snapsvg';
import '../css/NavBar.css';
import { Ribbon } from '../hooks/ribbon';


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
    <div className="container">
      <svg id="svg" ref={svgRef}></svg>
    </div>
  );
};

export default Navbar;
