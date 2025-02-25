import './Background.css';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';
import BgItem1 from 'components/layouts/background/backgroud-item/BgItem1';
import BgSun from 'components/layouts/background/backgroud-item/BgSun';
import BgCloud1 from 'components/layouts/background/backgroud-item/BgCloud1';
import BgCloud2 from 'components/layouts/background/backgroud-item/BgCloud2';
import BgCloud3 from 'components/layouts/background/backgroud-item/BgCloud3';
import BgItem6 from 'components/layouts/background/backgroud-item/BgItem6';
import BgItem5 from 'components/layouts/background/backgroud-item/BgItem5';
import BgItem4 from 'components/layouts/background/backgroud-item/BgItem4';
import BgItem3 from 'components/layouts/background/backgroud-item/BgItem3';
import BgItem2 from 'components/layouts/background/backgroud-item/BgItem2';


function Background() {
  const [bgItem12Color, setBgItem12Color] = useState("#258375");
  const [bgItem34Color, setBgItem34Color] = useState("#3CA587");
  const [bgItem56Color, setBgItem56Color] = useState("#56C4C5");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(MotionPathPlugin);
  
      gsap.from('.bg-cloud1', { left: '-10%' });
      gsap.to('.bg-cloud1', { left: '30%', duration: 50, repeat: -1, yoyo: true, ease: "power1.inOut" });
  
      gsap.from('.bg-cloud2', { left: '30%' });
      gsap.to('.bg-cloud2', { left: '70%', duration: 60, repeat: -1, yoyo: true, ease: "power1.inOut" });
  
      gsap.from('.bg-cloud3', { left: '90%' });
      gsap.to('.bg-cloud3', { left: '60%', duration: 70, repeat: -1, yoyo: true, ease: "power1.inOut" });
      
  
      const { x, y } = getSunPosition();
      gsap.set(".bg-sun", { x, y });
      gsap.to(".bg-sun", {
        duration: 60,
        repeat: -1,
        ease: "linear",
        onUpdate: function () {
          const { x, y } = getSunPosition();
          gsap.set(".bg-sun", { x, y });
        }
      })
  
      gsap.set(".coooms-background", { backgroundColor: getBackgroundColor() });
      gsap.to(".coooms-background", {
        duration: 60,
        onUpdate: function () {
          gsap.set(".coooms-background", { backgroundColor: getBackgroundColor() });
          setBgItem12Color(getBgItem12Color());
          setBgItem34Color(getBgItem34Color());
          setBgItem56Color(getBgItem56Color());
        }
      })
    });

    return () => {
      ctx.revert(); // コンポーネントが破棄されるときにアニメーションを停止
    };
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setBgItem12Color(getBgItem12Color());
      setBgItem34Color(getBgItem34Color());
      setBgItem56Color(getBgItem56Color());
    }, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  
  function getSunPosition() {
    const radius = 700;
    const centerX = window.innerWidth / 2 - (267/2);
    const centerY = window.innerHeight / 2 + 300;

    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const progress = (hours - 6) / 12;
    const angle = (1 - progress) * (Math.PI / 1.84) + 0.52359;

    return {
        x: centerX + radius * Math.cos(angle),
        y: centerY - radius * Math.sin(angle)
    };
  }

  function getBackgroundColor() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const progress = (hours - 6) / 12;

    let color;
    // #2A4B5A -> #5A7D92
    // #5A7D92 -> #B7F1FC
    // #B7F1FC -> #F88D44
    // #F88D44 -> #2A4B5A
    if (0.0 <= progress && progress < 0.05) {
      color = gsap.utils.interpolate("#2A4B5A", "#5A7D92", progress / 0.05);
    } else if (0.05 <= progress && progress < 0.1) {
      color = gsap.utils.interpolate("#5A7D92", "#B7F1FC", (progress - 0.05) / 0.05);
    } else if (0.1 <= progress && progress < 0.9) {
      color = "#B7F1FC";
    } else if (0.9 <= progress && progress < 0.95) {
      color = gsap.utils.interpolate("#B7F1FC", "#F88D44", (progress - 0.9) / 0.05);
    } else if (0.95 <= progress && progress < 1) {
      color = gsap.utils.interpolate("#F88D44", "#2A4B5A", (progress - 0.95) / 0.05);
    } else {
      color = "#2A4B5A";
    }
    return color;
  }

  function getBgItem12Color() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const progress = (hours - 6) / 12;

    let color;
    // #1C5A4F -> #3D5C4A
    // #3D5C4A -> #258375
    // #258375 -> #3E4B3F
    // #3E4B3F -> #1C5A4F
    if (0.0 <= progress && progress < 0.05) {
      color = gsap.utils.interpolate("#1C5A4F", "#3D5C4A", progress / 0.05);
    } else if (0.05 <= progress && progress < 0.1) {
      color = gsap.utils.interpolate("#3D5C4A", "#258375", (progress - 0.05) / 0.05);
    } else if (0.1 <= progress && progress < 0.9) {
      color = "#258375";
    } else if (0.9 <= progress && progress < 0.95) {
      color = gsap.utils.interpolate("#258375", "#3E4B3F", (progress - 0.9) / 0.05);
    } else if (0.95 <= progress && progress < 1) {
      color = gsap.utils.interpolate("#3E4B3F", "#1C5A4F", (progress - 0.95) / 0.05);
    } else {
      color = "#1C5A4F";
    }
    return color;
  }

  function getBgItem34Color() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const progress = (hours - 6) / 12;

    let color;
    // #2E7B65 -> #57816B
    // #57816B -> #3CA587
    // #3CA587 -> #5F6A54
    // #5F6A54 -> #2E7B65
    if (0.0 <= progress && progress < 0.05) {
      color = gsap.utils.interpolate("#2E7B65", "#57816B", progress / 0.05);
    } else if (0.05 <= progress && progress < 0.1) {
      color = gsap.utils.interpolate("#57816B", "#3CA587", (progress - 0.05) / 0.05);
    } else if (0.1 <= progress && progress < 0.9) {
      color = "#3CA587";
    } else if (0.9 <= progress && progress < 0.95) {
      color = gsap.utils.interpolate("#3CA587", "#5F6A54", (progress - 0.9) / 0.05);
    } else if (0.95 <= progress && progress < 1) {
      color = gsap.utils.interpolate("#5F6A54", "#2E7B65", (progress - 0.95) / 0.05);
    } else {
      color = "#2E7B65";
    }
    return color;
  }

  function getBgItem56Color() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const progress = (hours - 6) / 12;

    let color;
    // #3A8C8E -> #7FA686
    // #7FA686 -> #56C4C5
    // #56C4C5 -> #867B5C
    // #867B5C -> #3A8C8E
    if (0.0 <= progress && progress < 0.05) {
      color = gsap.utils.interpolate("#3A8C8E", "#7FA686", progress / 0.05);
    } else if (0.05 <= progress && progress < 0.1) {
      color = gsap.utils.interpolate("#7FA686", "#56C4C5", (progress - 0.05) / 0.05);
    } else if (0.1 <= progress && progress < 0.9) {
      color = "#56C4C5";
    } else if (0.9 <= progress && progress < 0.95) {
      color = gsap.utils.interpolate("#56C4C5", "#867B5C", (progress - 0.9) / 0.05);
    } else if (0.95 <= progress && progress < 1) {
      color = gsap.utils.interpolate("#867B5C", "#3A8C8E", (progress - 0.95) / 0.05);
    } else {
      color = "#3A8C8E";
    }
    return color;
  }

  return(
    <div className="coooms-background">
      <div className="bg-sun">
        <BgSun />
      </div>
      <div className="bg-cloud1">
        <BgCloud1 color="white" />
      </div>
      <div className="bg-cloud2">
        <BgCloud2 color="white" />
      </div>
      <div className="bg-cloud3">
        <BgCloud3 color="white" />
      </div>
      <div className="bg-item6">
        <BgItem6 color={bgItem56Color} />
      </div>
      <div className="bg-item5">
        <BgItem5 color={bgItem56Color} />
      </div>
      <div className="bg-item4">
        <BgItem4 color={bgItem34Color} />
      </div>
      <div className="bg-item3">
        <BgItem3 color={bgItem34Color} />
      </div>
      <div className="bg-item2">
        <BgItem2 color={bgItem12Color} />
      </div>
      <div className="bg-item1">
        <BgItem1 color={bgItem12Color} />
      </div>
    </div>
  );
}
export default Background;