import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Mainpage from "./routes/Mainpage";
import NotFound from "./routes/NotFound";
import Layout from "./Layout";
import About from "./routes/About";
import GAuthRoute from "./routes/GAuthRoute";
import Upload from "./routes/Upload";
import Banned from "./routes/Banned";
import Report from "./routes/Report";
import Introduce from "./routes/Introduce";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useMediaQuery } from "react-responsive";
import ReportDelete from "./routes/report/Delete";
import ReportDeleteBan from "./routes/report/DeleteBan";
import ReportWithdraw from "./routes/report/Withdraw";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // same as Mainpage.jsx
  const isMobile = useMediaQuery({ query: "(max-width:520px)" }); // 한줄로 뜨는 최대 너비

  const isPullable = isMobile || localStorage.getItem("isPWA") === "true";

  const [refresh, setRefresh] = useState(0);

  const [headerVisibility, setHeaderVisibility] = useState(true);

  function triggerRefresh() {
    setRefresh(refresh + 1);
  }

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

  const mainpage = (
    <PullToRefresh
      onRefresh={async () => triggerRefresh()}
      pullingContent=""
      resistance={5}
      isPullable={isPullable && headerVisibility}
    >
      <Mainpage refresh={refresh} setHeaderVisibility={setHeaderVisibility} />
    </PullToRefresh>
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Login />} />
          <Route path="/banned" element={<Banned />} />

          <Route path="/redirect/gauth" element={<GAuthRoute />} />

          <Route
            element={
              <Layout onRefresh={triggerRefresh} isVisible={headerVisibility} />
            }
          >
            <Route path="/" element={mainpage} />
            <Route path="/about" element={<About />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/report" element={<Report />} />
          </Route>

          <Route path="/introduce" element={<Introduce />} />

          <Route path="/admin/delete/:id" element={<ReportDelete />} />
          <Route path="/admin/deleteban/:id" element={<ReportDeleteBan />} />
          <Route path="/admin/withdraw/:id" element={<ReportWithdraw />} />
          <Route path="/admin/banreporter/:id" element={<NotFound />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={isDarkMode ? 'dark' : 'light'}
        transition={Bounce}
        style={{zIndex: 5000000}}
      />
    </>
  );
}

export default App;
