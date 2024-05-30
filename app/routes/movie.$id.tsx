import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// interface MovieData {
//     backdrop_path: string;
//     title: string;
//     homepage:string;
//     // Add other properties as needed
//   }

export async function loader({params}: LoaderFunctionArgs) {
    const url = await fetch (`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, 
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2FlYTliMzQ2NzQ1NTE5MGI5ZjAyMmU3ZmJkZDkzZCIsInN1YiI6IjY2NTg0MzVkNDZmMzBmMTM3NDc0ZTBlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQQdHMYoeRCDxMq-B1t4I7fUE--3lzYcp7-QoW2S2FM'
              }
        }
    );
    return json(await url.json());
}

export default function MovieId(){
    const data = useLoaderData();
    // const data = useLoaderData<MovieData>();
    return(
        <div className="min-h-screen p-10">
            <img 
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} 
            alt="" 
            className="h-[40vh] object-cover w-full  rounded-lg"
            />

            <h1 className="text-4xl font-bold text-center text-green-500 pt-5">{data.title}</h1>
            <div className="flex gap-x-10 mt-10">
                <div className="w-1/2 font-medium">
                    <h1>
                        <span className="underline">Homepage:</span>
                        <Link to={data.homepage} target="_blank">Link</Link>
                    </h1>
                    <h1>
                        <span className="underline">Original Language:</span> {data.original_language}
                    </h1>
                    <p>
                        <span className="underline">Overview:</span> {data.overview}
                    </p>
                    <p>
                        <span className="underline">Release Date:</span>{data.release_date}
                    </p>
                </div>

            </div>
        </div>
    )
}