import './Foother.css'

import logo1 from '../../imgs/banca.svg'
import logo2 from '../../imgs/bsn.png'
import logo3 from '../../imgs/shipping.svg'
import banner from '../../imgs/bannerGym.png'

const Foother = () => {
      return (
      <div className="foother">
        {/* Connect */}
        <section className="connect">
          <div className="connect-text">
            <span>Let's Talk</span>
            <h2>Contactanos Ahora</h2>
          </div>
          <div className="btn-talks">
            <a href="#contact" className="btn">Contacto</a>
          </div>
        </section>
        {/* Service */}
        <section className="services" id="services">
          <div className="heading-foother">
            <span>Servicios</span>
            <h2>Brindamos los mejores servicios</h2>
          </div>
          <div className="services-container">
            {/* Box 1 */}
            <div className="s-box">
              <img src={logo1} alt="banca" />
              <h3>Instalaciones</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ea fugiat esse tempore ipsum temporibus.</p>
            </div>
            {/* Box 2 */}
            <div className="s-box">
              <img src={logo2} alt="bsn" /* style={{height: '100px', }} *//>
              <h3>Gym products</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ea fugiat esse tempore ipsum temporibus.</p>
            </div>
            {/* Box 3 */}
            <div className="s-box">
              <img src={logo3} alt="shiping" />
              <h3>Entregada</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ea fugiat esse tempore ipsum temporibus.</p>
            </div>
          </div>
        </section>
        <section className="banner">
          <img src={banner} alt="" />
        </section>
        {/* Contact */}
        <section className="contact" id="contact">
          <div className="contact-box">
            <h3>NEXGYM</h3>
            <span>Sociales</span>
            <div className="social">
              <li><a href="#"><i className="bx bxl-facebook" /></a></li>
              <li><a href="#"><i className="bx bxl-twitter" /></a></li>
              <li><a href="#"><i className="bx bxl-instagram" /></a></li>
            </div>
          </div> 
          <div className="contact-box">
            <h3>Menu</h3>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#menu">Productos</a></li>
            <li><a href="#services">Servicios</a></li>
          </div> 
          <div className="contact-box">
            <h3>Links</h3>
            <li><a href="#Contact">Contacto</a></li>
            <li><a href="#Privacy Policy">Privacy Policy</a></li>
            <li><a href="#Disclaimer">Disclaimer</a></li>
            <li><a href="#Terms Of Use">Terms Of Use</a></li>
          </div>
          <div className="contact-box address">
            <h3>Contacto</h3>
            <i className="bx bxs-map"><span>Hillo Son, MX</span></i>
            <i className="bx bxs-phone"><span>+1 444 444 4444</span></i>
            <i className="bx bxs-envelope"><span>Exapmle@email.com</span></i>
          </div>
        </section>
        {/* Copyright */}
        <div className="copyright">
          <p>© All Right Reserved.</p>
        </div>
      </div>
    );
  }


export default Foother
