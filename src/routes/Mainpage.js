import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";

//import test from '../images/test.jpeg';

import api from "../utils/API";
import imageManager from "../utils/ImageManager";
import { useInView } from "react-intersection-observer";
import loadingImg_2 from '../images/Info_load.svg';
import defaultImage from '../images/default-image.svg';

export default function Mainpage() {
    const navigate = useNavigate();

    const [imageList, setImageList] = useState(Array(21).fill({
        src: defaultImage,
        title: '',
        content: '',
        hearts: 0,
        like: false
    }));
    const [isLoaded, setLoadedState] = useState(false);
    const [weeklyImage, setWeeklyImage] = useState(false);
    const mainpageRef = useRef(null);
    const [isEnd, setEndState] = useState(false);

    //const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [ref, /*inView*/, /*entry*/] = useInView({
        /* Optional options */
        threshold: 0,
        onChange: (inView) => {
            if(inView && isLoaded) {
                imageManager.getImageBottom(setImageList).then((res) => {
                    if(!res) {
                        alert('정보를 불러오는 데 실패했습니다.');
                        return;
                    }
                    if(res.end) {
                        setEndState(true);
                        return;
                    }
                });
            }
        }
    });

    useEffect(() => {
        //api.getImage(0);
        //api.getImageBottom(imageList, setImageList);
        //imageManager.getImageBottom(setImageList);
        const timer = setInterval(() => imageManager.getImageTop(setImageList), 25000);
        //imageManager.getCurrentList(setImageList); // 얘 async 아님
        imageManager.clear();

        imageManager.getImageTop(setImageList).then((res) => {
            if(!res && api.getLastError() == 'Unauthorized') {
                localStorage.removeItem('refresh-token');
                localStorage.removeItem('access-token');
                navigate('/login');
            }
            
            setLoadedState(true);
        });

        api.getWeeklyImage().then((data) => {
            setWeeklyImage(data[0]);
        });

        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if(!isLoaded)
            return;

        console.log(window.innerHeight, mainpageRef.current.clientHeight);
        if(window.innerHeight > mainpageRef.current.clientHeight)
            imageManager.getImageBottom(setImageList);
    }, [isLoaded]);

    function onLike(id) {
        imageManager.like(id, setImageList, weeklyImage, setWeeklyImage);
    }
    function onUnlike(id) {
        imageManager.unlike(id, setImageList, weeklyImage, setWeeklyImage);
    }

    return (
        <div className="mainpage" ref={mainpageRef}>
            <TitleBox title='주간 몬스터'>
                {weeklyImage ? <ImageView 
                    key={weeklyImage.id}
                    id={weeklyImage.id}
                    src={weeklyImage.src} 
                    title={weeklyImage.title}
                    content={weeklyImage.content}
                    hearts={weeklyImage.hearts}
                    like={weeklyImage.like}
                    onLike={onLike}
                    onUnlike={onUnlike} />
                : <ImageView 
                    // key={1}
                    // id={1}
                    src={defaultImage} 
                    title={''}
                    content={''}
                    hearts={0}
                    like={false}
                    onLike={onLike}
                    onUnlike={onUnlike}/>}
            </TitleBox>

            <TitleBox title='사진관' className='contents' innerClassName='gallery'>
                {imageList && imageList.map(({id, src, title, content, hearts, like}) => <ImageView
                    key={id}
                    id={id}
                    src={src}
                    title={title}
                    content={content}
                    hearts={hearts}
                    like={like}
                    onLike={onLike}
                    onUnlike={onUnlike} />)}
            </TitleBox>
            <div ref={ref} style={{marginTop: '1rem'}}>
                {!isEnd && <img src={loadingImg_2} style={{height: '2.5rem'}} alt='로딩 이미지'/>}
            </div>
        </div>
    )
}