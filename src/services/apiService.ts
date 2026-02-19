// This service interacts with the Python backend on Render
const API_BASE = "https://built-theory-elite.onrender.com/api"; 

export const processTool = async (toolId: string, formData: FormData): Promise<Blob> => {
  try {
    const response = await fetch(`${API_BASE}/${toolId}`, {
      method: 'POST',
      body: formData,
    });

    // RECTIFIED: If server returns 404, 500, or 403, we must handle the error
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server Error (${response.status}):`, errorText);
        
        // We throw an actual error so Workspace.tsx knows to stop
        throw new Error(`Server Error: ${response.status}. Please check backend logs.`);
    }

    const blob = await response.blob();

    // RECTIFIED: Final check to ensure we didn't get an empty response
    if (blob.size < 100) {
        throw new Error("The server returned an empty or invalid file.");
    }

    return blob;

  } catch (error) {
    console.error("Connection Error:", error);
    // RECTIFIED: Stop the simulation. Throw the error to the UI.
    throw error; 
  }
};
