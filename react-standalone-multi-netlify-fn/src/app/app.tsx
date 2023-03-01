// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
const helloReq: Promise<any> = fetch('/.netlify/functions/hello-world').then(
  (res) => res.json()
);
const goodByeReq: Promise<any> = fetch(
  '/.netlify/functions/goodbye-world'
).then((res) => res.json());

export function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    helloReq.then((r) => {
      setMessage(r.message);
    });
  }, []);
  setTimeout(() => {
    goodByeReq.then((r) => {
      setMessage(r.message);
    });
  }, 5_000);
  return (
    <>
      {message}
      {/* <NxWelcome title="react-standalone-multi-netlify-fn" /> */}

      {/* <div /> */}
    </>
  );
}

export default App;
