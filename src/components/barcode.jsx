import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import '../assets/css/department.css'
import '../assets/css/barcode.css'
import homeImg from '../assets/images/home-25.png'
import Logo from '../assets/images/icon.webp'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'

const Barcode = () => {
  const [data, setData] = useState("Not yet scanned");
  const [showData, setShowData] = useState({});
  const [loader, setLoader] = useState('d-none');
  let navigate = useNavigate();
  let { url } = useParams();

  useEffect(() => {
    let storageData = JSON.parse(localStorage.getItem('epicCraftings'));
    if(storageData){
      setShowData(storageData)
    }else{
      navigate('/departments')
    }
  }, [])
  

  const onUpdateScreen = (err, result) => {
    if (result) {
      setLoader('d-block')
      setData(result.text);

      // calling function
      callingApi(result.text)

    } 
    // else {
    //   setData("Not Found");
      
    // }
  };

  // Check webcam
  const checkPermission = async() =>{
    try {
      var md = navigator.mediaDevices;
      var results = false;
      if (!md || !md.enumerateDevices) results = false;
      const devices = await md.enumerateDevices();
      results = devices.some(device => 'videoinput' === device.kind);
      results ? console.log('Camera found') : alert('Camera not found!') ;
    } catch (error) { return false; }
  }


  const emptyStorage = () =>{
    localStorage.clear();
    navigate('/departments')
  }

  const callingApi = (code) =>{
    try {
      axios.get(`https://trackingapi.neon-crafts.com/${url}/${code}`).then(function (response) {      
        console.log(JSON.stringify(response.data));

        setTimeout(() => {
          if (response.data.success === true) {
            setLoader('d-none')
            Swal.fire('Status Updated Successfully', '', 'success') 
          }else{
            setLoader('d-none')
            Swal.fire('Record Not Found in AirTable', '', 'error')
          }
        }, 1000);

      }).catch(function (error){
        setTimeout(() => {   
          setLoader('d-none')
          Swal.fire('Record Not Found in AirTable', '', 'error')  
        }, 1000);
      });
    } catch (error) {
      setLoader('d-none')
      Swal.fire('Something went wrong. Try again later', '', 'error')
    }
    
  }


  return (
    <>

    {/* Loader code start */}
    <div className={`loaderMain ${loader}`}>
        <div className="loading"></div>
    </div>
    {/* Loader code start */}


    <div className="menubar">
          <div><img src={homeImg} alt="home image" onClick={emptyStorage} className="cp"/></div>
          <div>{showData.dept} Department</div>
     </div>
     <div className="content">
        <img src={Logo} alt="Logo is here " />
          <div className="bg-color-tomato">
              <BarcodeScannerComponent
                width={350}
                height={400}
                onUpdate={(err, result) => onUpdateScreen(err, result)}
              />
          </div>
              <p className="showingCode">{data}</p>
          <div>
            <button onClick={() => {checkPermission()}} className="scan_again"> Allow? </button>
          </div>

    </div>

    </>
  );
}

export default Barcode;