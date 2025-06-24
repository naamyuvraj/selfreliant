import Image from "next/image";
import Link from "next/link";
import { BookOpen, Feather, Scroll } from "lucide-react";
import MandalaPattern from "./MandalaPatterns";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Traditional Pottery Making",
    excerpt:
      "Discover the ancient techniques and modern innovations in pottery crafting that have been passed down through generations.",
    image: "/placeholder.svg?height=300&width=400&text=Pottery+Making+Process",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Crafting: Eco-Friendly Materials",
    excerpt:
      "Learn how artisans are embracing sustainable practices and eco-friendly materials in their traditional craft work.",
    image:
      "/placeholder.svg?height=300&width=400&text=Sustainable+Crafting+Materials",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Story Behind Handwoven Textiles",
    excerpt:
      "Explore the rich history and cultural significance of textile weaving traditions from around the world.",
    image: "/placeholder.svg?height=300&width=400&text=Handwoven+Textile+Loom",
    author: "Priya Sharma",
    date: "March 10, 2024",
    readTime: "6 min read",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }}>
      {/* Decorative Elements */}
      <div className="absolute top-16 left-16 opacity-10">
        <div className="w-20 h-20 border-3 border-white rounded-full flex items-center justify-center">
          <Scroll className="h-10 w-10 text-white" />
        </div>
      </div>
      <div className="absolute top-24 right-24 opacity-10">
        <Feather className="h-16 w-16 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-20 left-24 opacity-10">
        <div className="w-18 h-18 border-2 border-white rounded-lg transform -rotate-12">
          <BookOpen className="h-8 w-8 text-white m-auto mt-4" />
        </div>
      </div>

      {/* Enhanced Mandala and Lippan Art Elements */}
      <div className="absolute top-1/4 right-16">
        <MandalaPattern type="mandala1" size="xl" opacity={0.15} />
      </div>
      <div className="absolute bottom-1/4 left-20">
        <MandalaPattern type="lippan2" size="xl" opacity={0.15} />
      </div>
      <div className="absolute top-1/2 left-12">
        <MandalaPattern type="mandala3" size="lg" opacity={0.12} />
      </div>
      <div className="absolute bottom-1/3 right-12">
        <MandalaPattern type="lippan1" size="lg" opacity={0.12} />
      </div>
      <div className="absolute top-16 left-1/4">
        <MandalaPattern type="mandala2" size="md" opacity={0.1} />
      </div>
      <div className="absolute bottom-16 right-1/4">
        <MandalaPattern type="lippan2" size="md" opacity={0.12} />
      </div>
      <div className="absolute top-1/3 right-1/3">
        <MandalaPattern type="mandala1" size="sm" opacity={0.1} />
      </div>

      {/* Traditional Mandala Pattern */}
      <div className="absolute bottom-1/4 right-16 opacity-10">
        <div className="w-24 h-24 border-2 border-white rounded-full">
          <div className="w-16 h-16 border-2 border-white rounded-full m-auto mt-3">
            <div className="w-8 h-8 border-2 border-white rounded-full m-auto mt-3">
              <div className="w-4 h-4 bg-white rounded-full m-auto mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <BookOpen className="h-6 w-6 text-white/60 mx-4" />
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Artisan <span className="text-yellow-300">Stories</span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Dive deep into the world of craftsmanship with stories, techniques,
            and insights from master artisans.
          </p>
        </div>
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap px-4 py-6">
          <div className="flex gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 min-w-[390px] max-w-[390px]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-2">
                    <span className="font-medium">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-3 line-clamp-2 group-hover:text-primary-gold transition-colors min-h-[3.5rem]">
                    {" "}
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-primary-gold hover:text-primary-dark font-semibold transition-colors group-hover:translate-x-1 transform duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
