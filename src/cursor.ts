// // cursor.ts
// import { useEffect } from 'react';

// export const useCursor = () => {
//   const setIsDesktop = (value: boolean) => {
//   };

//   useEffect(() => {
//     const toggleCursor = () => {
//       setIsDesktop(window.innerWidth >= 800);
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       const cursor = document.querySelector<HTMLElement>('.app-cursor');
//       if (cursor) {
//         cursor.setAttribute(
//           'style',
//           `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`
//         );
//       }
//     };

//     const handleMouseClick = () => {
//       const cursor = document.querySelector<HTMLElement>('.app-cursor');
//       if (cursor) {
//         cursor.classList.add('expand');
//         setTimeout(() => {
//           cursor.classList.remove('expand');
//         }, 500);
//       }
//     };

//     // Event listeners
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('click', handleMouseClick);

//     // Initial setup
//     toggleCursor();

//     // Cleanup event listeners on component unmount
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('click', handleMouseClick);
//     };
//   }, [setIsDesktop]);
// };
