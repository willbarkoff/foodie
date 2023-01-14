import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

import 'mapbox-gl/dist/mapbox-gl.css';

let root = createRoot(document.querySelector("#app")!);
root.render(<React.StrictMode>
    <App />
</React.StrictMode>)