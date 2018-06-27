import React from 'react'
import Slider from 'react-slick'

export default class ReactSlickDemo extends React.Component{
  render() {
    var settings = {
      dots: true
    }
    return (
      <div style={{margin: '0', padding: '40px', width: '80%', color: '#333', background: '#419be0'}} >
        <Slider {...settings}>
          <div><img src='http://placekitten.com/g/400/400' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src="http://placekitten.com/g/400/200" /></div>
        </Slider>
      </div>
    );
  }
}

