import { memo, useEffect, useState } from "react";
import "./CherryBlossom.scss";


const CherryBlossom = () => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const randomLeft = Math.random() * 100;
    const randomRight = Math.random() * 50 +Math.random() * 50;
    const randomSize = Math.floor(Math.random() * 6) + 50;


    setStyle({
        left: `${randomLeft}%`,
        bottom:`${randomRight}%`,
       
        width:`${randomSize}px`,
   
    });
    
  }, []);
  return (
    <div className="cherry-blossom" style={style}>
      <img
        style={style}
        src="https://cdn-icons-png.flaticon.com/512/3737/3737581.png"
        alt="Cherry Blossom"
      />
    </div>
  );
};

const MemoizedCherryBlossom = memo(CherryBlossom);

export default MemoizedCherryBlossom;
