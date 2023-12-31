/**
 * This file contains a function for sending a request.
 */

// Import the necessary types from the "type" module.
import optionsState from "../../shared/states";
import {StoreInterface, InformationInterface} from "../report-form/type";

/**
 * Function to send a request along with recorded audio file and form values.
 *
 * @param recordedBlob - The recorded audio blob to be sent.
 * @param fileName - The name of the audio file.
 * @param values - Form values containing user input.
 * @returns response - A promise containing the JSON response from the server.
 */

const request = async (
  recordedBlob: Blob,
  fileName: string,
  {storeValues, information}: {storeValues: StoreInterface; information: InformationInterface[]}
) => {
  // -ProjectToken
  // AttachmentType
  // -Subject
  // -Description
  // -Reporter
  // -ReportUrl
  // -ConnectorMetaData
  // ConnectorId
  // File

  const metaDataConverter = (information: InformationInterface[]) => {
    const metadata = {} as Record<string, string>;
    information.forEach(item => {
      metadata[item.label] = item.data;
    });
    return metadata;
  };

  // Create a File instance from the recordedBlob
  const file = new File([recordedBlob], fileName);

  // Create a FormData instance to send data to the server
  const formData = new FormData();

  const Reporter = optionsState.user.fullName;
  const ReportUrl = window.location.href;
  const Subject = storeValues["subject"];
  const Description = storeValues["description"];
  const Type = storeValues["type"];
  const Priority = storeValues["priority"];
  const ConnectorMetaData = metaDataConverter(information);
  const ProjectToken = optionsState.subscriptionData.apiKey;
  const AttachmentType = 10;
  const ConnectorId = "886cc999-ff80-402d-a80a-08dbf5779ea5";

  // Append the audio file and description to the FormData
  formData.append("File", file, `${fileName}.webm`);
  formData.append("Reporter", JSON.stringify(Reporter));
  formData.append("ReportUrl", JSON.stringify(ReportUrl));
  formData.append("Subject", JSON.stringify(Subject));
  formData.append("Description", JSON.stringify(Description));
  formData.append("Type", JSON.stringify(Type));
  formData.append("Priority", JSON.stringify(Priority));
  formData.append("ConnectorMetaData", JSON.stringify(ConnectorMetaData));
  formData.append("ProjectToken", JSON.stringify(ProjectToken));
  formData.append("AttachmentType", JSON.stringify(AttachmentType));
  formData.append("ConnectorId", JSON.stringify(ConnectorId));

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
