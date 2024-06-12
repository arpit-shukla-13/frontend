import React, { useEffect, useState } from 'react'
import './Universitycar.css';


function Universitycar() {
    let [university, setUniversity] = useState([]);

    let unidata = async () => {
      let data = await fetch(`http://localhost:4500/getuniversity`);
      data = await data.json();
      setUniversity(data);
    };
    useEffect(()=>{
        unidata(); 
    },[])
  return (
    <>
            <section className='coursesCard'>
        <div className='container grid2'>
          {university.map((item,index) => (
            <div className='items' key={index}>
              <div className='content flex'>
                <div className='left'>
                  
                </div>
                <div className='text'>
                  <h1>{item.uniName}</h1>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  <div className='details'>
                   
                      <>
                        <div className='box'>
                        <img
                  className="w-40 h-40 mb-3 rounded-full shadow-lg"
                  src={item.uniLogo}
                  alt="University"
                />
                          <div className='para'>
                            <h4>{item.uniAddress}</h4>
                          </div>
                        </div>
                        <span className='text-center my-2'>{item.uniLink}</span>
                      </>
                   
                  </div>
                </div>
              </div>
              {/* <div className='price'>
                <h3>
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div> */}
              <button className='my-2 outline-btn'>VIEW MORE</button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Universitycar
