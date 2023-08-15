import state from '../../state';
import {StoreInterface} from '../requestForm/type';

const request = async (recordedBlob: Blob, fileName: string, values: StoreInterface) => {

  const file = new File([recordedBlob], fileName);
  const formData = new FormData();

  const description = {
    'FullName': state.fullName,
    'Subject': values['subject'],
    'Description': values['description'],
    'Type': values['type'],
    'Priority': values['priority'],
    'apiKey': state.apiKey,
  };

  formData.append('File', file, `${fileName}.webm`);
  formData.append('Description', JSON.stringify(description));

  const response = await fetch(state.requestUrl, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export default request;