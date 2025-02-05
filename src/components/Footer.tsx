
import { FaPhoneAlt } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 w-full mt-12 bg-blue-100 border-t p-5 md:p-10">
      <div className="border-b w-full flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex">
          <img className="h-8" src="/download.svg" alt="Logo" />
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-end gap-4">
          <div className="flex gap-2 items-center">
            <FaPhoneAlt size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">+91 910 XXXXXXX</h2>
          </div>
          <div className="flex gap-2 items-center">
            <IoIosMail size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">rajendraaverma@gmail.com</h2>
          </div>
          <div className="flex gap-2 items-center">
            <RiMapPin2Fill size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">New Delhi</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <h3 className="text-xs text-gray-700">
          © 2024 . All rights reserved by [APNA NAAM]
        </h3>
      </div>
    </footer>
  );
}
