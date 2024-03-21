import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
//import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";

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
    const [weeklyImage, setWeeklyImage] = useState([{id: 0}, {id: 0}, {id: 0}]);
    const mainpageRef = useRef(null);
    const [isEnd, setEndState] = useState(false);

    const [ref, /*inView*/, /*entry*/] = useInView({ // 무한 스크롤 구현
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
        const timer = setInterval(() => imageManager.getImageTop(setImageList), 25000);

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
            setWeeklyImage(data);
        });

        return () => clearInterval(timer);
    }, []);
    useEffect(() => { // 화면 크기가 한 페이지를 넘는 고해상도 환경에서 두 페이지 불러오게 하는 코드
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

    const isMobile = useMediaQuery({query : "(max-width:668px)"}); // 한줄로 뜨는 최대 너비
    const isTablet = useMediaQuery({query : "(max-width:1200px)"}); // 두줄로 뜨는 최대 너비

    let weeklyCount = 2;
    if(isTablet)
        weeklyCount = 1;
    if(isMobile)
        weeklyCount = 3;

    return (
        <div className="mainpage" ref={mainpageRef}>
            <TitleBox title='주간 몬스터' innerClassName='weekly' titleClassName='mainpage-title'>
                {
                    isMobile ? weeklyImage.slice(0, weeklyCount).map(({id, src, title, content, hearts, like}) => (id ? <ImageView
                        big={true}
                        key={id}
                        id={id}
                        src={src}
                        title={title}
                        content={content}
                        hearts={hearts}
                        like={like}
                        onLike={onLike}
                        onUnlike={onUnlike} /> :
                    <ImageView 
                        big={true}
                        src={defaultImage} 
                        title={''}
                        content={''}
                        hearts={0}
                        like={false}
                        onLike={onLike}
                        onUnlike={onUnlike}/>)) :
                    weeklyImage.slice(0, weeklyCount).map(({id, src, title, content, hearts, like}) => (id ? <ImageView
                        big={true}
                        key={id}
                        id={id}
                        src={src}
                        title={title}
                        content={content}
                        hearts={hearts}
                        like={like}
                        onLike={onLike}
                        onUnlike={onUnlike} /> :
                    <ImageView 
                        big={true}
                        src={defaultImage} 
                        title={''}
                        content={''}
                        hearts={0}
                        like={false}
                        onLike={onLike}
                        onUnlike={onUnlike}/>))
                }
            </TitleBox>

            <TitleBox title='사진관' className='contents' innerClassName='gallery' titleClassName='mainpage-title'>
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