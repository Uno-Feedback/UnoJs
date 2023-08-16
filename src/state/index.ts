import { Options } from '../types';

const optionsState: Options = {
    user: {
        fullName: '',
        email: '',
        avatar: ''
    },
    subscriptionData: {
        apiKey: '',
        requestUrl: ''
    },
    startButtonId: '',
    videoMaxLength: 1
};

export default optionsState;

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