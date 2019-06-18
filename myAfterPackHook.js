exports.default = async function(context) {
    await execShell(["chmod", ["4755", path.join("./dist/linux-unpacked/chrome-sandbox", "chrome-sandbox")]]);
}
