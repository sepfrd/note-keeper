import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
plugins: [
react(),
svgr({
svgrOptions: {
icon: true,
},
}),
tailwindcss(),
],
server: {
port: 3000,
},
resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
});
