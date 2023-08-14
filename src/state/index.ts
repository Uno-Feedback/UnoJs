import {StateType} from './type';

const state: StateType = {
  fullName: null,
  email: null,
  avatar: null,
  requestUrl: null,
  apiKey: null,
  autoSecretDataAttribute: null,
};
export default state;

export const lang = {
  fa: {
    requestForm: {
      title: 'ارسال بازخورد',
      submit: 'ارسال بازخورد',
      sender: 'فرستنده',
      subject: 'موضوع',
      description: 'توضیحات',
      type: {
        bug: 'باگ',
        feature: 'پیشنهاد ویژگی',
        report: 'گزارش',
      },
      priority: {
        low: 'کم',
        medium: 'متوسط',
        high: 'زیاد',
      }
    },
  },
};