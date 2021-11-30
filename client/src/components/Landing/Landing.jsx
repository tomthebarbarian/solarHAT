
import './Landing.scss'

import {useState} from 'react'
const Header = (props) => {
  return (
    <header>
      <h2 className="logo">{props.brand}</h2>
      <div
        onClick={() => {
          props.setActiveClass(!props.activeClass);
        }}
        className={props.activeClass ? "toggle active" : "toggle"}
      ></div>
    </header>
  );
};

const Contents = (props) => {
  const {register} = props
  console.log(props)
  return (
    <div class="text">
      <h2> {props.title} </h2>
      <h3> {props.subtitle} </h3>
      <p> {props.content} </p>
      <button 
       class="btn btn-outline-warning btn-lg"
       onClick = {()=>register()}
       type="button"
       >Register</button>
    </div>
  );
};

const Image = () => {
  // return <img src="https://i.ytimg.com/vi/-MKapbz0GIo/maxresdefault.jpg" />;
  return <img src="./landing.jpg" />;
  
};


const Overlay = () => {
  return <div className="overlay"> </div>;
};

const Footer = (props) => {
  return (
    <div className="footer">
      {" "}
      <p>{props.content} </p>{" "}
    </div>
  );
};
const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li>
          <a href="#"> Home </a>
        </li>
        <li>
          <a href="#"> Login </a>
        </li>
        <li>
          <a href="#"> Signup </a>
        </li>
      </ul>
    </div>
  );
};


export default function Landing(props) {
  const [activeClass, setActiveClass] = useState(false);
  const {register} = props
  return (
    <div className = "layout">
      <section className={activeClass ? "active containerx" : "containerx"}>
        {/* <Header
          setActiveClass={setActiveClass}
          activeClass={activeClass}
          brand="solarFlares"
        /> */}
        <Image />
      
        <Overlay />
        <Contents
          title="Solar Flares"
          subtitle="Renewable Energy"
          content="The Future is Now"
          register={register}
        />
        <Footer content="Copyright 2021 - All Rights Reserved." />
      </section>


      <Menu />
    </div>
  );
};
