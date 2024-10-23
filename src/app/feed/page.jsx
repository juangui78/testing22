import React, { Suspense } from "react";
import Feed from "./components/Cards";
import Loading from "./components/loadingCards";
import Header from "./components/Header";
import style from "./styles/feed.module.css";

export default async function page({searchParams}) {
  const search = searchParams?.search;
  const options = searchParams?.options;

  return (
    <section className={`w-full ${style.section}`}>
      <Header/> 
      <div className={style.fatherBoxes}>
        <Suspense fallback={<Loading/>}>
          <Feed search={search} options={options} />
        </Suspense>
      </div>
    </section>
  );
}
