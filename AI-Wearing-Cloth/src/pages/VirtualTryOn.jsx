import { useState, useEffect } from "react";
import { Upload, Sparkles, ArrowLeft, Shirt, ImagePlus } from "lucide-react";

function VirtualTryOn({ product, onBack }) {
  const [personFile, setPersonFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  // Handle photo upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setError("");
    setPersonFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  // Clean up the previous preview URL when it changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Remove uploaded photo
  const removePhoto = () => {
    setPersonFile(null);
    setPreviewUrl("");
    setError("");
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft size={20} />
          Back to Shopping
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
            <Sparkles size={18} />
            AI VIRTUAL TRY-ON
          </div>

          <h1 className="text-3xl md:text-5xl font-black mt-3">
            Try Your Next Look.
          </h1>

          <p className="text-gray-500 mt-3">
            Upload your photo and see how your selected outfit looks on you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-5">Upload Your Photo</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl min-h-[400px] flex flex-col items-center justify-center p-5">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Your uploaded photo"
                  className="w-full h-[400px] object-contain rounded-xl"
                />
              ) : (
                <>
                  <ImagePlus size={55} className="text-gray-400 mb-4" />

                  <h3 className="font-bold text-lg">
                    Upload Your Full Body Photo
                  </h3>

                  <p className="text-gray-400 text-sm mt-2 text-center">
                    Choose a clear, front-facing photo for better results.
                  </p>
                </>
              )}

              <label
                htmlFor="personPhoto"
                className="mt-6 cursor-pointer bg-black text-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition"
              >
                {previewUrl && (
                  <button
                    onClick={removePhoto}
                    className="mt-3 text-sm text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove Photo
                  </button>
                )}
                <Upload size={18} />
                {previewUrl ? "Change Photo" : "Upload Photo"}
              </label>

              <input
                id="personPhoto"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <p className="text-gray-400 text-xs mt-4">
              Your photo is currently previewed locally in your browser.
            </p>
          </div>

          {/* Selected Product */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-5">Selected Clothing</h2>

            {product ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-xl"
                />

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{product.category}</p>

                    <h3 className="text-xl font-bold mt-1">{product.name}</h3>
                  </div>

                  <p className="text-lg font-black">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  disabled={!personFile}
                  onClick={() =>
                    alert("AI integration is coming in the next stage!")
                  }
                  className="w-full mt-7 bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                >
                  <Sparkles size={20} />
                  Generate AI Try-On
                </button>
              </>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-gray-400">
                <Shirt size={55} />
                <p className="mt-4">No product selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VirtualTryOn;
