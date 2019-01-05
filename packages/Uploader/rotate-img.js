import EXIF from "./exif.js";
export default function rotateImage(base64, callback) {
  let image = new Image();
  image.src = base64;
  image.onload = () => {

    var width = image.width;
    var height = image.height;

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext('2d');

    var newImage = new Image();

    //旋转图片操作
    EXIF.getData(image, function () {
      let imageDate;
      var orientation = EXIF.getTag(this, 'Orientation');
      // orientation = 6;//测试数据
      switch (orientation) {
        //正常状态
        case 1:
          // canvas.height = height;
          // canvas.width = width;
          imageDate = base64;
          newImage.src = imageDate;
          break;
          //旋转90度
        case 6:
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(Math.PI / 2);
          ctx.translate(0, -height);

          ctx.drawImage(image, 0, 0)
          imageDate = canvas.toDataURL('image/jpeg', 0.1)
          newImage.src = imageDate;
          break;
          //旋转180°
        case 3:
          canvas.height = height;
          canvas.width = width;
          ctx.rotate(Math.PI);
          ctx.translate(-width, -height);

          ctx.drawImage(image, 0, 0)
          imageDate = canvas.toDataURL('image/jpeg', 0.1)
          newImage.src = imageDate;
          break;
          //旋转270°
        case 8:
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(-Math.PI / 2);
          ctx.translate(-height, 0);

          ctx.drawImage(image, 0, 0)
          imageDate = canvas.toDataURL('image/jpeg', 0.1)
          newImage.src = imageDate;
          break;
          //undefined时不旋转
        case undefined:
          imageDate = base64;
          newImage.src = imageDate;
          break;
      }

      callback(imageDate)

    });
  }
}