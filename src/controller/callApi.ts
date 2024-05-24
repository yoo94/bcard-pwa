const callApi = async (apiName: string, data: object, method?: string) => {
  try {
    const response = await fetch(`http://localhost:3000/${apiName}`, {
      method: method ? method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
export default callApi;
