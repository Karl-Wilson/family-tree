import styled from "styled-components";
import Children from "./children";
import Family from "./family";
import Line from "./line";
import { useEffect } from "react";
import { totalWidth } from "./children";
const Wrapper = styled.div`
    width: auto;
    height: auto;
`
const Offspring = props =>{
    useEffect(() => {
        //recalculate line width when children data changes
        if(props.data == null){
            totalWidth()
        }
    }, [props.data])
    
    return(
        <Wrapper id="offspring">
            {props.data != null && <Children childrenLength={props.data.length}>
                <Line className="line" color={props.bgColor}/>
                {props.data.map((value, index)=>{
                    return <Family data={value} key={value.id} bgColor={props.bgColor} textColor={props.textColor}/>
                })}
            </Children>}
        </Wrapper>
    )
}
export default Offspring;
