import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import isotopeItems from '../isotopeItems';
import '../css/IsotopeGrid.css';

interface IsotopeGridProps {
  className?: string;
}

const IsotopeGrid: React.FC<IsotopeGridProps> = ({ className }) => {
  const isotope = useRef<Isotope | null>(null);
  const [filterKey, setFilterKey] = useState<string>('*');

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
      <div className="selector-buttons">
        <button className="button-checked" id="*" onClick={handleFilterKeyChange('*')}>
          All
        </button>
        <button className="" id="fave" onClick={handleFilterKeyChange('fave')}>
          Favourites
        </button>
        <button className="" id="devo" onClick={handleFilterKeyChange('devo')}>
          Develop
        </button>
        <button className="" id="design" onClick={handleFilterKeyChange('design')}>
          Design
        </button>
        <button className="" id="other" onClick={handleFilterKeyChange('other')}>
          Other
        </button>
      </div>

      <hr />

      <div className="isotope-container">
        {isotopeItems.map((item, index) => (
          <div key={index} className={`filter-item ${item.classes}`}>
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default IsotopeGrid;
