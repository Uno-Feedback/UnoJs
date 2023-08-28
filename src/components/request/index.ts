/**
 * This file contains a function for sending a request.
 */

// Import necessary types from the "type" module.
import optionsState from "../../shared/states";
import {StoreInterface} from "../requestForm/type";

/**
 * Function to send a request along with recorded audio file and form values.
 *
 * @param recordedBlob - The recorded audio blob to be sent.
 * @param fileName - The name of the audio file.
 * @param values - Form values containing user input.
 * @returns response - A promise containing the JSON response from the server.
 */
const request = async (recordedBlob: Blob, fileName: string, values: StoreInterface) => {
  // Create a File instance from the recordedBlob
  const file = new File([recordedBlob], fileName);

  // Create a FormData instance to send data to the server
  const formData = new FormData();

  // Construct the description object
  const description = {
    FullName: optionsState.user.fullName,
    Subject: values["subject"],
    Description: values["description"],
    Type: values["type"],
    Priority: values["priority"],
    apiKey: optionsState.subscriptionData.apiKey
  };

  // Append the audio file and description to the FormData
  formData.append("File", file, `${fileName}.webm`);
  formData.append("Description", JSON.stringify(description));

  // Send the request using the fetch API
  const response = await fetch(optionsState.subscriptionData.requestUrl, {
    method: "POST",
    body: formData
  });

  // Parse and return the JSON response from the server
  return response.json();
};

// Export the request function as the default export
export default request;
