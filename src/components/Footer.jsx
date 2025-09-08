export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white/80 backdrop-blur-lg py-6 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm shadow-inner">
      <div>
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-bold text-indigo-600">SoundMint</span>. All rights
        reserved.
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-indigo-600 transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-indigo-600 transition">
          Terms of Service
        </a>
        <a href="#" className="hover:text-indigo-600 transition">
          Contact
        </a>
      </div>
    </footer>
  );
}
