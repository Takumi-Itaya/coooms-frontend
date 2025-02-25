import { motion } from 'framer-motion';
import './Opening.css';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import Cloud1 from 'components/layouts/page-loding/opning-item/Cloud1';
import Cloud2 from 'components/layouts/page-loding/opning-item/Cloud2';
import Cloud3 from 'components/layouts/page-loding/opning-item/Cloud3';
import Cloud4 from 'components/layouts/page-loding/opning-item/Cloud4';


function Opening() {
  const {width} = useWindowDimensions();
  const words = "Coooms"
    const word = words.split("")

  const textanimate = word.map((word, index) => {
    return (
        <motion.p
          className="opening-title"
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ delay: ((5-index) * 0.04) + 0.4 }} key={(5-index)}>
            {word}
        </motion.p>
    )
})

  return(
    <>
      {/* <motion.div
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
              src={doorClosed}/>
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
              src={doorOpen}/>
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
              src={doorClosed}/>
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
              src={doorOpen}/>
          </>
        }
      </motion.div> */}


      <motion.div 
        className="opening-container">
        <div className='opening-title-text'>
          {textanimate} 
        </div>
        <div className="opening-cloud1">
          <Cloud2 />
        </div>
        <div className="opening-cloud2">
          <Cloud1 />
        </div>
        <div className="opening-cloud3">
          <Cloud3 />
        </div>
        <div className="opening-cloud4">
          <Cloud4 />
        </div>
      </motion.div>
    </>
  );
}
export default Opening;