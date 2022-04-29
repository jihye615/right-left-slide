import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import SLIDES from './../SliderDate'

const Slider = () => {
    //이미지 갯수 설정 : 실제 갯수보다 1개 작게 (index번호때문)
    const TOTAL_SLIDES = 2;
    const delay = 3000;
    const [currenSlide, setCurrenSlide] = useState(0);
    const slideRef = useRef();
    const timeoutRef = useRef();

    //다음버튼
    const nextSlide = () => {
        if(currenSlide>=TOTAL_SLIDES){
            setCurrenSlide(0)
        }else{
            setCurrenSlide(currenSlide +1)
        }
    }
    //이전버튼
    const prevSlide = () => {
        if(currenSlide ===0){
            setCurrenSlide(0);
        }else{
            setCurrenSlide(currenSlide-1);
        }
    }

    //useRef
    const resetTimeout = ()=>{
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        //자동시작
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
          setCurrenSlide((prevIndex) =>
              prevIndex === TOTAL_SLIDES ? 0 : prevIndex + 1,
            ),
          delay,
        );
        
        //자동끝
        slideRef.current.style.transition = 'ease 1000ms';
        slideRef.current.style.transform = `translateX(-${currenSlide}00%)`;
    
        // cleanup 함수
        return () => {
          //리소스 잡기때문에 항상 써준다
          resetTimeout();
        };
        
      }, [currenSlide]);

    return (
        <SliderWrapper>
            {/* 이미지 */}
            <ContanerWrpper ref={slideRef}>
                {SLIDES.map((slide) => (
                    <img key={slide.id} src={slide.url} alt='slide' />
                ))}
            </ContanerWrpper>
            {/* 좌우버튼 */}
            <ButtonWapper>
                <Button>
                    <ArrowLeft onClick={nextSlide}/>
                </Button>
                <Button>
                    <ArrowRight onClick={prevSlide}/>
                </Button>
            </ButtonWapper>
            {/* 닷메뉴버튼 */}
            <DotWrpper>
              {SLIDES.map((dot)=>(
                  <DotButton
                      key={dot.id}
                      className={currenSlide===dot.id ? 'active' : ''}
                      onClick={()=>{
                          setCurrenSlide(dot.id);
                      }}
                  />
              ))}
            </DotWrpper>
        </SliderWrapper>
    );
};

const SliderWrapper = styled.section`
    width: 100%;
    height: 700px;
    overflow: hidden;
    position: relative;
    background-color: lightblue;
`;

const ContanerWrpper = styled.div`
    width: 100%;
    display: flex;
    img{
        width: 100%;
    }
`;
const ButtonWapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 40%;
`;
const Button = styled.button`
    all: unset;
    background: rgba(255,255,255,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg{
        font-size: 64px;
    }
    &:hover{
        background-color: lightblue;
        color: #fff;
        transition: all 0.4s ease-in-out;
    }
`;
// reacte-icon을 styled-components로 꾸밀때 
const ArrowLeft = styled(MdKeyboardArrowLeft)`
    color: #fff;
   
`;

const ArrowRight = styled(MdKeyboardArrowRight)`
    color: #fff;
   
`;


const DotWrpper = styled.div`

    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
`;

const DotButton = styled.span`
    display:inline-block;
    width: 10px;
    box-shadow: 1px 1px #333;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    margin: 0 5px;
    cursor: pointer;
    &.active{
        background: skyblue;
    }
`;
export default Slider;