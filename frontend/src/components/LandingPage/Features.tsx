import { FaInfinity, FaStar } from "react-icons/fa";
import { FaCloudArrowUp, FaShieldHalved, FaClockRotateLeft } from "react-icons/fa6";


export default function Features() {
  const cards = [
    {
      icon: <FaCloudArrowUp className="text-orange-600" size={32} />,
      title: "Secure Backups",
      description: "Your work is automatically saved and encrypted in the cloud. Never worry about losing a single word of your masterpiece."
    },
    {
      icon: <FaShieldHalved className="text-orange-600" size={32} />,
      title: "Safe & Sound",
      description: "We use industry-standard encryption to ensure your stories remain yours alone. Your privacy is our top priority."
    },
    {
      icon: <FaClockRotateLeft className="text-orange-600" size={32} />,
      title: "Version History",
      description: "Accidentally deleted a chapter? Use our version history to roll back to any point in your writing journey."
    }
  ];

  return (
    <>
      <div className="flex justify-center gap-30 py-20">

        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 font-semibold mb-2">NEW AUTHORS</p>
          <h1 className="text-5xl font-bold"><FaInfinity size={56} /></h1>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 font-semibold mb-2">BOOK CREATED</p>
          <h1 className="text-5xl font-bold">45k+</h1>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 font-semibold mb-2">READER RATING</p>
          <h1 className="text-5xl font-bold flex items-center gap-2">4.9<FaStar color="#ea580c" size={28} /></h1>
        </div>
      </div>

      <div className="flex flex-col items-center py-20 bg-gray-50/50 rounded-3xl mx-4">
        <p className="text-orange-600 font-bold tracking-widest text-sm mb-4">DON'T FORGET YOUR STORIES</p>
        <h1 className="text-5xl font-bold mb-16 text-center">Keep your stories safe and sound</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="mb-6 p-4 bg-orange-50 rounded-xl w-fit group-hover:bg-orange-100 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}