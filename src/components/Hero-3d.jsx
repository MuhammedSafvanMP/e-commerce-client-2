"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fashionModels = [
  {
    id: 1,
    model: "female",
    outfit: "Elegant Evening Dress",
    price: 299.99,
    image: "/g2.jpg",
    background: "from-rose-200 via-pink-100 to-purple-200",
    transform: "rotateY(15deg) rotateX(5deg)",
    shadow: "drop-shadow(30px 30px 60px rgba(219, 39, 119, 0.3))",
  },
  {
    id: 2,
    model: "male",
    outfit: "Modern Business Suit",
    price: 599.99,
    image: "/s9.jpg",
    background: "from-blue-200 via-indigo-100 to-purple-200",
    transform: "rotateY(-20deg) rotateX(-5deg)",
    shadow: "drop-shadow(-25px 25px 50px rgba(59, 130, 246, 0.3))",
  },
  {
    id: 3,
    model: "female",
    outfit: "Casual Chic Ensemble",
    price: 189.99,
    image: "/b1.jpg",
    background: "from-emerald-200 via-teal-100 to-cyan-200",
    transform: "rotateY(25deg) rotateX(10deg)",
    shadow: "drop-shadow(35px 20px 40px rgba(16, 185, 129, 0.3))",
  },
  {
    id: 4,
    model: "male",
    outfit: "Street Style Look",
    price: 249.99,
    image: "/g4.jpg",
    background: "from-orange-200 via-amber-100 to-yellow-200",
    transform: "rotateY(-15deg) rotateX(-8deg)",
    shadow: "drop-shadow(-20px 30px 45px rgba(245, 158, 11, 0.3))",
  },
  {
    id: 5,
    model: "female",
    outfit: "Bohemian Summer",
    price: 159.99,
    image: "/s7.jpg",
    background: "from-violet-200 via-purple-100 to-fuchsia-200",
    transform: "rotateY(30deg) rotateX(12deg)",
    shadow: "drop-shadow(40px 15px 35px rgba(168, 85, 247, 0.3))",
  },
  {
    id: 6,
    model: "female",
    outfit: "Bohemian Summer",
    price: 159.99,
    image: "/bo2.jpg",
    background: "from-violet-200 via-purple-100 to-fuchsia-200",
    transform: "rotateY(30deg) rotateX(12deg)",
    shadow: "drop-shadow(40px 15px 35px rgba(168, 85, 247, 0.3))",
  },
];

