"use client";

import { useAddToFavoriteMutation } from "@/store/features/programs/programsApi";
import { useGetUserProgramsQuery } from "@/store/features/user/userApi";
import DefaultSwiper from "../swiper/default-swiper-layout";
import ProgramSlide from "./program-slide";
import { SwiperSlide } from "swiper/react";

const ProgramsSlider = () => {
  const [toggleFavorite] = useAddToFavoriteMutation();
  const { data, isLoading, isError, error } = useGetUserProgramsQuery();

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) {
    if ("status" in error && error.status === 404) {
      return <h2>Not Found</h2>;
    }
    return <h2>Fetch Error</h2>;
  }

  if (!data || !data?.length) return <h2>Not Found</h2>;

  return (
    <DefaultSwiper>
      {data.map((program) => (
        <SwiperSlide key={program.id}>
          <ProgramSlide program={program} toggleFavorite={toggleFavorite} />
        </SwiperSlide>
      ))}
    </DefaultSwiper>
  );
};

export default ProgramsSlider;
