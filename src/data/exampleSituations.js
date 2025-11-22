export const exampleSituations = [
  '그 사람 생각이\n자꾸 나와서\n인스타를 몇 번이고 확인하게 돼.\n내 마음이 뭘까?',
  '그 사람과 있을 때\n심장이 빨리 뛰는 느낌.\n이게 진짜 내 마음일까?',
  '그 사람이 다른 사람과\n친하게 지내는 걸 보면\n왠지 모르게 신경 쓰여.\n이게 뭐지?',
  '그 사람을 떠올리면\n자연스럽게 미소가 지어져.\n나도 모르게.',
  '그 사람과 있으면\n시간이 너무 빨리 가는 것 같아.\n왜 그럴까?',
];

/**
 * 랜덤으로 예시 상황을 선택하는 함수
 * @returns {string} 랜덤으로 선택된 예시 상황
 */
export const getRandomExample = () => {
  return exampleSituations[Math.floor(Math.random() * exampleSituations.length)];
};
