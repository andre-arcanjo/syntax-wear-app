import { type SubmitEvent, useState } from 'react';
import { registerNewsletter } from '../../services/newsletter-service';

export const SubscriptionForm = () => {
  const [newsletter, setNewsletter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      await registerNewsletter({
        email: newsletter,
      });
      setNewsletter('');
      setSuccessMessage('Email cadastrado com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'Não foi possível cadastrar o e-mail, tente novamente.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="newsletter">Inscreva-se em nosso e-mail</label>
      <input
        type="email"
        id="newsletter"
        name="newsletter"
        value={newsletter}
        placeholder="email@email.com"
        className="rounded-[30px] bg-white py-3 px-5 placeholder-border-alt text-text"
        onChange={(event) => setNewsletter(event.target.value)}
        disabled={isLoading}
      />

      {errorMessage && <p className="text-error">{errorMessage}</p>}

      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
