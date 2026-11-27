
import { useEffect, useState } from "react";
import {
  Upload,
  Sparkles,
  ArrowLeft,
  Shirt,
  ImagePlus,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { supabase } from "../lib/supabase";

// Convert uploaded photo into a Base64 data URL
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read photo."));

    reader.readAsDataURL(file);
  });
};

function VirtualTryOn({ product, onBack }) {
  const [personFile, setPersonFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Clean up temporary preview URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Upload customer photo
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    // Keep initial upload under 4 MB
    if (file.size > 4 * 1024 * 1024) {
      setError("Please upload an image smaller than 4 MB.");
      return;
    }

    setError("");
    setResultImage("");
    setPersonFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  // Remove uploaded photo
  const removePhoto = () => {
    setPersonFile(null);
    setPreviewUrl("");
    setResultImage("");
    setError("");
  };

  // Start AI generation and check its status
  const handleGenerate = async () => {
    if (!personFile || !product) return;

    try {
      setIsGenerating(true);
      setError("");
      setResultImage("");
      setStatusMessage("Preparing your photo...");

      const customerPhotoBase64 = await fileToBase64(personFile);

      const category =
        product.category === "Jeans" ||
        product.category === "Shoes"
          ? "lower_body"
          : "upper_body";

      // Start generation
      const { data: startData, error: startError } =
        await supabase.functions.invoke("virtual-try-on", {
          body: {
            action: "start",
            customerPhotoBase64,
            garmentImageUrl: product.image,
            category,
          },
        });

      if (startError) throw startError;

      if (!startData?.jobId) {
        throw new Error(
          startData?.error || "Could not start AI generation."
        );
      }

      const jobId = startData.jobId;

      const messages = [
        "Reading your photo...",
        "Preparing your outfit...",
        "Matching your style...",
        "Adding the final touches...",
      ];

      setStatusMessage(messages[0]);

      // Poll every 2.5 seconds, up to 60 attempts
      for (let attempt = 0; attempt < 60; attempt++) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2500)
        );

        const { data, error: statusError } =
          await supabase.functions.invoke("virtual-try-on", {
            body: {
              action: "status",
              jobId,
            },
          });

        if (statusError) throw statusError;

        if (data.status === "completed") {
          if (!data.resultImageBase64) {
            throw new Error("AI returned no result image.");
          }

          setResultImage(data.resultImageBase64);
          setStatusMessage("Your new look is ready!");
          return;
        }

        if (data.status === "failed") {
          throw new Error(data.error || "AI generation failed.");
        }

        setStatusMessage(
          messages[Math.min(
            Math.floor(attempt / 2),
            messages.length - 1
          )]
        );
      }

      throw new Error("Generation is taking too long. Please try again.");

    } catch (err) {
      console.error("AI Try-On Error:", err);
      setError(err.message || "Something went wrong.");
      setStatusMessage("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

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

          {/* Customer Photo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-5">
              Upload Your Photo
            </h2>

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
                    Choose a clear, front-facing photo.
                  </p>
                </>
              )}

              <label
                htmlFor="personPhoto"
                className="mt-6 cursor-pointer bg-black text-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition"
              >
                <Upload size={18} />
                {previewUrl ? "Change Photo" : "Upload Photo"}
              </label>

              <input
                id="personPhoto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              {previewUrl && (
                <button
                  onClick={removePhoto}
                  disabled={isGenerating}
                  className="mt-3 text-red-500 flex items-center gap-2 text-sm font-semibold"
                >
                  <Trash2 size={16} />
                  Remove Photo
                </button>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-4">
                {error}
              </p>
            )}

            <p className="text-gray-400 text-xs mt-4">
              Your photo is previewed locally before generation.
            </p>
          </div>

          {/* Selected Clothing and Result */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-5">
              Selected Clothing
            </h2>

            {product ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-xl"
                />

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      {product.category}
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-lg font-black">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  disabled={!personFile || isGenerating}
                  onClick={handleGenerate}
                  className="w-full mt-7 bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold disabled:bg-gray-300 hover:bg-gray-800 transition"
                >
                  {isGenerating ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate AI Try-On
                    </>
                  )}
                </button>

                {isGenerating && (
                  <p className="text-center text-purple-600 mt-4 text-sm">
                    {statusMessage}
                  </p>
                )}

                {resultImage && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                      Your AI Look
                    </h3>

                    <img
                      src={resultImage}
                      alt="AI generated virtual try-on result"
                      className="w-full rounded-xl object-contain"
                    />

                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = resultImage;
                        link.download = "stylefit-ai-result.jpg";
                        link.click();
                      }}
                      className="w-full mt-4 border border-black py-3 rounded-xl font-semibold hover:bg-gray-100"
                    >
                      Download Result
                    </button>
                  </div>
                )}
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
