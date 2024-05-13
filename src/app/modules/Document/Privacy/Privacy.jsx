import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "../../../../.././node_modules/react-quill/dist/quill.snow.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "../../../.././_metronic/_partials/controls";
import { reqPrivacyPolicy } from "../../../services/configService";
import { sendDataofPolicy } from "../../.././services/configService";

export const Privacy = () => {
  const [bodyText, setBodyText] = useState("");
  const [draft, setDraft] = useState();

  useEffect(() => {
    reqPrivacyPolicy()
      .then((data) => data.json())
      .then((data) => {
        let htmlContent  = atob(data.result.base64Content);
        setBodyText(htmlContent);
        setDraft(data.result.isDraft);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (isDraft) => {
    let htmlToBase64 = btoa(bodyText);
    let obj = {
      base64Content: htmlToBase64,
      isDraft: isDraft
    };
    sendDataofPolicy(obj)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setDraft(isDraft)
        alert(`Privacy Policy ${isDraft ? "drafted" : "published"} successfully!!`)
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Card className="h-100" style = {{marginTop : "-40px"}}>
      <CardHeader title={`Privacy Policy ${draft ? " - Draft" : ""}`}></CardHeader>
        <CardBody>
          <ReactQuill
            theme="snow"
            placeholder="Write something...!"
            modules={Privacy.modules}
            formats={Privacy.formats}
            className="h-450px"
            value={bodyText}
            onChange={(e) => setBodyText(e)}
          />
        </CardBody>
        <CardFooter className="text-right" style={{marginTop : 45}}>
          <Button
            className="bg-primary"
            onClick={() => {
              handleClick(true)
            }}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => {
              handleClick(false)
            }}
            className="bg-primary ml-1"
          >
            Publish
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
Privacy.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }],
  ],
};
Privacy.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];
