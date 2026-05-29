import React, { useState, useEffect } from "react";

const galleryItems = [
  { id: 0, type: "image", src: "/images/main.jpg", alt: "Award Ceremony", title: "Maharashtra Business Icon Award 2025", category: "Achievements" },
  { id: 1, type: "image", src: "/images/image1.jpg", alt: "Students and Faculty Group Photo", title: "Maharashtra Business Icon Award", category: "Achievements" },
  { id: 2, type: "image", src: "/images/image2.jpg", alt: "Large Group Gathering", title: "Maharashtra Business Icon Award", category: "Achievements" },
  { id: 3, type: "image", src: "/images/image3.jpg", alt: "Award Ceremony", title: "Batch Gathering", category: "Achievements" },
  { id: 4, type: "image", src: "/images/image4.jpg", alt: "Woman Receiving Award", title: "Award Distribution", category: "Achievements" },
  { id: 5, type: "image", src: "/images/image5.jpg", alt: "Naturopathy Treatment", title: "Award Distribution", category: "Achievements" },
  { id: 6, type: "image", src: "/images/image6.jpg", alt: "Patient Treatment Room", title: "Institute Campus", category: "Campus Life" },
  { id: 7, type: "image", src: "/images/image7.jpg", alt: "Workshop Session", title: "Award Distribution", category: "Achievements" },
  { id: 8, type: "image", src: "/images/image8.jpg", alt: "Group Discussion", title: "Faculty Interaction", category: "Campus Life" },
  { id: 9, type: "image", src: "/images/image9.jpg", alt: "Campus View", title: "Institute Campus", category: "Campus Life" },
  { id: 10, type: "image", src: "/images/image10.jpg", alt: "Students Group", title: "Institute Campus", category: "Campus Life" },
  { id: 11, type: "image", src: "/images/image11.jpg", alt: "Clinical session", title: "Clinical session", category: "Workshops" },
  { id: 12, type: "image", src: "/images/image12.jpg", alt: "Patient Treatment Room", title: "Patient Treatment Room", category: "Clinical Practice" },
  { id: 13, type: "image", src: "/images/image13.jpg", alt: "Research Presentation", title: "Therapy Room", category: "Clinical Practice" },
  { id: 14, type: "image", src: "/images/image14.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },

  // Video
  { 
    id: 15, 
    type: "vimeo", 
    videoUrl: "https://player.vimeo.com/video/1196582717", 
    poster: "/images/main.jpg", 
    title: "Maharashtra Business Icon Award 2025 - Full Video", 
    category: "Achievements" 
  },
   { 
    id: 16, 
    type: "vimeo", 
    videoUrl: "https://player.vimeo.com/video/1196577539", 
    poster: "/images/main.jpg", 
    title: "Maharashtra Business Icon Award 2025 - Full Video", 
    category: "Achievements" 
  },
    { 
      id: 17, 
      type: "vimeo", 
      videoUrl: "https://player.vimeo.com/video/1196582718",   
      poster: "/images/image16.jpg", 
      title: "Maharashtra Business Icon Award 2025 - Full Video", 
      category: "Campus Life" 
    },
      { 
    id: 18, 
    type: "vimeo", 
    videoUrl: "https://player.vimeo.com/video/1196582716", 
    poster: "/images/image16.jpg", 
    title: "Maharashtra Business Icon Award 2025 - Full Video", 
    category: "Achievements" 
  },

  { id: 19, type: "image", src: "/images/img19.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 20, type: "image", src: "/images/img20.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 21, type: "image", src: "/images/img21.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 22, type: "image", src: "/images/img22.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 23, type: "image", src: "/images/img23.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 24, type: "image", src: "/images/img24.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 25, type: "image", src: "/images/img25.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 26, type: "image", src: "/images/img26.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 27, type: "image", src: "/images/img27.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 28, type: "image", src: "/images/img28.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 29, type: "image", src: "/images/img29.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 30, type: "image", src: "/images/img30.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 31, type: "image", src: "/images/img31.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 32, type: "image", src: "/images/img32.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 33, type: "image", src: "/images/img33.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 34, type: "image", src: "/images/img34.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 35, type: "image", src: "/images/img35.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 36, type: "image", src: "/images/img36.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 37, type: "image", src: "/images/img37.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 38, type: "image", src: "/images/img38.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 39, type: "image", src: "/images/img39.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 40, type: "image", src: "/images/img40.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 41, type: "image", src: "/images/img41.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 42, type: "image", src: "/images/img42.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 43, type: "image", src: "/images/img43.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 44, type: "image", src: "/images/img44.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 45, type: "image", src: "/images/img45.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 46, type: "image", src: "/images/img46.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 47, type: "image", src: "/images/img47.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 48, type: "image", src: "/images/img48.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 49, type: "image", src: "/images/img49.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 50, type: "image", src: "/images/img50.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 51, type: "image", src: "/images/img51.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 52, type: "image", src: "/images/img52.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 53, type: "image", src: "/images/img53.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 54, type: "image", src: "/images/img54.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
  { id: 55, type: "image", src: "/images/img55.jpg", alt: "Naturopathy Treatment", title: "Naturopathy Treatment", category: "Clinical Practice" },
];


function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  const goToPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-green-800 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-3">Our Gallery</h1>
          <p className="text-green-100 text-lg">
            Moments from campus life, events, workshops & student success
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.poster || item.src}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {item.type === "vimeo" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl">▶</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <p className="text-white font-semibold text-lg">{item.title}</p>
                  <p className="text-green-300 text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" 
          onClick={() => setSelectedIndex(null)}
        >
          <div className="max-w-5xl w-full relative" onClick={e => e.stopPropagation()}>

            <button onClick={goToPrev} className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-10 text-3xl">←</button>
            <button onClick={goToNext} className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-10 text-3xl">→</button>

            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="w-full rounded-2xl shadow-2xl max-h-[85vh] object-contain"
              />
            ) : (
              <iframe
                src={selectedItem.videoUrl}
                width="100%"
                height="560"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full rounded-2xl shadow-2xl aspect-video"
              ></iframe>
            )}

            <div className="text-center mt-6">
              <p className="text-white text-2xl font-medium">{selectedItem.title}</p>
              <p className="text-green-300 text-sm mt-1">{selectedItem.category}</p>
            </div>

            <button onClick={() => setSelectedIndex(null)} className="absolute -top-4 -right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-xl hover:bg-gray-100">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;