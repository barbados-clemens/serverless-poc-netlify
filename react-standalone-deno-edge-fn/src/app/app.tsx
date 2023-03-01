// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

const title = 'INCLUDE_TITLE';
export function App() {
  return (
    <>
      {title}
      <NxWelcome title="react-standalone-deno-edge-fn" />

      <div />
    </>
  );
}

export default App;
