import Image from 'next/image';

const AboutSection = () => {
  return (
    <section
      className="
        w-full
        flex flex-row items-start
        px-4 min-[1080px]:px-10 py-[100px] gap-5

        min-[1080px]:grid min-[1080px]:grid-cols-2 min-[1080px]:items-start
        bg-[#F3EFEA]
        "
    >
      {/* Sub */}
      <div
        className="
        shrink-0
        w-20 min-[1080px]:w-auto
        flex items-start justify-start
      "
      >
        <h2 className="text-[14px] min-[1080px]:text-[20px] font-reddit font-medium leading-1.61 tracking-[-0.02em] text-black wrap-break-word">
          About Us
        </h2>
      </div>

      {/* Text */}
      <div
        className="
        flex-1
        flex flex-col gap-[30px]
      "
      >
        <div className="hidden min-[1080px]:block">
          <Image src="/img_flower.png" alt="Flower Image" width={56} height={56} />
        </div>
        <p className="font-ibm text-[14px] font-light leading-[1.75] tracking-[-0.01em] text-black wrap-break-word">
          도심 속에서 바쁘게 살아가며, 낮에는 사회적 역할에, 밤에는 SNS 속 &apos;누군가로서의 나&apos;에 집중하다 보면
          정작 본연의 자신으로 머무는 시간이 거의 없습니다. <br />
          <br />
          멀리 떠나지 않아도, 거창한 준비가 없어도, 가까운 곳에서부터 회복이 시작될 수 있다고 믿습니다. 오픈사우나스는
          가까운곳에서부터 새로운 휴식의 문화를 만들어가며, 사라져가는 사람들 간의 연결 자산을 찾기 위한 실험입니다.
          누군가가 될 필요도, 이름이나 직함, 역할로 자신을 설명할 필요도 없습니다. 그저{' '}
          <strong>
            &apos;있는 그대로의 나&apos;로, 그리고 &apos;있는 그대로의 타자&apos;로 머물 수 있는 우리의 동네 안에서,
            느슨하게 연결되고자 합니다.
          </strong>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
