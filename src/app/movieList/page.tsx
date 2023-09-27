"use client";

import { MovieResponse } from "../../resTypes/movies";
import axiosInstance from "../../lib/axiosConfig";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/shared/Button";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GenresResponse } from "../../resTypes/genresResponse";
import { RatingStars } from "../../components/shared/Ratings";
import { useUser } from "../../services/useUser";

const filterButtons = [
  {
    text: "Latest",
    endpoint: "discover",
  },
  {
    text: "Now Playing",
    endpoint: `now_playing`,
  },
  {
    text: "Popular",
    endpoint: "popular",
  },
  {
    text: "Top rated",
    endpoint: "top_rated",
  },
  {
    text: "Upcoming",
    endpoint: `upcoming`,
  },
];

export default function MovieList() {
  const router = useRouter();
  const { user, isLoading: userLoaded } = useUser();
  const query = useSearchParams();
  const pathname = usePathname();
  const [filters, setFilters] = useState<(typeof filterButtons)[0]>({
    text: "Latest",
    endpoint: "discover",
  });
  const [page, setPage] = useState<number>(1);
  const { data: genresData } = useSWR<GenresResponse>(
    "/genre/movie/list",
    async (key: string) => {
      const response = await axiosInstance(key, {
        params: {
          language: "es-CO",
        },
      });

      return response.data;
    }
  );
  const { data: movies, isLoading } = useSWR<MovieResponse>(
    [
      `${
        filters.endpoint === "discover"
          ? `${filters.endpoint}/movie`
          : `movie/${filters.endpoint}`
      }`,
      page,
    ],

    async ([key, pageFilter]) => {
      const response = await axiosInstance.get<MovieResponse>(key, {
        params: {
          page: pageFilter || undefined,
          with_genres: true,
          include_adult: false,
          include_video: false,
          language: "es-CO",
        },
      });

      return response.data;
    }
  );

  useEffect(() => {
    if (!userLoaded && !user) {
      if (!user) {
        router.push("/");
      }
    }
  }, [userLoaded, user, router]);

  const onChangeFilter = (data: (typeof filterButtons)[0]) => {
    router.replace(`${pathname}?source=${data.endpoint}`);

    setFilters(data);
  };

  const mappedGenres = (genresIDs: number[]) => {
    const genres = genresIDs.map((genreId) => {
      const genre = genresData?.genres.find((g) => g.id === genreId);

      if (genre) {
        return genre.name;
      }
      return "";
    });

    return genres.join("/");
  };

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <div className="grid lg:grid-cols-5 gap-4">
        {filterButtons.map((buttonData, index) => (
          <Button
            disabled={
              buttonData.endpoint === query.get("source") ||
              (index === 0 && !query.get("source"))
            }
            onClick={() => onChangeFilter(buttonData)}
            key={index}
          >
            {buttonData.text}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{filters?.text}</h1>
        <h3>Lista a continuación</h3>
      </div>

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
        {isLoading ? (
          <span className="loading loading-spinner" />
        ) : (
          movies?.results.map((movie) => (
            <div className="card h-[368px]" key={movie.id}>
              <div className="relative card-body group">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  placeholder="blur"
                  className="rounded-[42px]"
                  fill
                  blurDataURL={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  style={{ objectFit: "cover" }}
                  alt="Image"
                />
                <div className="absolute h-full w-full bg-purple-brand/60 flex items-center justify-center -bottom-10 right-[0px] group-hover:bottom-0 opacity-0 group-hover:opacity-100 rounded-[42px] px-5  ">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold">{movie.title}</span>
                    <span className="text-xs">{`${new Date(
                      movie.release_date
                    ).getFullYear()} ° ${mappedGenres(movie.genre_ids)}`}</span>
                    <p className="text-clip overflow-hidden line-clamp-6">
                      {movie.overview}
                    </p>
                    <RatingStars
                      votesAverage={movie.vote_average}
                      key={movie.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-row gap-4 justify-center items-center pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-purple-brand py-3 px-5 rounded-full disabled:bg-purple-brand/50"
        >
          «
        </button>
        <span>
          {page}/{movies?.total_pages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-purple-brand py-3 px-5 rounded-full"
        >
          »
        </button>
      </div>
    </main>
  );
}
