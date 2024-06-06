import React from "react";

const CatProfile = ({ cat, onClose, imgPath }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white/90 rounded-lg w-[90%] p-10 flex flex-col items-center">
                
                {cat && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-32 bg-black mb-5  rounded-full">

                            <img
                                src={imgPath}
                                alt="Cat Pic"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center">{cat.name}</h2>
                        <div className="text-center">
                            <div className="flex  w-[200px] justify-between">
                                <p className="font-semibold text-yellow-600 ">Age: </p>
                                <p className="ml-10 font-bold text-yellow-800">{cat.age}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5 ">Sex: </p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.sex}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Cadastrated: </p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.castrated ? "Yes" : "No"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Size: </p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.size}</p>
                            </div>
                    </div>
                    </div>
                )}
                <button className="text-gray-500" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CatProfile;
