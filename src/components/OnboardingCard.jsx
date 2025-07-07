import { Link } from "react-router-dom";
import Button from "./ui/button";

export default function OnboardingCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full overflow-hidden">
        <img
          src="/src/assets/images/chat.jpg"
          alt="Team working on laptop"
          className="w-full h-64 object-cover"
          
        />
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 tracking-widest">H A A U</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Smart. Simple. Smooth. Your journey starts now
          </p>

          <div className="flex justify-center space-x-1 mt-4">
            <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          </div>
         <Link to="/loginpage">
          <Button/>
          </Link>
        </div>
      </div>
    </div>
  );
}
