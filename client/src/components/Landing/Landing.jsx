
import './Landing.scss'

import {useState} from 'react'


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
  return <img src="./landing_2.png" />;
  
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

export default function Landing(props) {
  const [activeClass, setActiveClass] = useState(false);
  const {register} = props
  return (
    <div className = "layout">
      <section className={activeClass ? "active containerx" : "containerx"}>
     
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


    </div>
  );
};
