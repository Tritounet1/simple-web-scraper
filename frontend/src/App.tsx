import { Input, Stack } from "@chakra-ui/react"
import { Button } from "./components/ui/button"
import { RiArrowRightLine } from "react-icons/ri"
import { useState } from "react"

const App = () => {

  const[loading, setLoading] = useState(false)
  const[file, setFile] = useState("")
  const[url, setUrl] = useState("")
  const[confirmButton, setConfirmButton] = useState(false)

  const urlIsValid = (url: string) => {
    try {
      new URL(url);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
  console.log(import.meta.env);

  const download = async () => {
    if (url === "" || !urlIsValid(url)) {
      return;
    }
    setConfirmButton(true);
    setLoading(true);
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000";
    const apiUrl = `${backendUrl}/api/content_scraper/${url}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "downloaded_file.zip";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches[1]) {
          filename = matches[1];
        }
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setFile(url);
      console.log("File downloaded:", filename);
    } catch (error) {
      console.error("An error occurred while downloading the file:", error);
    } finally {
      setLoading(false);
      setConfirmButton(false);
    }
  };

  const handleDownload = () => {
    if (!file) {
      return;
    }
    const a = document.createElement("a");
    a.href = file;
    a.download = "downloaded_file";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(file);
    setFile("");
    document.body.removeChild(a);
  };

  return (
    <>
      <Stack padding={"5%"} gap="4">
        <Input width={"30%"} placeholder="url" variant="flushed" onChange={e => setUrl(e.target.value)}/>
        <Button width={"8%"} colorPalette="teal" variant="outline" onClick={download}>
          Confirm <RiArrowRightLine />
        </Button>
        {confirmButton && loading && <Button width={"8%"} loading>Download</Button>}
        {file != "" && <Button width={"8%"} onClick={handleDownload}>Download</Button>}
      </Stack>
    </>
  )
}

export default App