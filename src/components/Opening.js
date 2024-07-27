import { motion } from 'framer-motion';
import '../css/Opening.css';
import { useWindowDimensions } from './hooks/useWindowDimensions';

function Opening() {
  const {width, height} = useWindowDimensions();
  const words = "Coooms"
    const word = words.split("")

  const textanimate = word.map((word, index) => {
    return (
        <motion.p
          className="opening-title"
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ delay: ((5-index) * 0.03) + 0.4 }} key={(5-index)}>
            {word}
        </motion.p>
    )
})

  return(
    <>
      <motion.div
        className="opening-icon-container">
        {width <= 500 ? 
          <>
            <motion.img
              className="opening-icon"
              initial={{ 
                x: 25,
                y: -5,
                opacity: 1, 
              }}
              animate={{ 
                x: [25, -110],
                opacity: 0, 
              }}
              transition={{ 
                duration: 0.3,
                delay:0.4 
              }}
              src="./img/icon/door-closed.png"/>
            <motion.img
              className="opening-icon"
              initial={{
                x: -140,
                y: -5,
                opacity: 0, 
              }}
              animate={{ 
                opacity: 1, 
              }}
              transition={{ 
                delay:0.6
              }}
              src="./img/icon/door-open.png"/>
          </>
          :
          <>
            <motion.img
              className="opening-icon"
              initial={{ 
                x: 25,
                y: -10,
                opacity: 1, 
              }}
              animate={{ 
                x: [25, -170],
                opacity: 0, 
              }}
              transition={{ 
                duration: 0.3,
                delay:0.4 
              }}
              src="./img/icon/door-closed.png"/>
            <motion.img
              className="opening-icon"
              initial={{
                x: -220,
                y: -10,
                opacity: 0, 
              }}
              animate={{ 
                opacity: 1, 
              }}
              transition={{ 
                delay:0.6
              }}
              src="./img/icon/door-open.png"/>
          </>
        }
      </motion.div>


      <motion.div 
        className="opening-container">
        <div className='opening-title-text'>
          {textanimate} 
        </div>
      </motion.div>;
    </>
  );
}
export default Opening;