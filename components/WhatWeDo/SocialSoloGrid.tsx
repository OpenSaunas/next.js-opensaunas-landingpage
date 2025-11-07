import Divider from '../common/Divider';

const SocialSoloGrid = () => {
  return (
    // Grid: Social·Solo
    <div className="grid grid-cols-2 gap-auto">
      {/* Social Column */}
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <div className="flex flex-col gap-2.5 w-[300px] h-[134px]">
          <h3 className="font-reddit text-[48px] font-semibold leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
            Social
          </h3>
          <p className="font-ibm text-[18px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
            심리, 창작, 로컬 문화 분야의 이야기를 전해줄 인물과 함께하는 사우나
          </p>
        </div>
        {/* List */}
        <div className="flex flex-col gap-5 w-[300px]">
          {[
            ['Opening Talk', '삶과 일, 그리고 ‘쉬는 법’에 대해 새로운 시선으로 듣는 이야기'],
            ['Sauna Dialogue', '연사와 참가자가 함께 진솔하게 대화하는 시간'],
            ['Cool Down & Tea', '생각돋 열기도 마무리하는 시간'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex flex-col gap-2.5 h-[138px]">
              <p className="text-[12px] font-reddit font-normal leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                Step {i + 1}
              </p>
              <Divider />
              <p className="font-reddit text-[24px] font-medium leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                {title}
              </p>
              <p className="font-ibm text-[16px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Solo Column */}
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <div className="flex flex-col gap-2.5 w-[300px] h-[134px]">
          <h3 className="font-reddit text-[48px] font-semibold leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
            Solo
          </h3>
          <p className="font-ibm text-[18px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
            혼자 쉬고 싶을 때, 감정 정리가 필요할 때
          </p>
        </div>
        {/* List */}
        <div className="flex flex-col gap-5 w-[300px]">
          {[
            ['Aroma Selection', '입장 전, 오늘의 향을 고르는 시간'],
            ['Private Sauna', '휴대폰도, 대화도 없이 오직 열기와 호흡으로 나를 느끼는 시간'],
            ['Cool Down & Tea', '오늘의 감정을 조용히 정리하는 시간'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex flex-col gap-2.5 h-[138px]">
              <p className="text-[12px] font-reddit font-normal leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                Step {i + 1}
              </p>
              <Divider />
              <p className="font-reddit text-[24px] font-medium leading-[1.34] tracking-[-0.02em] text-black wrap-break-word">
                {title}
              </p>
              <p className="font-ibm text-[16px] font-medium leading-[1.65] tracking-[-0.02em] text-black wrap-break-word">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialSoloGrid;
