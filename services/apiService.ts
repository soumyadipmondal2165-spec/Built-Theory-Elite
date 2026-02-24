// This service interacts with the Python backend provided in the context
const API_BASE = "/api"; 

export const processTool = async (toolId: string, formData: FormData): Promise<Blob> => {
  try {
    // Add the action to the formData if not present (assuming toolId is the action)
    if (!formData.has('action')) {
        formData.append('action', toolId);
    }

    const response = await fetch(`${API_BASE}/worker`, {
      method: 'POST',
      body: formData,
    });

    if (response.status === 402) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Pro Upgrade Required");
    }

    if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
