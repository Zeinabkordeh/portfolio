import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import isotopeItems from '../utils/isotopeItems';
import '../css/IsotopeGrid.css';
import { useTheme } from '../utils/themeContext';

interface IsotopeGridProps {
  className?: string;
}

const IsotopeGrid: React.FC<IsotopeGridProps> = ({ className }) => {
  const isotope = useRef<Isotope | null>(null);
  const [filterKey, setFilterKey] = useState<string>('*');
  const { theme } = useTheme();

   const sharedStyles = {
    color: theme.secondaryColor,
    backgroundColor: theme.primaryColor,
    border: `1px solid ${theme.secondaryColor}`,
  };

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
      <div className="selector-buttons" >
        <button className="button-checked" id="*" onClick={handleFilterKeyChange('*')} style={sharedStyles} >
          All
        </button>
        <button className="" id="fave" onClick={handleFilterKeyChange('fave')} style={sharedStyles} >
          Favourites
        </button>
        <button className="" id="devo" onClick={handleFilterKeyChange('devo')} style={sharedStyles} >
          Develop
        </button>
        <button className="" id="design" onClick={handleFilterKeyChange('design')} style={sharedStyles} >
          Design
        </button>
        <button className="" id="other" onClick={handleFilterKeyChange('other')} style={sharedStyles} >
          Other
        </button>
      </div>

      <hr />

      <div className="isotope-container" >
        {isotopeItems.map((item, index) => (
          <div key={index} className={`filter-item ${item.classes}`} style={{ color: theme.primaryColor, backgroundColor: theme.secondaryColor }}>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default IsotopeGrid;
