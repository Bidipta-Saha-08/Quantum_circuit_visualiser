import React, { useState } from "react";
import { Link } from "react-router-dom";

function Task2() {
    const [delta, setDelta] = useState("");
    const [beta, setBeta] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!delta || !beta) {
            alert("Please enter valid Delta and Beta values.");
            return;
        }

        const requestBody = {
            delta: parseFloat(delta),
            beta: parseFloat(beta),
        };

        try {
            const response = await fetch("https://quantum-circuit-visualiser.onrender.com/dynamics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.image_url) {
                setImageUrl(data.image_url);
            } else {
                alert("Error: No image URL received.");
            }
        } catch (error) {
            console.error("Error fetching dynamics image:", error);
            alert("Failed to load the dynamics image.");
        }
    };

    const downloadImage = () => {
        if (!imageUrl) {
            alert("No image to download!");
            return;
        }

        const newUrl = imageUrl.replace("/static/", "/download/");
        window.location.href = newUrl;
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6 flex flex-col items-center">
            {/* Navigation Button */}
            <div className="w-full flex justify-end">
                <Link
                    to="/task1"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Task1
                </Link>
            </div>

            <h2 className="text-3xl font-bold mb-6">Qubit Dynamics 0.1</h2>

            {/* Input Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Delta:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={delta}
                            onChange={(e) => setDelta(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Beta:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={beta}
                            onChange={(e) => setBeta(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Generate Image
                    </button>
                </form>
            </div>

            {/* Display Generated Image */}
            <h3 className="text-2xl font-semibold mt-6">Generated Dynamics:</h3>
            {imageUrl ? (
                <div className="flex flex-col items-center">
                    <img
                        src={imageUrl}
                        alt="Qubit Dynamics"
                        className="mt-4 rounded-lg shadow-lg border border-gray-300"
                    />
                    <button
                        onClick={downloadImage}
                        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Download Image
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No dynamics image generated yet.</p>
            )}
        </div>
    );
}

export default Task2;