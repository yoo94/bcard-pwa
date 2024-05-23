

const callApi = async (apiName: string, data: object, method?: string) => {
  try {
    const response = await fetch(`https://bcard-server.vercel.app/${apiName}`, {
      method: method ? method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert data');
    }

    // Ensure we read the response body only once

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
export default callApi;