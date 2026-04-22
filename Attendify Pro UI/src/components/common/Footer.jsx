function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Attendify Pro UI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;