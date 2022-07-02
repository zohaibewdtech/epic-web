import React, { useEffect } from 'react'
import '../assets/css/loader.css'
import { useNavigate  } from 'react-router-dom';

const Loader = () => {
  let navigate = useNavigate ();

  useEffect(() => {
    setTimeout(() => {
      changeScreen()
    }, 4000);
  }, [])
  
  const changeScreen = () =>{
    let storageData = JSON.parse(localStorage.getItem('epicCraftings'));
    if(storageData){
      navigate(`/barcode/${JSON.parse(localStorage.getItem('epicCraftings')).url}`);
    }else{
      navigate('/departments');  
    }
  }



  return (
    <>
    <div className="main">
        <div className='imgLoader'></div>
        <div className="skipBtn" onClick={changeScreen}>Skip</div>
    </div>
    <footer className='footer'>Powered by EpicCrafting</footer>
    </>
  )
}

export default Loader;