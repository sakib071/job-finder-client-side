
const Review = () => {
    return (
        <div className="mt-36">
            <h3 className='text-3xl font-bold text-center mt-32 mb-14'>Client Review</h3>
            <div className="flex">
                <div className="stats w-[60vw] h-[30vh] stats-vertical lg:stats-horizontal shadow mx-auto">
                    <div className="stat py-8 w-[20vw] bg-yellow-100 text-gray-900">
                        <div className="text-2xl">Happy Client</div>
                        <div className="text-8xl font-bold">31K</div>
                        <div className="text-2xl">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat py-8 w-[20vw] bg-yellow-200 text-gray-900">
                        <div className="text-2xl">Bids Progress</div>
                        <div className="text-8xl font-bold">4,200</div>
                        <div className="text-2xl">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat py-8 w-[20vw] bg-yellow-100 text-gray-900">
                        <div className="text-2xl">New Jobs Added</div>
                        <div className="text-8xl font-bold">1,200</div>
                        <div className="text-2xl">↗︎ 90 (14%)</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Review;