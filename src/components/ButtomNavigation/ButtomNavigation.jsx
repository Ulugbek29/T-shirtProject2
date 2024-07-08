// BottomNavigation.js
import React from 'react';
import styles from './style.module.scss';

function BottomNavigation({ sections, setActiveNav, activeNav }) {
  return (
    <div className={styles['bottom-navigation']}>
      {sections.map((section, index) => (
        <div 
        onClick={()=> setActiveNav(section.title)}
        key={index} 
        className={`${styles.section} ${section.title === activeNav ? styles.active : ''}`}
        >
          <section.icon color="inherit"/>
          <span className={styles.title}>{section.title}</span>
        </div>
      ))}
    </div>
  );
}

export default BottomNavigation;