import React from "react";
import styled from 'styled-components'


function BurguerBotton(props) {
    return (
        <Burguer>
            <div onClick={props.handleClick}
                className={`icon nav-icon-4 ${props.clicked ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </Burguer>
    );
}

export default BurguerBotton;

const Burguer = styled.div`
.nav-icon-4{
  width: 35px;
  height: 30px;
  margin: 10px 10px;
  position: relative;
  cursor: pointer;
  display: inline-block;
}
.nav-icon-4 span{
  background-color:#FFF;
  position: absolute;
  border-radius: 2px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
}
.nav-icon-4 span:nth-child(1){
  width: 100%;
  height:  4px;
  display: block;
  top: 0px;
  left: 0px;
}
.nav-icon-4 span:nth-child(2){
  width: 100%;
  height:  4px;
  display: block;
  top: 13px;
  left: 0px;
}
.nav-icon-4 span:nth-child(3){
  width: 100%;
  height:  4px;
  display: block;
  bottom: 0px;
  left: 0px;
}
.nav-icon-4:not(.open):hover span:nth-child(1){
  width: 100%;
  height:  4px;
  display: block;
  top: -2px;
  left: 0px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
}
.nav-icon-4:not(.open):hover span:nth-child(2){
  width: 100%;
  height:  4px;
  display: block;
  top: 13px;
  left: 0px;
  transition: .4s cubic-bezier(.8, .5, .2, 1.4);
}
.nav-icon-4:not(.open):hover span:nth-child(3){
  width: 100%;
  height:  4px;
  display: block;
  bottom: -2px;
  left: 0px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
}
.nav-icon-4.open {
  transform: rotate(90deg);
}
.nav-icon-4.open span:nth-child(1){
  left:3px;
  top: 12px;
  width: 30px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
  transform: rotate(90deg);
  transition-delay: 150ms;
}
.nav-icon-4.open span:nth-child(2){
  left:2px;
  top: 20px;
  width: 20px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
  transform: rotate(45deg);
  transition-delay: 50ms;
}
.nav-icon-4.open span:nth-child(3){
  left:14px;
  top: 20px;
  width: 20px;
  transition: .3s cubic-bezier(.8, .5, .2, 1.4);
  transform: rotate(-45deg);
  transition-delay: 100ms;
}
`