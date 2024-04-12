import axios from "axios";

const getAllPatientOrders = async () => {
  try {
    const response = await axios.get("http://localhost:5000/prescription");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const patientPrescriptionDelete = async (prescriptionId, medicineId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/prescription/${prescriptionId}/medicine/${medicineId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllMedicine = async () => {
  try {
    const response = await axios.get("http://localhost:5000/medicine");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addmedicinetoPrescription = async (prescriptionId, medicineId) => {
  console.log(prescriptionId, medicineId);

  try {
    const response = await axios.post(
      `http://localhost:5000/prescription/${prescriptionId}/medicine/${medicineId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

async function getMediaUrl(mediaId) {
  if (!mediaId) {
    return null;
  }

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${mediaId}/`,
      {
        headers: {
          Authorization: `Bearer EAAWbIHcVvFQBOZC7Xrm4595pGAsQpWk2nH9PVjZCSr0dVM0PS9puc8wvc69GhzmfFjOb5M4Ye71F5VpJ5BOzWEmE0oDrWsdt0WuUfgBsXrlUMFHgrr35uCx28DQ0ifBZA9NULdaAg3qPhWS3dO6Q88JfzLkX4ZAFC6fV0AZAfOKPgYPnWbTOReLpckoQ3ZCssa8cwg4ZAV5NZCDSO0OLkjEZD`,
        },
      }
    );

    console.log(response.data.url);

    return response.data.url;
  } catch (error) {
    console.error("Error retrieving media URL:", error);
    throw error;
  }
}

async function downloadMedia(mediaUrl) {
  try {
    const response = await axios.get(mediaUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer EAAWbIHcVvFQBOZC7Xrm4595pGAsQpWk2nH9PVjZCSr0dVM0PS9puc8wvc69GhzmfFjOb5M4Ye71F5VpJ5BOzWEmE0oDrWsdt0WuUfgBsXrlUMFHgrr35uCx28DQ0ifBZA9NULdaAg3qPhWS3dO6Q88JfzLkX4ZAFC6fV0AZAfOKPgYPnWbTOReLpckoQ3ZCssa8cwg4ZAV5NZCDSO0OLkjEZD`,
      },
    });
  } catch (error) {
    console.error("Error downloading media:", error);
    throw error;
  }
}

async function createOrder(prescriptionId) {
  try {
    const response = await axios.post(
      `http://localhost:5000/order/${prescriptionId}/`
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getallOrders() {
  try {
    const response = await axios.get("http://localhost:5000/order");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchImage() {
  try {
    const response = await axios.get(
      "http://localhost:5000/prescription/image"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export {
  getAllPatientOrders,
  getMediaUrl,
  downloadMedia,
  patientPrescriptionDelete,
  getAllMedicine,
  addmedicinetoPrescription,
  fetchImage,
  getallOrders,
  createOrder,
};
