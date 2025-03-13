import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageCircle, Heart, Twitter } from "lucide-react";

export function TwitterTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "This product has completely transformed my workflow. Absolutely love it! #GameChanger",
      likes: 1024,
      comments: 89,
    },
    {
      id: 2,
      name: "Sarah Lee",
      handle: "@sarahlee",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I've tried many similar products, but this one stands out. The attention to detail is impressive.",
      likes: 832,
      comments: 56,
    },
    {
      id: 3,
      name: "Chris Wong",
      handle: "@chriswong",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Customer support is top-notch. They went above and beyond to help me. 5 stars! ⭐⭐⭐⭐⭐",
      likes: 2048,
      comments: 128,
    },
    {
      id: 4,
      name: "Emma Davis",
      handle: "@emmad",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The user interface is so intuitive. It's a joy to use this product every day!",
      likes: 1536,
      comments: 102,
    },
    {
      id: 5,
      name: "Michael Brown",
      handle: "@michaelb",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I'm impressed by how quickly they roll out new features. Always improving!",
      likes: 768,
      comments: 45,
    },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 1;
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl"></div>
        <h2 className="text-2xl font-bold text-center mb-8">
          What People Are Saying
        </h2>
        <div className="overflow-hidden" ref={scrollRef}>
          <div
            className="flex space-x-4"
            style={{ width: `${testimonials.length * 320 * 2}px` }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="bg-gray-900 border-gray-800 w-[300px] flex-shrink-0"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonial.handle}
                    </p>
                  </div>
                  <Twitter className="w-5 h-5 text-blue-400 ml-auto" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{testimonial.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-gray-400">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{testimonial.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{testimonial.comments}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
