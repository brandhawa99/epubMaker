import { FaPenNib, FaImage, FaShareNodes } from "react-icons/fa6";

export default function Process() {
  const steps = [
    {
      icon: <FaPenNib size={24} />,
      title: "Draft Your Story",
      description: "Bring your memories to life. Start with a blank canvas or import your existing drafts into our minimalist editor."
    },
    {
      icon: <FaImage size={24} />,
      title: "Add Your Visuals",
      description: "A picture is worth a thousand words. Easily place illustrations and photos to enhance the emotional depth of your story."
    },
    {
      icon: <FaShareNodes size={24} />,
      title: "Share Your Legacy",
      description: "Export your masterpiece into a professional EPUB and share it with loved ones or publish it for the world to see."
    }
  ];

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <p className="text-orange-600 font-bold tracking-[0.2em] text-sm mb-4 uppercase">The Process</p>
        <h2 className="pb-3 text-5xl font-bold bg-clip-text text-transparent bg-linear-to-br from-black to-zinc-600">
          From Memory to Masterpiece
        </h2>
      </div>

      <div className="relative">
        {/* Horizontal Line for Desktop */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center mb-8 relative z-10 transition-all duration-300 group-hover:border-orange-200 group-hover:shadow-md group-hover:scale-110">
                  <div className="text-orange-600">
                    {step.icon}
                  </div>
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center z-20 shadow-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
