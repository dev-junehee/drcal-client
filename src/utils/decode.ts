interface Hospital {
  hospital: string;
  dept: string[];
}

interface hospitalDecode {
  [key: number]: Hospital;
}

export const hospitalDecode: hospitalDecode = {
  1: {
    hospital: '서울대학교 병원',
    dept: [
      '응급의학과',
      '내과',
      '외과',
      '산부인과',
      '가정의학과',
      '피부과',
      '마취통증의학과',
      '안과',
      '이비인후과',
      '신경외과',
      '정신건강의학과',
    ],
  },
  2: {
    hospital: '연세 세브란스 병원',
    dept: [
      '응급의학과',
      '내과',
      '외과',
      '산부인과',
      '성형외과',
      '신경과',
      '영상의학과',
      '이비인후과',
      '정형외과',
      '피부과',
      '정신건강의학과',
    ],
  },
  3: {
    hospital: '고려대학교 안암병원',
    dept: [
      '응급의학과',
      '소화기내과',
      '흉부외과',
      '정신건강의학과',
      '순환기내과',
      '간담췌외과',
      '산부인과',
      '신경과',
      '정형외과',
      '핵의학과',
      '가정의학과',
    ],
  },
};

export const getLevel = (level: string) => {
  if (level == 'PK') {
    return '본과실습생';
  } else if (level == 'INTERN') {
    return '인턴';
  } else if (level == 'RESIDENT') {
    return '전공의';
  } else if (level == 'FELLOW') {
    return '전문의';
  }
};
