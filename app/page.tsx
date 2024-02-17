import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import MasnoryGrid from "./components/MasnoryGrid";

export default function Home() {
  const contactEmail = process.env.CONTACT_EMAIL;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-mono  relative text-black">
      <div className="banner relative flex flex-col items-center justify-between min-h-screen max-h-screen min-w-full py-10 px-6">
        <header className="flex justify-between fixed bg-white top-0 py-4 sm:py-10 z-40 px-2 items-center w-full sm:w-10/12">
          <div className=" tracking-[3px] font-bold text-3xl font-serif">
            Emelina
          </div>
          <div>
            <button className="py-2 cursor-pointer px-3 sm:px-6 sm:py-3 bg-black rounded-full text-md tracking-tight text-white ">
              <a href={`mailto:${contactEmail}`}>Get in touch</a>
            </button>
          </div>
        </header>
        <main className=" flex flex-col gap-32 md:gap-40 lg:gap-60 justify-center items-center mt-32 lg:mt-64 ">
          <section className="sm:w-10/12 mx-auto  lg:w-2/3 flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-wider">
              Photographer & Creator
            </h2>
            <h3 className=" text-2xl md:text-4xl  font-serif tracking-wider">
              In Stockholm, Sweden
            </h3>
            <p className="md:text-xl">
              Lore ipsum daler sit omet consectetur adipicing eft. Mattis anctor
              in maums eft punis mossa massa lobortie fosum uro vel tellus
              lectus puras. Auque facisis sed aliquam nullam. Id nume in
              habitase «nim elit
            </p>
          </section>
          <MasnoryGrid />
        </main>

        <footer className=" space-y-6 sm:flex py-6   sm:justify-between  bg-white  sm:py-10 px-2 items-center w-full sm:w-10/12">
          <div className=" gap-3 sm:gap-8 cursor-pointer flex sm:justify-center items-center">
            <FaFacebook className="text-xl hover:text-purple-400 " />
            <FaInstagram className="text-xl hover:text-purple-400 " />
            <FaPinterest className="text-xl hover:text-purple-400 " />
          </div>
          <div>Copyright &copy; 2024 by Dot</div>
        </footer>
      </div>
    </main>
  );
}
