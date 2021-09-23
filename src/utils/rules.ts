export const rules = {
  name: {
    required: {
      value: true,
      message: 'Tên Film là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Tên Film có độ dài tối đa là 160 ký tự',
    },
  },
  time: {
    required: {
      value: true,
      message: 'Thời lượng là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Thời lượng có độ dài tối đa là 160 ký tự',
    },
  },
  daodien: {
    required: {
      value: true,
      message: 'Đạo diễn là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Đạo diễn có độ dài tối đa là 160 ký tự',
    },
  },
  dienvien: {
    required: {
      value: true,
      message: 'Diễn viên là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Diễn viên có độ dài tối đa là 160 ký tự',
    },
  },
  content: {
    required: {
      value: true,
      message: 'Nội dung là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Nội dung có độ dài tối đa là 160 ký tự',
    },
  },
  image: {
    required: {
      value: true,
      message: 'Image là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Image có độ dài tối đa 160 ký tự',
    },
  },
  trailer: {
    required: {
      value: true,
      message: 'Trailer là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Trailer có độ dài tối đa 160 ký tự',
    },
  },
};
