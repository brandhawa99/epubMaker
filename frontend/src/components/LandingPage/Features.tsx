import { FaInfinity, FaStar } from "react-icons/fa";


export default function Features() {
  return (
    <div className="flex justify-center gap-30 py-10">
      <div className="flex flex-col items-center">
        <p>NEW AUTHORS</p>
        <h1 className="text-5xl font-bold"><FaInfinity size={56} /></h1>
      </div>
      <div className="flex flex-col items-center">
        <p>BOOK CREATED</p>
        <h1 className="text-5xl font-bold">45k+</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="">READER RATING</p>
        <h1 className="text-5xl font-bold flex items-center gap-2">4.9<FaStar color="#ea580c" size={28} /></h1>
      </div>
    </div>
  )
}