export function normalizeArray(ele) {
    let obj = {};
    if (Array.isArray(ele)) {
        ele.forEach(el => {
            if( typeof ele === 'object'){
                obj[el.id] = el
            }
        })
    };

    return obj;
  };
