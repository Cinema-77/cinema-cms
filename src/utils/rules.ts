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
    validate: {
      thoiluong: (value: string) =>
        /^[0-9]*$/.test(value) || 'Thời lượng là số, không phải là ký tự.',
    },
  },
  age: {
    required: {
      value: true,
      message: 'Tuổi là bắt buộc nhập',
    },
    validate: {
      thoiluong: (value: string) => /^[0-9]*$/.test(value) || 'Tuổi là số, không phải là ký tự.',
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
  theloai: {
    required: {
      value: true,
      message: 'Thể loại là bắt buộc nhập',
    },
    maxLength: {
      value: 160,
      message: 'Thể loại có độ dài tối đa là 160 ký tự',
    },
  },
  loaiman: {
    required: {
      value: true,
      message: 'Loại màn là bắt buộc check',
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
