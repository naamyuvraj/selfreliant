import { Play, Video, Camera, Film } from "lucide-react"
import MandalaPattern from "./MandalaPatterns"

export default function VideoSection() {
  const videos = [
    {
      id: 1,
      title: "Traditional Pottery Making Process",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Potter+at+Wheel",
      duration: "8:45",
      artisan: "Master Potter Ravi",
      description: "Watch the mesmerizing process of creating pottery from clay to finished piece",
    },
    {
      id: 2,
      title: "Intricate Embroidery Techniques",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Embroidery+Work",
      duration: "12:30",
      artisan: "Priya Devi",
      description: "Learn the delicate art of silver thread embroidery on silk fabric",
    },
    {
      id: 3,
      title: "Bamboo Basket Weaving Art",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Basket+Weaving",
      duration: "15:20",
      artisan: "Maya Sharma",
      description: "Discover the traditional techniques of bamboo basket weaving",
    },
  ]

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }}>
      {/* Decorative Elements */}
      <div className="absolute top-16 left-16 opacity-10">
        <div className="w-20 h-20 border-3 border-white rounded-lg flex items-center justify-center transform rotate-12">
          <Video className="h-10 w-10 text-white" />
        </div>
      </div>
      <div className="absolute top-24 right-24 opacity-10">
        <Camera className="h-16 w-16 text-white transform -rotate-12" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <div className="w-18 h-18 border-2 border-white rounded-full flex items-center justify-center">
          <Film className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Enhanced Mandala and Lippan Art Elements */}
      <div className="absolute top-1/4 right-20">
        <MandalaPattern type="mandala2" size="xl" opacity={0.15} />
      </div>
      <div className="absolute bottom-1/4 left-16">
        <MandalaPattern type="lippan2" size="xl" opacity={0.15} />
      </div>
      <div className="absolute top-1/2 left-12">
        <MandalaPattern type="mandala1" size="lg" opacity={0.12} />
      </div>
      <div className="absolute bottom-1/3 right-16">
        <MandalaPattern type="lippan1" size="lg" opacity={0.12} />
      </div>
      <div className="absolute top-16 left-1/3">
        <MandalaPattern type="mandala3" size="md" opacity={0.1} />
      </div>
      <div className="absolute bottom-16 right-1/3">
        <MandalaPattern type="lippan2" size="md" opacity={0.12} />
      </div>
      <div className="absolute top-1/3 right-1/4">
        <MandalaPattern type="mandala2" size="sm" opacity={0.1} />
      </div>
      <div className="absolute bottom-1/2 left-1/4">
        <MandalaPattern type="lippan1" size="sm" opacity={0.1} />
      </div>

      {/* Film Strip Pattern */}
      <div className="absolute bottom-1/3 right-12 opacity-8">
        <div className="flex space-x-1">
          <div className="w-2 h-12 bg-white/20"></div>
          <div className="w-2 h-12 bg-white/20"></div>
          <div className="w-2 h-12 bg-white/20"></div>
          <div className="w-2 h-12 bg-white/20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <Play className="h-6 w-6 text-white/60 mx-4" />
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Artisan at Work</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Watch master artisans create beautiful handcrafted pieces and learn about their traditional techniques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all transform hover:scale-110">
                    <Play className="w-8 h-8 text-primary-dark ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary-gold transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{video.description}</p>
                <p className="text-primary-gold font-medium">by {video.artisan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
