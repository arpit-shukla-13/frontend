import React from "react"
import "./Contact.css"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81447.37807222125!2d80.87299464938941!3d26.845053869188003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715540610584!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  return (
    <>
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}/>
          </div>
          <div className='right row'>
            <h1 className="text-cyan-600">Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className='items grid2'>
              <div className='box'>
                <h4 className="text-cyan-600">ADDRESS:</h4>
                <p>198 West 21th Street, Lucknow , Uttar pradesh  India</p>
              </div>
              <div className='box'>
                <h4 className="text-cyan-600">EMAIL:</h4>
                <p> noteshub00@gmail.com</p>
              </div>
              <div className='box'>
                <h4 className="text-cyan-600">PHONE:</h4>
                <p> +91 7007629467</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB'>
                <input type='text' placeholder='Name' />
                <input type='email' placeholder='Email' />
              </div>
              <input type='text' placeholder='Subject' />
              <textarea cols='30' rows='7'>
                Create a message here...
              </textarea>
              <button className='primary-btn'>SEND MESSAGE</button>
            </form>


          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
