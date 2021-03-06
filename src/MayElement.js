/**
 * 
 * @param {*} type dom类型或func
 * @param {*} props dom属性
 * @param {*} children 子节点
 */
export function createElement(type, config, children) {

    var props = {};
    var key = null;
    var ref = null;
    var mtype = null;
    var len = arguments.length - 2;
    //既然render的时候都需要判断下type 是fun或string
    //那把这一步提前 比render循环里判断更好些;
    var _type = typeof type;
    switch (_type) {
        case 'string': //HtmlElement 1  SVG 3
            mtype = _type !== 'svg' ? 1 : 3;
            break;
        case 'function': //component 或functionless
            mtype = 2;
            break;
    }
    if (config) {
        key = config.key !== void 0 ? ('' + config.key) : null;
        ref = config.ref || null;
        for (var i in config) {
            if (i !== 'key' && i != 'ref') {
                props[i] = config[i];
            }
        }
    }

    if (len > 1) {
        var array = new Array();
        for (var i = 0; i < len; i++) {
            array.push(arguments[i + 2]);
        }
        props.children = array;
    } else if (len === 1 && children) {
        if (!Array.isArray(children)) {
            props.children = [];
            props.children[0] = children;
        } else {
            props.children = children;
        }
    }

    return new Vnode(type, key, ref, props, mtype);
}

/**
 * 
 * @param {*} type 
 * @param {*} key 
 * @param {*} ref 
 * @param {*} self 
 * @param {*} source 
 * @param {*} owner 
 * @param {*} props 
 */
var Vnode = function (type, key, ref, props, mtype) {
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    this.$$typeof = 1;
    this.mtype = mtype;
}

export function isValaidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === 1;
}

/*
function h(nodeName, attributes, ...args) {  
      let children = args.length ? [].concat(...args) : null;
      return { nodeName, attributes, children };
}
function render(vnode) {  
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);

    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );

    // render (build) and then append child nodes:
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );

    return n;
}*/

// function isArray(o) {
//     return Object.prototype.toString.call(o) == '[object Array]';
// }

function extend(target, src) {
    for (var key in src) {
        target[key] = src[key];
    }

}