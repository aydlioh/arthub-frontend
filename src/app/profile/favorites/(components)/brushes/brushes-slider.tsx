"use client";

import { SwiperSlide } from "swiper/react";
import DefaultSwiper from "../swiper/default-swiper-layout";
import { useAddToFavoriteMutation } from "@/store/features/brushes/brushesApi";
import { useGetUserBrushesQuery } from "@/store/features/user/userApi";
import BrushSlide from "./brush-slide";
import FavoriteBrushesSkeleton from "@/components/UI/skeletons/favorite-brushes-skeleton";
import FavoriteBrushesNotFound from "@/components/UI/not-found/favorite-brushes-notfound";
import FavoriteBrushesError from "@/components/UI/error/favorite-brushes-error";
import BrushPopup from "@/app/brushes/(components)/brush-popup";
import { useState } from "react";
import { IBrush } from "@/models";

const BrushesSlider = () => {
  const [popupView, setPopupView] = useState(false);
  const [selectBrush, setSelectBrush] = useState<IBrush>({} as IBrush);

  const openViewPopup = (brush: IBrush) => {
    setSelectBrush(brush);
    setPopupView(true);
  };

  const [toggleFavorite] = useAddToFavoriteMutation();
  const { data, isLoading, isError, error } = useGetUserBrushesQuery();

  if (isLoading) return <FavoriteBrushesSkeleton />;

  if (isError) {
    if ("status" in error && error.status === 404) {
      return <FavoriteBrushesNotFound />;
    }
    return <FavoriteBrushesError />;
  }

  if (!data || !data?.length) return <FavoriteBrushesNotFound />;

  return (
    <>
      <DefaultSwiper>
        {data.map((brush) => (
          <SwiperSlide key={brush.id}>
            <BrushSlide
              brush={brush}
              toggleFavorite={toggleFavorite}
              openViewPopup={openViewPopup}
            />
          </SwiperSlide>
        ))}
      </DefaultSwiper>
      <BrushPopup
        brush={selectBrush}
        popupView={popupView}
        setPopupView={setPopupView}
      />
    </>
  );
};

export default BrushesSlider;