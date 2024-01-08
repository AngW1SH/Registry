import React, { FC, useEffect, useRef, useState } from "react";
import {
  ChangeFile,
  DeleteFile,
  FileButton,
  SelectedFile,
  SelectedFileContainer,
  TypographyAsterisk,
  TypographyFlex,
} from "./styles";
import { Icon } from "@strapi/design-system";
import { Pencil, Trash } from "@strapi/icons";
import Marginer from "../Marginer";
import { convert, useFormStore } from "../../entities/Form";

interface FileSelectProps {}

const FileSelect: FC<FileSelectProps> = () => {
  const labelRef = useRef<HTMLInputElement>();

  const [file, setFile] = useState<File | null>();

  const { form, setResults } = useFormStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setFile(files[0]);
  };

  useEffect(() => {
    if (file && form) convert(file, form.type, setResults);
    if (!file) setResults([]);
  }, [file]);

  if (!form) return <></>;

  return (
    <>
      <TypographyFlex
        variant="pi"
        textColor="neutral800"
        fontWeight="bold"
        as="label"
      >
        <span>Select File</span>
        <TypographyAsterisk textColor="danger600">*</TypographyAsterisk>
      </TypographyFlex>
      <Marginer vertical={4} />
      <input
        onChange={handleFileChange}
        hidden
        id="fileinput"
        name="file-input"
        type="file"
      />
      {!file && (
        <FileButton tabIndex={0} htmlFor="fileinput">
          Select File
        </FileButton>
      )}
      {file && (
        <SelectedFileContainer>
          <SelectedFile>{file.name}</SelectedFile>
          <Marginer horizontal={30} />
          <DeleteFile onClick={() => setFile(null)}>
            <Icon>
              <Trash />
            </Icon>
          </DeleteFile>
        </SelectedFileContainer>
      )}
    </>
  );
};

export default FileSelect;
