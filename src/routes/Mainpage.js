import React, {useEffect, useState} from "react";
//import { useNavigate } from "react-router-dom";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";

import test from '../images/test.jpeg';

//import api from "../utils/API";
import imageManager from "../utils/ImageManager";

export default function Mainpage() {
    //const navigate = useNavigate();

    // let imageList = [
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 23, enabled: false},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 24, enabled: false},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: false},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: false},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: false},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    //     // {src: test, title: '2학년 3반', content: '2학년 3반의 명물 버섯입니다!', hearts: 25, enabled: true},
    // ];

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        // if(localStorage.getItem('refresh-token') === null)
        //     navigate('/login');


        //api.getImage(0);
        //api.getImageBottom(imageList, setImageList);
        imageManager.getImageBottom(setImageList);
    }, []);

    return (
        <div className="mainpage">
            <TitleBox title='인기 사진'>
                <ImageView src={test} title='신관앞' content='점심시간 디미고 풍경사진' hearts={95} enabled={true}/>
            </TitleBox>

            <TitleBox title='사진관' className='contents' innerClassName='gallery'>
                {imageList && imageList.map(({src, title, content, hearts, enabled}) => <ImageView
                    src={src}
                    title={title}
                    content={content}
                    hearts={hearts}
                    enabled={enabled}
                    />)}
            </TitleBox>
        </div>
    )
}