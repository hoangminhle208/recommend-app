import React from 'react';
import imgBackGround from "../../img/background.jpg"
const BackGround = () => {

  const style = {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "-1"
  }
  //"https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
return (
  <div className='absolute' style={style}>
      <img className='w-[100vw] h-[100vh] bg-cover' src={imgBackGround} alt="banner" />
  </div>
)

}
export default BackGround