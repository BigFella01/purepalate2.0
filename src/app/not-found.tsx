import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-16 max-w-[1024px] w-full mx-auto text-center">
      <h1 className="text-6xl text-orange-700">Not Found</h1>
      <p className="my-12">Could not find requested resource.</p>
      <Link
        className="text-white mt-6 outline-1 outline-orange-700 bg-orange-700 p-4 rounded-2xl hover:text-orange-700 hover:bg-white transition ease-in-out duration-200 my-8"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
