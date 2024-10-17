export enum COL_DATA_TYPE {
  TEXT,
  NUMBER,
  CURRENCY,
  DATE,
  INDEX,
  SELECTION
}

export type FIX_COLUMN = 'left' | 'right' | 'none'

export type filterItem = {
  title: string
  name: string
  type?: 'number' | 'date' | 'date-range' | 'text' | 'phone-number' | 'select' | 'email-date'
  data?: any
  value?: any
}

export const FilterType: { [ key: string ]: filterItem } = {
  createdDate: {
    title: 'created_at',
    name: 'createdDate',
    type: "date-range",
  },
  ticketType: {
    title: 'ticket_type',
    name: 'ticket',
  },
  studentName: {
    title: 'learner_name',
    name: 'name',
  },
  fullName: {
    title: 'learner_name',
    name: 'fullName',
  },
  studentNameAttendance: {
    title: 'learner_name',
    name: 'studentName',
  },
  mobile: {
    title: 'phone_number',
    name: 'mobile',
  },
  email: {
    title: 'Email',
    name: 'email',
  },
  studentCode: {
    title: 'learner_code',
    name: 'code',
  },
  emailRef: {
    title: 'referrer',
    name: 'emailRef',
  },
  lecturerName: {
    title: 'teacher_name',
    name: 'lecturerName',
  },
  caregiverName: {
    title: 'caring_by',
    name: 'caregiverName',
  },
  userRefName: {
    title: 'referrer',
    name: 'userRefName',
  },
  courseName: {
    title: 'course_name',
    name: 'courseName',
  },
  price: {
    title: 'price',
    name: 'price',
  },
  landingPageName: {
    title: 'landing_page_name',
    name: 'landingPageName',
  },
  isAuthEmail: {
    title: 'email_verification',
    name: 'isAuthEmail',
    type: "select",
    value: true,
    data: [
      {
        label: 'verified',
        key: true
      },
      {
        label: 'unverified',
        key: false
      }
    ]
  },
  isAccount: {
    title: 'status',
    name: 'isAccount',
    type: "select",
    value: true,
    data: [
      {
        label: 'has_account',
        key: true
      },
      {
        label: 'unregistered',
        key: false
      }
    ]
  },
  isPay: {
    title: 'payment',
    name: 'isPay',
    type: "select",
    value: true,
    data: [
      {
        label: 'unpaid',
        key: 0
      },
      {
        label: 'fully_paid',
        key: 1
      },
      {
        label: 'partial_paid',
        key: 2
      },
      {
        label: 'over_paid',
        key: 3
      },
      {
        label: 'refunded',
        key: 4
      },
      {
        label: 'excess_refunded',
        key: 5
      }
    ]
  },
  organizationName: {
    title: 'organization',
    name: 'organizationName',
  },
  className: {
    title: 'class_name',
    name: 'className',
  },
  area: {
    title: 'area',
    name: 'area',
    type: "select",
    value: 1,
    data: [
      {
        label: 'the_north',
        key: 1
      },
      {
        label: 'the_central',
        key: 2
      },
      {
        label: 'the_south',
        key: 3
      }
    ]
  },
  tag: {
    title: 'tag',
    name: 'tagNote',
    type: "select",
    data: [
      {
        label: 'Không nghe máy lần 1',
        key: 1
      },
      {
        label: 'Không nghe máy lần 2',
        key: 2
      },
      {
        label: 'Sai số điện thoại',
        key: 3
      },
      {
        label: 'Khách hàng chặn zalo',
        key: 4
      },
      {
        label: 'Đã gửi tin nhắn zalo',
        key: 5
      },
      {
        label: 'Không có nhu cầu',
        key: 6
      },
      {
        label: 'Hẹn chuyển khoản',
        key: 7
      },
      {
        label: 'Khách hàng chặn cuộc gọi',
        key: 8
      },
    ]
  },
  speakerName: {
    title: 'teacher_name',
    name: 'speakerName',
  },
  nameForm: {
    title: 'form_name',
    name: 'title',
  },
  lessonName: {
    title: 'lesson_name',
    name: 'lessonName',
  },
  studentPhoneNumber: {
    title: 'phone_number',
    name: 'studentPhoneNumber',
  },
  studentEmail: {
    title: 'Email',
    name: 'studentEmail',
  },
  emailSendBy: {
    title: 'sender',
    name: 'emailSendBy',
  },
  emailReceiveBy: {
    title: 'receiver',
    name: 'emailReceiveBy',
  },
  subject: {
    title: 'email_type',
    name: 'subject',
  },
  emailDate: {
    title: 'sent_date',
    name: 'emailDate',
    type: 'email-date'
  },
  bankAccountNumber: {
    title: 'account_number_receiver',
    name: 'bankAccountNumber',
  },
  bankAccountHolder: {
    title: 'account_holder',
    name: 'bankAccountHolder',
  },
  bankName: {
    title: 'bank',
    name: 'bankName',
  },
  verifyPay: {
    title: 'tag',
    name: 'verifyPay',
    type: "select",
    data: [
      {
        label: 'Đã xác thực',
        key: true
      },
      {
        label: 'Chưa xác thực',
        key: false
      }
    ]
  },
  staffName: {
    title: 'staff_name',
    name: 'fullName',
  }
}


