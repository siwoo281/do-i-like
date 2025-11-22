export const exampleSituations = [
  '카톡 답장은 느린데\n내 사소한 말은 다 기억하는 그 사람.\n이거... 혹시 좋아하는 걸까?',
  '사람 많은 술자리에서\n유독 나만 챙겨주는 것 같은 느낌.\n나만의 착각일까?',
  '내가 올린 인스타 스토리에\n빠짐없이 하트 누르는 그 사람.\n그냥 습관일까, 시그널일까?',
  '단둘이 있으면 어색한데,\n자꾸만 시선이 가는 그 사람.\n내 마음, 나도 헷갈려.',
  '다른 사람에겐 무뚝뚝한데\n나한테만 웃어주는 그 사람.\n이거... 그린라이트인가?',
];

/**
 * 랜덤으로 예시 상황을 선택하는 함수
 * @returns {string} 랜덤으로 선택된 예시 상황
 */
export const getRandomExample = () => {
  return exampleSituations[Math.floor(Math.random() * exampleSituations.length)];
};

