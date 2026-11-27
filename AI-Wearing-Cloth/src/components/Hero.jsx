
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="bg-neutral-950 text-white">

      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 border border-neutral-700 rounded-full px-4 py-2 text-sm text-gray-300 mb-8">
              <Sparkles size={16} />
              AI POWERED FASHION
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              FIND YOUR
              <span className="block text-neutral-500">
                PERFECT
              </span>
              STYLE.
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-md leading-relaxed">
              Discover premium men's fashion and experience
              your next look with AI virtual try-on technology.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#products"
                className="bg-white text-black px-7 py-4 rounded-full font-semibold flex items-center gap-3 hover:bg-gray-200 transition"
              >
                Shop Collection
                <ArrowRight size={19} />
              </a>

              <a
                href="#products"
                className="border border-neutral-600 px-7 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Explore Styles
              </a>

            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14">

              <div>
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Fashion Styles
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">AI</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Virtual Try-On
                </p>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1000"
              alt="Men's premium fashion collection"
              className="w-full h-[450px] md:h-[600px] object-cover rounded-2xl"
            />

            {/* Floating Label */}
            <div className="absolute bottom-6 left-6 bg-white text-black rounded-xl px-5 py-4 shadow-xl">

              <p className="text-xs text-gray-500 font-medium">
                YOUR STYLE, REIMAGINED
              </p>

              <h3 className="font-bold text-lg mt-1">
                Try Before You Buy
              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
