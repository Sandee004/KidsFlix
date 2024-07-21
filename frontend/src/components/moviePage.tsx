
const MoviePage = () => {

    return (
        <>
        <div className="flex flex-wrap flex-row justify-center mt-12">
            <div className="mx-5 bg-[#373b69] mb-5 w-[300px] h-[350px]">
                <img src="gojo.jpg" className="w-full h-[270px]" alt="movie-image"></img>

                <div className="relative">
                    <div className="flex justify-between items-center h-[80px]">
                        <h3 className="text-xl font-bold text-white px-5">Movie title</h3>
                        <button className="mr-5 bg-red-600 px-2 py-2 text-sm rounded-sm hover:bg-red-300">Read More</button>
                    </div>


                </div>
            </div>

            <div className="mx-5 bg-[#373b69] mb-5 w-[300px] h-[350px]">
                <img src="gojo.jpg" className="w-full h-[270px]" alt="movie-image"></img>

                <div className="relative">
                    <div className="flex justify-between items-center h-[80px]">
                        <h3 className="text-xl font-bold text-white px-5">Movie title</h3>
                        <button className="mr-5 bg-red-600 px-2 py-2 text-sm rounded-sm hover:bg-red-300">Read More</button>
                    </div>
                </div>
            </div>

            <div className="mx-5 bg-[#373b69] mb-5 w-[300px] h-[350px]">
                <img src="gojo.jpg" className="w-full h-[270px]" alt="movie-image"></img>

                <div className="relative">
                    <div className="flex justify-between items-center h-[80px]">
                        <h3 className="text-xl font-bold text-white px-5">Movie title</h3>
                        <button className="mr-5 bg-red-600 px-2 py-2 text-sm rounded-sm hover:bg-red-300">Read More</button>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default MoviePage