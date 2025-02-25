import "./InitialPageLoding.css";
import { useEffect } from "react";
import gsap from 'gsap';
import LodingCloud1 from "components/layouts/page-loding/loding-item/LodingCloud1";
import LodingCloud2 from "components/layouts/page-loding/loding-item/LodingCloud2";
import LodingCloud3 from "components/layouts/page-loding/loding-item/LodingCloud3";
import LodingCloud4 from "components/layouts/page-loding/loding-item/LodingCloud4";

function InitialPageLoding() {
  useEffect(() => {
    gsap.from('.li-cloud1', { left: '0', top: '0' });
    gsap.to('.li-cloud1', { left: '-80%', top: '-80%', duration: 1.5, delay: 0.4, ease: "power1.inOut" });

    gsap.from('.li-cloud2', { right: '0', top: '0' });
    gsap.to('.li-cloud2', { right: '-80%', top: '-80%', duration: 1.5, delay: 0.4, ease: "power1.inOut" });
    
    gsap.from('.li-cloud3', { left: '0', bottom: '0' });
    gsap.to('.li-cloud3', { left: '-80%', bottom: '-80%', duration: 1.5, delay: 0.4, ease: "power1.inOut" });

    gsap.from('.li-cloud4', { right: '0', bottom: '0' });
    gsap.to('.li-cloud4', { right: '-80%', bottom: '-85%', duration: 1.5, delay: 0.4, ease: "power1.inOut" });

  }, [])

  return(
    <div className="pageloding-container">
      <div className="li-cloud2">
        <LodingCloud2 />
      </div>
      <div className="li-cloud4">
        <LodingCloud4 />
      </div>
      <div className="li-cloud3">
        <LodingCloud3 />
      </div>
      <div className="li-cloud1">
        <LodingCloud1 />
      </div>
    </div>
  );
}
export default InitialPageLoding;