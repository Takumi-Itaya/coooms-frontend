import { motion } from 'framer-motion';
import { UpAnim, DownAnim } from 'components/layouts/page-loding/PageTransitionAnim';

function PageLoding() {
  return(
    <>
      <motion.div
        variants={UpAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'absolute',
          zIndex: 50,
          width: '100vw',
          height: '50vh',
          background: '#2B2C3E',
          borderBottom: '5px solid #C4C5D3',
        }}/>
      <motion.div
        variants={DownAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'absolute', 
          zIndex: 50,
          // overflowY: 'hidden',
          width: '100vw',
          height: '50vh',
          background: '#2B2C3E',
          borderTop: '5px solid #C4C5D3',
        }}/>
    </>
  );
}
export default PageLoding;