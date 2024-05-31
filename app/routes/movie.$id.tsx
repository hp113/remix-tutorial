import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// interface MovieData {
//     backdrop_path: string;
//     title: string;
//     homepage:string;
//     // Add other properties as needed
//   }

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2FlYTliMzQ2NzQ1NTE5MGI5ZjAyMmU3ZmJkZDkzZCIsInN1YiI6IjY2NTg0MzVkNDZmMzBmMTM3NDc0ZTBlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQQdHMYoeRCDxMq-B1t4I7fUE--3lzYcp7-QoW2S2FM",
      },
    }
  );
  return json(await url.json());
}

export default function MovieId() {
  const data = useLoaderData<typeof loader>();
  // const data = useLoaderData<MovieData>();
  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[60vh] object-contain m-auto rounded-lg"
      />

<h1 className="text-5xl font-extrabold text-center pt-5 pb-3 tracking-wide shadow-md text-black">
  {data.title}
</h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">Official Site:</span>
            <Link
              to={data.homepage}
              target="_blank"
              className="text-blue-500 hover:text-blue-700 underline"
              prefetch="intent"
            >
              Link
            </Link>
          </h1>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2 ">Original Language:</span>
            <span className="text-green-500">{data.original_language}</span>
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2 ">Release Date:</span>
            <span className="text-green-500">{data.release_date}</span>
          </p>
        </div>
        <div className="w-1/2 font-medium">
  <h2 className="text-2xl font-semibold text-gray-800 mb-2 underline">
    Overview
  </h2>
  <p className="text-xl text-gray-700">
    {data.overview}
  </p>
</div>
      </div>
    </div>
  );
}
