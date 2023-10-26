const BASE_URL = "https://ereferralapi.azurewebsites.net";
const Email_URL = "https://prod-122.westeurope.logic.azure.com:443/workflows/c06414d2d9f04468bbea2ea190967ab5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dm-lLnTWj6korfDk-n5G7zefHrKfPu4QUGtpSYi_vvI";

export const emailOTP = async (data) => {
  try {
    const response = await fetch(`${Email_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to submit data");
  }
};

export const submitData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to submit data");
  }
};

export const saveData = async (data) => {
  const transformedData = transformData(data);
  const formData = new FormData();
  formData.append("jsonObject", JSON.stringify(transformedData));

  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      body: formData
    });

    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    console.log(error);
  }
};

export const generateOTP = async (emailval) => {
  const formData = new FormData();
  formData.append("email", emailval);
  try {
    const response = await fetch(`${BASE_URL}/OTP/generate`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    
    const responseBody = await response.text();
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (email, subject, emailText) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("subject", subject);
  formData.append("emailText", emailText);

  try {
    const response = await fetch(`${BASE_URL}/Email`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const validateOTP = async (otpval) => {
  const formData = new FormData();
  formData.append("otp", otpval);
  try {
    const response = await fetch(`${BASE_URL}/OTP/validate`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const validateDomain = async (domainval) => {
  const formData = new FormData();
  formData.append("domain", domainval);
  try {
    const response = await fetch(`${BASE_URL}/SPData/ValidateDomain`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const getNHSNumbers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "GET"
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getMasterData = async (type_name) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/${type_name}`, {
      method: "GET"
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getReferralTypeStages = async (domainval) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/GetReferralTypeStages`, {
      method: "POST"
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileToLib = async (file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));

  try {
    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: 'POST',
      body: formData
    });

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const uploadFiles = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFiles`, {
      method: "POST",
      body: formData
    });

    //const responseData = await response.json();

    if (!response.ok) {
      alert(response.json())
      //throw new Error("Failed to upload file1");
    }
    
    return response;
  } catch (error) {
    alert(error)
    //throw new Error("Failed to upload file2");
  }
};

export const uploadFilesTest = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFilesTest`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    alert(responseData);
    return responseData;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

const transformData = (data) => {
  const transformed = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      // Convert null values to a special symbol, e.g., 'null'
      transformed[key] = value === null ? 'null' : value;
    }
  }

  return transformed;
};
