
import { Shield, Flag } from "lucide-react";

const WriteupFooter = () => {
  return (
    <div className="mt-16 pt-8 border-t border-green-800">
      <div className="bg-gray-900/40 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center">
              <Shield className="h-6 w-6 mr-3" />
              Responsible Disclosure
            </h3>
            <p className="text-green-400/90 font-mono max-w-md">
              This CTF challenge writeup is shared for educational purposes. 
              All testing was conducted in authorized environments.
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-2xl font-bold text-green-400 font-mono mb-2 flex items-center">
              <Flag className="h-6 w-6 mr-2" />
              CTF_SOLVED
            </div>
            <div className="text-green-600 text-sm font-mono bg-green-900/30 px-3 py-1 rounded border border-green-700">
              CHALLENGE_COMPLETED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteupFooter;
