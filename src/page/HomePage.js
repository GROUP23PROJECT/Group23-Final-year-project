

import "./HomePage.css";
import { useState } from "react";
import tumor from "../images/Tum.png";
import lungProb from "../images/lungProb.png";
import no_tumor from "../images/noTum.png";
import normLungs from "../images/normLungs.png";
import axios from 'axios';
import NavigationBar from "../components/NavigationBar";
import uploaded from "../images/upload.jpg";


function HomePage() {
  // const [image, setImage] = useState(null);
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  

  async function  handleFormSubmit (e)  {

    e.preventDefault()

    const formData = new FormData();

    formData.append('file', file);
    formData.append('fileName', file.name);
    console.log(`VVVVVVVVV ${typeof(formData)}`)

    axios.post('http://localhost:8000/segment', formData
    ,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => { setFile(res.data)} )


  }
  const imageChange =  (e) =>{
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0])
    }

    setFile(e.target.files[0])
}


  return (
    <>
    <NavigationBar title={'Image segmentation section'}/>
      <form onSubmit={handleFormSubmit}>
        <div className="container--main">
          {/* <h1>Image segmentation section</h1> */}
          <div className="main--overlay--container">
            <div className="mini--img--container stick--top">
            <img src={image === null ? uploaded : image} className='img--container-h'/>
            {/* <img src={ upload} className='img--container'/> */}
            <img src={`data:image/png;base64,${file}`} className='img--container-h'/>
            </div>
          </div>
          <h3>Please select an image</h3>
          <input className='input--sub' type='file' onChange={imageChange} name='file'/>
          
          <button className='input--sub' type='submit' >Make segmentation</button>
          
          <div className="details--text">
            <div className="details--text-image">
              <h3>Brain Tumour Image </h3>
              <img className="details--image-h" src={tumor} />
             
            </div>
            <div className="details--text-image">
              <h3>No Brain Tumour Image  </h3>
              <img className="details--image-h" src={no_tumor} />
              
            </div>
            <div className="details--text-image">
              <h3> Lungs with problem </h3>
              <img className="details--image-h" src={lungProb} />
              
            </div>
            <div className="details--text-image">
              <h3> Normal Lungs </h3>
              <img className="details--image-h" src={normLungs} />
             
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default HomePage;
