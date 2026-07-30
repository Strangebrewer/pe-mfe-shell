import React, { SyntheticEvent, useState } from 'react';
import { Modal, Input, ModalContent, InputGroup, ModalButtons } from '@bka-stuff/pe-mfe-utils';
import { useLogin } from '../hooks/userHooks';

type LoginModalProps = {
  isOpen: boolean;
  close: () => any;
};

const LoginModal: React.FC<LoginModalProps> = ({ close, isOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login] = useLogin();

  async function submit(e?: SyntheticEvent) {
    e?.preventDefault();
    setError('');
    try {
      await login({ email, password });
      closeModal();
    } catch (err: any) {
      const status = err?.response?.status;
      setError(
        status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.',
      );
    }
  }

  function closeModal() {
    setEmail('');
    setPassword('');
    setError('');
    close();
  }

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <ModalContent heading="Login">
        <form onSubmit={submit} className="tw:flex tw:flex-col tw:gap-4">
          <InputGroup label="email">
            <Input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup label="password">
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <div className="tw:relative tw:h-[12px]">
            {error && <p className="tw:absolute tw:inset-0 tw:text-red tw:text-sm">{error}</p>}
          </div>

          <ModalButtons
            onClose={closeModal}
            onConfirm={submit}
            confirmText="submit"
            confirmColor="blue"
          />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
