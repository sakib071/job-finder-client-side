// import { useLoaderData } from "react-router-dom";
import banner1 from "../../assets/job-banner1.jpg"
import banner2 from "../../assets/job-banner2.jpg"
import banner3 from "../../assets/job-banner3.jpg"
import BrowseByCategory from "../BrowseByCategory/BrowseByCategory";
import Review from "../Review/Review";
import Specialty from "../Specialty/Specialty";

const Home = () => {


    return (
        <div>
            <div className="carousel w-full h-[70vh] mb-20">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={banner1} className="w-full object-cover" />
                    <div className="w-full h-full text-white absolute">
                        <div className="relative h-full flex justify-center items-center">
                            <div className="bg-black absolute opacity-20 w-full h-full"></div>
                            <h1 className="mb-5 relative text-7xl font-bold">Find Yourself a Job</h1>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={banner2} className="w-full object-cover" />
                    <div className="w-full h-full text-white absolute">
                        <div className="relative h-full flex justify-center items-center">
                            <div className="bg-black absolute opacity-20 w-full h-full"></div>
                            <h1 className="mb-5 relative text-7xl font-bold">Find Yourself a Job</h1>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={banner3} className="w-full object-cover" />
                    <div className="w-full h-full text-white absolute">
                        <div className="relative h-full flex justify-center items-center">
                            <div className="bg-black absolute opacity-20 w-full h-full"></div>
                            <h1 className="mb-5 relative text-7xl font-bold">Find Yourself a Job</h1>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <BrowseByCategory></BrowseByCategory>
            <Review></Review>
            <Specialty></Specialty>
        </div>
    );
};

export default Home;