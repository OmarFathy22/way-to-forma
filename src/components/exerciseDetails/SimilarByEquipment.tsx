import React, { Suspense, lazy, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { ExerciseCard, ExerciseName, Target } from "../../components/ThirdSection";
import { ExercisesContainer } from "../../components/ThirdSection";
import "swiper/swiper-bundle.min.css";
import Loading from "../../components/Loading";
// import ForSwiper from "../ForSwiper";
const ForSwiper = lazy(() => import('../ForSwiper'));

type Props = {};
const Main = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

const SecondSection = ({ equipment  }: any) => {
  const [value, loading, error] = useDocument(
    doc(db, "List by equipment", equipment)
  );
  const SlideRef: any = useRef();
  let Id = new Date().getTime();
  if (error) console.log(error);;
  if(loading){
    return <Loading/>
  }
  
  return (
<Suspense fallback={<Loading/>}>
      <Main style={{  animation: "animate 1s 1" , transition: "all 1s ease-in-out"}}>
        <h1 className="mobile:text-[24px] tablet:text-[30px] text-center w-full  font-bold">
          Similar <span className="text-red-500">Equipment</span> Exerscises
        </h1>
        <ExercisesContainer>
          {value?.data() &&<ForSwiper SlideRef={SlideRef} Delay = {7000}>
          {value?.data()?.firstArray?.slice(0, Math.min(value.data()?.firstArray?.length , 20)).map((item: any, index: number) => {
              return (
                <ExerciseCard
                 key={item.id}
                  className=" !rounded-lg"
                  onClick={async () => {
                    await updateDoc(doc(db, "ITEM", "res"), {
                      SELECTEDITEM: item,
                    });
                  }}
                >
                  <SwiperSlide
                    key={index}
                    onClick={async () => {
                      await updateDoc(doc(db, "ITEM", "res"), {
                        SELECTEDITEM: item,
                      });
                    }}
                    
                    className="
                    
                    !h-[100%] !w-full !flex !justify-center mb-10"
                  >
                    <Link 
                      className="!rounded-lg !h-full !w-full bg-white"
                      to={"/exercises"}
                      onClick={() => {
                        window.scrollTo({top:0 , behavior:"smooth"})
                      }}
                    >
                      <img
                        className="!w-[350px] !h-[80%] !rounded-[30px]"
                        height={100}
                        width={100}
                        src={item?.gifUrl[4] === 's' ? item.gifUrl :  item.gifUrl.slice(0,4) + 's' + item.gifUrl.slice(4) }
                        alt={"icon"}
                      />
                      <div className="flex pl-5 pr-3 gap-2">
                        <Target>{item?.target}</Target>
                        <ExerciseName>{item?.bodyPart}</ExerciseName>
                      </div>
                      <h1 className="font-bold p-2 pt-4 text-center truncate ">
                        {item?.name}
                      </h1>
                    </Link>
                  </SwiperSlide>
                </ExerciseCard>
              );
            })}
          </ForSwiper>}
          {!value?.data() && <h1 className='text-2xl text-center mb-10 font-bold'>No Exercises loaded <br/>Please refresh The Page </h1>}
        </ExercisesContainer>
      </Main>
</Suspense>
  );
};

export default SecondSection;
