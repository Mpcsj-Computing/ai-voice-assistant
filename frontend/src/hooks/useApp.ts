import { useEffect } from "react";
import { APP_CONFIG } from "../configuration";

export interface HomeProps {
  backendUrl: string;
}

const useApp = ({ backendUrl }: HomeProps) => {
  console.log("backendUrl>>", backendUrl);

  useEffect(() => {
    APP_CONFIG.BACKEND_URL = backendUrl;
  }, [backendUrl]);
};

export default useApp;
