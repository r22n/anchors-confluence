const fs = require("fs");

const indexjs = fs.readFileSync("dist/index.js", { encoding: "utf-8" });
const lic = fs.readFileSync("LICENSE", { encoding: "utf-8" });
const out = fs.createWriteStream("dist/index.html", { encoding: "utf-8" });

out.write("<script>\n");
out.write(indexjs);
out.write("/*\n");
out.write(lic);
out.write("*/\n")
out.write("</script>\n");

