import { Routes } from './routes';
import { AuthProvider } from './hooks/authContext';

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}