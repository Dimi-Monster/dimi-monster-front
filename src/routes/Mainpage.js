import React, {useEffect, useState} from "react";
//import { useNavigate } from "react-router-dom";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";

import test from '../images/test.jpeg';

//import api from "../utils/API";
import imageManager from "../utils/ImageManager";
import { useInView } from "react-intersection-observer";

export default function Mainpage() {
    //const navigate = useNavigate();

    const [imageList, setImageList] = useState([]);
    const [isLoaded, setLoadedState] = useState(false);
    const [ref, /*inView, entry*/] = useInView({
        /* Optional options */
        threshold: 0,
        onChange: (inView) => {
            if(inView && isLoaded)
                imageManager.getImageBottom(setImageList);
        }
    });

    useEffect(() => {
        //api.getImage(0);
        //api.getImageBottom(imageList, setImageList);
        //imageManager.getImageBottom(setImageList);
        const timer = setInterval(() => imageManager.getImageTop(setImageList), 25000);
        imageManager.getCurrentList(setImageList); // 얘 async 아님

        imageManager.getImageTop(setImageList).then(() => {
            setLoadedState(true);
        })

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="mainpage">
            <TitleBox title='인기 사진'>
                <ImageView src={test} title='신관앞' content='점심시간 디미고 풍경사진' hearts={95} enabled={true}/>
            </TitleBox>

            <TitleBox title='사진관' className='contents' innerClassName='gallery'>
                {imageList && imageList.map(({id, src, title, content, hearts, enabled}) => <ImageView
                    id={id}
                    src={src}
                    title={title}
                    content={content}
                    hearts={hearts}
                    enabled={enabled}
                    />)}
                <div ref={ref}/>
            </TitleBox>
        </div>
    )
}