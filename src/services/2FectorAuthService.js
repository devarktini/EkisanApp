import { YOUR_API_KEY } from "../constants/Constant";

export const sendOtp = async (phoneNumber, otpTemplateName) => {
  const url = `https://2factor.in/API/V1/${YOUR_API_KEY}/SMS/${phoneNumber}/AUTOGEN/${otpTemplateName}`;

  try {
    const response = await fetch(url, {
      method: "GET", // Use GET method as per the API documentation
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.Message || "Failed to send OTP"}`);
    }

    const data = await response.json();
    console.log("OTP sent successfully:", data);
    return data; // Return the response data for further processing
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const handleResendOtp = async (phoneNumbers, otpTemplateName) => {
  try {
    const phoneNumber = `+91${phoneNumbers}`; // Format the phone number as needed

    const response = await sendOtp(phoneNumber, otpTemplateName);
    console.log("OTP resend response:", response);
    return response;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};

// Function to verify OTP via SMS
export const verifyOtp = async (phoneNumber, otpEnteredByUser) => {
  console.log("first", phoneNumber, otpEnteredByUser);
  const url = `https://2factor.in/API/V1/${YOUR_API_KEY}/SMS/VERIFY3/${phoneNumber}/${otpEnteredByUser}`;

  try {
    const response = await fetch(url, {
      method: "GET", // Use GET method as per the API documentation
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.Details || "Failed to verify OTP"}`);
    }

    const data = await response.json();
    console.log("OTP verified successfully:", data);
    return data; // Return the response data for further processing
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to send OTP via SMS
