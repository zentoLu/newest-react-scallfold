/**
 * [projectTool description] 项目通用工具函数
 * @type {Object}
 */

const projectTool = {
    /**
     * [uploadFile description] html5将上传图片转化为base64
     * @param  {[type]} e  [description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    loadImgToBase64(e, dispatch, action) {
        var id = e.target.id;
        var files = document.getElementById(id).files;
        var file = files[0];
        var reader = new FileReader();
        console.log(id);
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            dispatch(action({[id]: e.target.result}))
        }
    }
}
export default projectTool
