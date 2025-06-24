interface MandalaPatternProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  opacity?: number
  type?: "mandala1" | "mandala2" | "mandala3" | "lippan1" | "lippan2"
}

export default function MandalaPattern({
  className = "",
  size = "md",
  opacity = 0.1,
  type = "mandala1",
}: MandalaPatternProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const renderPattern = () => {
    switch (type) {
      case "mandala1":
        return (
          <div className={`${sizeClasses[size]} relative ${className}`} style={{ opacity }}>
            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
            <div className="absolute inset-[15%] border-2 border-white rounded-full"></div>
            <div className="absolute inset-[30%] border-2 border-white rounded-full"></div>
            <div className="absolute inset-[45%] border-2 border-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-white absolute"></div>
              <div className="w-0.5 h-full bg-white absolute"></div>
              <div className="w-full h-0.5 bg-white absolute transform rotate-45"></div>
              <div className="w-0.5 h-full bg-white absolute transform rotate-45"></div>
            </div>
          </div>
        )
      case "mandala2":
        return (
          <div className={`${sizeClasses[size]} relative ${className}`} style={{ opacity }}>
            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
            <div className="absolute inset-[20%] border-2 border-white rounded-full"></div>
            <div className="absolute inset-[40%] border-2 border-white rounded-full"></div>
            {/* Flower petals */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 left-1/4 top-0 origin-bottom"
                style={{ transform: `rotate(${i * 45}deg)` }}
              >
                <div className="w-4 h-8 bg-white rounded-full mx-auto"></div>
              </div>
            ))}
          </div>
        )
      case "mandala3":
        return (
          <div className={`${sizeClasses[size]} relative ${className}`} style={{ opacity }}>
            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
            {/* Triangular patterns */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full origin-center"
                style={{ transform: `rotate(${i * 30}deg)` }}
              >
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-white mx-auto"></div>
              </div>
            ))}
            <div className="absolute inset-[30%] border-2 border-white rounded-full"></div>
            <div className="absolute inset-[45%] border-2 border-white rounded-full"></div>
          </div>
        )
      case "lippan1":
        return (
          <div className={`${sizeClasses[size]} relative ${className}`} style={{ opacity }}>
            {/* Lippan base shape */}
            <div className="absolute inset-0 border-2 border-white transform rotate-45"></div>
            <div className="absolute inset-[15%] border-2 border-white transform rotate-45"></div>
            {/* Mirror dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {/* Corner dots */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full transform translate-x-1 translate-y-1"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full transform -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full transform translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full transform -translate-x-1 -translate-y-1"></div>
            {/* Triangle patterns */}
            <div className="absolute inset-[30%] flex items-center justify-center">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full origin-center"
                  style={{ transform: `rotate(${i * 90}deg)` }}
                >
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        )
      case "lippan2":
        return (
          <div className={`${sizeClasses[size]} relative ${className}`} style={{ opacity }}>
            {/* Lippan circular base */}
            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
            {/* Triangular patterns around circle */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full origin-center"
                style={{ transform: `rotate(${i * 45}deg)` }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-white"></div>
                </div>
              </div>
            ))}
            {/* Center mirror */}
            <div className="absolute inset-[40%] border-2 border-white rounded-full bg-white/30"></div>
            {/* Dot patterns */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full origin-center"
                style={{ transform: `rotate(${i * 22.5}deg)` }}
              >
                <div className="absolute top-[25%] left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2"></div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return renderPattern()
}
