import { isUnDef } from '/@/utils/is';
import * as xlsx from 'xlsx';
import type { WorkBook } from 'xlsx';
import type { JsonToSheet, AoAToSheet } from './typing';
import { AoaToMultipleSheet, JsonToMultipleSheet } from './typing';

const { utils, writeFile } = xlsx;

const DEF_FILE_NAME = 'excel-list.xlsx';
const DEF_SHEET_NAME = 'sheet';

/**
 * @param data source data
 * @param worksheet worksheet object
 * @param min min width
 */
function setColumnWidth(data, worksheet, min = 3) {
  const obj = {};
  worksheet['!cols'] = [];
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (isUnDef(obj[key])) {
        obj[key] = min;
        // console.log(obj[key]);
      } else if (item[key].length > obj[key]) {
        obj[key] = item[key].length;
      }
    });
  });
  // console.log(obj);
  Object.keys(obj).forEach((key) => {
    worksheet['!cols'].push({
      wch: obj[key] * 2 + 2,
    });
  });
}

export function jsonToSheetXlsx<T = any>({
  data,
  header,
  filename = DEF_FILE_NAME,
  sheetName = DEF_SHEET_NAME,
  json2sheetOpts = {},
  write2excelOpts = { bookType: 'xlsx' },
}: JsonToSheet<T>) {
  const arrData = [...data];
  if (header) {
    arrData.unshift(header);
    json2sheetOpts.skipHeader = true;
  }
  const worksheet = utils.json_to_sheet(arrData, json2sheetOpts);
  setColumnWidth(arrData, worksheet);
  // console.log(worksheet);
  // for (const key in worksheet) {
  //   if (key == '!ref' || key == '!cols') {
  //     continue;
  //   }
  //   // 第一行
  //   // console.log(key, sheet[key])
  //   if (key.replace(/[^0-9]/gi, '') === '1') {
  //     worksheet[key].s = {
  //       fill: {
  //         fgColor: { rgb: 'FFA3F4B1' }, // 添加背景色
  //       },
  //       font: {
  //         name: '宋体', // 字体
  //         sz: 11,
  //         bold: true,
  //       },
  //       border: {
  //         top: {
  //           style: 'thin',
  //           color: '000',
  //         },
  //         bottom: {
  //           style: 'thin',
  //           color: '000',
  //         },
  //         right: {
  //           style: 'thin',
  //           color: '000',
  //         },
  //       },
  //     };
  //   } else {
  //     worksheet[key].s = {
  //       font: {
  //         name: '宋体', // 字体
  //         sz: 10,
  //       },
  //       border: {
  //         bottom: {
  //           style: 'thin',
  //           color: '000',
  //         },
  //         right: {
  //           style: 'thin',
  //           color: '000',
  //         },
  //       },
  //     };
  //   }
  // }
  /* add worksheet to workbook */
  const workbook: WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: worksheet,
    },
  };
  /* output format determined by filename */
  writeFile(workbook, filename, write2excelOpts);
  /* at this point, out.xlsb will have been downloaded */
}

export function aoaToSheetXlsx<T = any>({
  data,
  header,
  filename = DEF_FILE_NAME,
  write2excelOpts = { bookType: 'xlsx' },
}: AoAToSheet<T>) {
  const arrData = [...data];
  if (header) {
    arrData.unshift(header);
  }

  const worksheet = utils.aoa_to_sheet(arrData);

  /* add worksheet to workbook */
  const workbook: WorkBook = {
    SheetNames: [filename],
    Sheets: {
      [filename]: worksheet,
    },
  };
  /* output format determined by filename */
  writeFile(workbook, filename, write2excelOpts);
  /* at this point, out.xlsb will have been downloaded */
}

/**
 * json导出多Sheet的Xlsx
 * @param sheetList 多sheet配置
 * @param filename 文件名(包含后缀)
 * @param write2excelOpts 文件配置
 */
export function jsonToMultipleSheetXlsx<T = any>({
  sheetList,
  filename = DEF_FILE_NAME,
  write2excelOpts = { bookType: 'xlsx' },
}: JsonToMultipleSheet<T>) {
  const workbook: WorkBook = {
    SheetNames: [],
    Sheets: {},
  };
  sheetList.forEach((p, index) => {
    const arrData = [...p.data];
    if (p.header) {
      arrData.unshift(p.header);
      p.json2sheetOpts = p.json2sheetOpts || {};
      p.json2sheetOpts.skipHeader = true;
    }

    const worksheet = utils.json_to_sheet(arrData, p.json2sheetOpts);
    setColumnWidth(arrData, worksheet);

    p.sheetName = p.sheetName || `${DEF_SHEET_NAME}${index}`;
    workbook.SheetNames.push(p.sheetName);
    workbook.Sheets[p.sheetName] = worksheet;
  });
  writeFile(workbook, filename, write2excelOpts);
}

/**
 * aoa导出多Sheet的Xlsx
 * @param sheetList 多sheet配置
 * @param filename 文件名(包含后缀)
 * @param write2excelOpts 文件配置
 */
export function aoaToMultipleSheetXlsx<T = any>({
  sheetList,
  filename = DEF_FILE_NAME,
  write2excelOpts = { bookType: 'xlsx' },
}: AoaToMultipleSheet<T>) {
  const workbook: WorkBook = {
    SheetNames: [],
    Sheets: {},
  };
  sheetList.forEach((p, index) => {
    const arrData = [...p.data];
    if (p.header) {
      arrData.unshift(p.header);
    }
    const worksheet = utils.aoa_to_sheet(arrData);

    p.sheetName = p.sheetName || `${DEF_SHEET_NAME}${index}`;
    workbook.SheetNames.push(p.sheetName);
    workbook.Sheets[p.sheetName] = worksheet;
  });
  /* output format determined by filename */
  writeFile(workbook, filename, write2excelOpts);
  /* at this point, out.xlsb will have been downloaded */
}
