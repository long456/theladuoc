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
  title : string
  name: string
  type?: 'number' | 'date' | 'date-range' | 'text' | 'phone-number' | 'select'
  data?: any
  value?: any
}

export const FilterType: {[key: string]: filterItem} = {
  createdDate: {
    title: 'Ngày đăng ký',
    name: 'createdDate',
    type: "date-range"
  },
  ticketType: {
    title: 'Loại vé',
    name: 'ticket',
  },
  studentName: {
    title: 'Tên học viên',
    name: 'name',
  },
  mobile: {
    title: 'Số điện thoại',
    name: 'mobile',
  },
  email: {
    title: 'Email',
    name: 'email',
  },
  studentCode: {
    title: 'Mã học viên',
    name: 'code',
  },
  userRef:{
    title: 'Người giới thiệu',
    name: 'userRef',
  },
  lecturerName:{
    title: 'Tên diễn giả',
    name: 'lecturerName',
  },
  caregiverName:    {
    title: 'Nhân viên chăm sóc',
    name: 'caregiverName',
  },
  courseName:{
    title: 'Tên khóa học',
    name: 'courseName',
  },
  price: {
    title: 'Số tiền',
    name: 'price',
  },
  landingPageName: {
    title: 'Tên landing page',
    name: 'landingPageName',
  },
  isAuthEmail:{
    title: 'Xác thực email',
    name: 'isAuthEmail',
    type: "select",
    value: true,
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
  isAccount: {
    title: 'Trạng thái',
    name: 'isAccount',
    type: "select",
    value: true,
    data: [
      {
        label: 'Đã có tài khoản',
        key: true
      },
      {
        label: 'Chưa có tài khoản',
        key: false
      }
    ]
  },
  isPay: {
    title: 'Thanh toán',
    name: 'isPay',
    type: "select",
    value: true,
    data: [
      {
        label: 'Chưa thanh toán',
        key: 0
      },
      {
        label: 'Đã thanh toán',
        key: 1
      },
      {
        label: 'Thanh toán một phần',
        key: 2
      },
      {
        label: 'Thanh toán thừa',
        key: 3
      },
      {
        label: 'Hoàn tiền',
        key: 4
      },
      {
        label: 'Hoàn tiền thừa',
        key: 5
      }
    ]
  },
  organizationName: {
    title: 'Thuộc tổ chức',
    name: 'organizationName',
  },
  className:{
    title: 'Tên lớp',
    name: 'className',
  },
  area: {
    title: 'Khu vực',
    name: 'area',
    type: "select",
    value: 1,
    data: [
      {
        label: 'Miền Bắc',
        key: 1
      },
      {
        label: 'Miền Trung',
        key: 2
      },
      {
        label: 'Miền Nam',
        key: 3
      }
    ]
  },
  tag: {
    title: 'Thẻ tag',
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
  speakerName:{
    title: 'Tên diễn giả',
    name: 'speakerName',
  },
  nameForm:{
    title: 'Tên form',
    name: 'title',
  },
}


