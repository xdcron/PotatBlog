function HorizontalRule() {
  return (
    <div className="flex items-center w-full gap-2">
      <hr className="border-[1px] border-black w-full" />
      <span className="text-[0.9rem]">OR</span>
      <hr className="border-[1px] border-black w-full" />
    </div>
  );
}

export default HorizontalRule;
