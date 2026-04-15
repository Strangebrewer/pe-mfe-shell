import React, { SyntheticEvent, useState } from "react";
import { Modal, Button } from "@bka-stuff/pe-mfe-utils";
import { useLogin } from '../hooks/userHooks';

type LoginModalProps = {
  isOpen: boolean;
  close: () => any;
}

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
      setError(status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.');
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
      <form onSubmit={submit} className="tw:p-[16px]">
        <h2 className="tw:text-[24px] tw:font-semibold tw:text-center tw:my-[8px]">Login</h2>
        <div>
          <label className="tw:block">email</label>
          <input className="tw:block tw:w-full" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} style={{ border: '1px solid black ' }} />
        </div>
        <div>
          <label className="tw:block">password</label>
          <input className="tw:block tw:w-full" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} style={{ border: '1px solid black ' }} />
        </div>
        {error && <p className="tw:text-red-600 tw:text-sm tw:mt-[8px]">{error}</p>}
        <div className="tw:flex tw:justify-center tw:gap-[8px] tw:py-[8px]">
          <button type="submit" style={{ display: 'none' }} />
          <Button text="cancel" variant="red" onClick={closeModal} />
          <Button text="submit" variant="blue" last onClick={submit} />
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
