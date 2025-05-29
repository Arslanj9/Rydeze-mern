
const ThankYouCard = ({ onHomeClick }) => {
    return (
        <div className="flex items-center justify-center ">
            <div className="bg-[#292d49] shadow-md rounded-xl p-8 w-72 text-center">
                {/* Image */}
                <img
                    src="./assets/icons/success-icon.png"
                    className="w-20 h-20 mx-auto mb-8 bg-transparent"
                    alt="success"
                />

                {/* Thank You Text */}
                <h1 className="text-xl font-bold text-white bg-transparent">Thank You</h1>

                {/* Additional Text */}
                <p className="text-white mt-1 bg-transparent">Your post has been shared</p>

                {/* Button */}
                <button
                    onClick={onHomeClick}
                    className="w-full px-4 py-3 text-white bg-[#4b9eff] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
                >
                    Home
                </button>
            </div>
        </div>
    )
}

export default ThankYouCard