function Main() {
  return (
    <div className="w-screen h-[75vh] bg-gradient-to-b from-[#1c7987] to- flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <div className="w-64 h-64 md:w-[30rem] md:h-[30rem]">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" className="w-full" />
        </div>
      </div>
      <div className="flex px-4 md:px-0 flex-col text-[#1c7987] space-y-2 md:space-y-4 items-center">
        <font className="text-center text-custom text-2xl md:text-4xl first-letter:text-3xl md:first-letter:text-5xl uppercase tracking-wide">
          Center of excellence
        </font>
        <font className="text-xl text-center text-custom md:text-3xl uppercase tracking-wide">
          operating system environment
        </font>
      </div>
    </div>
  );
}

export default Main;
