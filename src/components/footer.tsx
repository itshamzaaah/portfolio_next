import Link from "next/link";
import 'remixicon/fonts/remixicon.css';


export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 px-2">
<div className="container mx-auto">
<div className="w-full">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Centered Copyright Text */}
          <p className="text-gray-600">
            &copy; 2024 Hamza Maratib. All rights reserved.
          </p>
          {/* Centered Icons */}
          <div className="flex space-x-4 justify-center">
            <Link
              href="https://www.linkedin.com/in/hamzamaratib/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-linkedin-box-fill text-3xl text-gray-600 hover:text-gray-900"></i>
            </Link>
            <Link
              href="https://github.com/itshamzaaah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-github-fill text-3xl text-gray-600 hover:text-gray-900"></i>
            </Link>
          </div>
        </div>
      </div>
</div>
    </footer>
  );
}
