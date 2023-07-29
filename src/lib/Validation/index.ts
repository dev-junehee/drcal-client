export const emailValidation = {
  required: '이메일은 필수 입력입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일 형식에 맞지 않습니다.',
  },
};
