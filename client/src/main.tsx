import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Howler } from 'howler';

// Set global volume for Howler
Howler.volume(1.0);

createRoot(document.getElementById("root")!).render(<App />);
