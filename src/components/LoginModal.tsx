import React, { SyntheticEvent, useState } from 'react';
import { Modal, Button, Label, Input } from '@bka-stuff/pe-mfe-utils';
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
      <form onSubmit={submit} className="tw:flex tw:flex-col tw:p-[32px] tw:px-[48px]">
        <h2 className="tw:text-[24px] tw:font-semibold tw:text-center tw:my-[8px]">Login</h2>

        <div className="tw:py-[8px]">
          <Label text="email" />
          <Input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="tw:py-[8px]">
          <Label text="password" />
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="tw:relative tw:h-[12px]">
          {error && <p className="tw:absolute tw:inset-0 tw:text-red tw:text-sm">{error}</p>}
        </div>

        <div className="tw:flex tw:justify-center tw:py-[8px]">
          <button type="submit" style={{ display: 'none' }} />
          <Button text="cancel" color="red" onClick={closeModal} />
          <Button text="submit" color="blue" last onClick={submit} />
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
