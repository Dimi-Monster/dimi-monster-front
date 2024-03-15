import React, {useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";

import test from '../images/test.jpeg';

import api from "../utils/API";

export default function Mainpage() {
    //const navigate = useNavigate();

    useEffect(() => {
        // if(localStorage.getItem('refresh-token') === null)
        //     navigate('/login');


        api.getImage(0);
    }, []);

    return (
        <div className="mainpage">
            <TitleBox title='인기 사진'>
                <ImageView src={test} title='신관앞' content='점심시간 디미고 풍경사진' hearts={95} enabled={true}/>
            </TitleBox>

            <TitleBox title='사진관' className='contents' innerClassName='gallery'>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={23} enabled={false}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={23} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={23} enabled={false}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={23} enabled={false}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={23} enabled={false}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
                <ImageView src={test} title='2학년 3반' content='2학년 3반의 명물 버섯입니다!' hearts={57} enabled={true}/>
            </TitleBox>
        </div>
    )
}