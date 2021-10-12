import * as gltf from '@maptalks/gltf-loader';

function getJSON(url, options) {
    return gltf.Ajax.getJSON(url, options);
}

function getArrayBuffer(url, options) {
    return gltf.Ajax.getArrayBuffer(url, options);
}

function loadGLTF(root, data, options) {
    const loader = new gltf.GLTFLoader(root, data, options);
    return loader.load();
}

function load(url) {
    const index = url.lastIndexOf('/');
    const root = url.slice(0, index);
    const postfix = url.slice(url.lastIndexOf('.')).toLowerCase();
    if (postfix === '.gltf') {
        return getJSON(url, {}).then(json => {
            return loadGLTF(root, json, { requestImage });
        });
    } else if (postfix === '.glb') {
        return getArrayBuffer(url, {}).then(bin => {
            return loadGLTF(root, { buffer : bin.data, byteOffset : 0 }, { requestImage, imageDecoders: { 'image/png': pngDecoder}});
        });
    }
    return null;
}

function gltfload(data) {
    const url = data.url;
    load(url).then(gltfData => {
        self.postMessage(gltfData);
    });
}

function requestImage(url, cb) {
    //暂存图像的url，传给主线程处理
    const result = { data: url };
    cb(null, result);
}

function pngDecoder(dataview) {
    return { data: dataview };
}

self.addEventListener('message', function (e) {
    gltfload(e.data);
}, false);