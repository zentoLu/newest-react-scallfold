/**
 * [description] base64文件压缩
 * @param  {[type]} file [description] base64字符串
 * @return {[type]}      [description]
 */
const compressImg = (file, option) => {
    var defaultOpts = {
        accept: 'jpg,jpeg,png,gif,bmp', //格式限制
        compress: { // （配置）
            enable: false,
            width: 1000,
            height: 750,
            quality: 0.92,
            limit: 200 * 1024,
        },
        fileSizeLimit: 10 * 1024 * 1024 // 文件大小限制
    };
    let opt = Object.assign(defaultOpts, option);
    let w = opt.compress.width,
        h = opt.compress.height,
        quality = opt.compress.quality,
        len = file.length;
    let compress = new Promise(function(resolve, reject) {
        if (typeof file !== 'string') {
            reject('文件格式不正确，仅支持base64字符串压缩');
            return;
        }
        //console.log(file.length);
        if (file.length < opt.compress.limit) {
            console.log('文件大小合适,无需压缩', '最终数据', file, file.length);
            resolve(file);
            return;
        }
        let cvs = document.createElement('canvas'),
            img = new Image();
        img.src = file;


        img.onload = function() {
            w = this.width;
            h = this.height;
            //console.log(w, h);
            cvs.width = w;
            cvs.height = h;
            let ctx = cvs.getContext('2d'),
                dataURL = '';
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            while (len > opt.compress.limit) {
                if (opt.compress.quality <= 0) {
                    reject('压缩失败，图片尺寸太大');
                }
                dataURL = cvs.toDataURL('image/jpeg', quality);
                len = dataURL.length;
                if (quality > 0.2) {
                    quality -= 0.05;
                } else if (quality > 0.12) {
                    quality -= 0.02;
                } else if (quality > 0.05) {
                    quality -= 0.01;
                }

                //console.log(dataURL, dataURL.length, quality);
            }
            resolve(dataURL);
        }
    });

    return compress;
}

export default compressImg;

/*const compressImgOption = {
    accept: 'jpg,jpeg,png,gif',
    compress: { // （配置）
        enable: true,
        limit: 200 * 1024,
    }
};

const compressImg = (file, opt) => {
    let noop = '';
    let w = opt.compress.width,
        h = opt.compress.height,
        quality = opt.compress.quality;
    if (typeof file !== 'string') {
        console.log('文件格式不正确，仅支持base64字符串压缩');
        return '';
    }
    let cvs = document.createElement('canvas'),
        img = new Image();
    img.src = file;
    let compress = new Promise(function(resolve, reject) {
        img.onload = () => {
            let ctx = cvs.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            let dataURL = cvs.toDataURL('image/jpeg', quality);
            opt.compress.quality = opt.compress.quality - 0.05;
            //console.log(dataURL.length, quality, opt);
            resolve({ dataURL, opt });
        }
    });

    return compress;
}


const compressImgWithLimit = (file, option) => {
    let noop = '';
    var defaultOpts = {
        accept: '', // 格式限制
        compress: { // （配置）
            enable: false,
            width: 1000,
            height: 750,
            quality: 0.9,
            limit: 200 * 1024,
        },
        autoUpload: true, // 自动上传
        mode: 'formdata', // 发送给服务器的模式
        formData: noop, // formData附带的数据
        fileName: 'myFile', // 发送文件的字段名
        fileSizeLimit: noop, // 文件大小限制
        server: noop, // 上传地址
    };
    console.log(option && option.compress.quality);
    let opt = Object.assign(defaultOpts, option);
    //console.log(opt);
    let { compress } = opt;
    compressImg(file, opt).then(function(data) {
        let { dataURL, opt } = data;
        let newFile = dataURL;
        if (newFile.length > compress.limit) {
            compressImgWithLimit(file, opt);
        } else {
            console.log('最终数据', newFile, newFile.length);
        }
    })
}*/
