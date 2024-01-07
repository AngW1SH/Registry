import * as xlsx from "xlsx";
import { IFormQuestion, IFormQuestionGrid } from "..";
import { IFormResults, ImportStatus } from "../types";

export const convertGoogle = (
  file: File,
  callback: (results: IFormResults[]) => any
) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target?.result;

    if (!content) return;
    const workbook = xlsx.read(content, { type: "binary" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (!sheet["!ref"]) return;

    const headers = getHeaders(sheet);

    const range = xlsx.utils.decode_range(sheet["!ref"]);

    const result: IFormResults[] = [];

    for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
      // Create an object to store data for each row
      const formData: IFormQuestion[] = [];

      // Iterate through columns
      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const cellAddress = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
        const cellValue = sheet[cellAddress] ? sheet[cellAddress].v : undefined;

        const parsedColName = parseColumnName(headers[colNum]);

        if (parsedColName.subquestion) {
          const index = formData.findIndex(
            (question) => question.question == parsedColName.question
          );

          if (index == -1) {
            formData.push({
              type: "GRID",
              question: parsedColName.question,
              answers: [parsedColName.subquestion],
              rows: [cellValue],
            });
          } else if (formData[index] && formData[index].type == "GRID") {
            (formData[index] as IFormQuestionGrid).answers.push(
              parsedColName.subquestion
            );
            (formData[index] as IFormQuestionGrid).rows.push(cellValue);
          }
        } else {
          formData.push({
            type: "DEFAULT",
            question: parsedColName.question,
            answer:
              headers[colNum] == "Timestamp"
                ? getJsDateFromExcel(cellValue)
                : cellValue,
          });
        }
      }

      result.push({ status: ImportStatus.default, value: formData });
    }

    callback(result);
  };

  reader.readAsBinaryString(file);
};

function getJsDateFromExcel(excelDate: number) {
  const isDate = (date: any) =>
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime());
  const SECONDS_IN_DAY = 24 * 60 * 60;
  const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
  const MAGIC_NUMBER_OF_DAYS = 25567 + 2;

  if (!Number(excelDate)) {
    throw new Error("wrong input format");
  }

  const delta = excelDate - MAGIC_NUMBER_OF_DAYS;
  const parsed = delta * MISSING_LEAP_YEAR_DAY;
  const date = new Date(parsed);

  if (!isDate(date)) {
    throw new Error("wrong excel date input");
  }

  return date;
}

function parseColumnName(colName: string) {
  // Use a regular expression to extract the main question name and subquestion (if present)
  const match = colName.match(/^(.+?)(?:\[(.+?)\])?$/);

  if (!match) return { question: colName };

  const question = match[1];
  const subquestion = match[2];

  return { question, subquestion };
}

function getHeaders(sheet: xlsx.WorkSheet) {
  var header = 0,
    offset = 1;
  var hdr: any = [];
  var o: any = {};
  if (sheet == null || sheet["!ref"] == null) return [];
  var range = o.range !== undefined ? o.range : sheet["!ref"];
  var r;
  if (o.header === 1) header = 1;
  else if (o.header === "A") header = 2;
  else if (Array.isArray(o.header)) header = 3;
  switch (typeof range) {
    case "string":
      r = safe_decode_range(range);
      break;
    case "number":
      r = safe_decode_range(sheet["!ref"]);
      r.s.r = range;
      break;
    default:
      r = range;
  }
  if (header > 0) offset = 0;
  var rr = xlsx.utils.encode_row(r.s.r);
  var cols = new Array(r.e.c - r.s.c + 1);
  for (var C = r.s.c; C <= r.e.c; ++C) {
    cols[C] = xlsx.utils.encode_col(C);
    var val = sheet[cols[C] + rr];
    switch (header) {
      case 1:
        hdr.push(C);
        break;
      case 2:
        hdr.push(cols[C]);
        break;
      case 3:
        hdr.push(o.header[C - r.s.c]);
        break;
      default:
        if (val === undefined) continue;
        hdr.push(xlsx.utils.format_cell(val));
    }
  }
  return hdr;
}

function safe_decode_range(range: any) {
  var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
  var idx = 0,
    i = 0,
    cc = 0;
  var len = range.length;
  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
    idx = 26 * idx + cc;
  }
  o.s.c = --idx;

  for (idx = 0; i < len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
    idx = 10 * idx + cc;
  }
  o.s.r = --idx;

  if (i === len || range.charCodeAt(++i) === 58) {
    o.e.c = o.s.c;
    o.e.r = o.s.r;
    return o;
  }

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
    idx = 26 * idx + cc;
  }
  o.e.c = --idx;

  for (idx = 0; i != len; ++i) {
    if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
    idx = 10 * idx + cc;
  }
  o.e.r = --idx;
  return o;
}