export default function Hero3D() {
  const [currentModel, setCurrentModel] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentModel((prev) => (prev + 1) % fashionModels.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentShow = fashionModels[currentModel];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentShow.background} transition-all duration-1000`}
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
            linear-gradient(135deg, ${currentShow.background
              .split(" ")
              .join(", ")})
          `,
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 10}%`,
              top: `${15 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
              transform: `translateZ(${i * 10}px) rotateX(${i * 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Image Side */}
          <div className="relative flex items-center justify-center">
            <div
              className={`relative transition-all duration-1000 ${
                isTransitioning
                  ? "scale-95 opacity-50"
                  : "scale-100 opacity-100"
              }`}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="relative w-72 sm:w-80 md:w-96 h-[400px] sm:h-[500px] md:h-[600px] transition-all duration-1000"
                style={{
                  transform: currentShow.transform,
                  filter: currentShow.shadow,
                }}
              >
                <img
                  src={currentShow.image || "/placeholder.svg"}
                  alt={`${currentShow.model} wearing ${currentShow.outfit}`}
                  className="object-cover w-full h-full rounded-3xl"
                />
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: `linear-gradient(45deg,
                      rgba(255,255,255,0.1) 0%,
                      rgba(255,255,255,0.3) 50%,
                      rgba(255,255,255,0.1) 100%)`,
                    transform: "translateZ(10px)",
                  }}
                />
              </div>

              <div
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-bounce"
                style={{
                  transform: "translateZ(50px) rotateY(-15deg)",
                  animationDuration: "3s",
                }}
              >
                <div className="text-center">
                  <Badge className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600">
                    {currentShow.model === "female" ? "👩 Women" : "👨 Men"}
                  </Badge>
                  <p className="text-xl font-bold text-purple-600">
                    ${currentShow.price}
                  </p>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-black/80 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl backdrop-blur-sm"
                style={{
                  transform: "translateZ(30px) rotateX(10deg)",
                }}
              >
                <p className="text-sm sm:text-base font-semibold">
                  {currentShow.outfit}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-medium">
                <Sparkles className="h-5 w-5 mr-2" />
                3D Fashion Experience
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Style
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                Experience fashion in three dimensions. Watch our models
                showcase the latest trends with stunning 3D presentations that
                bring style to life.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  <span>
                    Model {currentModel + 1} of {fashionModels.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span>
                    {currentShow.model === "female" ? "Female" : "Male"}{" "}
                    Collection
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Explore Collection
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {fashionModels.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              index === currentModel
                ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentModel(index)}
          />
        ))}
      </div>
    </section>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Play, Pause, Volume2 } from "lucide-react";
// import { Link } from "react-router-dom";

// const fashionShowSlides = [
//   {
//     id: 1,
//     model: "female",
//     angle: "front",
//     product: "Summer Dress Collection",
//     price: 199.99,
//     image: "/g2.jpg",
//     background: "from-pink-100 via-purple-50 to-indigo-100",
//     position: "center",
//     description:
//       "Elegant summer collection featuring flowing fabrics and vibrant colors",
//   },
//   {
//     id: 2,
//     model: "male",
//     angle: "side",
//     product: "Urban Streetwear",
//     price: 149.99,
//     image: "/s9.jpg",
//     background: "from-gray-100 via-blue-50 to-purple-100",
//     position: "left",
//     description:
//       "Contemporary streetwear designed for the modern urban lifestyle",
//   },
//   {
//     id: 3,
//     model: "female",
//     angle: "back",
//     product: "Evening Glamour",
//     price: 299.99,
//     image: "/b1.jpg",
//     background: "from-rose-100 via-pink-50 to-orange-100",
//     position: "right",
//     description:
//       "Sophisticated evening wear that captures attention and elegance",
//   },
//   {
//     id: 4,
//     model: "male",
//     angle: "three-quarter",
//     product: "Business Casual",
//     price: 249.99,
//     image: "/g4.jpg",
//     background: "from-slate-100 via-gray-50 to-blue-100",
//     position: "center",
//     description:
//       "Professional attire that seamlessly blends comfort with style",
//   },
//   {
//     id: 5,
//     model: "female",
//     angle: "profile",
//     product: "Bohemian Chic",
//     price: 179.99,
//     image: "/s7.jpg",
//     background: "from-amber-100 via-yellow-50 to-green-100",
//     position: "left",
//     description: "Free-spirited designs inspired by global fashion trends",
//   },
//   {
//     id: 6,
//     model: "female",
//     angle: "profile",
//     product: "Bohemian Chic",
//     price: 179.99,
//     image: "/bo2.jpg",
//     background: "from-amber-100 via-yellow-50 to-green-100",
//     position: "left",
//     description: "Free-spirited designs inspired by global fashion trends",
//   },
// ];

// export default function Hero3D() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [showControls, setShowControls] = useState(false);

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % fashionShowSlides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const currentShow = fashionShowSlides[currentSlide];

//   return (
//     <section
//       className="relative h-screen overflow-hidden"
//       onMouseEnter={() => setShowControls(true)}
//       onMouseLeave={() => setShowControls(false)}
//     >
//       {/* Background */}
//       <div
//         className={`absolute inset-0 bg-gradient-to-br ${currentShow.background} transition-all duration-1000`}
//       />

//       {/* Lights */}
//       <div className="absolute inset-0">
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
//         <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-1/2" />
//       </div>

//       {/* Spotlights */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-3xl transition-all duration-1000"
//           style={{
//             top: "20%",
//             left:
//               currentShow.position === "left"
//                 ? "10%"
//                 : currentShow.position === "right"
//                 ? "60%"
//                 : "35%",
//           }}
//         />
//         <div
//           className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-purple-300/20 blur-2xl transition-all duration-1000"
//           style={{
//             bottom: "30%",
//             right:
//               currentShow.position === "right"
//                 ? "10%"
//                 : currentShow.position === "left"
//                 ? "60%"
//                 : "25%",
//           }}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
//           {/* Model */}
//           <div className="relative">
//             <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] flex items-end justify-center">
//               <div
//                 className={`relative w-60 sm:w-72 lg:w-80 h-full transition-all duration-1000 transform ${
//                   currentShow.angle === "side"
//                     ? "rotate-12"
//                     : currentShow.angle === "back"
//                     ? "rotate-180"
//                     : currentShow.angle === "three-quarter"
//                     ? "rotate-45"
//                     : currentShow.angle === "profile"
//                     ? "-rotate-12"
//                     : "rotate-0"
//                 }`}
//               >
//                 <img
//                   src={currentShow.image || "/placeholder.svg"}
//                   alt={currentShow.product}
//                   className="object-cover object-top rounded-t-full shadow-2xl w-full h-full"
//                   style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))" }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-t-full" />
//               </div>

//               {/* Floating Info Box */}
//               <div className="absolute top-6 right-0 sm:-right-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl w-[200px] sm:w-auto text-sm sm:text-base">
//                 <Badge className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600">
//                   {currentShow.model === "female" ? "👩 Women" : "👨 Men"}
//                 </Badge>
//                 <h3 className="font-bold text-base sm:text-lg mb-1">
//                   {currentShow.product}
//                 </h3>
//                 <p className="text-lg sm:text-2xl font-bold text-purple-600">
//                   ${currentShow.price}
//                 </p>
//                 <p className="text-xs text-gray-600 mt-2">
//                   {currentShow.angle.charAt(0).toUpperCase() +
//                     currentShow.angle.slice(1)}{" "}
//                   View
//                 </p>
//               </div>

//               {/* Angle Label */}
//               {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm">
//                 {currentShow.angle.replace("-", " ").toUpperCase()} ANGLE
//               </div> */}
//             </div>
//           </div>

//           {/* Text Content */}
//           <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
//             {/* <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium">
//               ✨ Fashion Show 2024
//             </Badge> */}

//             <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
//               Runway
//               <br />
//               <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
//                 Collection
//               </span>
//             </h1>

//             <p className="text-base sm:text-xl text-gray-600 max-w-lg leading-relaxed">
//               {currentShow.description}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//               <Link to="/products">
//                 <Button
//                   size="lg"
//                   className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
//                 >
//                   Shop Collection
//                 </Button>
//               </Link>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
//               >
//                 Watch Show
//               </Button>
//             </div>

//             <div className="flex gap-6 text-xs sm:text-sm text-gray-500">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-purple-500" />
//                 <span>
//                   Model: {currentShow.model === "female" ? "Female" : "Male"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-pink-500" />
//                 <span>View: {currentShow.angle.replace("-", " ")}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div
//         className={`absolute bottom-8 left-4 sm:left-8 flex items-center gap-4 transition-all duration-300 ${
//           showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//         }`}
//       >
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setIsPlaying(!isPlaying)}
//           className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white"
//         >
//           {isPlaying ? (
//             <Pause className="h-5 w-5" />
//           ) : (
//             <Play className="h-5 w-5" />
//           )}
//         </Button>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white"
//         >
//           <Volume2 className="h-5 w-5" />
//         </Button>
//         <div className="text-white text-xs sm:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
//           {currentSlide + 1} / {fashionShowSlides.length}
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-8 right-4 sm:right-8 flex space-x-2">
//         {fashionShowSlides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-8 h-2 rounded-full transition-all duration-300 ${
//               index === currentSlide
//                 ? "bg-gradient-to-r from-purple-600 to-pink-600"
//                 : "bg-white/30 hover:bg-white/50"
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>

//       {/* Runway Lines */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
//         <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
//       </div>
//     </section>
//   );
// }
