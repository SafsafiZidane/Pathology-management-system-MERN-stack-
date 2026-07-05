import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-canvas text-center px-4">
    <p className="accession text-sm text-muted mb-2">ERROR 404</p>
    <h1 className="font-display font-semibold text-2xl text-ink mb-2">Page not found</h1>
    <p className="text-sm text-muted mb-6">This record doesn't exist in the console.</p>
    <Link
      to="/"
      className="px-4 py-2 bg-teal-500 text-white rounded text-sm font-medium hover:bg-teal-600 transition-colors"
    >
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
