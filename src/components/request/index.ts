import optionsState from '../../state';
import { StoreInterface } from '../requestForm/type';

const request = async (recordedBlob: Blob, fileName: string, values: StoreInterface) => {

    const file = new File([recordedBlob], fileName);
    const formData = new FormData();

    const description = {
        'FullName': optionsState.user.fullName,
        'Subject': values['subject'],
        'Description': values['description'],
        'Type': values['type'],
        'Priority': values['priority'],
        'apiKey': optionsState.subscriptionData.apiKey,
    };

    formData.append('File', file, `${fileName}.webm`);
    formData.append('Description', JSON.stringify(description));

    const response = await fetch(optionsState.subscriptionData.requestUrl, {
        method: 'POST',
        body: formData,
    });

    return response.json();
};

export default request;