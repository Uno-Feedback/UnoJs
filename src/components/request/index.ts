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
  const ProjectToken = "068F706D-5C3D-4490-AC11-08DC0EADED53"; // optionsState.subscriptionData.apiKey;
  const AttachmentType = 10;
  const ConnectorId = "2CF4C00E-4D6E-4DCD-095E-08DC0EADF6FE";

  // Payload example
  // {
  //    "ProjectToken": "",
  //    "Reporter": "",
  //    "ConnectorId": "",
  //    "Subject": "",
  //    "ClientMetaData":{
  //       "URL:":"https://jira.asax.ir/secure/RapidBoard.jspa?rapidView=10652&view=detail&selectedIssue=SD-5559",
  //       "Captured:":"2024/01/03 at 11:52:40",
  //       "Device Information:":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  //       "OS:":"Windows",
  //       "Window Size:":"1920 x 963"
  //    },
  //    "ReportUrl":"",
  //    "File":"",
  //    "ConnectorMetaData":{
  //       "IssueType":"Uno-Report",
  //       "IssuePriority":"Low"
  //    },
  //    "Description":"",
  //    "AttachmentType":""
  // }

  // Append the audio file and description to the FormData
  formData.append("ProjectToken", JSON.stringify(ProjectToken));
  formData.append("Reporter", JSON.stringify(Reporter));
  formData.append("ConnectorId", JSON.stringify(ConnectorId));
  formData.append("Subject", JSON.stringify(Subject));
  formData.append("ConnectorMetaData", JSON.stringify(ConnectorMetaData));
  formData.append("ReportUrl", JSON.stringify(ReportUrl));
  formData.append("File", file, `${fileName}.webm`);
  formData.append(
    "ConnectorMetaData",
    JSON.stringify({
      IssueType: JSON.stringify(Type),
      IssuePriority: JSON.stringify(Priority)
    })
  );
  formData.append("Description", JSON.stringify(Description));
  formData.append("AttachmentType", JSON.stringify(AttachmentType));

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
