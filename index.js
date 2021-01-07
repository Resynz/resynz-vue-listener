/**
 * @Author: Resynz
 * @Date: 2021/1/7 17:28
 */
class Listener {
    static get instance () {
        Listener._instance = Listener._instance || new Listener()
        return Listener._instance
    }

    constructor () {
        this.name = 'Listener'
        this.listenMap = {}
    }

    $on (evtName, fn) {
        if (typeof fn !== 'function') {
            console.error(`[${this.name}] can't listen event:${evtName}, fn is not a function`)
            return
        }
        if (!(evtName in this.listenMap)) {
            this.listenMap[evtName] = []
        }
        this.listenMap[evtName] = [fn]
        console.log(`[${this.name}] listen on event:${evtName}`)
    }

    $emit (evtName, ...data) {
        if (evtName in this.listenMap) {
            this.listenMap[evtName].forEach(fn => {
                fn(...data)
            })
        } else {
            console.error(`[${this.name}] could not found event:${evtName}`)
        }
    }

    $off (evtName, fn) {
        if (evtName in this.listenMap) {
            if (fn) {
                const index = this.listenMap[evtName].indexOf(fn)
                if (index > -1) {
                    this.listenMap[evtName].splice(index, 1)
                    console.log(`[${this.name}] remove event:${evtName}`)
                }
                return
            }
            delete this.listenMap[evtName]
            console.log(`[${this.name}] deleted event:${evtName}`)
            return null
        }
        console.warn(`[${this.name}] event:${evtName} not exist`)
    }
}

export default {
    install: (Vue) => {
        Vue.prototype.$listener = Listener.instance
    }
}
