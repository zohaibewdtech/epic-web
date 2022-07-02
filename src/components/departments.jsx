import React, {useEffect} from 'react'
import '../assets/css/department.css'
import Swal from 'sweetalert2'
import { useNavigate  } from 'react-router-dom';


const Departments = () => {
  let navigate = useNavigate();


  useEffect(() => {
    let storageData = JSON.parse(localStorage.getItem('epicCraftings'));
    if(storageData){
      navigate(`/barcode/${JSON.parse(localStorage.getItem('epicCraftings')).url}`)
    }
  }, [])


  //setting values function
  const selectDeptFun = async(e, deptName, password, url ) =>{
    let data = {'dept':deptName,'url':url}
    
    const { value: inputPassword } = await Swal.fire({
      title: `${deptName} Department`,
      input: 'password',
      inputLabel: 'Enter password',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Enter password')
          }else{
            resolve()
          }
        })
      }
    })
    
    if (inputPassword === password) {
      Swal.fire('Password saved successfully', '', 'success').then(()=>{
        //Setting items to local storage
        localStorage.setItem("epicCraftings", JSON.stringify(data))

        //Move to next window
        setTimeout(() => {
          navigate(`/barcode/${url}`)
        }, 500);
        
      })


    }else{
      Swal.fire('Password not match', '', 'warning')
    }
  }



  return (
    <>
    <div className="menubar">Departments</div>
    <div className="content">
        <h2>Departments List</h2>

        <div className='btnMain'>
            <button onClick={(e)=> selectDeptFun(e, 'New Order', '12345678', 'todo' )}>Link to order number</button>
            <button onClick={(e)=> selectDeptFun(e, 'Cutting', '11111111', 'todo')}>Cutting DPT</button>
            <button onClick={(e)=> selectDeptFun(e, 'Crafting', '22222222', 'inProgress')}>Crafting DPT</button>
            <button onClick={(e)=> selectDeptFun(e, 'Cleaning', '33333333', 'Done')}>Cleaning DPT</button>
            <button onClick={(e)=> selectDeptFun(e, 'Quality', '44444444', 'QA')}>Quality DPT</button>
            <button onClick={(e)=> selectDeptFun(e, 'Packaging', '55555555', 'Packed')}>Packaging DPT</button>
            <button onClick={(e)=> selectDeptFun(e, 'Shipping', '66666666', 'Shipped')}>Shipping DPT</button>
        </div>
    </div>
    
    </>
  )
}

export default Departments;