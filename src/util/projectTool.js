import compressImg from 'form/compressImg'
import { message } from 'antd'
/**
 * [projectTool description] 项目通用工具函数
 * @type {Object}
 */

const projectTool = {
    /**
     * [uploadFile description] html5将上传图片转化为base64
     * @param  {[type]} e  [description]
     * @param  {[type]} action [description]
     * @return {[type]}    [description]
     */
    loadImgToBase64(e, dispatch, action, callback) {
        var id = e.target.id;
        var files = document.getElementById(id).files;
        var file = files[0];
        var reader = new FileReader();
        //console.log('file', file);

        if (file.size > this.defaultImgOption.fileSizeLimit) {
            message.error('文件大小不能超过10M！');
            return;
        }

        var type = file.type;
        type = type.slice(type.indexOf('/') + 1);
        if (this.defaultImgOption.accept.indexOf(type) < 0) {
            message.error('文件格式不支持！');
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (typeof callback === 'function') {
                callback(id, event.target.result);
            } else {
                dispatch(action({
                    [id]: event.target.result
                }));
            }
        }
    },
    defaultImgOption: {
        accept: 'jpg,jpeg,png,gif,bmp', //格式限制
        compress: { // （配置）
            enable: true,
            width: 1000,
            height: 750,
            quality: 0.92,
            limit: 200 * 1024,
        },
        fileSizeLimit: 10 * 1024 * 1024 // 文件大小限制
    },
    loadImgToCompressedBase64(e, dispatch, action) {
        this.loadImgToBase64(e, dispatch, action, (id, file) => {
            compressImg(file).then((data) => {
                console.log(data);
                dispatch(action({
                    [id]: data
                }));
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}


export default projectTool
