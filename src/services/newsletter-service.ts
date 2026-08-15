import { API_URL } from "../config/api";

interface RegisterNewsletterRequest {
  email: string;
}

export const registerNewsletter = async (data: RegisterNewsletterRequest) => {
  let response;

  try {
    response = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error(
      'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
      { cause: error },
    );
  }
  const responseApi = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error(responseApi.message);
    }
    throw new Error('Não foi possível cadastrar o e-mail. Tente novamente.');
  }

  return responseApi;
};
