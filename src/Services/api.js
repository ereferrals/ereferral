const BASE_URL = "https://api.cccereferral.com";
const Email_URL = "";

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
      body: formData,
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
}

export const generateOTP = async () => {
  //const formData = new FormData();
  //formData.append("email", emailval);
  try {
    const response = await fetch(`${BASE_URL}/OTP/generate`, {
      method: "POST",
      //body: formData,
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
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
    
    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const validateReCaptcha = async (captchavalue) => {
  const formData = new FormData();
  formData.append("recaptchaResponse", captchavalue);
  try {
    const response = await fetch(`${BASE_URL}/Recaptcha/ValidateRecaptcha`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const validateDomain = async (emailval) => {
  const formData = new FormData();
  formData.append("email", emailval);
  try {
    const response = await fetch(`${BASE_URL}/SPData/ValidateDomain`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const clearSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/ClearSession`, {
      method: "POST",
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const getNHSNumbers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "GET",
      credentials: "include"
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
      method: "GET",
      credentials: "include"
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);
      return data;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const getReferralTypeStages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/GetReferralTypeStages`, {
      method: "POST",
      credentials: "include"
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);
      return data;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
};

export const uploadFileToLib = async (file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));

  try {
    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: 'POST',
      body: formData,
      credentials: "include"
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
      credentials: "include"
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
      body: formData,
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
}

export const resetSession = async () => {debugger
  try {
    const response = await fetch(`${BASE_URL}/Session/ResetSession`, {
      method: "POST",
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.text();
      console.log("Response:", responseBody);
      return responseBody;
    } else if (response.status === 400) {
      const errorResponse = await response.text();
      console.error("Bad Request:", errorResponse);
      throw new Error(`Bad Request (Status Code: ${response.status}): ${errorResponse}`);
    } else if (response.status === 500) {
      const errorResponse = await response.text();
      console.error("Internal Server Error:", errorResponse);
      throw new Error(`Internal Server Error (Status Code: ${response.status}): ${errorResponse}`);
    } else {
      throw new Error("Unexpected error: " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Request failed: " + error.message);
  }
}

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
