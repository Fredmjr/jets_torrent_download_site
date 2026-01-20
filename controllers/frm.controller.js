import childProcess from "child_process";

export function killPortLinux(port) {
  childProcess.execSync(`kill -9 $(lsof -t -i:${port})`);
}

export function killPortWindows(port) {
  childProcess.execSync(
    `for /f "tokens=5" %a in ('netstat -ano ^| findstr ${port}') do taskkill /F /PID %a`
  );
}

//Min
export const minUrl = async (req, res) => {
  try {
    return res.status(200).send("min");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to minimize window!",
    });
  }
};
//Max
export const mxUrl = async (req, res) => {
  try {
    return res.status(200).send("mx");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to maxmize window!",
    });
  }
};
//Max
export const clsUrl = async (req, res) => {
  const port = 8102;

  if (process.platform === "win32") {
    killPortWindows(port);
  } else {
    killPortLinux(port);
  }

  try {
    return res.status(200).send("close");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      erMgs: "Unable to close window",
    });
  }
};
