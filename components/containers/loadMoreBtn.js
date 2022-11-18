import React from "react";
import styled from "styled-components";
import {Button} from "../core/core"
import { useEffect, useState, useRef } from "react";

const Btn  = styled(Button)`
        position: absolute;
        bottom: 0;
        left: ${props=>props.left||''};
        display: ${props=>props.display||'none'};

        @media screen and (min-width: 992px){
            bottom: 8px;
        }
`

const LoadMoreBtn = props =>{
    const [left, setLeft] = useState();
    const [display, setDisplay] = useState();
    
    function resize(){
        if(document.getElementById('LoadMoreBtn')){
            let btnWidth = document.getElementById('LoadMoreBtn').clientWidth;
            let windowWidth = window.innerWidth;
            let left =  (windowWidth/2) - (btnWidth/2)
            setLeft(left+'px');
            setDisplay('flex')
        }       
    }

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize) 
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])
  
    
    return (
        <>
          <Btn id="LoadMoreBtn" left={left} display={display} className="zIndex-4 mb-21 shadow-2" borderless>Load More</Btn>
        </>
    )
}
export default LoadMoreBtn;