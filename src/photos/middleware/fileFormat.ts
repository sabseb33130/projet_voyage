// fileFormats.ts

enum FileType {
  jpeg = 'ffd8ffe',
  gif = '474946',
  webp = '5249464',
  avif = '66747970',
  png = '89504e4',
  swf = '465753',
  xlsx = '504b2020',
  xlsx_2007_2013 = '504b2020',
  xls_2003 = 'd0cf11e0a1b11ae1',
  PPTX = '504b2020',
  PPTX_2007_2013 = '504b2020',
  PPT_2003 = 'd0cf11e0a1b11ae1',
  //TXT = null,
  // EXE = null,
  DOCX = '504b2020',
  DOCX_2007_2013 = '504b2020',
  DOC_2003 = 'd0cf11e0a1b11ae1',
  // SVG = null,
  pdf = '25504446',
  // CSV = null,
  ZIP = '504b0304',
  MP3 = '494433',
  MP4 = '66747970',
  AVI = '52494646',
}

export default FileType;
