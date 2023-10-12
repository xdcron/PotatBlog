function Header() {
  return (
    <header className="flex flex-col px-8 py-2 items-center justify-center text-center">
      <h1
        className="md:text-[4vw] font-bold text-[2rem] mb-7"
        style={{ fontFamily: "Poppins" }}
      >
        Unlocking the Code
      </h1>
      <p className="sm:w-[90%] md:w-[80%] font-medium">
        Come along on my coding and web development journey. I&apos;ll share my
        experiences, challenges, and victories in this ever-evolving field.
        Let&apos;s explore the art of creating digital magic, one code at a
        time.
      </p>
    </header>
  );
}

export default Header;
