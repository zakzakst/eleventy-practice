// 参考：https://qiita.com/taqumo/items/60de0af9699415150035
import c from "ansi-colors";
import fs from "fs";
import log from "fancy-log";
import globule from "globule";
import sharp from "sharp";

// TODO: src,distフォルダの指定方法を変更する
class AvifWebpConverter {
  constructor(options = {}) {
    this.srcBase = options.srcBase || "src/convert-images";
    this.destBase = options.destBase || "dist/images";
    this.includeExtensionName = options.includeExtensionName || false;
    this.formats = options.formats || [
      {
        type: "avif",
        quality: 80,
      },
      {
        type: "webp",
        quality: 80,
      },
    ];
    this.srcImages = `${this.srcBase}/**/*.{jpg,jpeg,png}`;
    this.init();
  }

  init = async () => {
    const imagePathList = this.findImagePaths();
    await this.convertImagesToAvifAndWebp(imagePathList);
  };

  findImagePaths = () => {
    return globule.find({
      src: [this.srcImages],
    });
  };

  convertImage = async (imagePath, format) => {
    const reg = /\/(.*)\.(jpe?g|png)$/i;
    const [, imageName, imageExtension] = imagePath.match(reg);
    const imageFileName = this.includeExtensionName
      ? `${imageName}.${imageExtension}`
      : imageName;
    const destPath = `${this.destBase}/${imageFileName}.${format}`;
    try {
      const converter = sharp(imagePath);
      for (const format of this.formats) {
        converter[format.type]({ quality: format.quality });
      }
      await converter.toFile(destPath);
      log(
        `Converted ${c.blue(imagePath)} to ${c.yellow(
          format.toUpperCase()
        )} ${c.green(destPath)}`
      );
    } catch (err) {
      log(
        c.red(
          `Error converting image to ${c.yellow(format.toUpperCase())}\n${err}`
        )
      );
    }
  };

  convertImagesToAvifAndWebp = async (imagePathList) => {
    if (imagePathList.length === 0) {
      log(c.red("No images found to convert"));
      return;
    }
    for (const imagePath of imagePathList) {
      const reg = new RegExp(`^${this.srcBase}/(.*/)?`);
      const path = imagePath.match(reg)[1] || "";
      const destDir = `${this.destBase}/${path}`;
      if (!fs.existsSync(destDir)) {
        try {
          fs.mkdirSync(destDir, { recursive: true });
          log(`Created directory ${c.green(destDir)}`);
        } catch (err) {
          log(`Failed to create directory ${c.green(destDir)}\n${err}`);
        }
      }
      const conversionPromises = this.formats.map((format) =>
        this.convertImage(imagePath, format.type)
      );
      await Promise.all(conversionPromises);
    }
  };
}
const converter = new AvifWebpConverter();
