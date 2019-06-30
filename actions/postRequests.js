import store from "../store";

export function addItem(activity, priority) {
    fetch('https://cloudcomputinggobackend.appspot.com/item/add', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            activity: String(activity),
            priority: Number(priority)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            store.dispatch({type:"UPDATE_ITEM_LIST", payload:{allItems : responseJson}})
        }).catch((error) => {
            console.log(error)
            //if event params are empty?
        })
}

export function dropItem(activity) {
    fetch('https://cloudcomputinggobackend.appspot.com/item/drop', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            activity: String(activity),
        }),
        }).then((response) => response.json()).then((responseJson) => {
            store.dispatch({type:"UPDATE_ITEM_LIST", payload:{allItems : responseJson}})
        }).catch((error) => {
            console.log(error)
            //if event params are empty?
        })
}

export function renameItem(oldname, newname) {
    fetch('https://cloudcomputinggobackend.appspot.com/item/rename', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            oldname: String(oldname),
            newname: String(newname)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            store.dispatch({type:"UPDATE_ITEM_LIST", payload:{allItems : responseJson}})
        }).catch((error) => {
            console.log(error)
            //if event params are empty?
        })
}
export function reprioritize(activity, priority) {
    console.log(activity + " " + priority)


    fetch('https://cloudcomputinggobackend.appspot.com/item/reprioritize', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            activity: String(activity),
            priority: Number(priority)
        }),
        }).then((response) => response.json()).then((responseJson) => {
           
            store.dispatch({type:"UPDATE_ITEM_LIST", payload:{allItems : responseJson}})
        }).catch((error) => {
            console.log(error)
            //if event params are empty?
        })
}

export function restatus(activity, status) {
    fetch('https://cloudcomputinggobackend.appspot.com/item/restatus', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            activity: String(activity),
            status: String(status)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            store.dispatch({type:"UPDATE_ITEM_LIST", payload:{allItems : responseJson}})
        }).catch((error) => {
            console.log(error)
            //if event params are empty?
        })
}