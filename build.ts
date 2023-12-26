import { transform, Features } from "lightningcss";

// Build CSS
const { code } = transform({
    filename: "style.css",
    code: new Uint8Array(await Bun.file("./src/style.css").arrayBuffer()),
    include: Object.values(Features).reduce((a, b) => a | b, 0),
    minify: true
});
Bun.write("./dist/style.css", code);

// Build HTML
Bun.write("./dist/index.html", Bun.file("./src/index.html"));

// Copy favicon
Bun.write("./dist/favicon.ico", Bun.file("./src/favicon.ico"));
