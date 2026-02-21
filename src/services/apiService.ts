// This service interacts with your new Python Web Service on Render
const API_BASE = "https://soumyadipmondal2165-built-theory-pro.hf.space/api"; 

export const processTool = async (toolId: string, formData: FormData): Promise<Blob> => {
  try {
    const response = await fetch(`${API_BASE}/${toolId}`, {
      method: 'POST',
      body: formData,
    });

    // 1. Error Guard: Handles 404, 500, or 403 errors strictly
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Backend Logic Error (${response.status}):`, errorText);
        
        // This stops the "Processing" spinner and alerts the user
        throw new Error(`Server Error: ${response.status}. The backend failed to process this conversion.`);
    }

    // 2. Data Retrieval: Gets the real binary file (Blob) from Python
    const blob = await response.blob();

    // 3. Validation: Ensures the file isn't empty or a tiny error string
    if (blob.size < 150) {
        throw new Error("The server returned an invalid document. Please check the source file format.");
    }

    return blob;

  } catch (error) {
    console.error("Network or Backend Connection Error:", error);
    // Important: Rethrow so Workspace.tsx can show the "Failed to fetch" popup
    throw error; 
  }
};
