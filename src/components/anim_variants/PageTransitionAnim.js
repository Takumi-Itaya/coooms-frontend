const UpAnim = {
  initial: {
    y: '0'
  },
  animate: {
    y: [0, '-51vh'],
    transition: {
      duration: 0.4,
      delay: 0.6
    }
  },
  exit: {
    y: ['-51vh', 0],
    transition:{
      duration: 0.4
    }
  }
};

const DownAnim = {
  initial: {
    y: '50vh'
  },
  animate: {
    y: ['50vh', '101vh'],
    transition: {
      duration: 0.4,
      delay: 0.6
    }
  },
  exit: {
    y: ['101vh', '50vh'],
    transition:{
      duration: 0.4
    }
  }
};

export { UpAnim, DownAnim };