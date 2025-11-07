const InfoTextSection = () => {
  return (
    <section
      className="
        grid w-full
        grid-cols-1 min-[1080px]:grid-cols-2
        gap-[100px] min-[1080px]:gap-0
        px-4 min-[1080px]:px-10
        pb-[60px] min-[1080px]:pb-[200px]
    "
    >
      {/* First TextBox */}
      <div className="w-1/2 min-[1080px]:w-full">
        <p className="text-[22px] min-[1080px]:text-[26px] font-kopub-batang font-light leading-1.54 tracking-[-0.01em] text-black wrap-break-word">
          오픈사우나스는 로컬 사우나를 일상의 회복과 연결의 공간으로 다시 바라보는 프로젝트입니다. 우리와 가까운
          곳에서부터 새로운 휴식 문화를 만들어갑니다.
        </p>
      </div>
      {/* Second TextBox */}
      <div
        className="
        flex flex-col
        gap-3
        font-kopub-batang text-black
        w-[290px]
        justify-self-end
      "
      >
        <p className="text-[12px] min-[1080px]:text-[14px] font-bold leading-1.68 tracking-[-0.02em] wrap-break-word">
          &apos;&apos;굳이 적극적으로 말을 거는 것도 아니고, 말을 걸고 싶은 것도 아닙니다. 다만 같은 곳을 다니는 아는
          사람들 속에 있을 수 있다는 것이 마음의 안도감을 불러일으키고 있는 것 같습니다.&apos;&apos;
        </p>
        <p className="text-[12px] font-light leading-1.61 tracking-[-0.02em] wrap-break-word">
          - 고스기유 목욕탕 대표 히라마쓰 유스케
        </p>
      </div>
    </section>
  );
};

export default InfoTextSection;
