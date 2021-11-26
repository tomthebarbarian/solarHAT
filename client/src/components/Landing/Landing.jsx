import React from 'react';

import { useState } from 'react';

export default function Landing(props) {
  const {nav, setNav} = props
 

  const carousel = { 
      "max-height": "calc(100vh - 30px)",
      "overflow": "hidden"  
};

const carousel_caption = {
  "position": "sticky",
  "bottom": "65%",
  "z-index": "10",
  "padding-top": "20px",
  "padding-bottom": "20px",
  "color": "#fff",
  
}

const half_black = {
  "background-color": "rgba(0, 0, 0, 0.7)",
  // background-color : "rgba(0,0,0,0.3)"
}


  return (
    <>
    
      
<head>
  <title>foodTruck</title>
  
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
    integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
    integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    type="text/css" />

</head>





    <div id="overlay"></div>

    <div>
      <div id="carouselExampleIndicators" className="carousel slide dark-translucent-bg"
        style={half_black} data-ride="carousel" data-interval="3000">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner">

          <div className="carousel-item active ">
            <img src="/photo-1490645935967-10de6ba17061.jpeg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption half-black">
              <h3><b><i>food</i>Truck</b> Restaurant</h3>
              <p class="carousel-footnote "><i>Fine cusine and enjoyment</i></p>
            </div>
          </div>

          <div class="carousel-item ">
            {/* <img src="/images/photo-1504674900247-0877df9cc836.jpeg" class="d-block w-100" alt="..."> */}
            <div class="carousel-caption half-black">
              <h3><b><i>food</i>Truck</b> Restaurant</h3>
              <p class="carousel-footnote "><i>Home style food made with  <i class="icon fas fa-heart"></i> </i>  ...</p>
            </div>
          </div>

          <div class="carousel-item ">
            {/* <img src="/images/photo-1544510806-e28d3cd4d4e6.jpeg" class="d-block w-100" alt="..."> */}
            <div class="carousel-caption half-black">
              <h3><b><i>food</i>Truck</b> Restaurant</h3>
              <p class="carousel-footnote "><i>Good times start here...</i></p>
            </div>
          </div>

          <div class="carousel-item ">
            {/* <img src="/images/coffee.jpg" class="d-block w-100" alt="..."> */}
            <div class="carousel-caption half-black">
              <h3><b><i>food</i>Truck</b> Restaurant</h3>
              <p class="carousel-footnote "><i>For the coffee lovers... Espresso, lattes or mocha</i></p>
            </div>
          </div>

        </div>


        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>




      
    </>
  );
}
