import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import "./Mainpage.css";
import TitleBox from "../components/TitleBox";
import ImageView from "../components/ImageView";
import api from "../utils/API";
import imageManager from "../utils/ImageManager";
import { useInView } from "react-intersection-observer";
import loadingImg_2 from "../images/Info_load.svg";
import loadingImg_2Dark from "../images/Info_load-dark.svg";
import defaultImage from "../images/default-image.svg";
import defaultImageDark from "../images/default-image-dark.svg";
import MobileImageView from "../components/MobileImageView";
import ImagePreview from "../components/ImagePreview";
import { toast } from 'react-toastify';

export default function Mainpage(props) {
  const [searchParams /*setSearchParams*/] = useSearchParams();
  const [initialPopup, setInitialPopup] = useState("");

  let [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  // update isDarkMode when the system changes the theme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (e.matches) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    });
  const navigate = useNavigate();

  const defaultImageList = Array(21).fill({
    src: isDarkMode ? defaultImageDark : defaultImage,
    title: "",
    content: "",
    hearts: 0,
    like: false,
  });
  const defaultWeeklyImageList = [{ id: false }, { id: false }, { id: false }];

  const [imageList, setImageList] = useState(defaultImageList);
  const [isLoaded, setLoadedState] = useState(false);
  const [weeklyImage, setWeeklyImage] = useState(defaultWeeklyImageList);
  const mainpageRef = useRef(null);
  const [isEnd, setEndState] = useState(false);

  const [ref /*inView*/ /*entry*/, ,] = useInView({
    // 무한 스크롤 구현
    threshold: 0,
    onChange: (inView) => {
      if (inView && isLoaded) {
        imageManager.getImageBottom(setImageList).then((res) => {
          if (!res) {
            toast.error("정보를 불러오는 데 실패했습니다.");
            return;
          }
          if (res.end) {
            setEndState(true);
            return;
          }
        });
      }
    },
  });

  const getImageTop = () => {
    imageManager.getImageTop(setImageList).then((res) => {
      if (!res && api.getLastError() == "Unauthorized") {
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("access-token");
        navigate("/main");

        return;
      }

      setLoadedState(true);
    });
  }
  const getWeeklyImage = () => {
    api.getWeeklyImage().then((data) => {
      if (!data && api.getLastError() == "Unauthorized") {
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("access-token");
        navigate("/main");

        return;
      }

      setWeeklyImage(data);
    });
  }

  useEffect(() => {
    const timer = setInterval(
      () => getImageTop(),
      25000
    );

    imageManager.clear();

    getImageTop();
    getWeeklyImage();

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    // 화면 크기가 한 페이지를 넘는 고해상도 환경에서 두 페이지 불러오게 하는 코드
    if (!isLoaded) return;

    if (window.innerHeight > mainpageRef.current.clientHeight)
      imageManager.getImageBottom(setImageList);
  }, [isLoaded]);
  useEffect(() => {
    if (searchParams.has("id")) {
      setInitialPopup(searchParams.get("id"));
    }

    if (searchParams.get("app") === "true")
      localStorage.setItem("isPWA", "true");
  }, []);

  function onLike(id) {
    imageManager.like(id, setImageList, weeklyImage, setWeeklyImage);
  }
  function onUnlike(id) {
    imageManager.unlike(id, setImageList, weeklyImage, setWeeklyImage);
  }

  function refresh() {
    setLoadedState(false);
    imageManager.clear();
    setImageList(defaultImageList);
    setWeeklyImage(defaultWeeklyImageList);

    getImageTop();
    getWeeklyImage();
  }

  Mainpage.propTypes = {
    refresh: PropTypes.number.isRequired,
    setHeaderVisibility: PropTypes.func.isRequired,
  };

  useEffect(() => {
    if (props.refresh === 0) return;

    refresh();
  }, [props.refresh]);

  const isMobile = useMediaQuery({ query: "(max-width:520px)" }); // 한줄로 뜨는 최대 너비
  const isTablet = useMediaQuery({ query: "(max-width:1200px)" }); // 두줄로 뜨는 최대 너비

  let weeklyCount = 2;
  if (isTablet) weeklyCount = 1;
  if (isMobile) weeklyCount = 3;

  //console.log("weeklyimage.length : ", weeklyImage.length);

  const NowImageView = isMobile ? MobileImageView : ImageView; // 아니 이게 되네?

  let weekly = (typeof weeklyImage != 'boolean' ? weeklyImage : defaultImageList)
    .slice(0, weeklyCount)
    .map(({ id, src, title, content, hearts, like }) =>
      id ? (
        <NowImageView
          big={true}
          key={id}
          id={id}
          src={src}
          title={title}
          content={content == "" ? "무제" : content}
          hearts={hearts}
          like={like}
          onLike={onLike}
          onUnlike={onUnlike}
          setHeaderVisibility={props.setHeaderVisibility}
        />
      ) : (
        // TODO: key 추가
        // eslint-disable-next-line react/jsx-key
        <NowImageView
          big={true}
          src={isDarkMode ? defaultImageDark : defaultImage}
          title={""}
          content={""}
          hearts={0}
          like={false}
          onLike={onLike}
          onUnlike={onUnlike}
          setHeaderVisibility={props.setHeaderVisibility}
        />
      )
    );

  while (weekly.length < weeklyCount)
    weekly.push(
      <NowImageView
        big={true}
        src={isDarkMode ? defaultImageDark : defaultImage}
        title={""}
        content={""}
        hearts={0}
        like={false}
        onLike={onLike}
        onUnlike={onUnlike}
        setHeaderVisibility={props.setHeaderVisibility}
      />
    );

  //console.log(weekly.length);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: true,
  };

  return (
    <>
      {isMobile && (
        <Slider key={weekly.length} {...settings} className="weekly">
          {weekly}
        </Slider>
      )}
      <div className="mainpage" ref={mainpageRef}>
        {!isMobile && (
          <TitleBox
            title="주간 몬스터"
            innerClassName="weekly"
            titleClassName="mainpage-title"
          >
            {weekly}
          </TitleBox>
        )}
        <TitleBox
          title="사진관"
          className="contents"
          innerClassName="gallery"
          titleClassName="mainpage-title"
        >
          {imageList &&
            imageList.map(({ id, src, title, content, hearts, like }, idx) => (
              <ImageView
                key={id}
                id={id}
                src={src}
                title={title}
                content={
                  typeof id == "string" && content == "" ? "무제" : content
                }
                hearts={hearts}
                like={like}
                onLike={onLike}
                onUnlike={onUnlike}
                ref={idx == imageList.length - 6 ? ref : undefined}
                setHeaderVisibility={props.setHeaderVisibility}
              />
            ))}
        </TitleBox>
        <div style={{ marginTop: "1rem" }}>
          {!isEnd && (
            <img
              src={isDarkMode ? loadingImg_2Dark : loadingImg_2}
              style={{ height: "2.5rem" }}
              alt="로딩 이미지"
            />
          )}
        </div>
      </div>

      {initialPopup !== "" && (
        <ImagePreview
          id={initialPopup}
          title={"제목"}
          content={"내용"}
          onFinish={() => setInitialPopup("")}
          src={defaultImage} /* 썸네일 이미지 */
          like={0}
          hearts={0}
          onClick={() => 1}
        />
      )}
    </>
  );
}
